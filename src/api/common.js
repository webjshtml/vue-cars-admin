import service from "../utils/request";
import requestUrl from "./requestUrl";
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
export function GetTableData(params = {}){

    console.log(requestUrl[params.url]); // Url地址

    return service.request({
        method: "post",
        url: requestUrl[params.url],
        data: params.data
    })
}