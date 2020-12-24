<template>
  <!--dialog 弹窗
    子组件接收父组件的数据，是通过属性接收
  -->
  <el-dialog :title="title" :visible.sync="dialogVisible" class="cars-dialog-center" @close="close" @opened="opened" :close-on-click-modal="false" width="20%">
    <template v-if="img.length > 0">
        <img v-for="item in img" :key="item" :src="item" alt="" class="img-list">
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    title: {
        type: String,
        default: ""
    },
    flagVisible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      defult: () => {}
    }
  },
  data() {
    return {
        dialogVisible: false,
        img: []
    };
  },
  methods: {
    opened(){},
    getPhoto(){
        const imgArr = [];
        for(let key in this.data){
            if(this.data[key]) {
                imgArr.push(this.data[key])
            }
        }
        this.img = imgArr;
    },
    close() {
      // 关闭窗口
      this.dialogVisible = false;
      this.$emit("update:flagVisible", false); // {}
    }
  },
  watch: {
    flagVisible: {
      handler(newValue, oldValue) {
        this.dialogVisible = newValue;
      }
    },
    data: {
      handler(newValue, oldValue) {
          this.getPhoto()
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.img-list { 
    width: 100%;
    margin-bottom: 20px;
}
</style>