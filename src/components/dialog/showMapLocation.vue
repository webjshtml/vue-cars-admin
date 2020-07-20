<template>
  <!--dialog 弹窗
    子组件接收父组件的数据，是通过属性接收
  -->
  <el-dialog
    :title="data.parkingName"
    :visible.sync="dialogVisible"
    class="cars-dialog-center"
    @close="close"
    @opened="opened"
    :close-on-click-modal="false"
  >
    <div style="height: 500px;"><AMap ref="aMap" /></div>
  </el-dialog>
</template>

<script>
// AMAP
import AMap from "@/views/amap";
export default {
  name: "",
  components: { AMap },
  props: {
    flagVisible: {
      type: Boolean,
      default: false
    },
    data: {
        type: Object,
        default: () => {}
    }
  },
  data() {
    return {
        // 弹窗显示/关闭标记
        dialogVisible: false
    };
  },
  methods: {
    opened(){
      this.$refs.aMap.mapCreate();
      // 调DOM元素的方法时，要确保DOM元素已被加载完成
      this.$nextTick(() => { // DOM元素渲染完成后执行
        const splitLnglat = this.data.lnglat.split(",");
        const lnglat = {
            lng: splitLnglat[0],
            lat: splitLnglat[1]
        }
        this.$refs.aMap.setMarker(lnglat);
      })
    },
    close() {
        this.$refs.aMap.mapDestroy();
        this.$emit("update:flagVisible", false); // {}
    }
  },
  watch: {
    flagVisible: {
      handler(newValue, oldValue) {
        this.dialogVisible = newValue;
      }
    },
    // parking_data: {
    //     handler(newValue, oldValue) {
    //         console.log('newValuenewValuenewValuenewValue')
    //         console.log(newValue)
    //         this.data = newValue
    //     }
    // }
  }
};
</script>
<style lang='scss' scoped>
</style>