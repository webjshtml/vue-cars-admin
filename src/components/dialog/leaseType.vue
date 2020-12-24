<template>
  <!--dialog 弹窗
    子组件接收父组件的数据，是通过属性接收
  -->
  <el-dialog title="新增租车类型" width="30%" :visible.sync="dialogVisible" class="cars-dialog-center" @close="close" @opened="opened" :close-on-click-modal="false">
    <VueForm ref="formVue" :formData="form_data" :formItme="form_item" :formHandler="form_handler"></VueForm>
  </el-dialog>
</template>

<script>
// 组件
import VueForm from "@c/form";
// API
import { LeaseAdd, LeaseEdit } from "@/api/lease";
export default {
  name: "",
  components: { VueForm },
  props: {
    flagVisible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      defult: () => {}
    }
  },
  data() {
    return {
      // 弹窗显示/关闭标记
      dialogVisible: false,
      // 表单数据
      form_data: {
        carsLeaseTypeName: "",
        carsLeaseStatus: "",
        carsLeaseDesc: ""
      },
      // 表单项
      form_item: [
        { type: "Input", label: "租车类型", prop: "carsLeaseTypeName", required: true },
        { type: "Disabled", label: "禁/启状态", prop: "carsLeaseStatus", required: true },
        { type: "Textarea", label: "描述", prop: "carsLeaseDesc" },
      ],
      // 表单按钮
      form_handler: [
        { label: "确定", key: "submit",  type: "danger", handler: () => this.submit() }
      ],
      // 状态
      radio_disabled: this.$store.state.config.radio_disabled,
      // 选中的LOGO
      logo_current: "",
      // logo
      logo: []
    };
  },
  methods: {
    opened(){},
    /** 提交 */
    submit(){
      this.$refs.formVue.$refs.form.validate((valid) => {
        if (valid) {
          this.form_data.carsLeaseTypeId ? this.edit() : this.add();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    add(){
      LeaseAdd({...this.form_data}).then(response => {  // 扩展指定对象的所有 key 
        this.$message({
          message: response.message,
          type: "success"
        })
        this.$store.commit("common/SET_TABL_DATA_FLAG");
        // this.$emit("callbackComponent", {
        //     function: "loadData"
        // })
        this.reset()
      })
    },
    edit(){
      LeaseEdit({...this.form_data}).then(response => {  // 扩展指定对象的所有 key 
        this.$message({
          message: response.message,
          type: "success"
        })
        this.$store.commit("common/SET_TABL_DATA_FLAG");
        // this.$emit("callbackComponent", {
        //     function: "loadData"
        // })
        this.close()
      })
    },
    /** 重置表单 */
    reset(formName){
      this.$refs.formVue.resetForm();
    },
    close() {
      this.reset("form");
      // 关闭窗口
      this.dialogVisible = false;
      // 删除ID
      delete this.form_data.carsLeaseTypeId;
      this.$emit("update:flagVisible", false); // {}
    }
  },
  watch: {
    flagVisible: {
      handler(newValue, oldValue) {
        this.dialogVisible = newValue;
      }
    },
    data: {
      handler(newValue) {
        console.log(2222)
        this.form_data = newValue;
        /** 两个 bug */
      }
    }
  }
};
</script>
<style lang='scss' scoped>
</style>