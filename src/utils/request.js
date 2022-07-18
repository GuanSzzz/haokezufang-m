import axios from 'axios'
// 创建根目录
const request = axios.create({
  baseURL: 'http://liufusong.top:8080'
})

// 请求拦截
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token =
      localStorage.getItem('token') &&
      JSON.parse(localStorage.getItem('token')).token
    if (token) {
      config.headers.Authorization = token
    }
    console.log(config)
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
// axios.interceptors.response.use(
//   function (response) {
//     // 2xx 范围内的状态码都会触发该函数。
//     // 对响应数据做点什么
//     return response
//   },
//   function (error) {
//     // 超出 2xx 范围的状态码都会触发该函数。
//     // 对响应错误做点什么
//     return Promise.reject(error)
//   }
// )
export default request
