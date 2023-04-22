<template>
  <el-main>
    <div v-if="tableData">
      <Table :tableData="tableData" :label="label" :label2="label2" :type="type">
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </Table>
      <div v-if="paginationValue.total" class="pagination">
        <Paginaton v-bind="paginationValue" @changeValue='changeValue'></Paginaton>
      </div>
      <el-dialog v-model="dialogFormVisible" title="修改店铺信息">
        <el-form :model="curRow">
          <el-form-item label="食品名称" label-width="100px">
            <el-input v-model="curRow.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="食品介绍" label-width="100px">
            <el-input v-model="curRow.description"></el-input>
          </el-form-item>
          <el-form-item label="食品图片" label-width="100px">
            <el-upload class="avatar-uploader" :action="baseURL + 'v1/addimg/food'" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="curImg" :src="curImg" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="shopUpdate">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </el-main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { getFoodCount, getFoodsList, updateFood } from 'a/getData'
import { baseURL } from '~/utils/request'
import { message } from '~/utils/message'
const tableData = ref([])
let total = ref()
let pageSize = ref(20)
let curPage = ref(1)
const type = 'expand'
const baseImgPath = 'https://elm.cangdu.org/img/'
const curRow = ref({})
const formLabelWidth = '140px'
const curImg = ref()
const label = ['食品名称', '食品 ID', '餐馆 ID', '食品介绍', '食品评分', '月销量']
const label2 = [
  { label: '食品名称', prop: 'name' },
  { label: '食品介绍', prop: 'description' },
  { label: '食品评分', prop: 'rating' }
]
let paginationValue = reactive({
  curPage: curPage.value,
  pageSize: pageSize.value,
  total: total.value
})
let dialogFormVisible = ref(false)
const props = {
  expandTrigger: 'hover'
}
const getFood = async () => {
  let res = await getFoodsList({
    offset: 0,
    limit: 20
  })
  tableData.value = res

}
getFood()
const resCount = async () => {
  let { count } = await getFoodCount()
  paginationValue.total = count
}
resCount()
const changeValue = async e => {
  paginationValue.curPage = e
  let offset = (paginationValue.curPage - 1) * paginationValue.pageSize
  let res = await getFoodsList({
    offset,
    limit: paginationValue.pageSize
  })
  tableData.value = res

}
const handleEdit = (i, row) => {
  curRow.value = row
  dialogFormVisible.value = true
  curImg.value = baseImgPath + curRow.value.image_path
}
const handleAvatarSuccess = (res, file) => {
  curImg.value = baseImgPath + res.image_path
}
const beforeAvatarUpload = () => {}
const shopUpdate = async () => {
  let { name, item_id, description, image_path, restaurant_id, specfoods, category_id } = curRow.value
  const newDate = {
    item_id,
    name,
    description,
    image_path,
    restaurant_id,
    category_id,
    specfoods,
    specs: [{ specs: '默认', packing_fee: 0, price: 20 }]
  }
  const res = await updateFood(newDate)
  dialogFormVisible.value = false
}
</script>

<style lang="scss" scoped>
.el-button {
  margin: 3px;
}
.demo-form-inline {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  color: rgba(29, 29, 209, 0.635);
  font-weight: bold;
  background-color: rgba(251, 253, 255);
  .el-form-item {
    width: 35%;
  }
}
.el-table {
  :deep(.cell) {
    text-align: center;
  }
}
.avatar-uploader .el-upload {
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
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>