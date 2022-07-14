<template>
  <div>
    <!-- 第一  登录 利用v-if判断-->
    <div class="my_title" v-if="token">
      <img
        src="http://liufusong.top:8080/img/avatar.png"
        alt="背景图"
        class="my_title_bg"
      />
      <div class="my_info">
        <div class="my_myIcon">
          <img
            src="`http://liufusong.top:8080${userinfo.avatar}`"
            alt="icon"
            class="my_info_icon"
          />
        </div>
        <div class="my_user">
          <div class="my_username">{{ userinfo.nickname }}</div>
          <div class="my_edit">
            <a href="#" class="my_btn_a" @click="goBack">退出</a>
          </div>
          <div class="my_back">
            <span>编辑个人信息</span>
          </div>
        </div>
      </div>
    </div>
    <!--第一  未登录 -->
    <div class="my_title" v-else>
      <img
        src="http://liufusong.top:8080/img/profile/bg.png"
        alt="背景图"
        class="my_title_bg"
      />
      <div class="my_info">
        <div class="my_myIcon">
          <img
            src="http://liufusong.top:8080/img/profile/avatar.png"
            alt="icon"
            class="my_info_icon"
          />
        </div>
        <div class="my_user">
          <div class="my_username">游客</div>
          <div class="my_edit">
            <a href="#" class="my_btn_a" @click="goLogin">去登陆</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 第二 -->
    <van-grid :column-num="3" :border="false" :icon-size="22">
      <van-grid-item icon="star-o" text="我的收藏" @click="myLove" />
      <van-grid-item icon="wap-home-o" text="我的出租" />
      <van-grid-item icon="clock-o" text="看房记录" />
      <van-grid-item icon="newspaper-o" text="成为房主" />
      <van-grid-item icon="contact" text="个人资料" />
      <van-grid-item icon="service-o" text="联系我们" />
    </van-grid>
    <!-- 第三 -->
    <div class="my_ad">
      <img src="http://liufusong.top:8080/img/profile/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { userInfo } from '@/apis/user'
export default {
  data() {
    return {
      token: '',
      userinfo: {}
    }
  },
  methods: {
    goLogin() {
      this.$router.push('/login')
    },
    goBack() {
      // 清除token自己更换页面
      this.token = localStorage.removeItem('token')
    },
    async myLove() {
      if (!this.token) {
        this.$router.push('/login')
      } else {
        this.$router.push('/mylove')
      }
    }
  },
  async created() {
    // 获取用户信息，需要请求头
    try {
      this.token = JSON.parse(localStorage.getItem('token')).token
      const res = await userInfo(this.token)
      console.log(res)
      this.userinfo = res.data.body
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="less">
// 第一
.my_title {
  min-height: 300px;
  position: relative;
  margin-bottom: 15px;
  .my_title_bg {
    width: 100%;
    border-style: none;
  }
  .my_info {
    position: absolute;
    background: #fff;
    width: 85%;
    height: 55%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px 3px #ddd;
    margin: 50px auto 0;
    padding: 0 20px;
    text-align: center;
    font-size: 13px;
    .my_myIcon {
      position: relative;
      transform: translateY(-50%);
      border-radius: 50%;
      width: 70px;
      height: 70px;
      border: 5px solid #f5f5f5;
      display: inline-block;
      box-shadow: 0 2px 2px #bdbdbd;
      .my_info_icon {
        width: 100%;
        border-radius: 50%;
        border-style: none;
      }
    }
    .my_user {
      padding-top: 15px px;
      .my_username {
        margin-top: -30px;
        margin-bottom: 10px;
      }
      .my_edit {
        color: #999;
        font-size: 12px;
        margin-top: 20px;
        .my_btn_a {
          display: inline-block;
          position: relative;
          border: none;
          background-color: #21b97a;
          font-size: 13px;
          height: 30px;
          line-height: 30px;
          padding: 0 15px;
          color: #fff;
          text-align: center;
          border-radius: 5px;
        }
      }
    }
  }
}
// 第二

// 第三
.my_ad {
  text-align: center;
  margin-top: 10px;
  img {
    width: 92%;
  }
}
</style>
