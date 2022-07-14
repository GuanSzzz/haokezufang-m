<template>
  <div>
    <HeaderVue title="收藏列表"></HeaderVue>
    <!-- 收藏列表  -->
    <HomeList :homelist="mylovelist"></HomeList>
    <!-- <div>
      <van-card
        currency=""
        v-for="(item, index) in mylovelist"
        :key="index"
        :price="`${item.price}元/月`"
        :desc="item.desc"
        :title="item.title"
        :thumb="`http://liufusong.top:8080${item.houseImg}`"
        class="tags"
      >
        <template #tags>
          <van-tag
            plain
            type="danger"
            v-for="(citem, cindex) in item.tags"
            :key="cindex"
            >{{ citem }}</van-tag
          >
        </template>
      </van-card>
    </div> -->
  </div>
</template>

<script>
import HeaderVue from '@/components/header.vue'
import { userlove } from '@/apis/user'
import HomeList from '@/components/homelist.vue'
export default {
  data() {
    return {
      token: '',
      mylovelist: []
    }
  },
  components: {
    HeaderVue,
    HomeList
  },
  async created() {
    try {
      this.token = JSON.parse(localStorage.getItem('token')).token
      const res = await userlove(this.token)
      console.log(res)
      this.mylovelist = res.data.body
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="less">
.van-tag {
  background-color: #e1f5f8;
  color: #39becd;
  border-color: transparent;
  font-size: 12px;
  border-radius: 3px;
  padding: 4px 5px;
  margin-right: 5px;
  line-height: 12px;
}
.van-card__price-integer {
  color: #fa5741;
  font-size: 16px;
}
.van-card__title {
  font-weight: 700;
  font-size: 15px;
}
.van-card__desc {
  font-size: 12px;
  color: #afb2b3;
}
</style>
