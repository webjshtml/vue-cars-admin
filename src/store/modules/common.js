const state = {
    // table 数据加载标记
    table_loadData_flag: true  // true、false
}
const getters = {}
const mutations = {
    SET_TABL_DATA_FLAG(state){
        state.table_loadData_flag = !state.table_loadData_flag;  //取反
    }
}
const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
