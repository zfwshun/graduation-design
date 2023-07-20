<template>
  <div class="article-analysis-container">
    <div class="search-container">
      <el-input v-model="url" placeholder="请输入文章链接" class="input"/>
      <el-button type="primary" plain icon="el-icon-search" @click="clickSearchButton">搜索</el-button>
      <el-tooltip class="item" effect="dark" :content="content" placement="bottom-start" style="display: inline-block;">
        <i class="el-icon-info icon-style"></i>
      </el-tooltip>
    </div>
    <div class="chart-container">
      <div id="main" style="width: 800px;height: 400px;"></div>
      <div id="main1" style="width: 400px;height: 400px;"></div>
    </div>
    <div class="text-container" v-if="articleAnalysis.keywords!==undefined">
      <a class="text" :href="url" target="_blank">{{url}}</a>
      <div class="text">文章出现次数前三的的词语为：{{articleAnalysis.keywords[0][0]}}、{{articleAnalysis.keywords[1][0]}}、{{articleAnalysis.keywords[2][0]}}</div>
      <div class="text">一共有{{this.articleAnalysis.emotion.reduce((pre,item)=>{return item+pre},0)}}人给出了评论，其中{{emotion[0]}}条消极评论，{{emotion[1]}}条中立评论，{{emotion[2]}}条积极评论</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ArticleAnalysis',
  data () {
    return {
      url: '',
      content: 'article_analysis'
    }
  },
  computed: {
    ...mapState('analysis', ['articleAnalysis']),
    emotion () {
      return [this.articleAnalysis.emotion[0] + this.articleAnalysis.emotion[1],
        this.articleAnalysis.emotion[2],
        this.articleAnalysis.emotion[3] + this.articleAnalysis.emotion[4]
      ]
    }
  },
  methods: {
    // 绘制柱状图
    init () {
      // 关键词柱状图
      const myChart = this.$echarts.init(document.getElementById('main'))
      const keywords = this.articleAnalysis.keywords.map((item) => {
        return item[0]
      })
      const counter = this.articleAnalysis.keywords.map((item) => {
        return item[1]
      })
      // 指定图表的配置项和数据
      const option = {
        title: {
          text: '文章词频'
        },
        tooltip: {},
        legend: {
          data: ['出现次数']
        },
        xAxis: {
          data: keywords
        },
        yAxis: {},
        series: [
          {
            name: '出现次数',
            type: 'bar',
            data: counter
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      // 评论情感分析柱状图
      const myChart1 = this.$echarts.init(document.getElementById('main1'))
      // 指定图表的配置项和数据
      const option1 = {
        title: {
          text: '情感倾向'
        },
        tooltip: {},
        legend: {
          data: ['评论数']
        },
        xAxis: {
          data: ['0-0.2', '0.2-0.4', '0.4-0.6', '0.6-0.8', '0.8-1']
        },
        yAxis: {},
        series: [
          {
            name: '评论数',
            type: 'bar',
            data: this.articleAnalysis.emotion
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(option1)
    },
    // 点击搜索按钮
    clickSearchButton () {
      if (this.url !== '') {
        this.getArticleAnalysis()
      } else {
        this.$message({
          showClose: true,
          message: '输入不能为空'
        })
        this.$store.commit('analysis/CLEARARTICLEANALISIS')
      }
    },
    // 获取文章分析数据
    async getArticleAnalysis () {
      console.log(this.url)
      try {
        await this.$store.dispatch('analysis/getArticleAnalysis', this.url)
        this.init()
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
              this.url = ''
            }
          }
        })
      }
    }
  },
  // 在组件销毁前清空数据
  beforeDestroy () {
    this.$store.commit('analysis/CLEARARTICLEANALISIS')
  }
}
</script>

<style scoped lang="less">
.article-analysis-container {
  position: relative;
  height: 100%;
}
.search-container {
  position: relative;
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
// 图表样式
.chart-container {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
.text-container {
  text-align: center;
}
.text {
  text-align: center;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 20px;
  line-height: 40px;
  height: 40px;
}
</style>
