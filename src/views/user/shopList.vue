<template>
  <el-main>
    <div>
      <Table :type="type" :label="label" :tableData="tableData" :label2="label2">
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" @click="handleAdd( scope.row)">添加食品</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
      </Table>
      <div v-if="paginationValue.total" class="pagination">
        <Paginaton v-bind="paginationValue" @changeValue='changeValue'></Paginaton>
      </div>
      <el-dialog v-model="dialogFormVisible" title="修改店铺信息">
        <el-form :model="curRow">
          <el-form-item label="店铺名称" :label-width="formLabelWidth">
            <el-input v-model="curRow.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth">
            <el-input v-model="curRow.address" autocomplete="off" />
          </el-form-item>
          <el-form-item label="店铺介绍" :label-width="formLabelWidth">
            <el-input v-model="curRow.description" autocomplete="off" />
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="curRow.phone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="店铺分类" :label-width="formLabelWidth">
            <el-cascader v-model="curCategory" :options="categoryList" />
          </el-form-item>
          <el-form-item label="店铺图片" :label-width="formLabelWidth">
            <el-upload class="avatar-uploader" :action="baseURL + 'v1/addimg/shop'" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="curImg" :src="curImg" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="shopUpdate">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </el-main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCityGuess, getRestaurants, getResCount, getResCategory, updateShop } from 'a/getData'
import { baseURL } from '~/utils/request'
import { message } from '~/utils/message'
const router = useRouter()
const tableData = ref([])
let latitude = 0
let longitude = 0
let total = ref()
let pageSize = ref(20)
let curPage = ref(1)
const type = 'expand'
const label = ['商铺名', '商铺地址', '商铺介绍', '商铺id', '联系电话', '评分', '销售量', '分类']
const label2 = [
  {
    label: '商铺名',
    prop: 'name'
  },
  {
    label: '商铺地址',
    prop: 'address'
  },
  {
    label: '商铺介绍',
    prop: 'description'
  }
]
const baseImgPath = 'https://elm.cangdu.org/img/'
const curRow = ref({})
const formLabelWidth = '140px'
const curImg = ref()
const categoryList = ref([])
const curCategory = ref()
let paginationValue = reactive({
  curPage: curPage.value,
  pageSize: pageSize.value,
  total: total.value
})
let dialogFormVisible = ref(false)
const getLocation = async () => {
  let { latitude, longitude } = await getCityGuess('guess')
  if (latitude > 0) {
    let res = await getRestaurants({
      latitude,
      longitude
    })
    tableData.value = res
  }
}
getLocation()
const resCount = async () => {
  let { count } = await getResCount()
  paginationValue.total = count
}
resCount()
const handleCurrentChange = async () => {
  let offset = (curPage.value - 1) * pageSize.value
  let res = await getRestaurants({
    latitude,
    longitude,
    offset,
    limit: pageSize.value
  })
  tableData.value = res
}
const changeValue = async e => {
  paginationValue.curPage = e
  let offset = (paginationValue.curPage - 1) * paginationValue.pageSize
  let res = await getRestaurants({
    latitude,
    longitude,
    offset,
    limit: paginationValue.pageSize
  })
  tableData.value = res
}
const handleEdit = (i, row) => {
  curRow.value = row
  dialogFormVisible.value = true
  curImg.value = baseImgPath + curRow.value.image_path
  curCategory.value = row.category.split('/')
}
const handleAvatarSuccess = (res, file) => {
  curImg.value = baseImgPath + res.image_path
}
const beforeAvatarUpload = () => {}
const getCategory = async () => {
  let res = await getResCategory()
  res.forEach(item => {
    let newRes = {
      value: item.name,
      label: item.name,
      children: []
    }
    item.sub_categories.forEach((item2, index) => {
      if (index === 0) {
        return
      }
      newRes.children.push({
        value: item2.name,
        label: item2.name
      })
    })
    categoryList.value.push(newRes)
  })
}
getCategory()
const props = {
  expandTrigger: 'hover'
}
const shopUpdate = async () => {
  let { id, name, address, description, phone } = curRow.value
  let newCate = curCategory.value.join('/')
  let newImg = curImg.value.split('img/', 2)
  const newDate = {
    id,
    name,
    address,
    description,
    phone,
    category: newCate,
    image_path: newImg[1]
  }
  let res = await updateShop(newDate)
  if (res.status === 1) {
    message('商家信息更新成功', 'success')
  } else {
    message(res.message, 'error')
  }
  dialogFormVisible.value = false
  location.reload()
}
const handleAdd = row => {
  router.push({
    path: '/addFood',
    query: { restaurant_id: row.id }
  })
}
</script>

<style lang="scss" scoped>
.el-button {
  margin: 3px;
}
.demo-form-inline {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  color: rgba(29, 29, 209, 0.635);
  font-weight: bold;
  background-color: rgba(251, 253, 255);
  .el-form-item {
    width: 35%;
  }
}
.el-table {
  :deep(.cell) {
    text-align: center;
  }
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

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>