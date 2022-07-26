import request from '@/utils/request'

// 根据城市名称查询该城市信息
export const cityinfo = (cityname) => {
  return request({
    url: '/area/info',
    params: {
      name: cityname
    }
  })
}
