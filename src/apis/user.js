// 用户相关接口请求
import request from '@/utils/request'
import store from '@/store'

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
export const userInfo = () => {
  return request({
    url: '/user',
    method: 'GET'
  })
}

/**
 * 获取用户收藏列表
 * @param {*} token
 * @returns  Promise
 */
export const userlove = () => {
  return request({
    url: '/user/favorites',
    mothod: 'GET'
  })
}

/**
 * 房屋是否收藏
 * @returns Promise
 */
export const isUserLove = () => {
  return request({
    url: `/user/favorites/${store.state.housecode}`
  })
}

/**
 * 添加收藏
 * @returns Promise
 */
export const userLoveT = () => {
  return request({
    url: `/user/favorites/${store.state.housecode}`,
    method: 'POST'
  })
}

/**
 * 删除收藏
 * @returns Promise
 */
export const userLoveF = (id) => {
  return request({
    url: `/user/favorites/${id}`,
    method: 'DELETE'
  })
}
