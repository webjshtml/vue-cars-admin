<template>
    <el-row :gutter="10">
        <el-col :span="8">
            <el-select v-model="search_key" placeholder="请选择" @change="inputEnter">
                <el-option v-for="item in search_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-col>
        <el-col :span="16">
            <el-input v-model="search_value" v-on:input="inputEnter"></el-input>
        </el-col>
    </el-row>
</template>

<script>
export default {
   name: '',
   components: {},
   data(){
       return {
           search_key: "",
           search_value: "",
           search_options: [],
           keyword_options: this.$store.state.config.keyword_options
       }
   },
   methods: {
       initOptions(){
            let optionsItem = [];
            this.options.forEach(item => {
                const data = this.keyword_options.filter(elem => elem.value == item);
                optionsItem = optionsItem.concat(data);
            })
            this.search_options = optionsItem;
       },
       /** 输入时 */
       inputEnter(){
           let keyword = {};
           keyword.key = this.search_key;
           keyword.value = this.search_value;
           this.$emit("update:value", keyword);
       },
       // 清除
       clear(){
           this.search_key = "";
           this.search_value = "";
       }
   },
   props: {
       options: {
           type: Array,
           default: () => []
       }
   },
   watch: {
       options: {
           handler(newValue){
               this.initOptions();
           },
           immediate: true
       }
   }
   
}
</script>
<style lang='scss' scoped>
</style>