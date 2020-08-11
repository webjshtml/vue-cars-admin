import service from "../utils/request";

/** 添加 */
export function CarsAdd(data = {}){
    return service.request({
        method: "post",
        url: "/cars/add/",
        data
    })
}