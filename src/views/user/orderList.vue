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
import { getOrderList, getOrderCount } from 'a/getData'
const type = 'index'
const tableData = ref([])
let total = ref()
let pageSize = ref(20)
let curPage = ref(1)
let paginationValue = reactive({
  curPage: curPage.value,
  pageSize: pageSize.value,
  total: total.value
})
const label = ['用户名', '店铺名称', '收货地址', '店铺ID', '店铺地址']
const label2 = [
  {
    label: '订单ID',
    prop: 'id'
  },
  {
    label: '总价格',
    prop: 'total_amount'
  },
  {
    label: '订单状态',
    prop: 'status_bar.title'
  }
]
const getOrder = async () => {
  let res = await getOrderList({
    offset: 0,
    limit: pageSize.value
  })
  tableData.value = res

}
getOrder()
const orderCount = async () => {
  let { count } = await getOrderCount()
  paginationValue.total = count
}
orderCount()
const changeValue = async e => {
  paginationValue.curPage = e
  let offset = (paginationValue.curPage - 1) * paginationValue.pageSize
  let res = await getOrderList({
    offset,
    limit: paginationValue.pageSize
  })
  tableData.value = res

}
</script>

<style>
</style>