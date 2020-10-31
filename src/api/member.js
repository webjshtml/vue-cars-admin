import service from "../utils/request";
/** 会员详情 */
export function Detailed(data = {}){
    return service.request({
        method: "post",
        url: "/member/detailed/",
        data
    })
}

/** 会员修改 */
export function Edit(data = {}){
    return service.request({
        method: "post",
        url: "/member/edit/",
        data
    })
}