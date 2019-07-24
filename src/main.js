import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueRouter from 'vue-router'
import welcome from './components/welcome.vue'
import home from './components/home.vue'
import ToDoList from './components/ToDoList.vue'
import mine from './components/mine.vue'
import HelloWorld from './components/HelloWorld.vue'
import { Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.component(Button.name, Button);



Vue.use(VueRouter)

Vue.use(Vuex)


const state = {
  selectTpye:'ALL',
  itemList:[]
}

const mutations = {
  addItem(state,inputItem){
    state.itemList.push(inputItem);
  },
  changeStatus(state,item){
    let result = state.itemList.find(element => element === item);
    result.completed = !result.completed;
  },
  changeList(state,selectTpye){
    state.selectTpye = selectTpye;
  },
  changeContent(state,payload){
    let result = state.itemList.find(element => element === payload.item);
    result.content = payload.currentContent;
  },
  getToDoList(state,itemList){
    state.itemList.push(...itemList);
  },
  getItemList(state,itemList){
    state.itemList.push(...itemList);
  },
  deleteItem(state,item){
    let index = state.itemList.indexOf(item);
    state.itemList.splice(index,1);
  }
}

const actions = {
  getItemList({commit,state}){
     axios.get('http://localhost:3001/todos')
             .then(response => {
               let itemList = response.data;
               commit("getItemList",itemList);
           }).catch(function (error) {
             console.log(error);
           });  
   },
   addItem({commit},item){
     axios.post("http://localhost:3001/todos",item)
           .then(function (response) {
             console.log(response);
             commit("addItem",item)
           })
           .catch(function (error) {
             console.log(error);
           });
   },
   changeStatus({commit},item){
    axios.put("http://localhost:3001/todos/"+item.id,{"content": item.content ,"completed" : !item.completed})
    .then(function (response) {
      console.log(response);
      commit("changeStatus",item)
    })
    .catch(function (error) {
      console.log(error);
    });
   },
   changeContent({commit},payload){
    axios.put("http://localhost:3001/todos/"+payload.item.id,{"content": payload.currentContent ,"completed" : payload.item.completed})
    .then(function (response) {
      console.log(response);
      commit("changeContent",payload)
    })
    .catch(function (error) {
      console.log(error);
    });
   },
   deleteItem({commit},item){
    axios.delete("http://localhost:3001/todos/"+ item.id)
    .then(function (response) {
      console.log(response);
      commit("deleteItem",item)
    })
    .catch(function (error) {
      console.log(error);
    });
   }
 }

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  HelloWorld
 
})

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/', name: 'welcome' , component: welcome },
    { path: '/HelloWorld', name: 'HelloWorld' , component: HelloWorld },
    { 
      path: '/home/:name', 
      name:'home' , 
      component: home , 
      children: [
      { path: '/ToDoList',name:'ToDoList', component: ToDoList },
      { path: '/mine',name:'mine', component: mine },
      ] 
    }
  ]
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
