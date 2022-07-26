// 处理图片的接口
import request from '@/utils/request'
const formdata = new FormData()
export const plugin = (file) => {
  formdata.append('file', file)
  return request({
    url: '/houses/image',
    method: 'POST',
    data: formdata
  })
}
