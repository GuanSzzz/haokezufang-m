<template>
  <div>
    <!-- 头部 -->
    <HeaderVue title="城市列表"></HeaderVue>
    <!-- 列表 -->
    <van-index-bar>
      <!-- 当前城市 -->
      <van-index-anchor>当前城市</van-index-anchor>
      <van-cell :title="$store.state.cityname.label" />
      <!-- 热门城市 -->
      <van-index-anchor>
        热门城市
        <van-cell
          :title="item.label"
          v-for="(item, index) in hotcitylist"
          :key="index"
          @click="getCityInfo(item.label)"
        />
      </van-index-anchor>

      <!-- 城市列表  -->
      <van-index-anchor
        :index="item"
        v-for="(item, index) in FirstPin"
        :key="index"
      >
        <span>{{ item }}</span>
        <van-cell
          :title="citem"
          v-for="(citem, cindex) in fristName[index]"
          :key="cindex"
          @click="getCityInfo(citem)"
        />
      </van-index-anchor>
    </van-index-bar>
  </div>
</template>

<script>
import HeaderVue from '@/components/header.vue'
import { bigcitylist, hotcity } from '@/apis/city'
import { cityinfo } from '@/apis/area'
export default {
  data() {
    return {
      cityList: [],
      FirstPin: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ],
      fristName: [],
      newArr: [],
      hotcitylist: []
    }
  },
  methods: {
    // 点击热门城市
    // hotCity() {}
    async getCityInfo(cityname) {
      const res = await cityinfo(cityname)
      console.log(res)
      if (res.data.body.label !== cityname) {
        return this.$toast('暂无房源')
      }
      this.$store.commit('setCityName', res.data.body)
      this.$router.back()
    }
  },
  components: {
    HeaderVue
  },
  async created() {
    try {
      const res = await bigcitylist()
      console.log(res)
      this.cityList = res.data.body
      this.FirstPin.forEach((item) => {
        this.newArr = []
        this.cityList.forEach((ele) => {
          const first = ele.short.substring(0, 1)
          if (first.toUpperCase() === item) {
            this.newArr.push(ele.label)
          }
        })
        this.fristName.push(this.newArr)
      })
      console.log(this.firstName)
    } catch (e) {
      console.log(e)
    }
    try {
      const res = await hotcity()
      console.log(res)
      this.hotcitylist = res.data.body
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style></style>
