<template>
    <div>
        <div class="filter-form">
            <el-row>
                <el-col :span="21">
                    <el-form :inline="true" :model="form" class="demo-form-inline">
                        <el-form-item label="区域">
                           <CityArea ref="cityArea" :cityAreaValue.sync="form.area" @callback="callbackComponent" />
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-select v-model="form.type" placeholder="停车场" class="width-120">
                                <el-option v-for="item in parking_type" :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="禁启用">
                            <el-select v-model="form.status" placeholder="请选择" class="width-120">
                                <el-option v-for="item in parking_status" :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="关键字">
                            <el-select v-model="search_key" placeholder="请选择" class="width-120">
                                <el-option label="停车场名称" value="parkingName"></el-option>
                                <el-option label="详细区域" value="address"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item >
                            <el-input v-model="keyword" placeholder="请输入关键字按Enter搜索"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click="search">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="3">
                    <div class="pull-right">
                        <router-link to="/carsAdd">
                            <el-button type="danger">新增停车场</el-button>
                        </router-link>
                    </div>
                </el-col>
            </el-row>
            
        </div>
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
            table_config: {
                thead: [
                    { label: "车牌号", prop: "carsMode" },
                    { label: "车辆品牌", prop: "nameCh" },
                    { 
                        label: "车辆LOGO", 
                        prop: "imgUrl",
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
                }
            },
            // 筛选
            form: {
                area: "",
                type: "",
                status: ""
            },
            switch_disabled: "",
            switch_flag: false,
            //
            search_key: "",
            keyword: "",
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
        /** search */
        search(){
            const requestData = {
                pageSize: 10,
                pageNumber: 1
            }
            // 过滤筛选
            const filterData = JSON.parse(JSON.stringify(this.form));
            for(let key in filterData) {
                if(filterData[key]) {
                    requestData[key] = filterData[key];
                }
            }
            // 关键字
            if(this.keyword && this.search_key) { requestData[this.search_key] = this.keyword; }
            // 调用子组件的方法
            this.$refs.table.requestData(requestData);
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
        }
    },
    // DOM元素渲染之前（生命周期）
    beforeMount(){},
    // DOM元素渲染完成（生命周期）
    mounted(){},
}

</script>
<style lass="scss" scoped>

</style>