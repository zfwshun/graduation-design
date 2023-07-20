<template>
  <div class="history-article-list-container">
    <!--    搜索区域-->
    <div class="search-container">
      <el-input v-model="name" placeholder="请输入公众号名称" class="input"/>
      <el-button type="primary" plain icon="el-icon-search" @click="clickSearchButton">搜索</el-button>
      <el-tooltip class="item" effect="dark" :content="content" placement="bottom-start" style="display: inline-block;">
        <i class="el-icon-info icon-style"></i>
      </el-tooltip>
    </div>
    <div class="list-container"
         v-if="historyArticleList.article_list!==undefined">
<!--      列表数据-->
      <table class="table">
        <thead>
        <tr>
          <th scope="col">序号</th>
          <th scope="col" class="th2">标题</th>
          <th scope="col">操作</th>
          <th scope="col" class="th4">发布时间</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in historyArticleList.article_list" :key="item.url">
          <td>{{ index + 1 }}</td>
          <td :title="item.title" class="td2">
            <a :href="item.link" target="_blank" class="title">{{ item.title }}</a>
          </td>
          <td>
            <a href="javascript:;" @click.prevent="toArticleInfo(item.link)" class="articleInfo">查看文章详情</a>
          </td>
          <td class="td4">{{ getTime(item.create_time) }}</td>
        </tr>
        </tbody>
      </table>
      <!--      分页器-->
      <Pagination :pageNo="historyArticleList.now_page" :totalPage="historyArticleList.total_page"
                  :continues="5" class="pagination" @getPageNo="getHistoryArticleListByName"></Pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'HistoryArticleList',
  data () {
    return {
      name: '',
      content: '历史发文列表'
    }
  },
  computed: {
    ...mapState('acquisition', ['historyArticleList'])
  },
  methods: {
    // 点击搜索按钮
    clickSearchButton () {
      if (this.name !== '') {
        this.getHistoryArticleListByName(1)
      } else {
        this.$message({ showClose: true, message: '输入不能为空' })
        this.$store.commit('acquisition/CLEARHISTORYARTICLELIST')
      }
    },
    // 通过名称和页码获取历史发文列表
    async getHistoryArticleListByName (page) {
      console.log(page)
      try {
        await this.$store.dispatch('acquisition/getHistoryArticleListByName', { name: this.name, page })
      } catch (e) {
        // 错误提示弹出
        await this.$alert(e, '提示', {
          confirmButtonText: '确定',
          callback: (action) => {
            if (action === 'cancel') {
              this.$message({
                showClose: true,
                message: '用户取消操作'
              })
            } else {
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
    // 点击文章详情跳转到文章信息页面
    toArticleInfo (url) {
      this.$router.push({ name: 'article_info', params: { url } })
    }
  },
  beforeDestroy () {
    this.$store.commit('acquisition/CLEARHISTORYARTICLELIST')
  }
}
</script>

<style scoped>
/*.history-article-list-container {*/
/*  width: 100%;*/
/*  height: 100%;*/
/*}*/
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

.articleInfo {
  color: #576b95;
  text-decoration: none;
}
</style>
