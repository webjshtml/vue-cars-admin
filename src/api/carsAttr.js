import service from "../utils/request";

/** 获取车辆公用属性（顶级） */
export function GetCarsTypeBasis(data = {}){
    return service.request({
        method: "post",
        url: "/carsAttr/type/",
        data
    })
}

/** 获取车辆自定义属性 */
export function GetCarsTypeList(data = {}){
    return service.request({
        method: "post",
        url: "/carsAttr/list/",
        data
    })
}

/** 添加车辆自定义属性 */
export function CarsTypeAdd(data = {}){
    return service.request({
        method: "post",
        url: "/carsAttr/add/",
        data
    })
}
