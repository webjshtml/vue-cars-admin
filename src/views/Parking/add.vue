<template>
    <div class="parking-add">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
            <el-form-item label="停车场名称" prop="parkingName">
                <el-input v-model="form.parkingName"></el-input>
            </el-form-item>
            <el-form-item label="区域" prop="area">
                <CityArea ref="cityArea" :mapLocation="true" :cityAreaValue.sync="form.area" @callback="callbackComponent" />
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-radio-group v-model="form.type">
                    <el-radio v-for="item in type" :label="item.value" :key="item.value">{{ item.label }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="可停放车辆" prop="carsNumber">
                <el-input v-model.number="form.carsNumber"></el-input>
            </el-form-item>
            <el-form-item label="禁启用" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="item in status" :label="item.value" :key="item.value">{{ item.label }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="位置">
                <div class="address-map">
                    <AMap ref="amap" @callback="callbackComponent" />
                </div>
            </el-form-item>
            <el-form-item label="经纬度" prop="lnglat">
                <el-input v-model="form.lnglat"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" :loading="button_loading" @click="onSubmit('form')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
// AMAP
import AMap from "../amap";
// 组件
import CityArea from "@c/common/cityArea";
// API
import { ParkingAdd } from "@/api/parking";
export default {
    name: "ParkingAdd",
    data() {
      return {
        status: [
            { label: "禁用", value: 1 },
            { label: "启用", value: 2 }
        ],
        type: [
            { label: "室内", value: 1 },
            { label: "室外", value: 2 }
        ],
        form: {
            parkingName: "",
            area: "",
            address: "",
            type: "",
            carsNumber: "",
            status: "",
            lnglat: "",
            content: ""
        },
        // 表单验证规则
        rules: {
            parkingName: [
                { required: true, message: "请输入停车场名称", trigger: 'change' }
            ],
            carsNumber: [
                { required: true, message: "数量不能为空", trigger: 'change' },
                { type: 'number', message: '请输入数字'}
            ],
            address: [
                { required: true, message: "详情地址不能为空", trigger: 'change' }
            ],
            area: [
                { required: true, message: "请选择省市区", trigger: 'change' }
            ],
            lnglat: [
                { required: true, message: "经纬度不能为空", trigger: 'change' }
            ]
        },
        // 按钮加载
        button_loading: false
      }
    },
    components: { AMap, CityArea },
    mounted(){
    },
    methods: {
        callbackComponent(params){
            if(params.function) { this[params.function](params.data);  }
        },
        setMapCenter(data){
            this.$refs.amap.setMapCenter(data.address);
        },
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addParking();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        /** 新增停车场API */
        addParking(){
            this.button_loading = true;
            ParkingAdd(this.form).then(response => {
                this.$message({
                    type: "primary",
                    message: response.message
                })
                this.button_loading = false;
                this.reset("form");
            }).catch(error => {
                this.button_loading = false;
            })
        },
        /** 重置表单 */
        reset(formName){
            this.$refs[formName].resetFields();
            // 清除 cityAray 的值 
            this.$refs.cityArea.clear();
            // 清除地图覆盖物
            this.$refs.amap.clearMarker();
        },
        /** 获取经纬度 */
        getLnglat(data){
            this.form.lnglat = data.lnglat.value
        }
    }
}
</script>
<style lass="scss" scoped>
.address-map {
    width: 100%;
    height: 500px;
}
</style>