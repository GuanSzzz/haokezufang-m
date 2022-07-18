// 城市相关接口
import request from '@/utils/request'
// 引入城市id
import store from '@/store/index'

/**
 * 获取收藏城市列表
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

export const hotcity = () => {
  return request({
    url: '/area/hot'
  })
}
