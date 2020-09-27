<template>
    <div>
        <TabalData ref="table" :config="table_config"></TabalData>
        <LeaseType :flagVisible.sync="dialog_show" :data="current_cars_type_data" @callbackComponent="callbackComponent" />
    </div>
</template>
<script>
// 组件
import TabalData from "@c/tableData";
import LeaseType from "@c/dialog/leaseType";
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
                checkbox: false,
                pagination: false,
                thead: [
                    { label: "租车类型", prop: "carsLeaseTypeName" },
                    { 
                        label: "禁启状态", 
                        prop: "carsLeaseStatus",
                        type: "switch",
                        handler: (data) => this.leasrStatus(data)
                    },
                    { label: "车辆列表", prop: "carsList", width: 500 },
                ],
                url: "leaseList",  // 真实URL请求地址
                data: {
                    pageSize: 10,
                    pageNumber: 1
                },
                form_item: [
                    { label: "关键字",  type: "Keyword", options: ["key", "value"] },
                ],
                form_handler: [
                    { label: "新增", prop: "add", type: "success", element: "button", handler: () => this.leaseTypeAddDialog() },
                ],
                form_config: {
                    resetButton: true
                }
            },
            switch_disabled: "",
            // 车辆公用属性集合
            cars_list_basis_item: [],
            // 车辆公用属性ID
            cars_list_basis_type_id: "",
            // 弹窗标记
            dialog_show: false,
            // 当前公用属性数据
            current_cars_type_data: {}

        }
    },
    components: { TabalData, LeaseType },
    methods: {
        callbackComponent(params){
            if(params.function) { this[params.function](params.data); }
        },
        loadData(){
            this.$refs.table.requestData();
        },
        // 禁启用
        leasrStatus(data){
            console.log(data)
        },
        // 弹窗
        leaseTypeAddDialog(){
            this.dialog_show = true;
        }
    },
    
    // DOM元素渲染之前（生命周期）
    beforeMount(){
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