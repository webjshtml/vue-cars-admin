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
    <TabalData ref="table" :config="table_config">
      <template v-slot:status="slotData">
        <el-switch v-model="slotData.data.status" :disabled="slotData.data.id == switch_disabled" @change="switchChange(slotData.data)" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
      </template>
       <!--操作-->
        <template v-slot:operation="slotData">
            <el-button type="danger" size="small" @click="edit(slotData.data)">编辑</el-button>
            <el-button size="small" :loading="slotData.data.id == row_id" @click="delConfirm(slotData.data.id)">删除</el-button>
        </template>
    </TabalData>
    <AddCarsBrand :flagVisible.sync="dialog_show" :data="data_brand" /><!--父组件往子组件传数据时，是一个单向数据流-->
  </div>
</template>
<script>
import TabalData from "@c/tableData";
import AddCarsBrand from "@c/dialog/addCarsBrand";
// API
import { BrandDelete, BrandStatus } from "@/api/brand";
export default {
  name: "Parking",
  components: { AddCarsBrand, TabalData },
  data() {
    return {
      // 表格配置
      table_config: {
        thead: [
          { 
            label: "LOGO", 
            prop: "imgUrl",
            type: "image",
            width: 150
          },
          { 
            label: "车辆品牌",
            prop: "nameCh",
            type: "function",
            callback: (row, prop) => `${row.nameCh}/${row.nameEn}`
          },
          { 
            label: "禁启用",
            prop: "status",
            type: "slot",
            slotName: "status"
          },
          { 
            label: "操作",
            type: "slot",
            width: 200,
            slotName: "operation"
          }
        ],
        url: "brandList",  // 真实URL请求地址
        data: {
          pageSize: 10,
          pageNumber: 1
        }
      },
      // row_id
      row_id: "",
      data_brand: {},
      // switch_disabled
      switch_disabled: "",
			// 弹窗标记
			dialog_show: false,
      form: {
        parking_name: "",
        area: "",
        type: ""
      }
    };
  },
  methods: {
    /** 删除 */
    delConfirm(id){
      this.$confirm('确定删除此信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.row_id = id;
        BrandDelete({id}).then(response => {
          this.$message({
            type: 'success',
            message: response.message
          });
          this.row_id = "";
          // 调用子组件的方法
          this.$refs.table.requestData();
        }).cacth(error => {
            this.row_id = "";
        })
      }).catch(() => {});
    },
    /** 编辑 */
    edit(data){
      // this.data_brand = JSON.parse(JSON.stringify(data));
      this.data_brand = Object.assign({}, data); // Es6 浅拷贝
      this.dialog_show = true;
    },
    /** 禁启用 */
    switchChange(data){
      if(this.switch_flag) { return false; }
      const requestData = {
        id: data.id,
        status: data.status
      }
      // this.switch_flag = true;
      this.switch_disabled = data.id;  // 第一种方式：组件本身的属性处理
      BrandStatus(requestData).then(response => {
        this.$message({
            type: 'success',
            message: response.message
        });
        this.switch_disabled = "";
        // this.switch_flag = false;
      }).catch(error => {
        this.switch_disabled = "";
        // this.switch_flag = false;
      })
    },
  }
};
</script>
<style lass="scss" scoped></style>