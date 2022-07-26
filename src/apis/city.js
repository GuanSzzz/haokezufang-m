// 城市相关接口
import request from '@/utils/request'
// 引入城市id
import store from '@/store/index'

/**
 * 获取城市列表数据
 * @returns Promise
 */
export const bigcitylist = () => {
  return request({
    url: '/area/city',
    method: 'GET',
    params: {
      level: 1
    }
  })
}

/**
 * 房源列表渲染
 * @returns Promise
 */
export const selecthouselist = (offset) => {
  return request({
    url: '/houses',
    params: {
      cityId: store.state.cityname.value,
      offset
    }
  })
}
// 热门城市
export const hotcity = () => {
  return request({
    url: '/area/hot'
  })
}

// 小区关键字
export const searchXQ = (name) => {
  return request({
    url: '/area/community',
    params: {
      id: store.state.cityname.value,
      name
    }
  })
}

// 发布房屋所需的条件
export const sendhouserequire = () => {
  return request({
    url: '/houses/params'
  })
}

// 发布房源
export const sendhouse = (data) => {
  return request({
    url: '/user/houses',
    method: 'POST',
    data
  })
}

// 房源具体信息
export const houseinfo = (id) => {
  return request({
    url: `/houses/${id}`
  })
}
/**
 * 获取房屋查询条件
 * (query)城市id
 * @returns Promise
 */
export const houseCondition = () => {
  return request({
    url: '/houses/condition',
    method: 'GET',
    params: {
      id: store.state.cityname.value
    }
  })
}

/**
 * 根据条件查询房屋
 * @param {*} more 符合属性
 * @returns Promise
 */
export const sureSelect = (more) => {
  return request({
    url: '/houses',
    method: 'GET',
    params: {
      cityId: store.state.cityname.value,
      ...more
    }
  })
}
