import service from "../utils/request";
/**
 * 获取城市列表
 */
export function GetCity(data = {}){
    return service.request({
        method: "post",
        url: "/cityPicker/",
        data
    })
}

/**
 * 获取城市列表
 */
export function ParkingAdd(data = {}){
    return service.request({
        method: "post",
        url: "/parking/add/",
        data
    })
}

/**
 * 获取城市列表
 */
export function ParkingList(data = {}){
    return service.request({
        method: "post",
        url: "/parking/list/",
        data
    })
}