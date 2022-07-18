import request from '@/utils/request'

export const cityinfo = (cityname) => {
  return request({
    url: '/area/info',
    params: {
      name: cityname
    }
  })
}
