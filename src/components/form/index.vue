<template>
    <el-form ref="form" :model="form" :label-width="labelWidth">
        <el-form-item v-for="item in formItme" :key="item.prop" :label="item.label" :prop="item.prop" :rules="item.rules">
            <!-- Input-->
            <el-input v-if="item.type === 'Input'" v-model.trim="form[item.prop]" :placeholder="item.placeholder" :style="{width: item.width}" :disabled="item.disabled"></el-input>
            <!-- 省市区 -->
            <slot v-if="item.type === 'Slot'" :name="item.slotName" />
            <!-- 省市区 -->
            <el-radio-group v-if="item.type === 'Radio'" v-model="form[item.prop]">
                <el-radio v-for="radio in item.options" :label="radio.value" :key="radio.value">{{ radio.label }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
            <el-button v-for="item in formHandler" :key="item.key" :type="item.type" @click="item.handler && item.handler()">
                {{ item.label }}
            </el-button>
        </el-form-item>
    </el-form>
</template>
<script>
// 省市区
import CityArea from "@c/common/cityArea";
export default {
    name: "Form",
    components: { CityArea },
    props: {
        labelWidth: {
            type: String,
            default: "120px"
        },
        formItme: {
            type: Array,
            default: () => []
        },
        // 按钮
        formHandler: {
            type: Array,
            default: () => []
        }
    },
    data(){
        return {
            form: {},
            type_msg: {
                "Input": "请输入",
                "Radio": "请选择"
            }
        }
    },
    methods: {
        initFormData(){
            const formData = {};
            this.formItme.forEach(item => {
                if(item.prop) { formData[item.prop] = item.value || null; }
                // rules 规则
                if(item.required) { this.rules(item); }
                // 自定义检验规则
                if(item.validator) { item.rules = item.validator; }
            })
            this.form = formData;
        },
        rules(item){
            const requiredRules = [{ required: true, message: item.required_msg || `${this.type_msg[item.type]}${item.label}`, trigger: 'change' }];
            // 其他的 rules 规则 
            if(item.rules && item.rules.length > 0) {
                item.rules = requiredRules.concat(item.rules);
            }else{
                item.rules = requiredRules;
            }
        }
    },
    watch: {
        formItme: {
            handler(newValue){
                this.initFormData()
            },
            immediate: true
        }
    }
}
</script>
<style lang="scss" scoped>

</style>