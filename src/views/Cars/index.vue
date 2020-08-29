<template>
    <div>
        <TabalData ref="table" :config="table_config">
            <!--禁启用-->
            <template v-slot:status="slotData">
                <el-switch :disabled="slotData.data.id == switch_disabled" @change="switchChange(slotData.data)" v-model="slotData.data.status" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
            </template>
        </TabalData>
        <MapLocation :flagVisible.sync="map_show" :data="parking_data" />
    </div>
</template>
<script>
// 组件
import CityArea from "@c/common/cityArea";
import MapLocation from "@c/dialog/showMapLocation";
import TabalData from "@c/tableData";
// API
import { CarsStatus } from "@/api/cars";
// common
import { address, yearCheckType, energyType } from "@/utils/common";
export default {
    name: "Cars",
    data(){
        return {
            // 表格配置
            table_config:{
                thead: [
                    { label: "车牌号", prop: "carsMode" },
                    { label: "车辆品牌", prop: "nameCh" },
                    { 
                        label: "车辆LOGO", 
                        prop: "imgUrl",
                        type: "image"
                    },
                    { 
                        label: "车辆图片", 
                        prop: "carsImg",
                        type: "image"
                    },
                    { 
                        label: "年检", 
                        prop: "yearCheck",
                        type: "function",
                        callback: (row, prop) => yearCheckType(row[prop]),
                        width: "100px"
                    },
                    { 
                        label: "能源类型", 
                        prop: "energyType",
                        type: "function",
                        callback: (row, prop) => energyType(row[prop]),
                        width: "100px"
                    },
                    { 
                        label: "禁启用",
                        prop: "status",
                        type: "slot",
                        slotName: "status",
                        width: "100px"
                    },
                    { label: "停车场", prop: "parkingName" },
                    { 
                        label: "区域",
                        prop: "address",
                        type: "function",
                        callback: (row, prop) => address(row[prop])
                    },
                    { 
                        label: "操作",
                        type: "operation",
                        default: {
                            deleteButton: true,
                            editButton: true,
                            editButtonLink: "CarsAdd"
                        }
                    }
                ],
                url: "carsList",  // 真实URL请求地址
                data: {
                    pageSize: 10,
                    pageNumber: 1
                },
                form_item: [
                    { label: "城市", type: "City" },
                    { label: "类型", prop: "parkingType", type: "Select", width: '120px', options: "parking_type"  },
                    { label: "禁启用", prop: "status", type: "Select", width: '120px', options: "radio_disabled" },
                    { label: "关键字",  type: "Keyword" },
                ],
                form_handler: [
                    { label: "新增", prop: "add", type: "success", element: "link", router: "/carsAdd" },
                    { label: "下载", prop: "down", type: "success", element: "button", handler: () => this.aaaa() },
                ],
                form_config: {
                    resetButton: true
                }
            },
            switch_disabled: "",
            switch_flag: false,
            // 禁启用
            parking_status: this.$store.state.config.radio_disabled,
            // 停车场类型
            parking_type: this.$store.state.config.parking_type,
            // 地图显示 
            map_show: false,
            parking_data: {},
            table_loading: false,
            rowId: ""
        }
    },
    components: { CityArea, MapLocation, TabalData },
    methods: {
        callbackComponent(params){
            if(params.function) { this[params.function](params.data); }
        },
        /** 禁启用 */
        switchChange(data){
            if(this.switch_flag) { return false; }
            const requestData = {
                id: data.id,
                status: data.status
            }
            // this.switch_flag = true;
            this.switch_disabled = data.id;  // 第一种方式：组件本身的属性处理
            CarsStatus(requestData).then(response => {
                this.$message({
                    type: 'success',
                    message: response.message
                });
                this.switch_disabled = "";
                // this.switch_flag = false;
            }).catch(error => {
                this.switch_disabled = "";
                // this.switch_flag = false;
            })
        },
        /** 显示地图 */
        showMap(data){
            this.map_show = true;
            this.parking_data = data;
        },
        aaaa(){
            alert(1111)
        }
    },
    
    // DOM元素渲染之前（生命周期）
    beforeMount(){},
    // DOM元素渲染完成（生命周期）
    mounted(){},
}

</script>
<style lass="scss" scoped></style>