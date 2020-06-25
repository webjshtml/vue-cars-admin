import router from "./index";
// cookie
import { getToken } from "@/utils/cookies";
// 全局前置守卫
router.beforeEach((to, from, next) => {
    // 获取 token 是否存在
    if(getToken()){
        next();
    }else{
        if(to.path === "/login") { // 这里是处理 login 页面的时候，没有 token
            next();
        }else{
            next({ path: "/login" });  // 这里是处理管理后台时没有 token ，进行 path 路由指向。
        }
    }
})
// 全局后置守卫
router.afterEach((to, from) => {
})