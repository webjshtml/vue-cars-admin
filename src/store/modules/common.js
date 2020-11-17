const state = {
    // table 数据加载标记
    table_loadData_flag: true,  // true、false
    // upload token
    upload_token: ""
}
const getters = {}
const mutations = {
    SET_TABL_DATA_FLAG(state){
        state.table_loadData_flag = !state.table_loadData_flag;  //取反
    },
    SET_UPLOAD_TOKEN(state, value){
        state.upload_token = value;
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
