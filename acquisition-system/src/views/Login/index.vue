<template>
  <div class="login-container">
<!--    登录-->
    <div class="box">
      <h4 style="text-align: center;margin-bottom: 20px;color: #606266;">登录</h4>
      <el-form label-position="left" label-width="60px">
        <el-form-item label="用户名">
          <el-input v-model="username" placeholder="请输入用户名" class="input"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" placeholder="请输入密码" show-password class="input"></el-input>
        </el-form-item>
        <el-form-item label="验证码" style="position: relative;">
          <el-input v-model="code" placeholder="请输入验证码" class="codeInput"></el-input>
          <div class="codeImg" @click="refreshCode" style="position: absolute;top: 0;right: 0;">
            <identifyCode :identifyCode="identifyCode"></identifyCode>
          </div>
        </el-form-item>
      </el-form>
      <div class="options" style="text-align: center;">
        <div class="buttons" style="margin-bottom: 15px">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
        <el-link type="primary" :underline="false" @click="goRegister">没有账号，去注册</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import identifyCode from '@/components/IdentifyCode'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    identifyCode
  },
  data () {
    return {
      username: '',
      password: '',
      code: '',
      // 验证码
      identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz', // 随机串内容
      identifyCode: '',
      // 校验
      rules: {
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 刷新验证码
    refreshCode () {
      this.makeCode(4)
    },
    // 生成数字与字母组成的验证码
    makeCode (length) {
      this.identifyCode = ''
      for (let i = 0; i < length; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    },
    // 生成随机数
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 登录
    async login () {
      // 前端验证码验证
      if (this.code.toLowerCase() === this.identifyCode.toLowerCase()) {
        const userInfo = {
          username: this.username,
          password: this.password
        }
        try {
          await this.$store.dispatch('user/login', userInfo)
          await this.$router.push('/home')
        } catch (e) {
          // 错误提示弹出
          this.$message.error(e)
          this.code = ''
          this.makeCode(4)
        }
      } else {
        this.$message.error('验证码错误')
        this.code = ''
        this.makeCode(4)
      }
    },
    // 重置输入框
    reset () {
      this.username = ''
      this.password = ''
      this.code = ''
    },
    // 跳转到注册页面
    goRegister () {
      this.$router.push('/register')
    }
  },
  // 初始化验证码
  created () {
    this.makeCode(4)
  }
}
</script>

<style scoped>
.login-container {
  background-color: #35495e;
  height: 100%;
}
.box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 3px;
  padding: 20px 30px 15px 30px;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
}
/deep/ .input {
  width: 240px;
}
.codeInput {
  width: 130px;
}
</style>
