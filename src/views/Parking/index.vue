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
                            <el-select placeholder="请选择" class="width-120">
                                <el-option label="停车场名称" value="parkingName"></el-option>
                                <el-option label="详细区域" value="address"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item >
                            <el-input placeholder="请输入关键字按Enter搜索"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="3">
                    <div class="pull-right">
                        <router-link to="/parkingAdd">
                            <el-button type="danger">新增停车场</el-button>
                        </router-link>
                    </div>
                </el-col>
            </el-row>
            
        </div>
        <!-- 表格数据 -->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="selection" width="35"></el-table-column>
            <el-table-column prop="parkingName" label="停车场名称"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="address" label="区域"></el-table-column>
            <el-table-column prop="carsNumber" label="可停放车辆"></el-table-column>
            <el-table-column prop="disabled" label="禁启用">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" active-value="2" inactive-value="1" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="lnglat" label="查看位置"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" size="small">编辑</el-button>
                    <el-button size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row class="padding-top-30">
            <el-col :span="4"><div style="padding: 5px;"></div></el-col>
            <el-col :span="20">
                <el-pagination
                    class="pull-right"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
// 组件
import CityArea from "@c/common/cityArea";
// API
import { ParkingList } from "@/api/parking";
export default {
    name: "Parking",
    data(){
        return {
            // 页码
            total: 0,
            // 当前页码
            currentPage: 1,
            // 请求API的页码
            pageSize: 10,
            pageNumber: 1,
            // 筛选
            form: {
                parking_name: "",
                area: "",
                type: "",
                status: ""
            },
            parking_status: this.$store.state.config.parking_status,
            parking_type: this.$store.state.config.parking_type,
            options: [
                {
                    value: 1111,
                    label: "广东省",
                    children: [
                        {
                            value: 1111,
                            label: "深圳市",
                        },
                        {
                            value: 1111,
                            label: "广州市",
                        }
                    ]
                },
                {
                    value: 1111,
                    label: "广西省",
                    children: [
                        {
                            value: 1111,
                            label: "南宁市",
                            children: [
                                {
                                    value: "2222",
                                    label: "八步镇"
                                }
                            ]
                        }
                    ]
                }
            ],
            tableData: []
        }
    },
    components: { CityArea },
    methods: {
        callbackComponent(params){
            if(params.function) { this[params.function](params.data); }
        },
        getParkingList(){
            const requestData = {
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }
            ParkingList(requestData).then(response => {
                const data = response.data;
                // 判断数据是否存在
                if(data) { this.tableData = data.data }
                // 页码
                if(data.total) { this.total = data.total; }
            })
        },
        /** 页码 */
        handleSizeChange(val){
            this.pageSize = val;
            this.getParkingList();
        },
        handleCurrentChange(val){
            this.pageNumber = val;
            this.getParkingList();
        }
    },
    // DOM元素渲染之前（生命周期）
    beforeMount(){
        this.getParkingList();
    },
    // DOM元素渲染完成（生命周期）
    mounted(){

    },
}
</script>
<style lass="scss" scoped>

</style>