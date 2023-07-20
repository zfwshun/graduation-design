<template>
  <div class="layout-header-container d-flex justify-content-between align-items-center p-3">
    <!-- 左侧标题 -->
    <div class="layout-header-left d-flex align-items-center user-select-none">
      <h4 class="layout-header-left-title ml-3 h4style">公众号信息采集系统</h4>
    </div>

    <!-- 右侧按钮区域 -->
    <div class="layout-header-right">
      <el-dropdown  @command="command"  v-if="userInfo.username">
        <span class="el-dropdown-link">
          <el-avatar :size="30" src=""  style="vertical-align: middle;margin-right: 10px;"></el-avatar>
          <span>{{ userInfo.username }}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="user">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    // 下拉菜单操作
    command (val) {
      if (val === 'user') {
        this.$router.push('/home/user_manage')
      } else if (val === 'logout') {
        this.logout()
      }
    },
    // 退出登录
    logout () {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.layout-header-container {
  height: 60px;
  border-bottom: 1px solid #eaeaea;
}
/deep/ .h4style {
  margin: 0;
}
</style>
