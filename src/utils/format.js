

/** 
 * 格式化请求数据的参数 
 * keyData：form_data
 * requestData：请求的数据
 * 
 * */
export function formatRequestData(keyData, requestData){
    const data = {}
    for(let key in keyData) {
        if(Object.keys(requestData).includes(key)) {
            data[key] = requestData[key]
        }
    }
    return data;
}