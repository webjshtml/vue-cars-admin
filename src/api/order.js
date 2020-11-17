import service from "../utils/request";
/** 标志 */
export function OrderList(data = {}){
    return service.request({
        method: "post",
        url: "/order/list/",
        data
    })
}