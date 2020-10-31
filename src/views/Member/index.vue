<template>
  <div>
    <!-- 表格数据 -->
    <TabalData ref="table" :config="table_config">
       <!--操作-->
      <template v-slot:operation="slotData">
          <el-button type="danger" size="small" :disabled="!slotData.data.blacklist">黑名单</el-button>
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
            label: "用户名", 
            prop: "username",
            width: 150
          },
          { 
            label: "真实姓名",
            prop: "truename",
            width: 150
          },
          { 
            label: "租车订单",
            prop: "order",
            width: 150
          },
          { 
            label: "违章预存金",
            prop: "illegalAmount",
            width: 200
          },
          { 
            label: "实名认证",
            prop: "check_real_name",
            type: "function",
            callback: (row) => {
              return row.check_real_name ? "已认证" : "-"
            }
          },
          { 
            label: "驾驶证",
            prop: "check_cars",
            type: "function",
            callback: (row) => {
              return row.check_cars ? "已认证" : "-"
            }
          },
          { 
            label: "黑名单",
            prop: "blacklist",
            type: "function",
            callback: (row) => {
              return row.blacklist ? "是" : "-"
            }
          },
          { 
            label: "操作",
            type: "operation",
            width: 300,
            buttonGroup: [
              { event: "link", label: "详情", type: "primary", name: "MemberDetailed", key: "id", value: "memberId" },
              { event: "link", label: "编辑", type: "primary", name: "MemberInfo", key: "id", value: "memberId" },
            ],
            default: {
              deleteButton: true
            },
            slotName: "operation"
          }
        ],
        url: "memberList",  // 真实URL请求地址
        data: {
          pageSize: 10,
          pageNumber: 1
        },
        form_item: [
            { label: "关键字",  type: "Keyword", options: ["username", "truename", "card_id"] },
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
    }
  }
};
</script>
<style lass="scss" scoped></style>