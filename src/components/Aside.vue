<template>
  <el-aside width="200px">
    <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" background-color="rgb(50, 64, 87)"
      text-color="white" router>
      <el-menu-item index="home">
        <el-icon>
          <Menu />
        </el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <edit />
          </el-icon>
          <span>数据管理</span>
        </template>
        <el-menu-item index="userList">用户列表</el-menu-item>
        <el-menu-item index="shopList">商家列表</el-menu-item>
        <el-menu-item index="foodsList">食品列表</el-menu-item>
        <el-menu-item index="orderList">订单列表</el-menu-item>
        <el-menu-item index="adminList">管理员列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <plus />
          </el-icon>
          <span>添加数据</span>
        </template>
        <el-menu-item index="addShop">添加商铺</el-menu-item>
        <el-menu-item index="addFood">添加食品</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon>
            <StarFilled />
          </el-icon>
          <span>图表</span>
        </template>
        <el-menu-item index="userLocation">用户分布</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="5">
        <template #title>
          <el-icon>
            <Setting />
          </el-icon>
          <span>设置</span>
        </template>
        <el-menu-item index="adminSet">管理员设置</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
let defaultActive = ref(router.currentRoute.value.path.replace('/', ''))
watch(
  router.currentRoute,
  newValue => {
    defaultActive.value = newValue.path.replace('/', '')
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: rgb(50, 64, 87);
}
</style>