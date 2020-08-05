import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import app from "./modules/app";
import config from "./modules/config";
export default new Vuex.Store({
  modules: {
    app,
    config
  }
});
