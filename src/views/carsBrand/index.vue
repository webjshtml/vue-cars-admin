<template>
  <div>
    <!-- 表格数据 -->
    <TabalData ref="table" :config="table_config">
      <template v-slot:status="slotData">
        <el-switch v-model="slotData.data.status" :disabled="slotData.data.id == switch_disabled" @change="switchChange(slotData.data)" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
      </template>
       <!--操作-->
        <template v-slot:operation="slotData">
            <el-button type="danger" size="small" @click="edit(slotData.data)">编辑</el-button>
        </template>
    </TabalData>
    <AddCarsBrand :flagVisible.sync="dialog_show" :data="data_brand" @callbackComponent="callbackComponent" /><!--父组件往子组件传数据时，是一个单向数据流-->
  </div>
</template>
<script>
import TabalData from "@c/tableData";
import AddCarsBrand from "@c/dialog/addCarsBrand";
// API
import { BrandStatus } from "@/api/brand";
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
            type: "operation",
            width: 200,
            default: {
              deleteButton: true
            },
            slotName: "operation"
          }
        ],
        url: "brandList",  // 真实URL请求地址
        data: {
          pageSize: 10,
          pageNumber: 1
        },
        form_item: [
          { label: "车辆品牌", prop: "brand", type: "Input", width: '150px', options: "parking_type", placeholder: "请输入车辆品牌"  },
        ],
        form_handler: [
            { label: "新增车辆品牌", prop: "add", type: "danger", element: "button", handler: ()  => { this.dialog_show = true } },
        ],
        form_config: {
            resetButton: true
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
        brand: "",
      }
    };
  },
  methods: {
    callbackComponent(params){
      console.log(params)
      if(params.function) { this[params.function](); }
    },
    /** 搜索 */
    search(){
      const requestData = {
        pageSize: 10,
        pageNumber: 1
      }
      if(this.form.brand) { requestData.brand = this.form.brand;}
      // 调用子组件的方法
      this.$refs.table.requestData(requestData);
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