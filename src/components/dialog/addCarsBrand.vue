<template>
  <!--dialog 弹窗
    子组件接收父组件的数据，是通过属性接收
  -->
  <el-dialog
    title="新增车辆品牌"
    :visible.sync="dialogVisible"
    class="cars-dialog-center"
    @close="close"
    @opened="opened"
    :close-on-click-modal="false"
  >
    <!--内容区-->
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="品牌中文" prop="nameCh">
        <el-input v-model="form.nameCh"></el-input>
      </el-form-item>
      <el-form-item label="品牌英文" prop="nameEn">
        <el-input v-model="form.nameEn"></el-input>
      </el-form-item>
      <el-form-item label="LOGO" prop="imgUrl">
        <div class="upload-img-wrap">
          <div class="upload-img">
            <img v-show="logo_current" :src="logo_current" />
          </div>
          <ul class="img-list">
            <li v-for="item in logo" :key="item.id" @click="logo_current = item.img">
              <img :src="item.img" :alt="item.name" />
            </li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="禁启用" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio v-for="item in radio_disabled" :key="item.id" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="submit">确定</el-button>
      </el-form-item>
    </el-form>
    <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>-->
  </el-dialog>
</template>

<script>
import { BrandLogo, BrandAdd } from "@/api/brand";
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
        nameCh: "",
        nameEn: "",
        imgUrl: "",
        status: "",
        content: ""
      },
      // 状态
      radio_disabled: this.$store.state.config.radio_disabled,
      // 选中的LOGO
      logo_current: "",
      // logo
      logo: []
    };
  },
  methods: {
    opened(){
      this.getBrandLogo();
    },
    /** 获取LOGO */
    getBrandLogo(){
      // 存在数据时，不再请求接口
      if(this.logo.length != 0) { return false; }
      // 没有数据时
      BrandLogo().then(response => {
        const data = response.data;
        if(data) { this.logo = data; }
      })
    },
    /** 提交 */
    submit(){
      this.add();
    },
    /** 添加 */
    add(){
      this.form.imgUrl = this.logo_current;
      BrandAdd(this.form).then(response => {
        this.$message({
          type: "success",
          message: response.message
        })
        
      })
    },
    /** 重置表单 */
    reset(formName){
      this.$refs[formName].resetFields();
      // 清除选中的LOGO
      this.logo_current = "";
    },
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