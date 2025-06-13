import api, {type ApiResponse} from './axios.ts'
import type {Method} from "axios";



export default class Http {
    public static get<T = any>(url: string, params?: Object, config?: Object): Promise<ApiResponse<T>> {
        const method:Method = 'GET'
        const options = {
            url,
            method,
            params,
            ...config
        }
        if(!params){
            delete options.params
        }
        return api(options)
    }

    public static post<T = any>(url: string, data: Object, config?: Object): Promise<ApiResponse<T>> {
        const method:Method = 'POST'
        const options = {
            url,
            method,
            data,
            ...config
        }
        return api(options)
    }

    public static put<T = any>(url: string, params?: Object, config?: Object): Promise<ApiResponse<T>> {
        const method:Method = 'PUT'
        const options = {
            url,
            method,
            params,
            ...config
        }
        return api(options)
    }

    public static delete<T = any>(url: string, params?: Object, config?: Object): Promise<ApiResponse<T>> {
        const method:Method = 'DELETE'
        const options = {
            url,
            method,
            params,
            ...config
        }
        return api(options)
    }
}
