<template>
  <div>
    <!-- 头部 -->
    <headerVue title="发布房源"></headerVue>
    <!-- 表单部分内容 -->

    <van-cell-group inset class="housefrom">
      <van-cell value="房源信息" />
      <!-- 小区 -->
      <van-cell title="小区名称" is-link value="请输入小区名称" to="/xiaoqu" />
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
    <van-field name="uploader" label="文件上传">
      <template #input>
        <van-uploader v-model="uploader" />
      </template>
    </van-field>
  </div>
</template>

<script>
import headerVue from '@/components/header.vue'
export default {
  data() {
    return {
      zujin: '',
      mianji: '',
      housetitle: '',
      hxvalue: '',
      lcvalue: '',
      cxvalue: '',
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      showPicker: false,
      huxing: ['一室', '二室', '三室', '四室', '四室+'],
      louceng: ['高楼层', '中楼层', '低楼层'],
      chaoxiang: ['东', '西', '南', '北', '东南', '东北', '西南', '西北'],
      uploader: []
    }
  },
  methods: {
    // 户型选择的方法
    onConfirm1(value) {
      this.hxvalue = value
      this.showPicker1 = false
    },
    // 楼层选择的方法
    onConfirm2(value) {
      this.lcvalue = value
      this.showPicker2 = false
    },
    // 朝向选择的方法
    onConfirm3(value) {
      this.cxvalue = value
      this.showPicker3 = false
    },

    submit() {}
  },
  components: {
    headerVue
  }
}
</script>

<style scoped lang="less">
.housefrom {
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
</style>
