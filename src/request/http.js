import axios from 'axios'


const http = axios.create({
    timeout: 30000,
    // 在利用http对象请求的路径前都会加上baseURL
    baseURL: "/api"
})

http.interceptors.request.use((req) => {
    // 这里代表请求前的操作
    let token = sessionStorage.getItem('token')
    token && (req.headers.Authorization = `Bearer ${token}`)
    return req
})
http.interceptors.response.use((resp) => {
    // 这里代表响应前的操作

    if (resp.data.Authorization != undefined) {

        sessionStorage.setItem('token', resp.data.Authorization)
    }
    return resp
}, err => {
    let _resp = err.response
    console.log(_resp.status)
    return Promise.reject(err)
})

export default http