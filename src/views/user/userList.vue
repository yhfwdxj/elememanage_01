<template>
  <el-main>
    <Table :label2="label2" :tableData="tableData" :type="type"></Table>
    <div v-if="paginationValue.total" class="pagination">
      <Paginaton v-bind="paginationValue" @changeValue='changeValue'></Paginaton>
    </div>
  </el-main>

</template>

<script setup>
import { reactive, ref } from 'vue'
import { getUserList, getUserCount } from 'a/getData'

const tableData = ref([])
const type = 'index'
const label2 = [
  {
    label: '注册时间',
    prop: 'registe_time'
  },
  {
    label: '用户名',
    prop: 'username'
  },
  {
    label: '城市',
    prop: 'city'
  }
]
let total = ref()
let pageSize = ref(20)
let curPage = ref(1)
let paginationValue = reactive({
  curPage: curPage.value,
  pageSize: pageSize.value,
  total: total.value
})
const getData = async () => {
  tableData.value = await getUserList({
    offset: 0,
    limit: 20
  })
}
getData()
const getCount = async () => {
  let { count } = await getUserCount()
  paginationValue.total = count
}
getCount()
const changeValue = async e => {
  paginationValue.curPage = e
  let offset = (paginationValue.curPage - 1) * paginationValue.pageSize
  let res = await getUserList({
    offset,
    limit: paginationValue.pageSize
  })
  tableData.value = res
  if (tableData.value.message) {
    alert(tableData.value.message)
    location.reload()
  }
}
</script>

<style lang="scss">
</style>