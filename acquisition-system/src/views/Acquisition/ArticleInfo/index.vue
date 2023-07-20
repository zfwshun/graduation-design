<template>
  <div class="article-info-container">
    <div class="search-container">
      <el-input v-model="url" placeholder="请输入文章链接" class="input"/>
      <el-button type="primary" plain icon="el-icon-search" @click="clickSearchButton">搜索</el-button>
      <el-tooltip class="item" effect="dark" :content="content" placement="bottom-start" style="display: inline-block;">
        <i class="el-icon-info icon-style"></i>
      </el-tooltip>
    </div>
    <el-form label-position="left" label-width="100px" v-if="articleInfo.length!==0">
      <el-form-item label="发布公众号">
        <div>{{articleInfo[0].wx_name}}</div>
      </el-form-item>
      <el-form-item label="文章作者" v-if="articleInfo[0].author!==''">
        <div>{{articleInfo[0].author}}</div>
      </el-form-item>
      <el-form-item label="文章标题">
        <div>{{articleInfo[0].title}}</div>
      </el-form-item>
      <el-form-item label="文章链接">
        <div>
          <a :href="articleInfo[0].url" target="_blank">{{articleInfo[0].url}}</a>
        </div>
      </el-form-item>
      <el-form-item label="文章封面">
        <div>
          <a :href="articleInfo[0].cover" target="_blank">{{articleInfo[0].cover}}</a>
          <!--        <button v-clipboard:copy="articleInfo[0].cover">复制链接</button>-->
        </div>
      </el-form-item>
      <el-form-item label="文章摘要" v-if="articleInfo[0].summary!==''">
        <div>{{articleInfo[0].summary}}</div>
      </el-form-item>
      <el-form-item label="是否原创">
        <div>{{origin}}</div>
      </el-form-item>
      <el-form-item label="发文位置">
        <div>{{position[articleInfo[0].idx]}}</div>
      </el-form-item>
      <el-form-item label="阅读数">
        <div>{{articleInfo[0].read}}</div>
      </el-form-item>
      <el-form-item label="点赞数">
        <div>{{articleInfo[0].praise}}</div>
      </el-form-item>
      <el-form-item label="在看数">
        <div>{{articleInfo[0].look}}</div>
      </el-form-item>
      <el-form-item label="发文时间">
        <div>{{articleInfo[0].public_time}}</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ArticleInfo',
  data () {
    return {
      position: ['', '头条', '二条', '三条', '四条', '五条', '六条', '七条', '八条'],
      url: this.$route.params.url ? this.$route.params.url : '',
      content: '文章详细信息'
    }
  },
  computed: {
    ...mapState('acquisition', ['articleInfo']),
    origin () {
      if (this.articleInfo.length === 0) { return '' } else {
        const arr = ['未声明原创', '原创', '转载']
        return arr[this.articleInfo[0].copyright_stat]
      }
    }
  },
  methods: {
    // 点击搜索按钮
    clickSearchButton () {
      if (this.url !== '') {
        this.getArticleInfoByURL()
      } else {
        this.$message({
          showClose: true,
          message: '输入不能为空'
        })
        this.$store.commit('acquisition/CLEARARTICLEINFO')
      }
    },
    // 通过URL获取文章信息
    async getArticleInfoByURL () {
      console.log(this.url)
      try {
        await this.$store.dispatch('acquisition/getArticleInfoByURL', this.url)
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
  // 从历史发文列表页面跳转而来
  created () {
    this.url && this.getArticleInfoByURL()
  },
  // 在组件销毁前清空数据
  beforeDestroy () {
    this.$store.commit('acquisition/CLEARARTICLEINFO')
  }
}
</script>

<style scoped lang="less">
.article-info-container {
  position: relative;
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
// 展示数据样式
/deep/.el-form {
  position: absolute;
  left: 50%;
  width: 900px;
  margin-top: 40px;
  transform: translateX(-50%);
}

/deep/.el-form-item {
  margin-bottom: 10px;
}
.el-form-item div {
  width: 800px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-form-item div a{
  white-space: nowrap;
}
</style>
