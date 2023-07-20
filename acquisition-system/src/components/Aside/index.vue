<template>
  <div class="layout-aside-container">
<!--    侧边导航栏-->
    <el-menu :default-active="this.$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" router unique-opened>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span slot="title">数据采集</span>
        </template>
        <el-menu-item index="/home/history_article_list" class="marginEL">历史发文列表</el-menu-item>
        <el-menu-item index="/home/article_info" class="marginEL">文章信息</el-menu-item>
        <el-menu-item index="/home/public_accounts_info" class="marginEL">公众号信息</el-menu-item>
        <el-menu-item index="/home/search_article" class="marginEL">搜索文章</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span slot="title">数据分析</span>
        </template>
        <el-menu-item index="/home/article_analysis" class="marginEL">文章分析</el-menu-item>
        <el-menu-item index="/home/public_account_analysis" class="marginEL">公众号发文分析</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span slot="title">个人中心</span>
        </template>
        <el-menu-item index="/home/user_manage" class="marginEL">用户管理</el-menu-item>
        <el-menu-item index="/home/history_options" class="marginEL">历史操作记录</el-menu-item>
      </el-submenu>
    </el-menu>
<!--    展开折叠按钮-->
    <div class="collapse-container">
      <div @click="openMenu" v-if="!isShow">
        <i class="el-icon-arrow-right"></i>
      </div>
      <div @click="closeMenu" v-if="isShow">
        <i class="el-icon-arrow-left"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Aside',
  data () {
    return {
      isCollapse: false,
      isShow: true
    }
  },
  methods: {
    openMenu () {
      this.isCollapse = false
      this.isShow = true
    },
    closeMenu () {
      this.isCollapse = true
      this.isShow = false
    }
  }
}
</script>

<style scoped>
.layout-aside-container {
  position: relative;
}
/deep/ .marginEL{
  padding-left: 64px !important;
}

.collapse-container {
  position: absolute;
  top: 20px;
  right: -25px;
  width: 25px;
  height: 20px;
  border: 1px solid #e6e6e6;
  border-left: none;
}
.collapse-container div {
  padding-left: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
.el-menu--collapse {
  height: 100%;
}
</style>
