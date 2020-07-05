<template>
    <div class="parking-add">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="车辆品牌">
                <el-select>
                    <el-option>福特</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="车辆型号">
                <el-select>
                    <el-option>HHHH</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="停车场">
                <el-select>
                    <el-option>南山停车场</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="车牌号">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="车架号">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="发动机号">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="年检">
                <el-radio-group v-model="form.resource">
                    <el-radio label="已年检"></el-radio>
                    <el-radio label="未年检"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="保养日期">
                <el-row :gutter="30">
                    <el-col :span="6"><el-input v-model="form.name"></el-input></el-col>
                    <el-col :span="6">下次保养日期：2020-12-12</el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="档位">
                <el-radio-group v-model="form.resource">
                    <el-radio label="自动档"></el-radio>
                    <el-radio label="手动"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="能源类型">
                <el-radio-group v-model="form.energy">
                    <el-radio :label="1">电</el-radio>
                    <el-radio :label="2">油</el-radio>
                    <el-radio :label="3">混合动力</el-radio>
                </el-radio-group>
                <div class="progress-bar-wrap" v-if="form.energy == 3 || form.energy == 1">
                    <span class="label-text">电量：</span>
                    <el-row :gutter="20">
                        <el-col :span="5">
                            <div class="progress-bar">
                                <span style="width: 50%;">
                                    <label>90%</label>
                                </span>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <el-input size="small" value="100"></el-input>
                        </el-col>
                    </el-row>
                </div>
								<div class="progress-bar-wrap" v-if="form.energy == 3 || form.energy == 2">
                    <span class="label-text">油量：</span>
                    <el-row :gutter="20">
                        <el-col :span="5">
                            <div class="progress-bar">
                                <span style="width: 50%;">
                                    <label>90%</label>
                                </span>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <el-input size="small" value="100"></el-input>
                        </el-col>
                    </el-row>
                </div>
            </el-form-item>
            <el-form-item label="禁启用">
                <el-radio-group v-model="form.resource">
                    <el-radio label="禁用"></el-radio>
                    <el-radio label="启用"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="车辆属性">
							<div class="cars-attr-list" v-for="(item, index) in cars_attr" :key="item.key">
								<el-row :gutter="10">
									<el-col :span="2"><el-input value="100"></el-input></el-col>
									<el-col :span="3"><el-input value="100"></el-input></el-col>
									<el-col :span="6">
										<el-button type="primary" v-if="index == 0" @click="addCarsAttr">+</el-button>
										<el-button v-else>-</el-button>
									</el-col>
								</el-row>
							</div>
            </el-form-item>
            <el-form-item label="车辆描述">
							<div ref="editorDom" style="text-align: left;"></div>
            </el-form-item>
            <el-form-item>
                <el-button type="danger">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
// 富文本编辑器
import Editor from "wangeditor";
export default {
    name: "ParkingAdd",
    data() {
      return {
				// 富文本对象
				editor: null,
				cars_attr: [
					{ key1: 111, value1: 222 },
					{ key2: 111, value2: 222 },
					{ key3: 111, value3: 222 },
					{ key4: 111, value4: 222 },
				],
        form: {
					energy: 1,
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
		},
		mounted(){
			this.createEditor();
		},
    methods: {
      onSubmit() {
        console.log('submit!');
			},
			/** 添加车辆属性 */
			addCarsAttr(){
				this.cars_attr.push({key4: 111, value4: 222});
			},
			/** 创建富文本对象 */
			createEditor(){
				this.editor = new Editor(this.$refs.editorDom); 
				this.editor.customConfig.onchange = html => {};
				this.editor.create(); // 创建富文本实例
			}
    }
}
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>