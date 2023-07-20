<template>
  <div class="public-accounts-info-container">
    <div class="search-container">
      <el-radio v-model="isName" label="1" @input="labelChange">公众号名称</el-radio>
      <el-radio v-model="isName" label="0" @input="labelChange">文章链接</el-radio>
      <el-input v-model="name" v-show="isName==='1'" placeholder="请输入公众号名称" class="input"/>
      <el-input v-model="url" v-show="isName==='0'" placeholder="请输入文章链接" class="input"/>
      <el-button type="primary" plain icon="el-icon-search" @click="clickSearchButton">搜索</el-button>
      <el-tooltip class="item" effect="dark" :content="content" placement="bottom-start" style="display: inline-block;">
        <i class="el-icon-info icon-style"></i>
      </el-tooltip>
    </div>
    <div class="data-container" v-if="public_accounts_info.data!==undefined&&public_accounts_info.code===0">
      <div class="basicInfo">
        <div class="text">基本信息</div>
        <el-form label-position="left" label-width="100px">
          <el-form-item label="公众号名称">
            <div>{{ public_accounts_info.data.nickname }}</div>
          </el-form-item>
          <el-form-item label="微信号">
            <div>{{ public_accounts_info.data.alias }}</div>
          </el-form-item>
          <el-form-item label="公众号头像">
            <div>
              <a :href="public_accounts_info.data.round_head_img" target="_blank">{{ public_accounts_info.data.round_head_img }}</a>
            </div>
          </el-form-item>
          <el-form-item label="公众号类型">
            <div>{{ type }}</div>
          </el-form-item>
          <el-form-item label="公众号描述">
            <div>{{ public_accounts_info.data.signature }}</div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PublicAccountsInfo',
  data () {
    return {
      isName: '1',
      name: '',
      url: '',
      content: '公众号信息'
    }
  },
  computed: {
    ...mapState('acquisition', ['public_accounts_info']),
    // 获取公众号类型
    type () {
      if (this.public_accounts_info.data) {
        return this.public_accounts_info.data.service_type === 1 ? '订阅号' : '服务号'
      } else {
        return ''
      }
    }
  },
  methods: {
    // 切换搜索内容
    labelChange () {
      this.url = ''
      this.name = ''
    },
    // 点击搜索按钮
    clickSearchButton () {
      if (this.url !== '' || this.name !== '') {
        this.getPublicAccountsInfoByURLOrName()
      } else {
        this.$message({
          showClose: true,
          message: '输入不能为空'
        })
        this.$store.commit('acquisition/CLEARPUBLICACCOUNTSINFO')
      }
    },
    // 获取公众号信息
    async getPublicAccountsInfoByURLOrName () {
      console.log(this.url, this.name)
      try {
        await this.$store.dispatch('acquisition/getPublicAccountsInfoByURLOrName', { url: this.url, name: this.name })
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
              this.name = ''
            }
          }
        })
      }
    }
  },
  // 在组件销毁前清空数据
  beforeDestroy () {
    this.$store.commit('acquisition/CLEARPUBLICACCOUNTSINFO')
  }
}
</script>

<style scoped lang="less">
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
.text {
  height: 25px;
  text-align: center;
  font-size: 14px;
  line-height: 25px;
  color: #606266;
  margin: 15px 0;
}
.basicInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/deep/ .el-form {
  flex: 1;
}

/deep/ .el-form-item {
  margin-bottom: 10px;
}

.el-form-item div {
  width: 800px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-form-item div a {
  white-space: nowrap;
}
.basicData {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}

.el-row {
  flex: 1;
  width: 800px;
  margin-bottom: 20px;
}
/deep/ .el-statistic .head {
  margin-bottom: 10px;
}
</style>
