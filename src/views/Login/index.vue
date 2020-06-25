<template>
<div id="login">
<div class="form-wrap">
<ul class="menu-tab">
<li @click="toggleHigh(item.type)" :class="{'current': current_menu === item.type}" v-for="item in menu_switch_item" :key="item.type">{{ item.label }}</li>
</ul>
<el-form ref="form" :model="form" :rules="form_rules">
  <el-form-item prop="name">
    <label class="form-label">用户名</label>
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item prop="password">
    <label class="form-label">密码</label>
    <el-input type="password" v-model="form.password"></el-input>
  </el-form-item>
  <el-form-item prop="passwords" v-show="current_menu === 'register'">
    <label class="form-label">确认密码</label>
    <el-input type="password" v-model="form.passwords"></el-input>
  </el-form-item>
  <el-form-item prop="code">
    <label class="form-label">验证码</label>
    <el-row :gutter="10">
      <el-col :span="14">
        <el-input v-model="form.code"></el-input>
      </el-col>
      <el-col :span="10">
        <el-button type="success" class="el-button-block" @click="getCodeFn()" :disabled="code_disabled" :loading="code_loading">{{ code_text }}</el-button>
      </el-col>
    </el-row>
  </el-form-item>
  <el-form-item>
    <el-button type="danger" class="el-button-block" :disabled="submit_disabled" @click="submitForm('form')">{{ current_menu === "login" ? "登录": "注册"}}</el-button>
  </el-form-item>
</el-form>
</div>
</div>
</template>

<script>
import sha1 from "js-sha1";
import { reactive, ref, set } from "@vue/composition-api";
import { validate_email, validate_password } from "@/utils/validate";
import { GetCode, Register, Login } from "@/api/login";
import { mapStat } from "vuex";
export default {
  name: "Login",
  setup(props, { root, refs }){
    const menu_switch_item = reactive([
      { type: "login", label: "登录" },
      { type: "register", label: "注册" }
    ])
    let current_menu = ref(menu_switch_item[0].type);
    const form = reactive({
      name: "",
      password: "",
      passwords: "",
      code: ""
    })
    let code_text = ref("获取验证码");
    let code_loading = ref(false);
    let code_disabled = ref(false);
    let timer = ref(null);
    let submit_disabled = ref(true);
    /**
     * 自定义检验规则
     */
    // 检验邮箱
    const validate_name_rules = (rule, value, callback) => {
      let regEmail = validate_email(value);
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if(!regEmail) {
        callback(new Error("邮箱格式不正确"));
      } else {
        callback();
      }
    };
    // 检验密码
    const validate_password_rules = (rule, value, callback) => {
      let regPassword = validate_password(value);
      let passwords_value = form.passwords;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if(!regPassword){
        callback(new Error("请入 >=6 并且 <= 20 位的密码，包含数字、字母"));
      } else if(passwords_value && passwords_value !== value) {
        callback(new Error("两次密码不一致，请重新输入"));
      } else {
        callback();
      }
    };
    // 检验确认密码
    const validate_passwords_rules = (rule, value, callback) => {
      let password_value = form.password;
      if(current_menu.value === "login") {
        callback();
        return false;
      }
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if(password_value !== value) {
        callback(new Error("两次密码不一致，请重新输入"));
      } else {
        callback();
      }
    }; 
    // 检验验证码
    const validate_code_rules = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if(value.length !== 6) {
        callback(new Error("请输入长度为6位数的验证码"));
      } else {
        callback();
      }
    };
    // 检验规则
    const form_rules = reactive({
      name: [ 
        { validator: validate_name_rules, trigger: 'blur' }
      ],
      password: [
        { validator: validate_password_rules, trigger: 'blur' }
      ],
      passwords: [
        { validator: validate_passwords_rules, trigger: 'blur' }
      ],
      code: [
        { validator: validate_code_rules, trigger: 'blur' }
      ]
    });
    // 切换样式方法
    const toggleHigh = ((type) => {
      current_menu.value = type;
    })
    // 倒计时
    const countdown = ((number) => {
      let second = number;
      // 禁用按钮
      code_disabled.value = true;
      // 按钮文本
      code_text.value = `倒计进${second}秒`;
      timer = setInterval(() => {
        second--;
        code_text.value = `倒计进${second}秒`;
        if(second < 0) {
          code_text.value = `重新获取`;
          // 启用按钮
          code_disabled.value = false;
          clearInterval(timer);
        }
      }, 1000)
    })
    // 获取验证码方法
    const getCodeFn = (() => {
      if(form.name === "") {
        root.$message.error("邮箱不能为空！！");
        return false;
      }
      if(!validate_email(form.name)) {
        root.$message({
          message: "邮箱格式有误，请重新输入！！",
          type: "error"
        })
        return false;
      }
      let requestData = {
        username: form.name,
        module: current_menu.value
      };
      code_text.value = "发送中";
      code_loading.value = true;
      GetCode(requestData).then(response => {
        console.log(response)  // 这里打印拦截器返回的信息，response是自定义参数。
        root.$message({
          message: response.message,
          type: "success"
        })
        // 激活按钮
        submit_disabled.value = false;
        // 清除加载
        code_loading.value = false;
        // 执行倒计时方法
        countdown(60);
      }).catch(error => {
        code_text.value = "重新获取";
        code_loading.value = false;
      })
    })
    // 提交表单
    const submitForm = (formName => {
      refs[formName].validate((valid) => {
        // 表单验证通过
        if (valid) {
          // 三元运算
          current_menu.value === 'login' ? login() : register()
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }) 
    // 登录
    const login = (() => {
      const requestData = {
        username: form.name,
        password: sha1(form.password),
        code: form.code
      }
      root.$store.dispatch('app/loginAction', requestData).then(response => {
        root.$message({
          message: response.message,
          type: "success"
        })
        // 页面跳转
        root.$router.push({ name: 'ConsoleIndex' })
      }).catch(error => {
        // 重置数据
        reset();
      })
    })
    // 注册
    const register = (() => {
      const requestData = {
        username: form.name,
        password: sha1(form.password),
        code: form.code
      }
      Register(requestData).then(response => {
        root.$message({
          message: response.message,
          type: "success"
        })
        // 重置数据
        reset();
      }).catch(error => {
        // 重置数据
        reset();
      })
    })
    // 重置
    const reset = (() => {
      // 重置表单
      refs["form"].resetFields();
      // 修改模块
      current_menu.value = "login";
      // 判断定时器是否存在，存在则清除
      if(timer) { clearInterval(timer); }
      // 还原获取验码按钮状态
      code_disabled.value = false;
      code_text.value = "获取验证码";
    })
    return {
      form, menu_switch_item, current_menu, form_rules, code_text, code_loading, code_disabled, submit_disabled,
      toggleHigh, getCodeFn, submitForm, login, register
    }
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.form-wrap {
  width: 300px;
  padding-top: 100px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    padding: 10px 24px;
    margin: 0 10px;
    color: #fff;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
    &.current { background-color: rgba(0, 0, 0, .1);}
  }
}
.form-label {
  display: block;
  color: #fff;
  font-size: 14px;
}
</style>