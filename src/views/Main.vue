<template>
  <div class="common-layout">
    <el-container class="container">
      <Aside></Aside>
      <el-container class="header-main">
        <Header></Header>
        <router-view />
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100%;

  .container {

    height: 100%;
    flex-wrap: wrap;

    .el-aside {
      :deep(.el-menu) {
        height: 100%;
      }
    }

    .header-main {
      display: flex;
      flex-direction: column;
      flex-basis: 0 !important;
    }
  }
}
</style>