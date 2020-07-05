<template>
  <div>
    <div class="filter-form">
      <el-row>
        <el-col :span="18">
          <el-form :inline="true" :model="form" class="demo-form-inline" label-width="100px">
            <el-form-item label="车辆品牌：">
              <el-select v-model="form.type" placeholder="选择品牌">
                <el-option label="福特" value="shanghai"></el-option>
                <el-option label="红旗" value="shanghai"></el-option>
                <el-option label="奔驰" value="shanghai"></el-option>
                <el-option label="宝马" value="shanghai"></el-option>
                <el-option label="五菱宏光" value="shanghai"></el-option>
                <el-option label="林肯" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品牌型号：">
              <el-input v-model="form.parking_name" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <div class="pull-right">
            <el-button type="danger" @click="dialog_show = true">新增车辆品牌</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 表格数据 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column prop="name" label="LOGO"></el-table-column>
      <el-table-column prop="type" label="车辆品牌"></el-table-column>
      <el-table-column prop="area" label="品牌型号"></el-table-column>
      <el-table-column prop="disabled" label="禁启用">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.disabled" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small">编辑</el-button>
          <el-button size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddCarsBrand :flagVisible.sync="dialog_show" /><!--父组件往子组件传数据时，是一个单向数据流-->
  </div>
</template>
<script>
import AddCarsBrand from "@c/dialog/addCarsBrand";
export default {
  name: "Parking",
  components: { AddCarsBrand },
  data() {
    return {
			// 弹窗标记
			dialog_show: false,
      form: {
        parking_name: "",
        area: "",
        type: ""
      },
      tableData: [
        {
          name: "南山停车场",
          type: "室外",
          area: "广东省 深圳市 南山区",
          carsNumber: 20,
          disabled: 0,
          address: "45632121,54541"
        }
      ]
    };
  }
};
</script>
<style lass="scss" scoped></style>