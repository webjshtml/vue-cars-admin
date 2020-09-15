<template>
    <div>
        <el-button :type="cars_list_basis_type_id == item.id ? 'danger' : ''" size="small" :a="item.id" v-for="item in cars_list_basis_item" :key="item.id" @click="getTypeList(item)"> {{ item.value }} </el-button>
    </div>
</template>
<script>
// API
import { GetCarsTypeBasis, GetCarsTypeList } from "@/api/carsAttr";
export default {
   name: "CarsAttr",
   data(){
       return {
            // 车辆公用属性集合
            cars_list_basis_item: [],
            // 车辆公用属性ID
            cars_list_basis_type_id: "",
            // 当前公用属性数据
            current_cars_type_data: {}
       }
   },
   components: {},
   beforeMount(){
       this.getCarsTypeBasis();
   },
   methods: {
        // 自定义属性列表
        getTypeList(data){
            this.cars_list_basis_type_id = data.id;
            // 存储当前数据
            this.current_cars_type_data = data;
            // 获取自定义属性
            this.getAttrList()
        },
        // 获取车辆公用属性
        getCarsTypeBasis(){
            GetCarsTypeBasis().then(response => {
                const data = response.data.data;
                this.cars_list_basis_item = data;
            })
        },
        // 获取自定义属性
        getAttrList(){
            GetCarsTypeList({typeId: this.current_cars_type_data.id}).then(response => {
                this.$emit("getAttrList", {
                    attr_basis_data: this.current_cars_type_data,  //公用属性
                    attr_data: response.data.data  // 公用属性下面的自定义属性
                })
            })
        }
   },
   props: {},
   
}
</script>
<style lang='scss' scoped>
</style>