<template>
  <div>
    <router-view></router-view>
    <van-tabbar route active-color="#81c9b6" inactive-color="#333">
      <van-tabbar-item to="/layout/first" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/layout/find" icon="search">找房</van-tabbar-item>
      <van-tabbar-item to="/layout/search" icon="setting-o"
        >咨询</van-tabbar-item
      >
      <van-tabbar-item to="/layout/home" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style></style>
