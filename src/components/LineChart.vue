<template>
  <div class="line" style="width: 80%;height: 60vh;"></div>
</template>

<script setup>
import * as echarts from 'echarts';

const props = defineProps({
  weekday: Array,
  weekdayData: Object
})
let { weekday, weekdayData } = props
weekday.reverse()
weekdayData.userCount.reverse()
weekdayData.orderCount.reverse()
weekdayData.adminCount.reverse()
const initEcharts = () => {
  Promise.resolve().then(() => {
    let lineData = echarts.init(document.querySelector('.line'))
    window.addEventListener('resize', () => {
      lineData.resize()
    })
    lineData.setOption({
      color: ['skyblue', 'green', '#d14a61'],
      title: {
        text: '走势'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['新注册用户', '新增订单', '新增管理员']
      },
      grid: {
        left: '1%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          magicType: {
            type: ['line', 'bar']
          }
        },
        show: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: weekday
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        axisLabel: {
          formatter: '{value}'
        }
      },
      series: [
        {
          name: '新注册用户',
          type: 'line',
          data: weekdayData.userCount,
          smooth: true,
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          }
        },
        {
          name: '新增订单',
          type: 'line',
          data: weekdayData.orderCount,
          smooth: true,
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          }
        },
        {
          name: '新增管理员',
          type: 'line',
          data: weekdayData.adminCount,
          smooth: true,
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          }
        }
      ]
    });
  })
}
initEcharts()
</script>
<style lang="scss"></style>