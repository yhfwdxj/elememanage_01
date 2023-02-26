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
import { getAdminList, getAdiminCount } from 'a/getData'
const tableData = ref([])
const type = 'index'
const label2 = [
  {
    label: '姓名',
    prop: 'user_name'
  },
  {
    label: '注册日期',
    prop: 'create_time'
  },
  {
    label: '地址',
    prop: 'city'
  },
  {
    label: '权限',
    prop: 'admin'
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
  let res = await getAdminList({
    offset: 0,
    limit: 20
  })
  tableData.value = res.data
}
getData()
const getCount = async () => {
  let { count } = await getAdiminCount()
  paginationValue.total = count
}
getCount()
const changeValue = async e => {
  paginationValue.curPage = e
  let offset = (paginationValue.curPage - 1) * paginationValue.pageSize
  let res = await getAdminList({
    offset,
    limit: paginationValue.pageSize
  })
  tableData.value = res.data
  if (tableData.value.message) {
    alert(tableData.value.message)
    location.reload()
  }
}
</script>

<style>
</style>