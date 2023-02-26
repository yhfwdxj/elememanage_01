<template>
  <el-main>
    <div v-if="info" class="adminInfos">
      <div class="left">
        <ul>
          <li>姓名:</li>
          <li>注册时间:</li>
          <li>管理员权限:</li>
          <li>管理员ID:</li>
          <li>头像:</li>
        </ul>
      </div>
      <div class="right">
        <ul>
          <li>{{ info.user_name }}</li>
          <li>{{ info.create_time }}</li>
          <li>{{ info.admin }}</li>
          <li>{{ info.id }}</li>
          <li>
            <el-upload class="avatar-uploader" :action="baseURL + 'admin/update/avatar/' + info.id"
              :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="info.avatar" :src="baseImgPath + info.avatar" class="avatar">
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </li>
        </ul>
      </div>
    </div>
  </el-main>
</template>

<script setup>
import { ref } from 'vue'
import { getUserInfo } from 'a/getData'
import { baseImgPath, baseURL } from '~/utils/request'
import { message } from '~/utils/message'

const info = ref()
const userInfo = async () => {
  let res = await getUserInfo()
  info.value = res.data
}
userInfo()
const beforeAvatarUpload = () => { }
const handleAvatarSuccess = (res, file) => {
  if (res.status === 1) {
    info.avatar = res.image_path
    message('头像更新成功', 'success')
    location.reload()
  } else {
    message('头像更新失败', 'error')
  }

}
</script>
<style lang='scss' scoped>
.adminInfos {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 40px;

  .left {
    margin-right: 80px;
  }
}

ul li {
  margin-bottom: 40px;
}

.avatar {
  width: 120px;
  height: 120px;
}

:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>