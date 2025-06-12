import axios, {type AxiosResponse} from 'axios'

export interface ApiResponse<T = any> {
    code: number;
    data: T;
    msg: string;
}

const api = axios.create({
    baseURL: 'http://localhost:5173',
    timeout: 10000,
    headers: {
        'Context-Type': 'application/json'
    }
})

// 请求拦截处理
api.interceptors.request.use(config=>{
    return config;
}, err => {
    return err
})

api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data; // 仍然是 any，交给调用处处理
    },
    error => {
        return Promise.reject(error);
    }
)


export default api
