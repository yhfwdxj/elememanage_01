<template>
  <el-main>
    <el-row>
      <el-col :span="12" :offset="5">
        <el-form :model="shopInfo" label-width="80px" ref="formRef" :rules="rules">
          <el-form-item label="商铺名称" prop="name">
            <el-input v-model="shopInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-autocomplete v-model="shopInfo.address" :fetch-suggestions="querySearch" clearable style="width:100%;" @select="handleSelect" />
            <span>当前城市:{{city}}</span>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model.number="shopInfo.phone" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="店铺简介">
            <el-input v-model="shopInfo.description"></el-input>
          </el-form-item>
          <el-form-item label="店铺标语">
            <el-input v-model="shopInfo.promotion_info"></el-input>
          </el-form-item>
          <el-form-item label="店铺分类">
            <el-cascader v-model="curCategory" :options="categoryOptions" />
          </el-form-item>
          <el-form-item label="店铺特点">
            <el-switch v-model="shopInfo.is_premium" inactive-text="品牌保证" active-text="品牌保证" inline-prompt size="large" />
            <el-switch v-model="shopInfo.delivery_mode" inactive-text="蜂鸟专送" active-text="蜂鸟专送" inline-prompt size="large" />
            <el-switch v-model="shopInfo.new" inactive-text="新开店铺" active-text="新开店铺" inline-prompt size="large" />
          </el-form-item>
          <el-form-item>
            <el-switch v-model="shopInfo.bao" inactive-text="外卖保" active-text="外卖保" inline-prompt size="large" />
            <el-switch v-model="shopInfo.zhun" inactive-text="准时达" active-text="准时达" inline-prompt size="large" />
            <el-switch v-model="shopInfo.piao" inactive-text="开发票" active-text="开发票" inline-prompt size="large" />
          </el-form-item>
          <el-form-item label="配送费">
            <el-input-number v-model="shopInfo.float_delivery_fee" :min="0" :max="10" size="large" />
          </el-form-item>
          <el-form-item label="起送价">
            <el-input-number v-model="shopInfo.float_minimum_order_amount" :min="0" :max="100" size="large" />
          </el-form-item>
          <el-form-item label="营业时间">
            <el-time-select v-model="shopInfo.startTime" :max-time="shopInfo.endTime" class="mr-4" placeholder="营业时间" start="00:00" step="00:10" end="23:50" />
            <el-time-select v-model="shopInfo.endTime" :min-time="shopInfo.startTime" placeholder="歇业时间" start="00:00" step="00:10" end="23:50" />
          </el-form-item>
          <el-form-item label="店铺图片" prop="img">
            <el-upload class="avatar-uploader" :action="action" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="shopInfo.image_path" :src="baseImgPath + shopInfo.image_path" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="优惠活动">
            <el-select v-model="curActivity" class="m-2" placeholder="Select" size="large" @change="changeActivity">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-table :data="allActivity" style="width: 100%">
            <el-table-column prop="name" label="活动名称" width="width">
            </el-table-column>
            <el-table-column prop="description" label="活动详情" width="width">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button type="danger" size="small" @click="deleteColumn(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-form-item class="sumbit-button">
            <el-button type="primary" @click="sumbit(formRef)">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-main>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { getResCategory, getCityGuess, searchAddress, addShop } from 'a/getData'
import { baseURL, baseImgPath } from '~/utils/request'
import { message } from '~/utils/message'

const formRef = ref(null)
const action = ref(baseURL + 'v1/addimg/shop')
const categoryOptions = ref([])
const curCategory = ref([])
const curActivity = ref('满减优惠')
const latitude = ref()
const longitude = ref()
const city = ref()
const city_id = ref()
const imgRules = (rule, value, callback) => {
  if (!shopInfo.image_path) {
    return callback(new Error('请上传图片'))
  }
}
const rules = reactive({
  name: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
  address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入联系电话' },
    { type: 'number', message: '只能是数字' }
  ],
  img: [{ validator: imgRules, trigger: 'change', required: true }]
})
const allActivity = reactive([
  {
    icon_name: '减',
    name: '满减优惠',
    description: '满30减5,满60减8'
  }
])
const shopInfo = reactive({
  name: '',
  address: '',
  latitude: '',
  longitude: '',
  description: '',
  phone: '',
  promotion_info: '',
  business_license_image: '',
  catering_service_license_image: '',
  image_path: '',
  startTime: '',
  endTime: '',
  is_premium: true,
  delivery_mode: true,
  new: true,
  bao: true,
  zhun: true,
  piao: true,
  float_delivery_fee: 5,
  float_minimum_order_amount: 20
})
const options = reactive([
  {
    value: '满减优惠',
    label: '满减优惠'
  },
  {
    value: '优惠大酬宾',
    label: '优惠大酬宾'
  },
  {
    value: '新用户立减',
    label: '新用户立减'
  },
  {
    value: '进店领券',
    label: '进店领券'
  }
])
const getCity = async () => {
  let res = await getCityGuess('guess')
  city_id.value = res.id
  latitude.value = res.latitude
  longitude.value = res.longitude
  city.value = res.name
}
getCity()
const getCategory = async () => {
  let res = await getResCategory()
  res.forEach(item => {
    let newRes = {
      value: item.name,
      label: item.name,
      children: []
    }
    item.sub_categories.forEach((item2, index) => {
      if (index === 0) {
        return
      }
      newRes.children.push({
        value: item2.name,
        label: item2.name
      })
    })
    categoryOptions.value.push(newRes)
  })
}
getCategory()
const querySearch = async (keyword, cb) => {
  if (keyword) {
    try {
      let res = await searchAddress({
        city_id: city_id.value,
        keyword
      })
      let newRes = res.map(item => {
        item.value = item.address
        return item
      })
      cb(newRes)
    } catch (error) {
      message(error, 'error')
    }
  }
}
const handleSelect = newValue => {
  shopInfo.latitude = newValue.latitude
  shopInfo.longitude = newValue.longitude
}
const handleAvatarSuccess = res => {
  formRef.value.clearValidate('img')
  if (res.status === 1) {
    shopInfo.image_path = res.image_path
  }
}
const beforeAvatarUpload = () => {}
const changeActivity = () => {
  ElMessageBox.prompt('请输入活动详情', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^[\u4e00-\u9fa5-a-zA-Z0-9]+$/,
    inputErrorMessage: '格式错误,不能有特殊符号'
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: `Your email is:${value}`
      })
      let newActivity = reactive({})
      switch (curActivity.value) {
        case '满减优惠':
          newActivity = {
            icon_name: '减',
            name: '满减优惠',
            description: value
          }
          break
        case '优惠大酬宾':
          newActivity = {
            icon_name: '特',
            name: '优惠大酬宾',
            description: value
          }
          break
        case '新用户立减':
          newActivity = {
            icon_name: '新',
            name: '新用户立减',
            description: value
          }
          break
        case '进店领券':
          newActivity = {
            icon_name: '领',
            name: '进店领券',
            description: value
          }
          break
      }
      allActivity.push(newActivity)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled'
      })
    })
}
const deleteColumn = scope => {
  if (allActivity.length > 1) {
    allActivity.splice(scope.$index, 1)
  } else {
    message('请至少保留一个活动', 'error')
  }
}
const sumbit = async formEl => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let newObject = Object.assign(
        shopInfo,
        { activities: allActivity },
        {
          category: curCategory.value.join('/')
        }
      )
      let res = await addShop(newObject)
      message('已完成商铺的添加', 'success')
      location.reload()
    } else {
      message('请填好必要信息', 'error')
    }
  })
}
</script>

<style lang="scss" scoped>
.el-table {
  :deep(.cell) {
    text-align: center;
  }
}
:deep(.el-form-item__label) {
  justify-content: center;
}
.el-switch {
  margin-right: 10px;
}
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.sumbit-button {
  :deep(.el-form-item__content) {
    margin-top: 12px;
    justify-content: center;
  }
}
</style>