// 首页相关的请求
import request from '@/utils/request'

// 租房小组
export const homeList = () => {
  return request({
    url: '/home/groups',
    method: 'GET',
    params: {
      area: 'AREA|88cff55c-aaa4-e2e0'
    }
  })
}

// 轮播图
export const swiper = () => {
  return request({
    url: '/home/swiper',
    method: 'GET'
  })
}
