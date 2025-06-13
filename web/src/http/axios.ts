import axios, {type AxiosResponse} from 'axios'
import {clearTokens, getAccessToken, getRefreshToken, setTokens} from "@/http/token.ts";
import {refreshToken} from "@/api/login.ts";
import {useRouter} from "vue-router";

export interface ApiResponse<T = any> {
    code: number;
    data: T;
    msg: string;
}

const router = useRouter()

const api = axios.create({
    baseURL: 'http://localhost:5173',
    timeout: 10000,
    headers: {
        'Context-Type': 'application/json'
    }
})

// 请求拦截处理
api.interceptors.request.use(config=>{
    const token = getAccessToken()
    const tokenType = localStorage.getItem('token_type')
    if(token && tokenType && config.headers){
        config.headers.Authorization = `${tokenType} ${token}`
    }
    return config;
}, err => {
    return err
})

api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    async err => {
        if(err.response?.status == 401){
            const originalRequest = err.config;
            const rt = getRefreshToken()
            if(rt){
                await refreshToken(rt).then(res=>{
                    setTokens(res.data.access_token, rt)
                }).catch(()=>{
                    clearTokens()
                    router.push('/login')
                })
            }
            originalRequest.headers.Authorization = `${localStorage.getItem('token_type')} ${getAccessToken()}`
            return api(originalRequest)
        }
        return Promise.reject(err);
    }
)


export default api
