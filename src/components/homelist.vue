<template>
  <div>
    <div>
      <van-card
        currency=""
        v-for="(item, index) in homelist"
        :key="index"
        :price="`${item.price}元/月`"
        :desc="item.desc"
        :title="item.title"
        :thumb="`http://liufusong.top:8080${item.houseImg}`"
        class="tags"
        @click="goHouseInfo(item)"
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    homelist: []
  },
  methods: {
    goHouseInfo(item) {
      console.log(item)
      this.$store.commit('setHouseCode', item.houseCode)
      this.$router.push('/houseinfo')
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
