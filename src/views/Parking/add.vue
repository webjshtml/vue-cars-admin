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
                    <AMap ref="amap" :options="option_map" @callback="callbackComponent" />
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
import { ParkingAdd, ParkingDetailed, ParkingEdit } from "@/api/parking";
export default {
    name: "ParkingAdd",
    data() {
      return {
        // id
        id: this.$route.query.id,
        // 地图配置
        option_map: {
            mapLoad: true
        },
        status: this.$store.state.config.parking_status,
        type: this.$store.state.config.parking_type,
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
    beforeMount(){},
    mounted(){},
    methods: {
        callbackComponent(params){
            if(params.function) { this[params.function](params.data);  }
        },
        /** 地图加载完成 */
        mapLoad(){
            this.getDetaile();
        },
        /** 提交表单 */
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.id ? this.editParking() : this.addParking();
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
        /** 修改停车场API */
        editParking(){
            let requestData = JSON.parse(JSON.stringify(this.form));
            requestData.id = this.id;
            this.button_loading = true;
            ParkingEdit(requestData).then(response => {
                this.$message({
                    type: "primary",
                    message: response.message
                })
                this.button_loading = false;
                this.$router.push({
                    name: "ParkingIndex"
                })
            }).catch(error => {
                this.button_loading = false;
            })
        },
        /** 获取详情 */
        getDetaile(){
            if(!this.id) { return false; }
            ParkingDetailed({ id: this.id }).then(response => {
                const data = response.data
                // 还原数据
                for(let key in data) {  // 接口请求出来的 
                    if(Object.keys(this.form).includes(key)) { // true  ["parkingName", "area", "address", "type", "carsNumber", "status", "lnglat", "content"].includes("region")
                        this.form[key] = data[key];
                    }
                }
                // 设置覆盖物
                const splitLnglat = data.lnglat.split(",");
                const lnglat = {
                    lng: splitLnglat[0],
                    lat: splitLnglat[1]
                }
                this.$refs.amap.setMarker(lnglat);
                // 初始化省市区
                this.$refs.cityArea.initDefault(data.region);
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
        },
        setMapCenter(data){
            this.$refs.amap.setMapCenter(data.address);
        },
    }
}
</script>
<style lass="scss" scoped>
.address-map {
    width: 100%;
    height: 500px;
}
</style>