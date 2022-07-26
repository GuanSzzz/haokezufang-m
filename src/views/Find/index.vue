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
        <!-- 区域 -->
        <van-dropdown-item ref="area">
          <template #title>
            <span :class="{ isHave: areaId !== 'null' && areaId !== '' }"
              >区域</span
            >
          </template>
          <template>
            <van-picker
              ref="areaSure"
              value-key="label"
              toolbar-position="bottom"
              show-toolbar
              :columns="arealist"
              @confirm="onConfirm_area"
              @cancel="onCancel_area"
            />
          </template>
        </van-dropdown-item>
        <!-- 方式 -->
        <van-dropdown-item ref="way">
          <template #title>
            <span :class="{ isHave: wayId !== 'null' && wayId !== '' }"
              >方式</span
            >
          </template>
          <template>
            <van-picker
              value-key="label"
              toolbar-position="bottom"
              show-toolbar
              :columns="way_list"
              @confirm="onConfirm_way"
              @cancel="onCancel_way"
            />
          </template>
        </van-dropdown-item>
        <!-- 租金 -->
        <van-dropdown-item ref="money">
          <template #title>
            <span :class="{ isHave: priceId !== 'null' && priceId !== '' }"
              >租金</span
            >
          </template>
          <template>
            <van-picker
              value-key="label"
              toolbar-position="bottom"
              show-toolbar
              :columns="money_list"
              @confirm="onConfirm_money"
              @cancel="onCancel_money"
            />
          </template>
        </van-dropdown-item>
        <!-- 筛选 -->
        <van-dropdown-item
          title="筛选"
          ref="item"
          class="choose"
          @open="isShow"
        >
          <template #title>
            <span :class="{ isHave: moreId !== 'null' && moreId !== '' }"
              >筛选</span
            >
          </template>
        </van-dropdown-item>
      </van-dropdown-menu>

      <!-- 筛选弹出层 -->
      <van-popup
        v-model="show"
        position="right"
        :style="{ width: '80%', height: '100%' }"
      >
        <!-- 户型选项卡 -->

        <van-cell title="户型">
          <template #label>
            <div class="box">
              <Spans
                ref="span"
                v-for="item in huxingArr"
                :key="item.label"
                :value="item"
              ></Spans>
            </div>
          </template>
        </van-cell>

        <!-- 朝向选项卡 -->

        <van-cell title="朝向">
          <template #label>
            <div class="box">
              <Spans
                ref="span"
                v-for="item in chaoxiangArr"
                :key="item.label"
                :value="item"
              ></Spans>
            </div>
          </template>
        </van-cell>

        <!-- 楼层选项卡 -->

        <van-cell title="楼层">
          <template #label>
            <div class="box">
              <Spans
                ref="span"
                v-for="item in loucengArr"
                :key="item.label"
                :value="item"
              ></Spans>
            </div>
          </template>
        </van-cell>

        <!-- 房屋亮点选项卡 -->

        <van-cell title="房屋亮点">
          <template #label>
            <div class="box">
              <Spans
                ref="span"
                v-for="item in liangdianArr"
                :key="item.label"
                :value="item"
              ></Spans>
            </div>
          </template>
        </van-cell>
        <!-- 底部按钮 -->

        <div class="popup-btn">
          <span class="clear" @click="clear">清除</span>
          <span class="queding" @click="sureSelect">确定</span>
        </div>
      </van-popup>
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
import Spans from '@/components/Spans.vue'
import homelist from '@/components/homelist.vue'
import { selecthouselist, houseCondition, sureSelect } from '@/apis/city'
export default {
  data() {
    return {
      active: '',
      index: '',
      loading: false,
      finished: false,
      page: 1,
      houselist: [],
      way_list: [],
      money_list: [],
      show: false,
      huxingArr: [],
      chaoxiangArr: [],
      loucengArr: [],
      liangdianArr: [],
      arealist: [],
      priceId: '',
      wayId: '',
      areaId: '',
      moreId: ''
    }
  },
  async created() {
    // 获取房源信息
    const res = await selecthouselist()
    // console.log(res)
    this.houselist = res.data.body.list

    // 获取房屋查询条件
    this.houseCondition()
  },
  methods: {
    // 获取房屋查询条件
    async houseCondition() {
      try {
        const { data } = await houseCondition()
        console.log(data)
        this.liangdianArr = data.body.characteristic
        this.loucengArr = data.body.floor
        this.chaoxiangArr = data.body.oriented
        this.huxingArr = data.body.roomType
        this.way_list = data.body.rentType
        this.money_list = data.body.price
        data.body.area.children[0].children = [
          {
            label: '',
            value: ''
          }
        ]
        this.arealist.push(data.body.area)
        data.body.subway.children[0].children = [
          {
            label: '',
            value: ''
          }
        ]
        this.arealist.push(data.body.subway)
      } catch (error) {}
    },
    // 跳转城市列表
    goCityList() {
      this.$router.push('/citylist')
    },
    // 加载房源列表
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
    // 区域选择
    onConfirm_area() {
      // 隐藏弹框
      this.$refs.area.toggle(false)
      // 获取选择的值，vant自带的方法getValues()
      const arr = this.$refs.areaSure.getValues()
      this.areaId = arr[arr.length - 1].value
      // 调用发送请求的函数
      this.sendAllSelest()
    },
    onCancel_area() {
      this.$refs.area.toggle(false)
    },
    // 方式选择
    onConfirm_way(value) {
      this.$refs.way.toggle(false)
      this.wayId = value.value
      // 调用发送请求的函数
      this.sendAllSelest()
    },
    onCancel_way() {
      // this.$toast('取消')
      this.$refs.way.toggle(false)
    },
    // 租金选择
    onConfirm_money(value) {
      this.$refs.money.toggle(false)
      this.priceId = value.value
      // 调用发送请求的函数
      this.sendAllSelest()
    },
    onCancel_money() {
      this.$refs.money.toggle(false)
    },
    // 筛选方式
    // 点击显示弹框
    isShow() {
      this.show = true
    },
    // 清除所有选中的标签
    clear() {
      this.$refs.span.forEach((ele) => {
        ele.isActive = false
      })
    },
    // 确定按钮 筛选提交
    sureSelect() {
      this.isShow = false
      this.show = false
      const arr = []
      this.$refs.span.forEach((ele) => {
        if (ele.isActive) {
          arr.push(ele.value.value)
        }
      })
      this.moreId = arr.join(',')
      // 调用发送请求的函数
      this.sendAllSelest()
    },
    // 封装发送请求的函数
    async sendAllSelest() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        let allArr = [this.moreId, this.wayId, this.priceId, this.areaId]
        // 去除空字符串
        allArr = allArr.filter((item) => item)
        const res = await sureSelect({ more: allArr.join(',') })
        this.houselist = res.data.body.list
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 1
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  components: {
    homelist,
    Spans
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
//导航栏
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
// 筛选
.choose {
  /deep/.van-dropdown-item--down {
    display: none;
  }
}

.choose-popup {
  z-index: 999999 !important;
}
/deep/.van-cell__title {
  border-bottom: 1px solid #eee;
}
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 72px 0 28px;
}
.popup-btn {
  align-items: center;
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  // z-index: 3;
  margin-top: 20px;
  border-top: 1px solid #e9e9e9;
  text-align: left;
  overflow: hidden;
  display: flex;
  box-sizing: border-box;
  .clear {
    flex: 1 1;
    border-radius: 0;
    color: #21b97a;
    display: inline-block;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
  }
  .queding {
    border-radius: 0;
    flex: 2 1;
    color: #fff;
    background-color: #21b97a;
    display: inline-block;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
  }
}

.isHave {
  color: #21b97a;
}
</style>
