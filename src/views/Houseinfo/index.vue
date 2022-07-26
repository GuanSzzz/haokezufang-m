<template>
  <div style="margin-bottom: 50px">
    <!-- 头部 -->
    <headerVue :title="community"></headerVue>
    <!-- 内容区 -->

    <!-- 轮播图片 -->
    <van-swipe width="375px" height="252px" class="swipe">
      <van-swipe-item v-for="(image, index) in houseImg" :key="index">
        <img :src="`http://liufusong.top:8080${image}`" class="swipe-img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 标题区域 -->
    <div class="title">
      <div class="title-text">{{ title }}</div>
      <div class="title-tags" v-for="(item, index) in tags" :key="index">
        {{ item }}
      </div>
    </div>
    <!-- 租金、户型、面积 -->
    <div class="maininfo">
      <div class="box">
        <p>{{ price }}</p>
        <span>租金</span>
      </div>
      <div class="box">
        <p>{{ roomType }}</p>
        <span>房型</span>
      </div>
      <div class="box">
        <p>{{ size }}</p>
        <span>面积</span>
      </div>
    </div>
    <!-- 朝向、楼层、 -->
    <div class="maintext">
      <div class="box1">
        <p>装修:<span>精装</span></p>
        <p>
          楼层:<span>{{ floor }}</span>
        </p>
      </div>
      <div class="box1">
        <p>
          朝向:<span v-for="(item, index) in oriented" :key="index">{{
            item
          }}</span>
        </p>
        <p>类型:<span>普通住宅</span></p>
      </div>
    </div>
    <!-- 地图 -->
    <div class="map">
      <h4>小区：{{ title }}</h4>
      <div class="mapimg">
        <img src="" alt="" />
      </div>
    </div>
    <!-- 房屋配置 -->
    <div class="peizhi">
      <h4>房屋配置</h4>
      <!-- <van-grid :border="false" :column-num="5">
        <van-grid-item
          text="文字"
          v-for="(item, index) in houseicon"
          :key="index"
        >
          <template>
            <i class="iconfont" style="font-size: 23px" :class="item.icon"></i>
            <span style="font-size: 14px">{{ item.name }}</span>
          </template>
        </van-grid-item>
      </van-grid> -->
      <!-- 用过滤器做字体图标 -->
      <van-grid :border="false" :column-num="5">
        <van-grid-item
          text="文字"
          v-for="(item, index) in supporting"
          :key="index"
        >
          <template>
            <i
              class="iconfont"
              style="font-size: 23px"
              :class="item | filtersss"
            ></i>
            <span style="font-size: 14px">{{ item }}</span>
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 底部 -->
    <footer class="footer">
      <div class="love" @click="changeLove">
        <van-icon name="star-o" :class="{ active: isTrue }" />
        收藏
      </div>
      <div class="line">在线咨询</div>
      <div class="call">电话预约</div>
    </footer>
  </div>
</template>

<script>
// 引入api
import { houseinfo } from '@/apis/city'
import { isUserLove, userLoveT, userLoveF } from '@/apis/user'
// 引入组件
import headerVue from '@/components/header.vue'

export default {
  data() {
    return {
      // isTrue: this.$store.state.isTrue,
      // isFavorite: '',
      isTrue: '',
      community: '', // 小区
      title: '', // 标题
      desciption: '', // 描述
      floor: '', // 楼层
      price: '', // 租金
      size: '', // 面积
      roomType: '', // 户型
      supporting: [], // 电器
      houseImg: [], // 图片
      oriented: [], // 朝向
      tags: [], // 标签
      coord: {}, // 地图
      houseCode: '',
      houseicon: [],
      houseIconList: [
        { name: '衣柜', icon: 'icon-yigui' },
        { name: '洗衣机', icon: 'icon-xiyiji' },
        { name: '空调', icon: 'icon-kongtiao' },
        { name: '天然气', icon: 'icon-tianranqi' },
        { name: '冰箱', icon: 'icon-bingxiang' },
        { name: '暖气', icon: 'icon-nuanqi-' },
        { name: '电视', icon: 'icon-dianshiji' },
        { name: '热水器', icon: 'icon-reshuiqi' },
        { name: '宽带', icon: 'icon-kuandai' },
        { name: '沙发', icon: 'icon-shafa' }
      ]
    }
  },
  components: {
    headerVue
  },
  methods: {
    // 发请求 请求数据
    async getHouseInfo() {
      try {
        const res = await houseinfo(this.$store.state.housecode)
        this.community = res.data.body.community
        this.coord = res.data.body.coord
        this.desciption = res.data.body.desciption
        this.floor = res.data.body.floor
        this.houseImg = res.data.body.houseImg
        // console.log(this.houseImg)
        this.oriented = res.data.body.oriented
        this.price = res.data.body.price
        this.roomType = res.data.body.roomType
        this.size = res.data.body.size
        this.supporting = res.data.body.supporting
        // console.log(this.supporting)
        this.tags = res.data.body.tags
        this.title = res.data.body.title
        this.houseCode = res.data.body.houseCode
        this.getHouseIcon()
        // console.log(res)
      } catch (error) {}
    },
    // 匹配对应的字体图标
    // getHouseIcon() {
    //   this.supporting.forEach((item) => {
    //     this.houseIconList.forEach((ele) => {
    //       if (item === ele.name) {
    //         this.houseicon.push(ele)
    //       }
    //     })
    //   })
    //   console.log(this.houseicon)
    // }
    // 判断是否收藏
    async isUserLove() {
      const res = await isUserLove()
      console.log(1111)
      this.isTrue = res.data.body.isFavorite
      // 把获取到的状态存了vuex
      // this.$store.commit('setIsTrue', this.isFavorite)
    },
    // 改变收藏
    async changeLove() {
      if (this.isTrue) {
        try {
          const res = await userLoveF(this.$store.state.housecode)
          console.log(res)
          console.log(222)
          this.isTrue = false
          this.$toast('取消收藏成功')
        } catch (error) {
          this.$toast('取消收藏失败')
        }
      } else {
        try {
          const res1 = await userLoveT()
          console.log(res1)
          this.isTrue = true
          this.$toast('收藏成功')
        } catch (error) {
          this.$toast('收藏失败')
        }
      }
    }
  },
  created() {
    // 获取列表渲染页面
    this.getHouseInfo()
    // 判断是否收藏
    this.isUserLove()
  },
  // 用过滤器做字体图标
  filters: {
    filtersss: (str) => {
      // 外面的变量取不到，得放在filters里声明
      const houseIconList = [
        { name: '衣柜', icon: 'icon-yigui' },
        { name: '洗衣机', icon: 'icon-xiyiji' },
        { name: '空调', icon: 'icon-kongtiao' },
        { name: '天然气', icon: 'icon-tianranqi' },
        { name: '冰箱', icon: 'icon-bingxiang' },
        { name: '暖气', icon: 'icon-nuanqi-' },
        { name: '电视', icon: 'icon-dianshiji' },
        { name: '热水器', icon: 'icon-reshuiqi' },
        { name: '宽带', icon: 'icon-kuandai' },
        { name: '沙发', icon: 'icon-shafa' }
      ]
      const iconsss = houseIconList.filter((ele) => ele.name === str)
      return iconsss[0].icon
    }
  }
}
</script>

<style scoped lang="less">
.active {
  color: #ff4f00;
}
// 轮播图
.swipe {
  .swipe-img {
    width: 100%;
    height: 100%;
  }
}
// 标题
.title {
  height: 82px;
  padding: 15px 0;
  margin: 0 15px;
  border-bottom: 1px solid #ccc;
  .title-text {
    font-size: 16px;
    color: #333;
  }
  .title-tags {
    color: #39becd;
    background: #e1f5f8;
    display: inline-block;
    font-size: 12px;
    border-radius: 3px;
    padding: 4px 5px;
    margin-right: 5px;
    line-height: 12px;
  }
}
// 租金、户型、面积
.maininfo {
  height: 82px;
  padding: 15px 0;
  margin: 0 15px;
  border-bottom: 1px solid #ccc;
  display: flex;
  .box {
    flex: 1;
    text-align: center;
    p {
      color: #fa5741;
      font-size: 18px;
      font-weight: bolder;
      padding: 5px;
      margin: 0;
    }
    span {
      color: #999;
      font-size: 14px;
    }
  }
}
// 朝向、楼层
.maintext {
  height: 82px;
  padding: 15px 0;
  margin: 0 15px;
  border-bottom: 1px solid #ccc;
  display: flex;
  .box1 {
    flex: 1;
    p {
      color: #999;
      padding-right: 5px;
      line-height: 26px;
      margin: 0;
      font-size: 13px;
      span {
        color: #333;
        margin-left: 5px;
      }
    }
  }
}
// 地图
.map {
  h4 {
    margin: 0 3%;
    line-height: 44px;
    color: #666;
    font-size: 14px;
    font-weight: normal;
  }
  .mapimg {
    width: 100%;
    height: 145px;
    background-color: pink;
  }
}
// 配置
.peizhi {
  h4 {
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 10px;
    padding: 15px 0;
    border-bottom: 1px solid #cecece;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #cecece;
  text-align: center;
  font-size: 17px;
  color: #999;
  .love {
    border-right: 1px solid #e8e8e9;
    flex: 1;
    line-height: 50px;
    text-align: center;
    font-size: 17px;
    color: #999;
    background-color: #fff;
  }
  .line {
    flex: 1;
    line-height: 50px;
    text-align: center;
    font-size: 17px;
    color: #999;
    background-color: #fff;
  }
  .call {
    border-left: 1px solid #e8e8e9;
    background-color: #21b97a;
    flex: 1;
    line-height: 50px;
    text-align: center;
    font-size: 17px;
    color: #fff;
  }
}
</style>
