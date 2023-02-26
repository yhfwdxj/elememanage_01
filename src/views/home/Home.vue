<template>
  <el-main>
    <div>
      <header class="header">
        <h2 class="title">数据统计</h2>
      </header>
      <el-row :gutter="10">
        <el-col :span="4" :offset="4">
          <div class="grid-content ep-bg-purple" style="background-color: skyblue;color: white;">
            当日数据:
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content ep-bg-purple">
            新增用户:<span>{{ allToday.userCountToday }}</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content ep-bg-purple">
            新增订单:<span>{{ allToday.orderCountToday }}</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content ep-bg-purple">
            新增管理员:<span>{{ allToday.adminCountToday }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4" :offset="4">
          <div class="grid-content ep-bg-purple" style="background-color: orange;color: white;">
            总数据:
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content ep-bg-purple">
            注册用户:<span>{{ allData.userCount }}</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content ep-bg-purple">
            订单:<span>{{ allData.orderCount }}</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content ep-bg-purple">
            管理员:<span>{{ allData.adminCount }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="dataCharts" v-if="weekdayData.userCount.length === 7">
      <line-chart :weekday="weekday" :weekdayData="weekdayData"></line-chart>
    </div>
    <vloading v-else></vloading>
  </el-main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { getAllUserCount, getNewUserCountDate, getAllOrderCount, getNewOrderCountDate, getAllAdminCount, getNewAdminCountDate } from 'a/getData'
import { dayjs } from 'element-plus'

const newDayjs = dayjs()
const today = newDayjs.format('YYYY-MM-DD')
const weekday = ref([])

const weekdayData = reactive({
  userCount: [],
  orderCount: [],
  adminCount: []
})
const allData = reactive({
  userCount: '',
  orderCount: '',
  adminCount: ''
})
const allToday = reactive({
  userCountToday: '',
  orderCountToday: '',
  adminCountToday: ''
})
const getWeek = () => {
  for (let index = 0; index < 7; index++) {
    let week = newDayjs.subtract(index, 'day').format('YYYY-MM-DD')
    weekday.value.push(week)
  }
}
getWeek()
const getData = async () => {
  let res = await getAllUserCount()
  allData.userCount = res.count
  let res2 = await getNewUserCountDate(today)
  allToday.userCountToday = res2.count
  let res3 = await getAllOrderCount()
  allData.orderCount = res3.count
  let res4 = await getNewOrderCountDate(today)
  allToday.orderCountToday = res4.count
  let res5 = await getAllAdminCount()
  allData.adminCount = res5.count
  let res6 = await getNewAdminCountDate(today)
  allToday.adminCountToday = res6.count
}
getData()
const getWeekData = async () => {
  for (let index = 0; index < weekday.value.length; index++) {
    let userCount = await getNewUserCountDate(weekday.value[index])
    let orderCount = await getNewOrderCountDate(weekday.value[index])
    let adminCount = await getNewAdminCountDate(weekday.value[index])
    weekdayData.userCount.push(userCount.count)
    weekdayData.orderCount.push(orderCount.count)
    weekdayData.adminCount.push(adminCount.count)
  }
}
getWeekData()
</script>

<style lang="scss">
.header {
  text-align: center;
  margin-bottom: 30px;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  background-color: rgb(229, 233, 242);
  text-align: center;
  line-height: 36px;
  border-radius: 4px;

  span {
    color: #333;
    font-size: 24px;
    vertical-align: top;
  }
}

.dataCharts {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>