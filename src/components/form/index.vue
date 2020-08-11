<template>
    <el-form ref="form" :model="formData" :label-width="labelWidth">
        <el-form-item v-for="item in formItme" :key="item.prop" :label="item.label" :prop="item.prop" :rules="item.rules">
            <!-- Input-->
            <el-input v-if="item.type === 'Input'" v-model.trim="formData[item.prop]" :placeholder="item.placeholder" :style="{width: item.width}" :disabled="item.disabled"></el-input>
            <!-- Select-->
            <el-select filterable v-if="item.type === 'Select'" :aaaa="item.options" v-model.trim="formData[item.prop]" :placeholder="item.placeholder" :style="{width: item.width}" :disabled="item.disabled">
                <el-option v-for="selectItem in item.options" :key="selectItem.value || selectItem[item.select_vlaue]" :value="selectItem.value || selectItem[item.select_vlaue]" :label="selectItem.label || selectItem[item.select_label]"></el-option>
            </el-select>
            <!-- 禁启用 -->
            <el-radio-group v-if="item.type === 'Disabled'" v-model="formData[item.prop]">
                <el-radio v-for="radio in radio_disabled" :label="radio.value" :key="radio.value">{{ radio.label }}</el-radio>
            </el-radio-group>
            <!-- 省市区 -->
            <slot v-if="item.type === 'Slot'" :name="item.slotName" />
            <!-- 省市区 -->
            <el-radio-group v-if="item.type === 'Radio'" v-model="formData[item.prop]">
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
        formData: {
            type: Object,
            default: () => {}
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
            // 禁启用数据 
            radio_disabled: this.$store.state.config.radio_disabled,
            type_msg: {
                "Input": "请输入",
                "Radio": "请选择",
                "Select": "请选择"
            }
        }
    },
    methods: {
        initFormData(){
            this.formItme.forEach(item => {
                // rules 规则
                if(item.required) { this.rules(item); }
                // 自定义检验规则
                if(item.validator) { item.rules = item.validator; }
            })
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