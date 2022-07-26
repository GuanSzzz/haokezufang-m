<template>
  <div class="body">
    <!-- 头部 -->
    <headerVue title="发布房源"></headerVue>
    <!-- 表单部分内容 -->
    <van-cell-group inset class="housefrom">
      <van-cell value="房源信息" />
      <!-- 小区 -->
      <van-cell
        title="小区名称"
        is-link
        :value="communityname"
        to="/searchxiaoqu"
      />
      <!-- 租金 -->
      <van-field
        v-model="zujin"
        center
        clearable
        label="租 金"
        placeholder="请输入租金/月"
      >
        <template #button>
          <van-button size="normal">￥/月</van-button>
        </template>
      </van-field>
      <!-- 建筑面积 -->
      <van-field
        v-model="mianji"
        center
        clearable
        label="建筑面积"
        placeholder="请输入建筑面积"
      >
        <template #button>
          <van-button size="normal">m²</van-button>
        </template>
      </van-field>
      <!-- 户型 -->
      <van-field
        readonly
        clickable
        label="户 型"
        :value="hxvalue"
        placeholder="请选择"
        @click="showPicker1 = true"
        right-icon="arrow"
      />
      <van-popup v-model="showPicker1" position="bottom">
        <van-picker
          value-key="label"
          show-toolbar
          :columns="huxing"
          @cancel="showPicker1 = false"
          @confirm="onConfirm1"
        />
      </van-popup>
      <!-- 所在楼层 -->
      <van-field
        readonly
        clickable
        label="所在楼层"
        :value="lcvalue"
        placeholder="请选择"
        @click="showPicker2 = true"
        right-icon="arrow"
      />
      <van-popup v-model="showPicker2" position="bottom">
        <van-picker
          value-key="label"
          show-toolbar
          :columns="louceng"
          @cancel="showPicker2 = false"
          @confirm="onConfirm2"
        />
      </van-popup>
      <!-- 朝向 -->
      <van-field
        readonly
        clickable
        label="朝 向"
        :value="cxvalue"
        placeholder="请选择"
        @click="showPicker3 = true"
        right-icon="arrow"
      />
      <van-popup v-model="showPicker3" position="bottom">
        <van-picker
          value-key="label"
          show-toolbar
          :columns="chaoxiang"
          @cancel="showPicker3 = false"
          @confirm="onConfirm3"
        />
      </van-popup>
      <!-- 房屋标题 -->
      <van-cell title="房屋标题" />
      <van-field
        v-model="housetitle"
        rows="1"
        autosize
        type="textarea"
        placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
      />
      <!-- 房屋图像 -->
      <van-cell title="房屋图像" />
    </van-cell-group>
    <van-field name="uploader">
      <template #input>
        <van-uploader v-model="houseImg" :after-read="afterRead" />
      </template>
    </van-field>
    <!-- 房屋配置 -->
    <van-cell title="房屋配置" />
    <van-grid :border="false" :column-num="5">
      <van-grid-item
        text="文字"
        v-for="(item, index) in housepeizhi"
        :key="index"
        @click="PeiZhi(item, index)"
        :class="{ active: item.isActive }"
      >
        <template>
          <i :class="`iconfont ${item.icon}`" style="font-size: 23px"></i>
          <span style="font-size: 14px">{{ item.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 房屋描述 -->
    <van-cell title="房屋描述" />
    <van-field
      type="textarea"
      placeholder="请输入房屋描述信息"
      v-model="housemiaoshu"
    />
    <!-- 底部按钮 -->
    <footer class="footer">
      <button class="cancel">取消</button>
      <button class="sure" @click="sendHouse">提交</button>
    </footer>
  </div>
</template>

<script>
import headerVue from '@/components/header.vue'
// 引入api
import { sendhouserequire, sendhouse } from '@/apis/city'
import { plugin } from '@/apis/plugin'
export default {
  data() {
    return {
      zujin: '',
      mianji: '',
      housetitle: '',
      housemiaoshu: '',
      hxvalue: '',
      hxvalue1: '',
      lcvalue: '',
      lcvalue1: '',
      cxvalue: '',
      cxvalue1: '',
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      showPicker: false,
      huxing: [],
      louceng: [],
      chaoxiang: [],
      houseImg: [],
      housepeizhi: [
        { name: '衣柜', icon: 'icon-yigui', isActive: false },
        { name: '洗衣机', icon: 'icon-xiyiji', isActive: false },
        { name: '空调', icon: 'icon-kongtiao', isActive: false },
        { name: '天然气', icon: 'icon-tianranqi', isActive: false },
        { name: '冰箱', icon: 'icon-bingxiang', isActive: false },
        { name: '暖气', icon: 'icon-nuanqi-', isActive: false },
        { name: '电视', icon: 'icon-dianshiji', isActive: false },
        { name: '热水器', icon: 'icon-reshuiqi', isActive: false },
        { name: '宽带', icon: 'icon-kuandai', isActive: false },
        { name: '沙发', icon: 'icon-shafa', isActive: false }
      ],
      Imgs: [],
      newhousepeizhi: []
    }
  },
  methods: {
    // 户型选择的方法
    onConfirm1(value) {
      this.hxvalue = value.label
      this.hxvalue1 = value.value
      this.showPicker1 = false
    },
    // 楼层选择的方法
    onConfirm2(value) {
      this.lcvalue = value.label
      this.lcvalue1 = value.value
      this.showPicker2 = false
    },
    // 朝向选择的方法
    onConfirm3(value) {
      this.cxvalue = value.label
      this.cxvalue1 = value.value
      this.showPicker3 = false
    },
    // 房屋配置的方法
    PeiZhi(item) {
      item.isActive = !item.isActive
      this.housepeizhi.forEach((item) => {
        if (item.isActive) {
          this.newhousepeizhi.push(item.name)
        }
        this.newhousepeizhi = [...new Set(this.newhousepeizhi)]
      })
      // console.log(this.newhousepeizhi)
    },
    // 处理上传图片
    async afterRead(file) {
      console.log(file)
      try {
        const res = await plugin(file.file)
        this.Imgs.push(res.data.body[0])
        console.log(this.Imgs)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    // 发布房源接口请求
    async sendHouse() {
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        console.log(this.houseinfo)
        await sendhouse(this.houseinfo)
        this.$toast.success('发布成功')
        this.$router.back()
      } catch (error) {
        this.$toast.fail('发布失败')
        console.log(error)
      }
    }
  },
  components: {
    headerVue
  },
  computed: {
    // 小区名称
    communityname() {
      // console.log(this.$store.state.streetname)
      return this.$store.state.street.communityName
        ? this.$store.state.street.communityName
        : '请输入小区名称'
    },
    // 上传数据  图片和字体图标未处理  发布失败
    houseinfo() {
      return {
        title: this.housetitle,
        description: this.housemiaoshu,
        houseImg: this.Imgs.join('|'),
        oriented: this.cxvalue1,
        supporting: this.newhousepeizhi.join('|'),
        price: this.zujin,
        roomType: this.hxvalue1,
        size: this.mianji,
        floor: this.lcvalue1,
        community: this.$store.state.street.community
      }
    }
  },

  async created() {
    try {
      const res = await sendhouserequire()
      console.log(res)
      this.louceng = res.data.body.floor
      this.chaoxiang = res.data.body.oriented
      this.huxing = res.data.body.roomType
    } catch (error) {}
  }
}
</script>

<style scoped lang="less">
.active {
  color: #21b97a;
}
.housefrom {
  // padding-bottom: 45px;
  /deep/.van-field {
    height: 44px;
  }
  /deep/.van-button {
    border: transparent;
    color: #888888;
  }
  /deep/.van-picker__toolbar {
    border-bottom: 1px solid #ccc;
  }
  /deep/.van-picker__cancel {
    color: #108ee9;
  }
  /deep/.van-picker__confirm {
    color: #108ee9;
  }
  .am-flexbox {
    // height: 93px;
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    .am-flexbox-item1 {
      border: 1px solid #eaeaea;
      width: 83px;
      height: 83px;
      text-align: center;
      line-height: 83px;
      .icon {
        font-size: 28px;
        color: #d0d0d0;
      }
      #clickIcon {
        display: none;
      }
    }
  }
}
.footer {
  height: 45px;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  font-size: 15px;
  .cancel {
    flex: 1;
    background-color: #fff;
    color: #21b97a;
    border: none;
  }
  .sure {
    flex: 1;
    background-color: #21b97a;
    color: #fff;
    border: none;
  }
}
</style>
