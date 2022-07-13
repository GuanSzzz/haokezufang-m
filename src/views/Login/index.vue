<template>
  <div>
    <!-- 1.导航 -->
    <van-nav-bar
      title="账号登录"
      left-arrow
      @click-left="backToPrePage"
      class="nav-bar"
      color="#fff"
    />
    <!-- 2.表单 -->
    <van-form @submit="login" class="form">
      <van-field
        v-model="username"
        name="账号"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请输入账号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <div style="margin: 16px">
        <van-button color="#21b97a" block type="info" native-type="submit"
          >登 录</van-button
        >
      </div>
    </van-form>
    <!-- 3.提交 -->
    <!-- 4.跳注册 -->
    <div class="login-a"><a href="#">还没有账号，去注册~</a></div>
  </div>
</template>

<script>
import { login } from '@/apis/user'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    backToPrePage() {
      this.$router.back()
    },
    async login() {
      const res = await login(this.username, this.password)
      console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #21b97a;
  color: #fff;
  :deep(.van-icon-arrow-left) {
    color: #fff;
  }
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.form {
  .van-field {
    position: relative;
    margin-bottom: 9px;

    :deep(.van-field__control) {
      display: block;
      height: 1.4rem;
      line-height: 1.15;
      font-size: 0.4rem;
      padding: 2px 0;
    }
  }
  .van-button {
    height: 1.3rem;
    font-size: 0.5rem;
  }
}
.login-a {
  text-align: center;
  a {
    font-size: 14px;
    color: #666;
    outline: none;
  }
}
</style>
