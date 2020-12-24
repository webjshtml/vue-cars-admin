<template>
  <div>
    <!-- 表格数据 -->
    <TabalData ref="table" :config="table_config">
      <template v-slot:realPhoto="slotData">
        <img :src="realPhoto" alt="" class="real-photo" @click="showPhoto(slotData)">
      </template>
    </TabalData>
    <RealPhoto :flagVisible.sync="dialog_show" :data="data_photo" :title="title" @callbackComponent="callbackComponent" /><!--父组件往子组件传数据时，是一个单向数据流-->
  </div>
</template>
<script>
import TabalData from "@c/tableData";
import RealPhoto from "@c/dialog/realPhoto";
// API
import { UpdateRealName, Blacklist, Photo, AmountClear } from "@/api/member";
export default {
  name: "Parking",
  components: { RealPhoto, TabalData },
  data() {
    return {
      realPhoto: require("@/assets/logo.png"),
      // 弹窗的标题
      title: "",
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
            label: "押金",
            prop: "gilding"
          },
          { 
            label: "余额",
            prop: "amount"
          },
          { 
            label: "实名认证",
            prop: "check_real_name",
            type: "switch",
            slotName: "realPhoto",
            handler: (status, data) => this.updateReal(status, data, "identity")
          },
          { 
            label: "驾驶证",
            prop: "check_cars",
            type: "switch",
            slotName: "realPhoto",
            handler: (status, data) => this.updateReal(status, data, "drive")
          },
          { 
            label: "黑名单",
            prop: "blacklist",
            type: "switch",
            handler: (status, data) => this.updateBlacklist(status, data)
          },
          { 
            label: "操作",
            type: "operation",
            width: 300,
            buttonGroup: [
              { event: "link", label: "详情", type: "primary", name: "MemberDetailed", key: "id", value: "memberId" },
              { event: "link", label: "编辑", type: "primary", name: "MemberInfo", key: "id", value: "memberId" },
              { event: "button", label: "金额清空", type: "", handler: (data) => this.amountClear(data) },
            ],
            default: {
              deleteButton: true,
              deleteKey: "memberId"
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
      data_photo: {},
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
    /** 修改实名认证 */
    updateReal(status, data, type){
      const requestData = {
        status,
        id: data.memberId,
        type
      }
      UpdateRealName(requestData).then(response => {
        const data = response;
        this.$message({
          message: response.message,
          type: "success"
        })
      })
    },
    /** 黑名单 */
    updateBlacklist(status, data){
      const requestData = {
        status,
        id: data.memberId
      }
      Blacklist(requestData).then(response => {
        const data = response;
        this.$message({
          message: response.message,
          type: "success"
        })
      })
    },
    /** 图片 */
    showPhoto(data){
      const type = data.type;
      // 更新弹窗标题
      this.title = type === "check_cars" ? "驾驶证" : "实名认证";
      // 接口
      const requestData = {
        id: data.data.memberId,
        type: type === "check_cars" ? "drive" : "identity"
      }
      Photo(requestData).then(response => {
        const data = response.data
        if(data) {
          this.data_photo = data;
          this.dialog_show = true;
        }
      })
      
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
    /** 清空金额 */
    amountClear(data){
      AmountClear({member_id : data.memberId})
    }
  }
};
</script>
<style lass="scss" scoped>
.real-photo {
  display: inline;
  width: 30px;
  margin-left: 5px;
  vertical-align: middle;
  cursor: pointer;
}
</style>