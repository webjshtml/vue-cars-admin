<template>
    <el-form inline ref="form" :model="form_data">
        <el-form-item v-for="item in formItme" :key="item.prop" :label="item.label" :prop="item.prop" :rules="item.rules">
            <!-- Input-->
            <el-input v-if="item.type === 'Input'" v-model.trim="form_data[item.prop]" :placeholder="item.placeholder" :style="{width: item.width}" :disabled="item.disabled"></el-input>
            <!-- Select-->
            <el-select filterable v-if="item.type === 'Select'" :aaaa="item.options" v-model.trim="form_data[item.prop]" :placeholder="item.placeholder" :style="{width: item.width}" :disabled="item.disabled">
                <el-option v-for="selectItem in item.options" :key="selectItem.value || selectItem[item.select_vlaue]" :value="selectItem.value || selectItem[item.select_vlaue]" :label="selectItem.label || selectItem[item.select_label]"></el-option>
            </el-select>
            <!-- city-->
            <div v-if="item.type === 'City'">
                <CityArea ref="city" :cityAreaValue.sync="city_value" /> 
            </div>
            <!-- city-->
            <div v-if="item.type === 'Keyword'">
                <KeyWord ref="keyword" :options="['address', 'parkingName']" :value.sync="keyword" />
            </div>
            <!-- slot -->
            <slot v-if="item.type === 'Slot'" :name="item.slotName" />
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
            <el-button type="danger" @click="search">搜索</el-button>
            <el-button v-for="item in formHandler" :key="item.key" :type="item.type" @click="item.handler && item.handler()">
                {{ item.label }}
            </el-button>
        </el-form-item>
    </el-form>
</template>
<script>
// 省市区
import CityArea from "@c/common/cityArea";
import KeyWord from "@c/common/keyWord";
export default {
    name: "Form",
    components: { CityArea, KeyWord },
    props: {
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
            keyword: {},
            city_value: "",
            form_data: {

            }
        }
    },
    methods: {
        /** 搜索 */
        search(){
            const searchData = {};
            // 过滤空数据
            for(let key in this.form_data) {
                if(this.form_data[key]) {
                    searchData[key] = this.form_data[key]
                }
            }
            /**  组件 */
            // 关键字
            if(this.$refs.keyword && this.keyword.key && this.keyword.value) {
                searchData[this.keyword.key]  = this.keyword.value
            }
            // 城市
            if(this.$refs.city && this.city_value) {
                searchData.area = this.city_value
            }
            this.$emit("callbackComponent", {
                function: "search",
                data: searchData
            })
        },
        initFormData(){
            this.formItme.forEach(item => {
                // 读取下拉选项的数据
                if(item.type === "Select") { this.selectOption(item); }
            })
        },
        // 字段初始化
        initFormFelid(data){
            const felid = {};
            this.formItme.forEach(item => {
                if(item.prop) {
                    felid[item.prop] = ""
                }
            })
            this.form_data = felid;
        },
        // 下拉选项
        selectOption(data){
            const options = this.$store.state.config[data.options];
            if(options) {
                data.options = options;
            }
        }
    },
    watch: {
        formItme: {
            handler(newValue){
                this.initFormData()
                this.initFormFelid();
            },
            immediate: true
        }
    }
}
</script>
<style lang="scss" scoped>

</style>