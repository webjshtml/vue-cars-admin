<template>
  <div class="parking-add">
    <VueForm ref="vuForm" :formData="form_data" :formItme="form_item" :formHandler="form_handler">
      <template v-slot:maintain>
          <el-row :gutter="30">
            <el-col :span="6">
              <el-input v-model="form_data.maintainDate"></el-input>
            </el-col>
            <el-col :span="6">下次保养日期：2020-12-12</el-col>
          </el-row>
      </template>
      <template v-slot:energy>
          <el-radio-group v-model="form_data.energyType">
            <el-radio :label="1">电</el-radio>
            <el-radio :label="2">油</el-radio>
            <el-radio :label="3">混合动力</el-radio>
          </el-radio-group>
          <div class="progress-bar-wrap" v-if="form_data.energyType == 3 || form_data.energyType == 1">
            <span class="label-text">电量：</span>
            <el-row :gutter="20">
              <el-col :span="5">
                <div class="progress-bar">
                  <span style="width: 50%;">
                    <label>{{form_data.electric}}%</label>
                  </span>
                </div>
              </el-col>
              <el-col :span="2">
                <el-input size="small" value="100" v-model="form_data.electric"></el-input>
              </el-col>
            </el-row>
          </div>
          <div class="progress-bar-wrap" v-if="form_data.energyType == 3 || form_data.energyType == 2">
            <span class="label-text">油量：</span>
            <el-row :gutter="20">
              <el-col :span="5">
                <div class="progress-bar">
                  <span style="width: 50%;">
                    <label>{{form_data.oil}}%</label>
                  </span>
                </div>
              </el-col>
              <el-col :span="2">
                <el-input size="small" value="100" v-model="form_data.oil"></el-input>
              </el-col>
            </el-row>
          </div>
      </template>
      <template v-slot:carsAttr>
          <div class="cars-attr-list" v-for="(item, index) in cars_attr" :key="item.key">
            <el-row :gutter="10">
              <el-col :span="2">
                <el-input value="100"></el-input>
              </el-col>
              <el-col :span="3">
                <el-input value="100"></el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" v-if="index == 0" @click="addCarsAttr">+</el-button>
                <el-button v-else>-</el-button>
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

export default {
  name: "ParkingAdd",
  components: { VueForm },
  data() {
    return {
      // 富文本对象
      editor: null,
      cars_attr: [
        { key1: 111, value1: 222 },
        { key2: 111, value2: 222 },
        { key3: 111, value3: 222 },
        { key4: 111, value4: 222 }
      ],
      form_item: [
        { 
          type: "Select", 
          label: "车辆品牌", 
          placeholder: "请选择车辆品牌",
          prop: "carsBrandId",
          select_vlaue: "id",   // 自有的私有属性
          select_label: "nameCh",
          options: []
        },
        { 
          type: "Select", 
          label: "停车场", 
          placeholder: "请选择停车场",
          select_vlaue: "id",   // 自有的私有属性
          select_label: "parkingName",
          prop: "parkingId",
          options: []
        },
        { 
          type: "Input", 
          label: "车辆型号", 
          placeholder: "请输入车辆型号",
          prop: "carsMode"
        },
        { 
          type: "Input", 
          label: "车牌号", 
          placeholder: "请输入车牌号",
          prop: "carsNumber"
        },
        { 
          type: "Input", 
          label: "车架号", 
          placeholder: "请输入车架号",
          prop: "carsFrameNumber"
        },
        { 
          type: "Input", 
          label: "发动机号", 
          placeholder: "请输入发动机号",
          prop: "engineNumber"
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
        gear: true,
        energyType: "",
        electric: "",
        oil: "",
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
      console.log("submit!");
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
      this.cars_attr.push({ key4: 111, value4: 222 });
    },
    /** 创建富文本对象 */
    createEditor() {
      this.editor = new Editor(this.$refs.editorDom);
      this.editor.customConfig.onchange = html => {};
      this.editor.create(); // 创建富文本实例
    }
  }
};
</script>
<style lang="scss">
.progress-bar-wrap {
    padding-left: 50px;
    margin-top: 10px;
    position: relative;
    .label-text {
        position: absolute;
        left: 0;
    }
}
.progress-bar {
    height: 10px;
    width: 100%;
    border-radius: 50px;
    background-color: #ccc;
    margin-top: 15px;
    span {
        position: relative;
        display: block;
        height: 100%;
        background-color: #409eff;
        border-radius: 50px;
    }
    label {
        position: absolute;
        right: 0;
        bottom: 10%;
    }
}
.cars-attr-list {
  margin-bottom: 15px;
  overflow: hidden;
}
</style>