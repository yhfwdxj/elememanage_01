<template>
  <el-main>
    <div v-if="userCity" class="dataCharts">
      <location-charts :userCity="userCity"></location-charts>
    </div>
    <vloading v-else></vloading>
  </el-main>
</template>

<script setup>
import { ref } from 'vue'
import { getUserCity } from 'a/getData.js'

let userCity = ref()
const getCity = async () => {
  let res = await getUserCity()
  userCity.value = res.user_city
}
getCity()
</script>

<style lang="scss" >
.dataCharts {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>