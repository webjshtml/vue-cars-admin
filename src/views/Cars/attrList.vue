<template>
    <div>
        <TabalData ref="table" :config="table_config">
            <!--禁启用-->
            <template v-slot:status="slotData">
                <el-switch :disabled="slotData.data.id == switch_disabled" @change="switchChange(slotData.data)" v-model="slotData.data.status" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
            </template>
            <!--禁启用-->
            <template v-slot:content>
                <div class="margin-bottom-25">
                    <el-button :type="carsListBasisTypeId == item.id ? 'danger' : ''" size="small" :a="item.id" v-for="item in carsListBasisItem" :key="item.id" @click="getTypeList(item.id)"> {{ item.value }} </el-button>
                </div>
            </template>
        </TabalData>
    </div>
</template>
<script>
// 组件
import TabalData from "@c/tableData";
// API
import { GetCarsTypeBasis, GetCarsTypeList } from "@/api/carsAttr";
// common
import { address, yearCheckType, energyType } from "@/utils/common";
export default {
    name: "Cars",
    data(){
        return {
            // 表格配置
            table_config:{
                isRequest: false,
                checkbox: false,
                thead: [
                    { label: "字段", prop: "key" },
                    { label: "文本", prop: "value" }
                ],
                url: "carsList",  // 真实URL请求地址
                data: {
                    pageSize: 10,
                    pageNumber: 1
                },
                form_item: [
                    { label: "关键字",  type: "Keyword", options: ["key", "value"] },
                ],
                form_handler: [
                    { label: "新增", prop: "add", type: "success", element: "link", router: "/carsAdd" },
                ],
                form_config: {
                    resetButton: true
                }
            },
            switch_disabled: "",
            // 车辆公用属性集合
            carsListBasisItem: [],
            // 车辆公用属性ID
            carsListBasisTypeId: "",
        }
    },
    components: { TabalData },
    methods: {
        callbackComponent(params){
            if(params.function) { this[params.function](params.data); }
        },
        // 自定义属性列表
        getTypeList(id){
            this.carsListBasisTypeId = id;
            this.getCarsTypeList();
        },
        // 获取车辆公用属性
        getCarsTypeBasis(){
            GetCarsTypeBasis().then(response => {
                this.carsListBasisItem = response.data.data;
            })
        },
        // 获取车辆自定义属性
        getCarsTypeList(){
            GetCarsTypeList({typeId: this.carsListBasisTypeId}).then(response => {
                console.log(response)
            })
        }
        
    },
    
    // DOM元素渲染之前（生命周期）
    beforeMount(){
        this.getCarsTypeBasis();
    },
    // DOM元素渲染完成（生命周期）
    mounted(){},
}

</script>
<style lass="scss" scoped></style>

<!--
1、第一个是异步问题，需要等公用属性列表加载完成再请求列表，
2、初始化页面不加载列表。

-->