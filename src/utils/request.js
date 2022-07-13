import axios from 'axios'
// 创建根目录
const request = axios.create({
  baseURL: 'http://liufusong.top:8080'
})
export default request
