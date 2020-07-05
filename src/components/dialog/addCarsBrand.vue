<template>
  <!--dialog 弹窗
    子组件接收父组件的数据，是通过属性接收
  -->
  <el-dialog
    title="新增车辆品牌"
    :visible.sync="dialogVisible"
    class="cars-dialog-center"
    @close="close"
    :close-on-click-modal="false"
  >
    <!--内容区-->
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="车辆品牌">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="品牌型号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="LOGO">
        <div class="upload-img-wrap">
          <div class="upload-img">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593447137003&di=8e2c8ba51d3018e302c66a0bd851c7e8&imgtype=0&src=http%3A%2F%2Fimg.bqatj.com%2Fimg%2F4e384e839d6b6e96.jpg"
              alt
            />
          </div>
          <ul class="img-list">
            <li>
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593447137003&di=8e2c8ba51d3018e302c66a0bd851c7e8&imgtype=0&src=http%3A%2F%2Fimg.bqatj.com%2Fimg%2F4e384e839d6b6e96.jpg"
                alt
              />
            </li>
            <li>
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593447137003&di=8e2c8ba51d3018e302c66a0bd851c7e8&imgtype=0&src=http%3A%2F%2Fimg.bqatj.com%2Fimg%2F4e384e839d6b6e96.jpg"
                alt
              />
            </li>
            <li>
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593447137003&di=8e2c8ba51d3018e302c66a0bd851c7e8&imgtype=0&src=http%3A%2F%2Fimg.bqatj.com%2Fimg%2F4e384e839d6b6e96.jpg"
                alt
              />
            </li>
            <li>
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593447137003&di=8e2c8ba51d3018e302c66a0bd851c7e8&imgtype=0&src=http%3A%2F%2Fimg.bqatj.com%2Fimg%2F4e384e839d6b6e96.jpg"
                alt
              />
            </li>
            <li>
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593447137003&di=8e2c8ba51d3018e302c66a0bd851c7e8&imgtype=0&src=http%3A%2F%2Fimg.bqatj.com%2Fimg%2F4e384e839d6b6e96.jpg"
                alt
              />
            </li>
            <li>
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593447137003&di=8e2c8ba51d3018e302c66a0bd851c7e8&imgtype=0&src=http%3A%2F%2Fimg.bqatj.com%2Fimg%2F4e384e839d6b6e96.jpg"
                alt
              />
            </li>
            <li>
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593447137003&di=8e2c8ba51d3018e302c66a0bd851c7e8&imgtype=0&src=http%3A%2F%2Fimg.bqatj.com%2Fimg%2F4e384e839d6b6e96.jpg"
                alt
              />
            </li>
            <li>
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593447137003&di=8e2c8ba51d3018e302c66a0bd851c7e8&imgtype=0&src=http%3A%2F%2Fimg.bqatj.com%2Fimg%2F4e384e839d6b6e96.jpg"
                alt
              />
            </li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="禁启用">
        <el-radio-group v-model="form.resource">
          <el-radio label="禁用"></el-radio>
          <el-radio label="启用"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="danger">确定</el-button>
      </el-form-item>
    </el-form>
    <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>-->
  </el-dialog>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    flagVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 弹窗显示/关闭标记
			dialogVisible: false,
			// 表单
      form: {
        parking_name: "",
        area: "",
        type: ""
      }
    };
  },
  methods: {
    close() {
      this.$emit("update:flagVisible", false); // {}
    }
  },
  watch: {
    flagVisible: {
      handler(newValue, oldValue) {
        this.dialogVisible = newValue;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
</style>