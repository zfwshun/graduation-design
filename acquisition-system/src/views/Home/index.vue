<template>
  <div class="home-container">
    <Header></Header>
    <div class="home-main-box">
      <Aside></Aside>
      <div class="home-main-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// 头部区域组件
import Header from '../../components/Header'
// 左侧边栏组件
import Aside from '../../components/Aside'
import store from '@/store'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  // 注册组件
  components: {
    Header,
    Aside
  },
  methods: {
    // 获取用户信息
    async getUserInfo () {
      try {
        await this.$store.dispatch('user/getUserInfo')
      } catch (e) {
        // 错误提示弹出
        this.$message.error(e)
        await store.dispatch('user/logout')
        await this.$router.replace('/login')
      }
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.home-main-box {
  height: 100%;
  display: flex;
}
.home-main-body {
  padding: 15px;
  flex: 1;
  overflow: scroll;
}
</style>
