<template>
  <div class="options-container">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">序号</th>
        <th scope="col">操作类型</th>
        <th scope="col">查询参数</th>
        <th scope="col">发生时间</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in data" :key="item.type">
        <td>{{ index + 1 }}</td>
        <td>{{ item.type }}</td>
        <td>{{ item.query }}</td>
        <td>{{ item.time }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'HistoryOptions',
  data () {
    return {
      data: [{
        type: '采集历史发文列表',
        query: "{name:'前端学习栈'}",
        time: '2023-5-19 10:21:22'
      }, {
        type: '采集文章详细信息',
        query: '{url:"http://mp.weixin.qq.com/s?__biz=MjM5OTAwMDI3Ng==&mid=2650255523&idx=1&sn=3b368f0edc20f4ac6f0513a3fe2a682a&chksm=bec1311889b6b80e87239372f48ed7969d1903c693f3c49e7f9329d4da19a065b7ee4f55e17c#rd"}',
        time: '2023-5-19 10:23:31'
      }, {
        type: '采集公众号信息',
        query: "{name:'前端学习栈'}",
        time: '2023-5-19 10:27:18'
      }]
    }
  }
}
</script>

<style scoped lang="less">
.options-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  padding-top: 50px;
}

.table {
  flex: 1;
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

</style>
