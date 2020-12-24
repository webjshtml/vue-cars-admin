<template>
    <div class="parking-add">
        <VueForm ref="vuForm" :formData="form_data" :formItme="form_item" :formHandler="form_handler" labelWidth="150px"></VueForm>
    </div>
</template>
<script>
import VueForm from "@c/form";
// API
import { Detailed, Edit } from "@/api/member";
// utils - format
import { formatRequestData } from "@/utils/format";
export default {
    name: "MemberInfo",
    data() {
      return {
        // 表单数据配置
        id: this.$route.query.id,
        form_data: { // 指定对象里面的所以 key 
            username: "",
            truename: "",
            cardId: "",
            gender: "",
            illegalAmount: "",
            cardPhotoFace: "",
            cardPhotoBack: "",
            cardPhotoBareheaded: "",
            carsPhotoFace: "",
            carsPhotoBack: "",
            blacklist: ""
        },
        // 表单配置
        form_item: [
            { 
                type: "Input", 
                label: "用户名", 
                placeholder: "请输入用户名",
                prop: "username", 
                required: true,
                width: "200px"
            },
            { 
                type: "Input", 
                label: "真实姓名", 
                placeholder: "请输入真实姓名", 
                prop: "truename",
                required: true
            },
            { 
                type: "Input", 
                label: "身份证", 
                placeholder: "请输入身份证", 
                prop: "cardId",
                required: true
            },
            { 
                type: "Radio", 
                label: "性别", 
                prop: "gender",
                options: this.$store.state.config.gender,
                required: true
            },
             { 
                type: "InputNumber", 
                label: "违章预存金", 
                prop: "illegalAmount",
                required: true
            },
            { 
                type: "Upload", 
                label: "身份证（正面）", 
                prop: "cardPhotoFace",
                required: true,
                requestFlag: true
            },
            { 
                type: "Upload", 
                label: "身份证（反面）", 
                prop: "cardPhotoBack",
                required: true
            },
            { 
                type: "Upload", 
                label: "身份证（免冠）", 
                prop: "cardPhotoBareheaded",
                required: true
            },
            { 
                type: "Upload", 
                label: "驾驶证（正面）", 
                prop: "carsPhotoFace",
                required: true
            },
            { 
                type: "Upload", 
                label: "驾驶证（反面）", 
                prop: "carsPhotoBack",
                required: true
            },
            { 
                type: "Radio", 
                label: "黑名单", 
                prop: "blacklist",
                options: this.$store.state.config.blacklist,
                required: true
            },
        ],
        form_handler: [
            { label: "确定", key: "submit",  type: "danger", handler: () => this.formValidate() },
            { label: "重置", key: "reset" },
        ],
        // 按钮加载
        button_loading: false
      }
    },
    components: { VueForm },
    beforeMount(){
        this.id && this.detailed();
    },
    mounted(){},
    methods: {
        detailed(){
            Detailed({ id: this.id }).then(response => {
                const data = formatRequestData(this.form_data, response.data);
                this.form_data = data;
            })
        },
        /** 提交表单 */
        formValidate(){
            this.$refs.vuForm.$refs.form.validate((valid) => {
                if (valid) {
                    this.id && this.editMember()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 编辑
        editMember(){
            // ...扩展
            Edit({...this.form_data, id:this.id}).then(response => {
                this.$message({
                    message: response.message,
                    type: "success"
                })
                this.$router.go(-1);
            })
        },
        callbackComponent(params){
            if(params.function) { this[params.function](params.data);  }
        },
    }
}
</script>
<style lass="scss" scoped>
.address-map {
    width: 100%;
    height: 500px;
}
</style>