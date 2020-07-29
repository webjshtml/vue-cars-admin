import service from "../utils/request";
/** 标志 */
export function BrandLogo(data = {}){
    return service.request({
        method: "post",
        url: "/brand/logo/",
        data
    })
}

/** 添加 */
export function BrandAdd(data = {}){
    return service.request({
        method: "post",
        url: "/brand/add/",
        data
    })
}