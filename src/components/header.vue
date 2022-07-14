<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      title="城市列表"
      left-arrow
      @click-left="backToPrePage"
      class="nav-bar"
      color="#fff"
    />
  </div>
</template>

<script>
export default {
  methods: {
    backToPrePage() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #21b97a;
  color: #fff;
  :deep(.van-icon-arrow-left) {
    color: #fff;
  }
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
</style>
