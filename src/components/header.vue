<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="backToPrePage"
      class="nav-bar"
      color="#fff"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  methods: {
    backToPrePage() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  width: 100%;
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
