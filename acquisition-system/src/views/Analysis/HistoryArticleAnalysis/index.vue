<template>
  <div class="settings-container">
    <div class="search-container">
      <el-input v-model="name" placeholder="请输入公众号名称" class="input"/>
      <el-button type="primary" plain icon="el-icon-search" @click="clickSearchButton">搜索</el-button>
      <el-tooltip class="item" effect="dark" :content="content" placement="bottom-start" style="display: inline-block;">
        <i class="el-icon-info icon-style"></i>
      </el-tooltip>
    </div>
      <el-row :gutter="20" class="el-row data1">
        <el-col :span="5">
          <div>
            <el-statistic :value="data.fans" title="预计粉丝数"></el-statistic>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <el-statistic :value="data.avg_top_read" title="头条平均阅读"></el-statistic>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <el-statistic :value="data.avg_top_zan" title="头条平均点赞"></el-statistic>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <el-statistic :value="data.week_articles" title="最近一周发文量"></el-statistic>
          </div>
        </el-col>
        <el-col :span="7">
          <div>
            <el-statistic title="最新发文时间">
              <template slot="formatter"> {{ data.latest_publish_time }}</template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="el-row data2">
        <el-col :span="5">
          <div>
            <el-statistic :value="data.fans1" title="阅读量10w+数">0</el-statistic>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <el-statistic :value="data.avg_top_read1" title="阅读量总量">762048</el-statistic>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <el-statistic :value="data.avg_top_zan1" title="头条数">486</el-statistic>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <el-statistic :value="data.week_articles1" title="原创文章数">6</el-statistic>
          </div>
        </el-col>
        <el-col :span="7">
          <div>
            <el-statistic :value="data.qw" title="原创比"></el-statistic>
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'HIstoryArticleAnalysis',
  data () {
    return {
      name: '',
      content: '公众号发文分析',
      data: {
        fans: 56056,
        avg_top_read: 1568,
        avg_top_zan: 8,
        week_articles: 0,
        latest_publish_time: '2023-05-09 16:06',
        fans1: 0,
        avg_top_read1: 762048,
        avg_top_zan1: 486,
        week_articles1: 6,
        qw: 0.0123
      }
    }
  },
  computed: {
    ...mapState('analysis', ['historyArticlesAnalysis'])
  },
  methods: {
    // 点击搜索按钮
    clickSearchButton () {
      if (this.name !== '') {
        this.getHistoryArticlesAnalysis()
      } else {
        this.$message({
          showClose: true,
          message: '输入不能为空'
        })
        this.$store.commit('analysis/CLEARHISTORYARTICLESANALISIS')
      }
    },
    // 获取历史发文分析数据
    async getHistoryArticlesAnalysis () {
      console.log(this.name)
      try {
        await this.$store.dispatch('analysis/getHistoryArticlesAnalysis', this.name)
      } catch (e) {
        // 错误提示弹出
        await this.$alert(e, '提示', {
          confirmButtonText: '确定',
          callback: (action) => {
            if (action === 'cancel') {
              this.$message({
                message: '用户取消操作'
              })
            } else {
              this.name = ''
            }
          }
        })
      }
    }
  },
  // 在组件销毁前清空数据
  beforeDestroy () {
    this.$store.commit('analysis/CLEARHISTORYARTICLESANALISIS')
  }
}
</script>

<style scoped lang="less">
.settings-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.search-container {
  position: relative;
  width: 100%;
  height: 40px;
  margin-top: 20px;
  text-align: center;
}
/deep/ .input {
  width: 400px;
  margin-right: 30px;
}
// 说明样式
.item {
  position: absolute;
  top: 14px;
  left: 40px;
}
.icon-style {
  display: inline-block;
  width: 14px;
  height: 14px;
  transform: scale(1.5);
}
/deep/.el-statistic .head {
  margin-bottom: 20px;
}
.data1, .data2 {
  flex: 1;
  width: 1000px;
  height: 100px;
}
.data1 {
  margin-top: 100px;
}
</style>
