<template>
  <div class="parking-add">
    <VueForm ref="vuForm" :formData="form_data" :formItme="form_item" :formHandler="form_handler">
      <template v-slot:maintain>
          <el-row :gutter="30">
            <el-col :span="6">
              <el-date-picker v-model="form_data.maintainDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :span="6">下次保养日期：2020-12-12</el-col>
          </el-row>
      </template>
      <template v-slot:energy>
          <el-radio-group v-model="form_data.energyType" @change="changeEnergyType">
            <el-radio v-for="item in energyType" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
          <div class="progress-bar-wrap" v-if="form_data.energyType == 3 || form_data.energyType == 1">
            <span class="label-text">电量：</span>
            <el-row>
              <el-col :span="10">
                <el-slider v-model="form_data.electric" show-input></el-slider>
              </el-col>
            </el-row>
          </div>
          <div class="progress-bar-wrap" v-if="form_data.energyType == 3 || form_data.energyType == 2">
            <span class="label-text">油量：</span>
            <el-row>
              <el-col :span="10">
                <el-slider v-model="form_data.oil" show-input></el-slider>
              </el-col>
            </el-row>
          </div>
      </template>
      <template v-slot:carsAttr>
        <el-button type="primary" @click="addCarsAttr">添加汽车属性</el-button>
          <div class="cars-attr-list" v-for="(item, index) in cars_attr" :key="item.key">
            <el-row :gutter="10">
              <el-col :span="2">
                <el-input v-model="item.attr_key"></el-input>
              </el-col>
              <el-col :span="3">
                <el-input v-model="item.attr_value"></el-input>
              </el-col>
              <el-col :span="6">
                <el-button @click="delCarsAttr(index)">删除</el-button>
              </el-col>
            </el-row>
          </div>
      </template>
      <template v-slot:content>
          <div ref="editorDom" style="text-align: left;"></div>
      </template>
    </VueForm>
  </div>
</template>
<script>
// 富文本编辑器
import Editor from "wangeditor";
// 组件
import VueForm from "@c/form";
// API
import { GetCarsBrand, GetParking } from "@/api/common";
import { CarsAdd } from "@/api/cars";
export default {
  name: "ParkingAdd",
  components: { VueForm },
  data() {
    return {
      // 富文本对象
      editor: null,
      // 能源类型
      energyType: this.$store.state.config.energyType,
      cars_attr: [],
      form_item: [
        { 
          type: "Select", 
          label: "车辆品牌", 
          placeholder: "请选择车辆品牌",
          prop: "carsBrandId",
          select_vlaue: "id",   // 自有的私有属性
          select_label: "nameCh",
          options: [],
          required: true
        },
        { 
          type: "Select", 
          label: "停车场", 
          placeholder: "请选择停车场",
          select_vlaue: "id",   // 自有的私有属性
          select_label: "parkingName",
          prop: "parkingId",
          options: [],
          required: true
        },
        { 
          type: "Input", 
          label: "车辆型号", 
          placeholder: "请输入车辆型号",
          prop: "carsMode",
          required: true
        },
        { 
          type: "Input", 
          label: "车牌号", 
          placeholder: "请输入车牌号",
          prop: "carsNumber",
          required: true
        },
        { 
          type: "Input", 
          label: "车架号", 
          placeholder: "请输入车架号",
          prop: "carsFrameNumber",
          required: true
        },
        { 
          type: "Input", 
          label: "发动机号", 
          placeholder: "请输入发动机号",
          prop: "engineNumber",
          required: true
        },
        { 
          type: "Radio", 
          label: "年检", 
          placeholder: "请选择年检",
          prop: "yearCheck",
          options: this.$store.state.config.year_check
        },
        { 
          type: "Slot", 
          slotName: "maintain", 
          prop:"maintainDate", 
          label: "保养日期"
        },
        { 
          type: "Radio", 
          label: "档位", 
          placeholder: "请选择档位",
          prop: "gear",
          options: this.$store.state.config.gear
        },
        { 
          type: "Slot", 
          slotName: "energy", 
          prop:"energyType", 
          label: "能源类型"
        },
        { 
          type: "Disabled", 
          label: "禁启用", 
          placeholder: "请选择禁启用",
          prop: "status"
        },
        { 
          type: "Slot", 
          slotName: "carsAttr", 
          prop:"carsAttr", 
          label: "车辆属性"
        },
        { 
          type: "Slot", 
          slotName: "content", 
          prop:"content", 
          label: "车辆描述"
        },
      ],
      form_handler: [
        { label: "确定", key: "submit",  type: "danger", handler: () => this.formValidate() },
        { label: "重置", key: "reset" },
      ],
      form_data: {
        parkingId: "",
        carsBrandId:"",
        carsMode: "",
        carsNumber: "",
        carsFrameNumber: "",
        engineNumber: "",
        yearCheck: true,
        gear: 1,
        energyType: 2,
        electric: 100,
        oil: 100,
        carsAttr: "",
        content: "",
        maintainDate: "",
        status: true
      },
      // 车辆品牌列表
      carsBrandList: []
    }
  },
  beforeMount(){
    this.getCarsBrandList();
    this.getParkingList();
  },
  mounted() {
    this.createEditor();
  },
  methods: {
    formValidate() {
      this.formatCarsAttr();
      this.$refs.vuForm.$refs.form.validate((valid) => {
        if (valid) {
            CarsAdd(this.form_data).then(response => {
              this.$message({
                message: response.data.message,
                type: "success"
              })
            })
        } else {
            console.log('error submit!!');
            return false;
        }
      });
    },
    // 获取车辆品牌
    getCarsBrandList(){
      GetCarsBrand().then(response => {
        const data = response.data.data;
        if(data) {
          const carsBrand = this.form_item.filter(item => item.prop == "carsBrandId");
          if(carsBrand.length > 0) {
            carsBrand[0].options = data;
          }
        }
      })
    },
    // 获取停车场
    getParkingList(){
      GetParking().then(response => {
        const data = response.data.data;
        if(data) {
          const parking = this.form_item.filter(item => item.prop == "parkingId");
          if(parking.length > 0) {
            parking[0].options = data;
          }
        }
      })
    },
    /** 添加车辆属性 */
    addCarsAttr() {
      this.cars_attr.push({ attr_key: "", attr_value: "" });
    },
    /** 删除车辆属性 */
    delCarsAttr(index){
      this.cars_attr.splice(index, 1); // 第一个参数：指定数组索引位置， 第二参数：从指定位置开始删除多少个。删除数组的指定元素
    },
    /** 车辆属性格式化 */
    formatCarsAttr(){
      const data = this.cars_attr;
      if(data && data.length == 0) { return false; }
      const carsAttr = {};
      data.forEach(item => {
        if(item.attr_key) {
          carsAttr[item.attr_key] = item.attr_value
        }
      })
      this.form_data.carsAttr = JSON.stringify(carsAttr);
    },
    /** 创建富文本对象 */
    createEditor() {
      this.editor = new Editor(this.$refs.editorDom);
      this.editor.customConfig.onchange = html => {
        this.form_data.content = html;
      };
      this.editor.create(); // 创建富文本实例
    },
    changeEnergyType(value){
      this.form_data.oil = 0;
      this.form_data.electric = 0;
    }
  }
};
</script>
<style lang="scss">
.cars-attr-list {
  margin-top: 15px;
  overflow: hidden;
}
</style>