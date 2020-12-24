<template>
    <div>
        <TabalData ref="table" :config="table_config"></TabalData>
        <LeaseType :flagVisible.sync="dialog_show" :data="current_cars_lease_data" @callbackComponent="callbackComponent" />
    </div>
</template>
<script>
// 组件
import TabalData from "@c/tableData";
import LeaseType from "@c/dialog/leaseType";
// API
import { LeaseStatus } from "@/api/lease";
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
                        handler: (value, data) => this.leasrStatus(value, data)
                    },
                    { label: "车辆列表", prop: "carsList", width: 500 },
                    { 
                        label: "操作", 
                        type: "operation",
                        width: 500,
                        buttonGroup: [
                            { label: "编辑", type: "danger", event: "button", handler: (data) => this.edit(data) }
                        ]
                    },
                ],
                url: "leaseList",  // 真实URL请求地址
                data: {
                    pageSize: 10,
                    pageNumber: 1
                },
                form_item: [
                    { label: "关键字",  type: "Keyword", options: ["carsLeaseTypeName", "carsNumber"] },
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
            current_cars_lease_data: {}

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
        leasrStatus(value, data){
            LeaseStatus({id: data.carsLeaseTypeId, status: value}).then(response => {
                this.$message({
                    message: response.message,
                    type: "success"
                })
            }).catch(error => {
                data.carsLeaseStatus = !value
            })
        },
        edit(data){  // 获取的 data 是 JSON 对象
            const copyData = Object.assign({}, data);
            this.current_cars_lease_data = copyData;   // 引用类型
            this.dialog_show = true;
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