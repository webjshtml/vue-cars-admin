import store from "@/store";
/** 省市区街道 */
export function address(value){
    let address = value;
    let addressInfo = "";
    if(address) {
        let split = address.split(",");
        addressInfo += split[0];
        // 街道
        if(split[1]) {
            addressInfo += `<br/>${split[1]}`
        }
    }
    return addressInfo;
}

/** 停车场类型 */
export function parkingType(value){
    const data = store.state.config.parking_type_json[value];
    if(data) { return data.label; }
}