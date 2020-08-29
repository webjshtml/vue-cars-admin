<template>
    <div>
        <FormSearch 
        v-if="table_config.search_form"
        :formItme="table_config.form_item" 
        :formHandler="table_config.form_handler" 
        :formConfig="table_config.form_config"
        @callbackComponent="callbackComponent"
        />
        <el-table v-loading="loading_table" element-loading-text="加载中" :data="table_data" border style="width: 100%">
            <el-table-column v-if="table_config.checkbox" type="selection" width="35"></el-table-column>
            <template v-for="item in this.table_config.thead">
                <!--回调-->
                <el-table-column v-if="item.type === 'function'" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
                    <template slot-scope="scope">
                        <span v-html="item.callback && item.callback(scope.row, item.prop)"></span>
                    </template>
                </el-table-column>
                <!--插槽slot-->
                <el-table-column v-else-if="item.type === 'slot'" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
                    <template slot-scope="scope">
                        <slot :name="item.slotName" :data="scope.row"></slot>
                    </template>
                </el-table-column>
                <!--图标显示 -->
                <el-table-column v-else-if="item.type === 'image'" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
                    <template slot-scope="scope">
                        <img :src="scope.row[item.prop]" :width="item.imgWidth || 50" alt="" />
                    </template>
                </el-table-column>
                <!--操作 -->
                <el-table-column v-else-if="item.type === 'operation'" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width">
                    <template slot-scope="scope">
                        <!--编辑-->
                        <template v-if="item.default && item.default.editButton">
                            <el-button  v-if="item.default.editButtonEvent" type="danger" size="small" @click="edit(scope.row[item.default.id || 'id'], item.default.editButtonLink)">编辑</el-button>
                            <router-link v-else :to="{name: item.default.editButtonLink, query: { id: scope.row[item.default.id || 'id'] }}" class="mr-10">
                                <el-button type="danger" size="small">编辑</el-button>
                            </router-link>
                        </template>
                        <!--删除-->
                        <el-button size="small" v-if="item.default && item.default.deleteButton" :loading="scope.row.id == rowId" @click="delConfirm(scope.row.id)">删除</el-button>
                        <!--额外-->
                        <slot v-if="item.slotName" :name="item.slotName" :data="scope.row"></slot>
                    </template>
                </el-table-column>
                <!--纯文本渲染-->
                <el-table-column v-else :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
            </template>
        </el-table>
        <el-row class="padding-top-30">
            <el-col :span="4"><div style="padding: 5px;"></div></el-col>
            <el-col :span="20">
                <el-pagination
                    v-if="table_config.pagination"
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
import FormSearch from "@/components/formSearch";
// API
import { GetTableData, Delete } from "@/api/common";
import { ParkingList } from "@/api/parking";
// API
import { CarsDelete } from "@/api/cars";
export default {
    name: "TableComponent",
    components: { FormSearch },
    data(){
        return {
            // 加载提示
            loading_table: true,
            // tableData
            table_data: [],
            table_config: {
                thead: [],
                checkbox: true,
                url: "",
                pagination: true,
                data: {},
                search_form:  true,
                // form
                form_item: [],
                form_handler: [],
                form_config: {
                    resetButton: false
                }
            },
            // 页码
            total: 0,
            // 当前页码
            currentPage: 1,
            // rowId
            rowId: "",
            form_data: {}
        }
    },
    beforeMount(){},
    methods: {
        callbackComponent(params){
            this[params.function](params.data);
        },
        search(data){
            const searchData = data;
            searchData.pageNumber = 1;
            searchData.pageSize = 10;
            this.requestData(searchData);
        },
        /** table config */
        initConfig(){
            for(let key in this.config) {
                if(Object.keys(this.table_config).includes(key)) {
                    this.table_config[key] = this.config[key]
                }
            }
            // 配置完成后开始读取接口数据
            this.loadData();
        },
        loadData(){
            let requestData = {
                url: this.table_config.url,
                data: this.table_config.data,
            }
            this.loading_table = true;
            GetTableData(requestData).then(response => {
                const data = response.data;
                // 判断数据是否存在
                if(data) { this.table_data = data.data }
                // 页码
                this.$nextTick(() => { // 考虑到DOM元素渲染完成时候
                    
                })
                this.total = data.total;
                this.loading_table = false;
            }).catch(error => {
                this.loading_table = false;
            })
        },
        requestData(params = ""){
            if(params) {
                // 处理业务逻辑
                this.table_config.data = params;
            }
            this.loadData();
        },
        /** 页码 */
        handleSizeChange(val){
            this.table_config.data.pageSize = val;
            this.loadData();
        },
        handleCurrentChange(val){
            this.table_config.data.pageNumber = val;
            this.loadData();
        },
        /**
         * 删除
         */
        delConfirm(id){
            this.$confirm('确定删除此信息', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.rowId = id;
                let requestData = {
                    url: this.table_config.url + "Delete",
                    data: { id },
                }
                Delete(requestData).then(response => {
                    this.$message({
                        type: 'success',
                        message: response.message
                    });
                    this.rowId = "";
                    // 调用子组件的方法
                    this.loadData();
                }).cacth(error => {
                    this.rowId = "";
                })
            }).catch(() => {});
        },
        /** 编辑 */
        edit(id, routerNmae){
            this.$router.push({
                name: routerNmae,
                query: {
                    id
                }
            })
        },
    },
    props: {
        config: {
            type: Object,
            default: () => ({})
        },
        searchFormConfig: {
            type: Object,
            default: function(){
                return {};
            }
        },
    },
    watch: {
        config: {
            handler(newValue) {
                this.initConfig();
            },
            immediate: true
        }
    }
}
</script>
<style lang="scss" scoped>
.mr-10 { margin-right: 10px; }
</style>