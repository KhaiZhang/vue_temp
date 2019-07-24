<template>
  <div>
    <div id="top_section">
        <button @click="navigateBack">back</button>
        <span id="username">{{username}}</span>
    </div>
    <div id="content">
        <div class="sub">
            <div style="height:50px;background-color:aquamarine;border:1px solid gray;" @click="navigateToTodoList">TodoList列表</div>
            <div style="height:50px;background-color:aquamarine;border:1px solid gray;" @click="navigateToMine">我的</div>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
        <router-link to='/HelloWorld'>dddddddd</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'welcome',
  props: {
    msg: String,
  },
  data(){
      return {
        name : null
      }
  },
  components:{
    
  },
  computed:{
    username(){
        return this.$route.params.name;
    }
  },
  methods :{
      navigateBack:function(){
          // if(confirm("确认是否退出")){
            this.$router.go(-1);
          // } 
      },
      navigateToTodoList:function(){
          this.$router.replace({name:'ToDoList',params:{name}})
      },
      navigateToMine:function(){
          let name = this.name;
          this.$router.replace({name:'mine',params:{name}})
      }
  },
  // mounted:function(){
  //   this.name = this.$route.params.name;
  // },
   beforeRouteLeave(to,from,next){
     console.log('beforeRouteLeave')
     console.log(to.name)
     console.log(from.name)
        // if(to.name === 'welcome'){
           const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
            if (answer) {
              next()
            } else {
              next(false)
            }
        // }
        // else next();   
    },
    beforeRouteUpdate (to, from, next) {
  // just use `this`
    to.params.name = this.username;
      next()
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
