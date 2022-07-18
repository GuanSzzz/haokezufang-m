<template>
  <div>
    <!-- 搜索框 -->
    <div class="first_search">
      <van-search
        background="#4fc08d"
        show-action
        placeholder="请输入小区或地址"
      >
        <template #left>
          <van-icon name="arrow-left" />
          <span class="area_name" @click="goCityList"
            >北京 <van-icon name="arrow-down"
          /></span>
        </template>
        <template #action>
          <van-icon name="map-marked" style="color: #fff" />
          <!-- 补：@click="goMap" -->
        </template>
      </van-search>
    </div>
    <!-- 筛选框 -->
    <div class="first_select">
      <van-dropdown-menu active-color="#21b97a">
        <van-dropdown-item title="区域" ref="item">
          <template>111</template>
        </van-dropdown-item>
        <van-dropdown-item title="方式" ref="item">
          <template>
            <van-picker
              toolbar-position="bottom"
              show-toolbar
              :columns="columns2"
              @confirm="onConfirm"
              @cancel="onCancel"
              @change="onChange"
            />
          </template>
        </van-dropdown-item>
        <van-dropdown-item title="租金" ref="item">
          <template>
            <van-picker
              toolbar-position="bottom"
              show-toolbar
              :columns="columns3"
            />
          </template>
        </van-dropdown-item>
        <van-dropdown-item title="筛选" ref="item">
          <template>111</template>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <!-- 渲染列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <homelist :homelist="houselist"></homelist>
    </van-list>
  </div>
</template>

<script>
import homelist from '@/components/homelist.vue'
import { selecthouselist } from '@/apis/city'
export default {
  data() {
    return {
      active: '',
      index: '',
      loading: false,
      finished: false,
      page: 1,
      houselist: [],
      columns2: ['不限', '整租', '合租'],
      columns3: [
        '不限',
        '1000及以下',
        '1000-2000',
        '2000-3000',
        '3000-4000',
        '4000-5000',
        '5000-7000',
        '7000以上'
      ]
    }
  },
  async created() {
    // 获取房源信息
    const res = await selecthouselist()
    console.log(res)
    this.houselist = res.data.body.list
  },
  methods: {
    goCityList() {
      this.$router.push('/citylist')
    },
    async onLoad() {
      this.page++
      const res = await selecthouselist((this.page - 1) * 20)
      if (res.data.body.list.length === 0) {
        this.finished = true
        this.loading = false
        return false
      }
      this.houselist = [...this.houselist, ...res.data.body.list]
      this.loading = false
    },
    // goMap() {
    //   this.$router.push(去地图)
    // }，
    // 下拉选框
    onConfirm(value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    onChange(picker, value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    onCancel() {
      this.$toast('取消')
    }
  },
  components: {
    homelist
  }
}
</script>

<style scoped lang="less">
// 搜索框
.first_search {
  width: 100%;
  .area_name {
    font-size: 14px;
    background-color: #f7f8fa;
    height: 34px;
    line-height: 34px;
    text-align: center;
    width: 62px;
    border-right: 1px solid #ccc;
  }
  .van-icon-arrow-left {
    color: #fff;
    margin-right: 10px;
  }
  .van-icon-map-marked {
    color: #fff;
    font-size: 20px;
  }
}
// 筛选框
.first_select {
  /deep/.van-tabs__line {
    width: 0;
    height: 0;
  }
  /deep/.van-picker__toolbar {
    display: flex;
    .van-picker__cancel {
      flex: 1;
      color: #21b97a;
    }
    .van-picker__confirm {
      flex: 2;
      background-color: #21b97a;
      color: #fff;
    }
  }
}
</style>
