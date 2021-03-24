import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Home from '@/views/Home/index.vue'
import Layout from '@/views/layout/index.vue'
import article from '@/views/article/index.vue'
import publish from '@/views/publish/index.vue'
import image from '@/views/image/index.vue'
import comment from '@/views/comment/index.vue'
import setting from '@/views/setting/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:Layout,
    children:[
      { 
        name:Home,
        path:'',
        component:Home,
      
      },
      {
        name:article,
        path:'/article',
        component:article,
      },
      {
        name:publish,
        path:'/publish',
        component:publish,
      },
      {
        name:image,
        path:'/image',
        component:image,
       },
       {
         name:comment,
         path:'/comment',
         component:comment
       },
       {
        name:setting,
        path:'/setting',
        component:setting
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  }
 

]

const router = new VueRouter({
  routes
})
const user = JSON.parse(window.localStorage.getItem('user'));
// 导航守卫
router.beforeEach((to, from, next) => {
   if(to.path !== '/login') {
      if(user){
        next()
      }else {
        next('/login')
      }
   }else { 
     next()
   }
})

export default router
