<template>
  <el-main>
    <div v-if="categoryForm.categoryList!==[]" class="category-container">
      <el-row>
        <el-col :span="14" :offset="5">
          <div class="container">
            <header class="header">选择/添加食品种类</header>
            <el-form label-width="80px" :model="categoryForm">
              <el-form-item label="食物种类">
                <el-select v-model="categoryForm.curCategory" placeholder="请选择分类" style="width:100%;" :disabled="isDisabled">
                  <el-option v-for="item,i in categoryForm.categoryList" :key="i" :label="item.name" :value="i" />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="anime container" :class="showButton?'add':''">
            <el-form :model="categoryForm" label-width="80px">
              <el-form-item label="食品种类">
                <el-input v-model="categoryForm.name" />
              </el-form-item>
            </el-form>
            <el-form :model="categoryForm" label-width="80px">
              <el-form-item label="食品描述">
                <el-input v-model="categoryForm.description" />
              </el-form-item>
            </el-form>
            <el-form-item>
              <el-button type="primary" class="sumbit" @click="addCategory">提交</el-button>
            </el-form-item>
          </div>
          <div class="category-button" @click="addFoods">
            <el-icon v-if="!showButton">
              <ArrowDown />
            </el-icon>
            <el-icon v-else>
              <ArrowUp />
            </el-icon>
            <span>添加食品种类</span>
          </div>
        </el-col>
        <el-col :span="14" :offset="5">
          <div class="container">
            <header class="header">添加食品</header>
            <el-form label-width="80px" :model="categoryForm">
              <el-form-item label="食物名称">
                <el-input v-model="foodList.name" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="食物描述">
                <el-input v-model="foodList.description" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="食物活动">
                <el-input v-model="foodList.activity" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="食品图片">
                <el-upload class="avatar-uploader" :action="action" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="foodList.image_path" :src="baseImgPath + foodList.image_path" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                  </el-icon>
                </el-upload>
              </el-form-item>
              <el-form-item label="食品特点">
                <el-select v-model="foodList.attributes" multiple placeholder="请选择">
                  <el-option v-for="item,i in attributes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="食品规格">
                <el-radio-group v-model="specs">
                  <el-radio label="one">单规格</el-radio>
                  <el-radio label="more">多规格</el-radio>
                </el-radio-group>
              </el-form-item>
              <div v-if="specs==='one'">
                <el-form-item label="包装费用">
                  <el-input-number v-model="specsForm.packing_fee" :min="0" :max="10000" />
                </el-form-item>
                <el-form-item label="食品价格">
                  <el-input-number v-model="specsForm.price" :min="0" :max="10000" />
                </el-form-item>
              </div>
              <div v-else>
                <el-table :data="foodList.specs" style="width: 100%">
                  <el-table-column prop="specs" label="规格" />
                  <el-table-column prop="packing_fee" label="包装费" />
                  <el-table-column prop="price" label="价格" />
                  <el-table-column fixed="right" label="操作" width="120">
                    <template #default="scope">
                      <el-button type="danger" size="small" @click="deleteColumn(scope)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-button type="primary" @click="dialogFormVisible = true" style="margin:10px 40%;">添加规格</el-button>
              </div>
            </el-form>
            <el-dialog v-model="dialogFormVisible" title="添加食品规格">
              <el-form :model="specsForm">
                <el-form-item label="食品规格">
                  <el-input v-model="specsForm.specs" />
                </el-form-item>
                <el-form-item label="包装费用">
                  <el-input-number v-model="specsForm.packing_fee" :min="0" :max="10000" />
                </el-form-item>
                <el-form-item label="食品价格">
                  <el-input-number v-model="specsForm.price" :min="0" :max="10000" />
                </el-form-item>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取消</el-button>
                  <el-button type="primary" @click="addSpecs">
                    确认
                  </el-button>
                </span>
              </template>
            </el-dialog>
            <el-button type="primary" style="margin:10px 45%;" @click="addFood">提交</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getFoodsCategory, addFoodsCategory, addFoodsInfo } from 'a/getData'
import { baseURL, baseImgPath } from '~/utils/request'
import { message } from '~/utils/message'

let isDisabled = ref(false)
let dialogFormVisible = ref(false)
const action = ref(baseURL + 'v1/addimg/food')
const router = useRouter()
const categoryForm = reactive({
  categoryList: [],
  name: '',
  description: '',
  curCategory: ''
})
const specsForm = reactive({
  specs: '',
  packing_fee: 0,
  price: 20
})
const foodList = reactive({
  name: '',
  description: '',
  image_path: '',
  activity: '',
  attributes: [],
  specs: [
    {
      specs: '默认',
      packing_fee: 0,
      price: 20
    }
  ]
})
const attributes = reactive([
  {
    value: '新',
    label: '新品'
  },
  {
    value: '招牌',
    label: '招牌'
  }
])
const showButton = ref(false)
const specs = ref('one')
const category = async () => {
  let { restaurant_id } = router.currentRoute.value.query
  if (restaurant_id) {
    let res = await getFoodsCategory(restaurant_id)
    categoryForm.categoryList = res.category_list
  } else {
    alert('请先选择要添加食品的商家')
    router.push({
      path: '/shopList'
    })
  }
}
category()
const addFoods = () => {
  showButton.value = !showButton.value
  isDisabled.value = !isDisabled.value
}
const handleAvatarSuccess = res => {
  if (res.status === 1) {
    foodList.image_path = res.image_path
  }
}
const beforeAvatarUpload = () => {}
const deleteColumn = row => {
  if (foodList.specs.length > 1) {
    foodList.specs.splice(row.$index, 1)
  } else {
    message('请至少保留一个规格', 'error')
  }
}
const addSpecs = () => {
  foodList.specs.push({ ...specsForm })
  specsForm.specs = ''
  specsForm.packing_fee = 0
  specsForm.price = 20
  dialogFormVisible.value = false
}
const addCategory = async () => {
  let { restaurant_id } = router.currentRoute.value.query
  const res = await addFoodsCategory({
    name: categoryForm.name,
    description: categoryForm.description,
    restaurant_id
  })
  if (res.status === 1) {
    message('提交成功', 'success')
    location.reload()
  }else {
    message(res.message,'error')
  }
}
const addFood = async () => {
  let { restaurant_id, id: category_id } = categoryForm.categoryList[categoryForm.curCategory]
  const data = {
    ...foodList,
    restaurant_id,
    category_id
  }
  try {
    const res = await addFoodsInfo(data)
    if (res.status === 1) {
      message('添加食品成功', 'success')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss" scoped>
.category-container {
  .header {
    text-align: center;
    margin-bottom: 10px;
  }
  .anime {
    height: 0;
    visibility: hidden;
    opacity: 0;
    transition: all 0.5s;
  }
  .add {
    height: 150px;
    opacity: 1;
    visibility: visible;
    transition: all 0.5s;
  }
  .sumbit {
    margin: 0 auto;
  }
  .category-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    &:hover {
      color: blue;
      cursor: pointer;
    }
  }
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.container {
  border: 1px solid #eaeefb;
  border-radius: 8px;
  padding: 10px 20px 0px 20px;
  &:hover {
    box-shadow: 0 0 3px 0 rgb(198, 196, 196);
  }
}
.el-table {
  :deep(.cell) {
    text-align: center;
  }
}
:deep(.el-form-item__label) {
  justify-content: flex-start;
}
:deep(.el-dialog__header) {
  text-align: center;
}
</style>