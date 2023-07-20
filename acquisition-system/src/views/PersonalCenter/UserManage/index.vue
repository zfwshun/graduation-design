<template>
  <div class="user-manager-container">
    <el-form label-position="left" label-width="100px">
      <el-form-item label="头像" style="height: 100px;" class="avatar">
        <el-avatar :size="100" :src="userInfo.avatar"  style="margin-left: 50px;"></el-avatar>
      </el-form-item>
      <el-form-item label="用户名">
        <div style="width: 200px;text-align: center;">{{userInfo.username}}</div>
      </el-form-item>
      <el-form-item label="邮箱">
        <div style="width: 200px;text-align: center;">{{userInfo.email}}</div>
      </el-form-item>
      <el-button type="primary" @click="logout" style="margin-left: 100px;">退出登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'UserManage',
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    // 退出登录
    logout () {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
.user-manager-container {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
el-form {
  flex: 1;
}
.avatar /deep/ label {
  height: 100px;
  line-height: 100px;
}
</style>
