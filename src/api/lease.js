import service from "../utils/request";

/** 添加 */
export function LeaseAdd(data = {}){
    return service.request({
        method: "post",
        url: "/lease/add/",
        data
    })
}