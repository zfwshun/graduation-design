<template>
  <div class="login-container">
    <!--    注册-->
    <div class="box">
      <h4 style="text-align: center;margin-bottom: 20px;color: #606266;">注册</h4>
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
        <el-form-item label="邮箱">
          <el-input v-model="email" placeholder="请输入邮箱地址" class="input"></el-input>
        </el-form-item>
        <el-form-item label="动态码"  style="position: relative;">
          <el-input v-model="inputDynamicCode" placeholder="请输入动态码" class="codeInput"></el-input>
          <el-button plain style="position: absolute;top: 0;right: 0;width: 90px;text-align: center;padding: 12px 0;" @click="getDynamicCode">获取动态码</el-button>
        </el-form-item>
      </el-form>
      <div class="options" style="text-align: center;">
        <div class="buttons" style="margin-bottom: 15px">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
        <el-link type="primary" :underline="false" @click="goLogin">已有账号，去登录</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import identifyCode from '@/components/IdentifyCode'
import { mapState } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    identifyCode
  },
  data () {
    return {
      username: '',
      password: '',
      // 验证码
      code: '',
      email: '',
      // 邮箱动态码
      inputDynamicCode: '',
      // 验证码
      identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz', // 随机串内容
      identifyCode: '',
      // 校验
      rules: {
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState('user', ['dynamicCode'])
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
    // 获取邮箱动态码
    async getDynamicCode () {
      if (this.code.toLowerCase() === this.identifyCode.toLowerCase()) {
        try {
          await this.$store.dispatch('user/getDynamicCode', this.email)
        } catch (e) {
          // 错误提示弹出
          this.email = ''
          this.$message.error(e)
        }
      } else {
        this.$message.error('验证码错误')
        this.code = ''
        this.makeCode(4)
      }
    },
    // 注册
    async register () {
      // 前端验证码验证
      if (this.inputDynamicCode === this.dynamicCode) {
        try {
          await this.$store.dispatch('user/register', {
            username: this.username,
            password: this.password,
            email: this.email
          })
          // 弹出提示框
          await this.$alert('用户注册成功，去登录', '提示', {
            confirmButtonText: '登录',
            showClose: false,
            callback: () => {
              this.$router.push('/login')
            }
          })
        } catch (e) {
          // 错误提示弹出
          this.$message.error(e)
          this.code = ''
          this.inputDynamicCode = ''
          this.makeCode(4)
        }
      } else {
        this.$message.error('动态码错误')
        this.inputDynamicCode = ''
      }
    },
    // 重置输入框
    reset () {
      this.username = ''
      this.password = ''
      this.code = ''
    },
    // 跳转到登录页面
    goLogin () {
      this.$router.push('/login')
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
