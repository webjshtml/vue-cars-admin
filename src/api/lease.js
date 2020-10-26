import service from "../utils/request";

/** 获取租赁列表 */
export function LeaseList(data = {}){
    return service.request({
        method: "post",
        url: "/lease/carsLeaseList/",
        data
    })
}
/** 添加 */
export function LeaseAdd(data = {}){
    return service.request({
        method: "post",
        url: "/lease/add/",
        data
    })
}

/** 添加 */
export function LeaseStatus(data = {}){
    return service.request({
        method: "post",
        url: "/lease/status/",
        data
    })
}

/** 编辑 */
export function LeaseEdit(data = {}){
    return service.request({
        method: "post",
        url: "/lease/edit/",
        data
    })
}


