<template>
  <div class="loactionCharts" style="width: 80%;height: 60vh;">
  </div>
</template>

<script setup>
import { nextTick } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  userCity: Object
})
const { userCity } = props
const initEcharts = async () => {
  await nextTick()
  console.log(userCity);
  let pieData = echarts.init(document.querySelector('.loactionCharts'))
  pieData.setOption({
    title: {
      text: '用户分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '用户分布',
        type: 'pie',
        radius: '50%',
        data: [
          { value: userCity.beijing, name: '北京' },
          { value: userCity.hangzhou, name: '杭州' },
          { value: userCity.shanghai, name: '上海' },
          { value: userCity.shenzhen, name: '深圳' },
          { value: userCity.qita, name: '其它' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
}
initEcharts()
</script>
<style lang='scss' scoped></style>