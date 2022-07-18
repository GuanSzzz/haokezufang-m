<template>
  <div>
    <!-- 1.导航 -->
    <HeaderVue title="登录"></HeaderVue>
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
import HeaderVue from '@/components/header.vue'

export default {
  data() {
    return {
      username: '',
      password: '',
      reg: /^[a-zA-Z0-9]{5,8}$/
    }
  },
  methods: {
    backToPrePage() {
      this.$router.back()
    },
    async login() {
      //  return const res = await login(this.username, this.password)
      // console.log(res)
      if (this.username.trim() === '' || this.password.trim() === '') {
        this.$toast('内容不能为空')
        return
      }
      if (!this.reg.test(this.username.trim())) {
        return this.$toast('用户名格式5-8位字母或数字')
      }
      if (!this.reg.test(this.password.trim())) {
        return this.$toast('密码格式6-12位数字或字母')
      }
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await login(this.username, this.password)
        console.log(res)
        if (res.data.status === 200) {
          this.$toast.success('登录成功')
          localStorage.setItem('token', JSON.stringify(res.data.body))
          // 需要修改路由
          this.$router.push('/layout/home')
        } else {
          this.$toast.fail('登录失败')
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  components: {
    HeaderVue
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
