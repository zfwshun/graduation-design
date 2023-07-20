<template>
  <div class="search-article-container">
    <div class="search-container">
      <el-form :inline="true" label-position="left" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="keyword" placeholder="请输入关键词" class="input"/>
        </el-form-item>
        <el-form-item label="公众号名称">
          <el-input v-model="name" placeholder="请输入公众号名称" class="input"/>
        </el-form-item>
        <el-form-item label="时间限制">
          <el-input-number v-model="period" controls-position="right"  :min="1" :max="720" ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain icon="el-icon-search" @click="clickSearchButton">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-tooltip class="item" effect="dark" :content="content" placement="bottom-start" style="display: inline-block;">
        <i class="el-icon-info icon-style"></i>
      </el-tooltip>
    </div>
    <!--    未指定公众号-->
    <div class="list-container"
         v-if="search_article.data!==undefined&&search_article.data.length!==0&&!search_article.hasName">
      <!--      列表数据-->
      <table class="table">
        <thead>
        <tr>
          <th scope="col">序号</th>
          <th scope="col" class="th2">标题</th>
          <th scope="col">操作</th>
          <th scope="col">发布者微信名</th>
          <th scope="col">发布者微信号</th>
          <th scope="col" class="th4">发布时间</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in search_article.data" :key="item.url">
          <td>{{ index + 1 }}</td>
          <td :title="item.title" class="td2">
            <a :href="item.url" target="_blank" class="title">{{ item.title }}</a>
          </td>
          <td>
            <a href="javascript:;" @click.prevent="toArticleInfo(item.url)" class="articleInfo">查看文章详情</a>
          </td>
          <td :title="item.wx_name">{{ item.wx_name }}</td>
          <td :title="item.wx_id">{{ item.wx_id }}</td>
          <td class="td4">{{ item.publish_time_str }}</td>
        </tr>
        </tbody>
      </table>
      <!--      分页器-->
      <Pagination :pageNo="search_article.page" :totalPage="search_article.total_page"
                  :continues="5" class="pagination" @getPageNo="searchArticle"></Pagination>
    </div>
<!--    指定公众号-->
    <div class="list-container"
         v-if="search_article.data!==undefined&&search_article.data.length!==0&&search_article.hasName">
      <!--      列表数据-->
      <table class="table">
        <thead>
        <tr>
          <th scope="col">序号</th>
          <th scope="col" class="th2">标题</th>
          <th scope="col">操作</th>
          <th scope="col">文章类型</th>
          <th scope="col" class="th4">发布时间</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in search_article.data" :key="item.url">
          <td>{{ index + 1 }}</td>
          <td class="td2">
            <a :href="item.link" target="_blank" class="title"><span v-html="item.title"></span></a>
          </td>
          <td>
            <a href="javascript:;" @click.prevent="toArticleInfo(item.link)" class="articleInfo">查看文章详情</a>
          </td>
          <td>{{ getType(item.item_show_type) }}</td>
          <td class="td4">{{ getTime(item.create_time) }}</td>
        </tr>
        </tbody>
      </table>
      <!--      分页器-->
      <Pagination :pageNo="search_article.now_page" :totalPage="search_article.total_page"
                  :continues="5" class="pagination" @getPageNo="searchArticle"></Pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SearchArticle',
  data () {
    return {
      isSelected: true,
      isShow: true,
      name: '',
      keyword: '',
      period: 7,
      content: '搜索文章'
    }
  },
  computed: {
    ...mapState('acquisition', ['search_article'])
  },
  methods: {
    // 点击搜索按钮
    clickSearchButton () {
      if (this.keyword !== '') {
        this.searchArticle(1)
      } else {
        this.$message({
          showClose: true,
          message: '关键词不能为空'
        })
        this.$store.commit('acquisition/CLEARSEARCHARTICLE')
      }
    },
    // 搜索文章
    async searchArticle (page) {
      try {
        await this.$store.dispatch('acquisition/searchArticle', { keyword: this.keyword, name: this.name, page: page, period: this.period })
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
              this.keyword = ''
              this.name = ''
            }
          }
        })
      }
    },
    // 将时间戳转化为标准格式
    getTime (time) {
      const date = new Date(time * 1000)
      return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2)
    },
    // 查看文章详情
    toArticleInfo (url) {
      this.$router.push({ name: 'article_info', params: { url } })
    },
    // 获取文章类型
    getType (num) {
      switch (num) {
        case 0: return '图文'
        case 5: return '纯视频'
        case 7: return '纯音乐'
        case 8: return '纯图片'
        case 10: return '纯文字'
        case 11: return '转载文章'
      }
    }
  },
  beforeDestroy () {
    this.$store.commit('acquisition/CLEARSEARCHARTICLE')
  }
}
</script>

<style scoped lang="less">
//搜索框样式
.search-container {
  position: relative;
  height: 40px;
  margin-top: 20px;
  text-align: center;
}
/deep/ .input {
  width: 200px;
  margin-right: 30px;
}
/deep/ .el-input-number {
  width: 100px;
  margin-right: 20px;
}
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
// 结果列表样式
.list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  padding-top: 50px;
}

.table {
  width: 1000px;
}

.table thead tr {
  display: flex;
  height: 40px;
  width: 1000px;
}

.table tbody tr {
  display: flex;
  height: 40px;
  width: 1000px;
  white-space: nowrap;
}

.table tr td, th {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.table tr .td2, .th2 {
  flex: 4;
}

.table tr .td4, .th4 {
  flex: 2;
}
.title {
  color: #212529;
  text-decoration: none;
}
.title:hover {
  color: #576b95;
}
.title /deep/ em {
  font-style: normal;
  color: #409EFF;
}
.articleInfo {
  color: #576b95;
  text-decoration: none;
}
</style>
