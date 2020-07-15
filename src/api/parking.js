import service from "../utils/request";
/** 新增停车场 */
export function ParkingAdd(data = {}){
    return service.request({
        method: "post",
        url: "/parking/add/",
        data
    })
}

/** 新增停车场 */
export function ParkingList(data = {}){
    return service.request({
        method: "post",
        url: "/parking/list/",
        data
    })
}