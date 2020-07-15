import { setToken, setUsername, getUsername, removeToken, removeUsername } from "@/utils/cookies";


const state = {
    // 停车场类型
    parking_type: [
        { label: "室内", value: 1 },
        { label: "室外", value: 2 },
        { label: "空中楼阁", value: 3 }
    ],
    // 停车场状态
    parking_status: [
        { label: "禁用", value: 1 },
        { label: "启用", value: 2 }
    ]
}
export default {
    namespaced: true,
    state
};
