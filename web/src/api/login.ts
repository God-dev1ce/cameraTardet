import http from '@/http/http.ts'
import type {ApiResponse} from "@/http/axios.ts";


interface Token {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

interface GetNewTokenReply{
    access_token: string;
    token_type: string;
}

export async function login(username: string, password: string): Promise<ApiResponse<Token>>{
    try {
        return await http.post<Token>('/api/login', {
            usercode: username,
            password: password
        })
    }catch (err){
        return Promise.reject(err);
    }
}

export async function refreshToken(refreshToken: string): Promise<ApiResponse<GetNewTokenReply>> {
    try{
        return await http.post<GetNewTokenReply>('/api/refresh', {
            refresh_token: localStorage.getItem('refresh_token')
        })
    }catch (err){
        return Promise.reject(err);
    }
}
