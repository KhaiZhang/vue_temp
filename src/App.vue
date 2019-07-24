<template>
  <div>
    <router-view></router-view>
    <el-button disabled>默认按钮</el-button>
    <el-button type="success" disabled>成功按钮</el-button>
  </div>
</template>

<script>
import ToDoList from './components/ToDoList.vue'
import './assets/myCss.css'

export default {
  name: 'app',
  components: {
    ToDoList
  },
  mounted: function () {
    this.$nextTick(function () {
    this.$store.dispatch("getItemList");
    })
  }
}
</script>

