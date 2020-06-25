import { setToken, setUsername, getUsername, removeToken, removeUsername } from "@/utils/cookies";
import { Login, Logout } from "@/api/login";
const state = {
    collapse: JSON.parse(sessionStorage.getItem('collapse')) || false,
    token: "",
    username: "" || getUsername()
}
const getters = {}
const mutations = {
    SET_COLLAPSE(state){
        state.collapse = !state.collapse;
        sessionStorage.setItem('collapse', String(state.collapse))
    },
    SET_TOKEN(state, value){
        state.token = value;
    },
    SET_USERNAME(state, value){
        state.username = value;
    }
}
const actions = {
    loginAction(content, repuestData) {
        return new Promise((resolve, reject) => {
            Login(repuestData).then((response) => {
                let data = response.data
                console.log(data)
                content.commit('SET_TOKEN', data.token);
                content.commit('SET_USERNAME', data.username);
                setToken(data.token);
                setUsername(data.username);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    logoutAction({ commit }){
        return new Promise((resolve, reject) => {
            Logout().then(response => {
                console.log(response)
                removeToken();
                removeUsername();
                commit('SET_TOKEN', '');
                commit('SET_USERNAME', '');
                resolve(response);
            })
            
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
