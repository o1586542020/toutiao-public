import axios from 'axios'
import jsonBig from 'json-bigint'
import router from '@/router'
const request = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net' ,// 请求的基础路径
    // transformResponse 允许自定义原始的响应数据（字符串）
    transformResponse: [function (data) {
      try {
        // 如果转换成功则返回转换的数据结果
        return jsonBig.parse(data)
      } catch (err) {
        // 如果转换失败，则包装为统一数据格式并返回
        return {
          data
        }
      }
    }]
  })
// 请求拦截器
request.interceptors.request.use(function (config) {
  const user =JSON.parse(window.localStorage.getItem('user'));
 if(user) {
  config.headers.Authorization=`Bearer ${user.token}`
 }
 
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
  // 导出请求方法
export default request


// 响应拦截器

request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if(error.response && error.response.status ===401) {
     router.push('/login')
  }
  return Promise.reject(error);
});