<template>
  <el-header v-if="imgUrl">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item, i in url" :key="i">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <img :src="imgUrl" class="avatar">
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="adminShow">首页</el-dropdown-item>
          <el-dropdown-item @click="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { signout, getUserInfo } from 'a/getData'
import { useStore } from 'vuex'
import { message } from '~/utils/message'
import { baseImgPath } from '~/utils/request'

const router = useRouter()
const store = useStore()
let url = ref(router.currentRoute.value.meta)
let imgUrl = ref()
watch(router.currentRoute, newValue => {
  url.value = newValue.meta
})
const userInfo = async () => {
  let res = await getUserInfo()
  console.log(res);
  if (res.data.status === 1) {
    imgUrl.value = baseImgPath + res.data.avatar
    store.commit('getUserInfo', res.data)
    window.localStorage.setItem('loginState', 'true')
  } else {
    message('登录已过期请重新登录', 'warning')
    window.localStorage.setItem('loginState', 'false')
    router.push('/login')
  }

}
userInfo()
const adminShow = () => {
  router.push('/adminSet')
}
const loginOut = async () => {
  let res = await signout()
  if (res.status === 1) {
    window.localStorage.setItem('loginState', 'false')
    router.push('/login')
    message('退出登录成功', 'success')
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: rgb(239, 242, 247);
}

.avatar {
  width: 40px;
}
</style>