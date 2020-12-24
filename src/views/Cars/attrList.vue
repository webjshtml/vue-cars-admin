<template>
    <div>
        <TabalData ref="table" :config="table_config">
            <!--车辆公共属性-->
            <template v-slot:content>
                <div class="margin-bottom-25">
                    <el-button :type="cars_list_basis_type_id == item.id ? 'danger' : ''" size="small" :a="item.id" v-for="item in cars_list_basis_item" :key="item.id" @click="getTypeList(item)"> {{ item.value }} </el-button>
                </div>
            </template>
        </TabalData>
        <AddCarsAttr :flagVisible.sync="dialog_show" :data="current_cars_type_data" />
    </div>
</template>
<script>
// 组件
import TabalData from "@c/tableData";
import AddCarsAttr from "@c/dialog/addCarsAttr";
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
                pagination: false,
                thead: [
                    { label: "文本", prop: "value" },
                    { label: "字段", prop: "key" }
                ],
                url: "carsAttrList",  // 真实URL请求地址
                data: {
                    pageSize: 10,
                    pageNumber: 1
                },
                form_item: [
                    { label: "关键字",  type: "Keyword", options: ["key", "value"] },
                ],
                form_handler: [
                    { label: "新增", prop: "add", type: "success", element: "button", handler: () => this.carsTypeAddDialog() },
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
    components: { TabalData, AddCarsAttr },
    methods: {
        callbackComponent(params){
            if(params.function) { this[params.function](params.data); }
        },
        // 自定义属性列表
        getTypeList(data){
            this.cars_list_basis_type_id = data.id;
            // 存储当前数据
            this.current_cars_type_data = data;
            this.getCarsTypeList();
        },
        // 获取车辆公用属性
        getCarsTypeBasis(){
            return GetCarsTypeBasis().then(response => {
                const data = response.data.data;
                this.cars_list_basis_item = data;
                return data;
                // 第一种做法
                // this.current_cars_type_data.id = data[0].id;
                // this.getCarsTypeList();
            })
        },
        /**
         * 第二种做法 async\await
         */
        // 获取车辆自定义属性
        async getCarsType(){  // 执行
            // 第一个接口 - 等待请求完成
            const data = await this.getCarsTypeBasis();  // 等待 - 等待接口处理完成  B
            // 赋值
            this.current_cars_type_data.id = data[0].id;
            this.cars_list_basis_type_id = data[0].id;
            // 第二个接口
            this.$refs.table.requestData({ typeId: this.current_cars_type_data.id});  // loadData  A
        },
        // 获取车辆自定义属性
        getCarsTypeList(){
            this.$refs.table.requestData({ typeId: this.current_cars_type_data.id});
        },
        // 弹窗
        carsTypeAddDialog(){
            if(!this.current_cars_type_data.id) {
                this.$message({
                    message: "请选择车辆公共属性",
                    type: "error"
                })
                return false;
            }
            this.dialog_show = true;
        }
        
    },
    
    // DOM元素渲染之前（生命周期）
    beforeMount(){
        // 第一种方法
        // this.getCarsTypeBasis();
        // 第二种方法
        this.getCarsType();
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