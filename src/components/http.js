// 让axios变成VUe插件
// 把axios相关的代码封装成vue的插件
// 结果在mian.js可以Vue.use(axios)
import axios from 'axios'
// vue插件
const HttpSever = {};
HttpSever.install = function (Vue) {
    // 插件要封装的功能
    
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    Vue.prototype.$http = axios
    //  添加实例方法
    
}
export default HttpSever;