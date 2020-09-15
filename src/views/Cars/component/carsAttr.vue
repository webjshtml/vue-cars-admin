<template>
    <div>
        <CarsBasisAttr @getAttrList="getAttrList" />
        <el-row :gutter="15">
            <el-col :span="4" v-for="item in attr_data" :key="item.key">
                <el-input v-model="attr_item[attr_basis_data.key][item.key]" :placeholder="item.value" />
                <!-- <el-input v-model="attr_item["basis"][item.key]" :placeholder="item.value" /> -->
                <!-- <el-input v-model="attr_item["carsBody"][item.key]" :placeholder="item.value" /> -->
            </el-col>
        </el-row>
    </div>
</template>
<script>
import CarsBasisAttr from "./carsBasisAttr";
export default {
   name: "CarsAttr",
   data(){
       return {
           attr_data: [], // 自定义属性数据
           attr_basis_data: {},
           // 数据集合
           attr_item: {}
       }
   },
   components: { CarsBasisAttr },
   beforeMount(){},
   methods: {
        getAttrList(data){
            this.attr_basis_data = data.attr_basis_data;
            this.attr_data = data.attr_data;
            this.attrFormat();
        },
        // 数据格式化
        attrFormat(){
            // 自定义属性为空时，不执行
            if(this.attr_data.length == 0) { return false; }
            // 公用属性的 key
            const attrBasisKey = this.attr_basis_data.key;
            // 判断属性集合是否存在 公用属性的key，存在则不处理
            if(this.attr_item[attrBasisKey]) { return false; }
            // 处理自定义属性
            const attrJson = {};
            this.attr_data.forEach(item => {
                attrJson[item.key] = "";
            })
            // 更新属性集合
            this.$set(this.attr_item, attrBasisKey, attrJson);
            // 典型的问题
            // 动态绑定数据后，视图不渲染
            /**
             * this.$set(test，'bb', 11111)  // 更新指定对象中，某个 key 的数据。
             */
        },
        callbackValue(){
            this.$emit("update:value", JSON.stringify(this.attr_item))  // JSON.parse()
        }
   },
   props: {},
   
}
</script>
<style lang='scss' scoped>
</style>