// 让axios变成VUe插件
// 把axios相关的代码封装成vue的插件
// 结果在mian.js可以Vue.use(axios)
import axios from 'axios'
// vue插件
const HttpSever = {};
HttpSever.install = function (Vue) {
    // 插件要封装的功能
    
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
    // 除了登录之外的，才需要下面2行代码
    // 登录的响应res和其他请求res一样
    // 拦截->axios拦截请求


    // 请求拦截器的代码
    axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        console.log("拦截器被触发--");
        // 1.header请求头
        // 2. 请求标识路径
        // 如果请求时Login，直接发送请求
        if(config.url!=='login') {
            const AUTH_TOKEN = localStorage.getItem("token");
            // axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
            // 给当前请求设置请求头
            config.headers["Authorization"] = AUTH_TOKEN;
        }
        // 当请求不是Login，先加头部，然后继续发送请求
        
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
    
    
    Vue.prototype.$http = axios
    //  添加实例方法
    
}
export default HttpSever;