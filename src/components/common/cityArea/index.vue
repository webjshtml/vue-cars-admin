<template>
    <el-cascader v-model="value" :options="cascader_options" :props="cascader_props" @change="changeValue"></el-cascader>
</template>

<script>
// API
import { GetCity } from "@/api/common"
export default {
   name: '',
   data(){
       return {
           value: "",
           cascader_options: [],
            cascader_props: {
                lazy: true,
                lazyLoad (node, resolve) {
                    const level = node.level;
                    // 请求参数
                    const requestData = {};
                    // 省份
                    if(level === 0) {
                        requestData.type = "province";
                    }
                    // 城市
                    if(level === 1) {
                        requestData.type = "city";
                        requestData.province_code = node.value;
                    }
                    // 城市
                    if(level === 2) {
                        requestData.type = "area";
                        requestData.city_code = node.value;
                    }
                    // 省市区的接口
                    GetCity(requestData).then(resonse => {
                        const data = resonse.data.data;
                        if(level ===0) {
                            data.forEach(item => {
                                item.value = item.PROVINCE_CODE;
                                item.label = item.PROVINCE_NAME;
                            })
                        }
                        if(level === 1) {
                            data.forEach(item => {
                                item.value = item.CITY_CODE;
                                item.label = item.CITY_NAME;
                            })
                        }
                        if(level === 2) {
                            data.forEach(item => {
                                item.value = item.AREA_CODE;
                                item.label = item.AREA_NAME;
                                item.leaf = level >= 2;
                            })
                        }
                        // 返回节点数据
                        resolve(data);
                    })
                }
            }
       }
   },
   methods: {
       changeValue(value){
           this.$emit("update:cityAreaValue", value.join());
       }
   },
   components: {},
   props: {
       cityAreaValue: {
           type: String,
           default: ""
       }
   },
   
}
</script>
<style lang='scss' scoped>
</style>
<!--
1、组件传入的属性用 props 接收；
2、this.$emit("update")返向修改，结合组件属性的.sync。
-->