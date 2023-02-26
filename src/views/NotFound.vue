<template>
  <div>
    <el-result icon="warning" title="404" sub-title="没有找到当前页面">
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">回到首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>