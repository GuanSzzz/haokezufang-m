<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="backPrege"
      />
    </form>
    <!-- 显示框 -->

    <van-cell
      v-for="(item, index) in streetlist"
      :key="index"
      @click="chooseStreet(item)"
    >
      <template #title>
        <span>{{ item.communityName }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { searchXQ } from '@/apis/city'
export default {
  data() {
    return {
      keywords: '',
      streetlist: []
    }
  },
  methods: {
    onSearch() {
      console.log('正在搜索')
    },
    // 返回上一级
    backPrege() {
      this.$router.go(-1)
    },
    chooseStreet(item) {
      this.$store.commit('setstreetName', item)
      this.$router.back()
    },
    async searchXQ() {
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        const res = await searchXQ(this.keywords)
        if (res.data.body.length === 0) {
          return this.$toast.fail('没有该小区哟~')
        }

        this.streetlist = res.data.body
        console.log(this.streetlist)
        this.$toast.clear()
      } catch (error) {}
    }
  },
  watch: {
    keywords: {
      handler() {
        this.searchXQ()
      }
    }
  }
}
</script>

<style></style>
