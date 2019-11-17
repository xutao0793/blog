# 37 vue路由vue-router

目录

1. 前端路由历史
    1. 服务端渲染(SSR:server side render)
    1. 客户端路由(client side routing)
1. 前端路由实现原理
    1. hash模式: location.hash 和 hashChange事件
    1. history模式： history 和 popstate事件
1. vue-router
    1. const router = new VueRouter(option)中的选项对象option
    1. 路由器实例对象router
    1. 路由对象route
    1. router-link标签的特性
    1. router-view标签的特性
1. 路由传参的5种方式
    1.路由动态参数: '/user/:userId'和params
    ```js
    const route = {path: '/user/:userId'}
    this.$router.push({path:`/user/${userId}`})
    this.$route.params.userId
    ```
    2.命名路由传参,使用name和params
    ```js
    const route = {name:'home',...}
    this.$router.push({name:'Login',params:{id:'leelei'}})
    this.$route.params.id
    ```
    3.查询参数传参，使用path和query
    ```js
    this.$router.push({path:'/login',query:{id:'leelei'})
    this.$route.query.id
    ```
    4.prop形式：布尔/对象/函数
    ```js
    const route = [{prop:true, ...}]
    const route = [{prop: {someProp:'someValue'}] 
    const routes =[{props: (route) => ({ query: route.query.q }),...}]
    ```
    5. meta元信息定义数据
    ```js
    // 定义路由时，定义元信息
    const routes = [
    {meta: {someData:'someData'},... },
    // 获取数据
    this.$route.meta.someData
    ```


