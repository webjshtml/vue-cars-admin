import service from "../utils/request";

/** 添加 */
export function CarsAdd(data = {}){
    return service.request({
        method: "post",
        url: "/cars/add/",
        data
    })
}

/** 禁启用状态 */
export function CarsStatus(data = {}){
    return service.request({
        method: "post",
        url: "/cars/status/",
        data
    })
}

/** 删除 */
export function CarsDelete(data = {}){
    return service.request({
        method: "post",
        url: "/cars/delete/",
        data
    })
}

/** 删除 */
export function CarsDetailed(data = {}){
    return service.request({
        method: "post",
        url: "/cars/detailed/",
        data
    })
}

/** 删除 */
export function CarsEdit(data = {}){
    return service.request({
        method: "post",
        url: "/cars/edit/",
        data
    })
}