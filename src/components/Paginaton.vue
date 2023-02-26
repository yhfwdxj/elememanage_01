<template>
  <el-pagination v-model:current-page="curPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total" @current-change="handleCurrentChange" />
</template>

<script setup>
const props = defineProps({
  curPage: Number,
  pageSize: Number,
  total: Number
})
const emits = defineEmits(['changeValue'])
let { curPage, pageSize, total } = props
const handleCurrentChange = () => {
  emits('changeValue', curPage)
}
</script>

<style>
</style>