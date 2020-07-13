<template>
    <div class="amap-wrap">
        <el-amap vid="amapContainer" :events="events" class="amap-demo"></el-amap>
    </div>
</template>
<script>
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap';
// 方法
import { getLngLat } from "./common";
import { addressSetMapCenter } from "./location";
export default {
    name: "Amap",
    data(){
        return {
            map: null,
            zoom: 18,
            events: {}
        }
    },
    mounted(){
        lazyAMapApiLoaderInstance.load().then(() => {
            this.map = new AMap.Map('amapContainer', {
                center: [116.404765, 39.918052],
                zoom: this.zoom, //初始化地图层级
            });
            this.map.on("click", (e) => {
                const lonlag = getLngLat(e);
                this.$emit("lonlag", lonlag);  // 子组件调父组件的方法
            })
        });
    },
    methods: {
        setMapCenter(value){
            addressSetMapCenter(value, this.map);
        }
    }
}
</script>
<style lang="scss">
.amap-wrap { height: 100%; }
</style>