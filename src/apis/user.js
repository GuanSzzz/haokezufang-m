// 用户相关接口请求
import request from '@/utils/request'

/**
 * 登录
 * @param {*} username  账号
 * @param {*} password  密码
 * @returns Promise
 */
export const login = (username, password) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: { username, password }
  })
}

/**
 * 获取用户信息
 * @param {*} token
 * @returns Promise
 */
export const userInfo = (token) => {
  return request({
    url: '/user',
    mothod: 'GET',
    headers: {
      authorization: token
    }
  })
}

/**
 * 获取用户收藏列表
 * @param {*} token
 * @returns  Promise
 */
export const userlove = (token) => {
  return request({
    url: '/user/favorites',
    mothod: 'GET',
    headers: {
      authorization: token
    }
  })
}
