<template>
  <el-table :data="tableData" style="width: 100%" height="80vh">
    <el-table-column :type="type">
      <template #default="props" v-if="type==='expand'">
        <el-form :inline=" true" class="demo-form-inline" label-position="left" v-if="label.length===8">
          <el-form-item :label="label[0]">
            {{props.row.name}}
          </el-form-item>
          <el-form-item :label="label[1]">
            {{props.row.address}}
          </el-form-item>
          <el-form-item :label="label[2]">
            {{props.row.description}}
          </el-form-item>
          <el-form-item :label="label[3]">
            {{props.row.id}}
          </el-form-item>
          <el-form-item :label="label[4]">
            {{props.row.phone}}
          </el-form-item>
          <el-form-item :label="label[5]">
            {{props.row.rating}}
          </el-form-item>
          <el-form-item :label="label[6]">
            {{props.row.recent_order_num}}
          </el-form-item>
          <el-form-item :label="label[7]">
            {{props.row.category}}
          </el-form-item>
        </el-form>
        <el-form :inline="true" class="demo-form-inline" label-position="left" v-else-if="label.length===6">
          <el-form-item :label="label[0]">
            {{props.row.name}}
          </el-form-item>
          <el-form-item :label="label[1]">
            {{props.row.item_id}}
          </el-form-item>
          <el-form-item :label="label[2]">
            {{props.row.restaurant_id}}
          </el-form-item>
          <el-form-item :label="label[3]">
            {{props.row.description}}
          </el-form-item>
          <el-form-item :label="label[4]">
            {{props.row.rating}}
          </el-form-item>
          <el-form-item :label="label[5]">
            {{props.row.rating_count}}
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column v-for="item,i in label2" :key="i" :label="item.label" :prop="item.prop" />
    <slot></slot>
  </el-table>
</template>

<script setup>
const props = defineProps({
  label: Array,
  label2: Array,
  tableData: Array,
  type: String
})
</script>

<style lang="scss">
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
</style>