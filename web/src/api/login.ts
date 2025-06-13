import http from './http.ts'
import type {ApiResponse} from "@/api/axios.ts";

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
        throw err;
    }
}

export async function refreshToken(refreshToken: string): Promise<ApiResponse<GetNewTokenReply>> {
    try{
        return await http.post<GetNewTokenReply>('/api/refresh', {
            refresh_token: localStorage.getItem('refresh_token')
        })
    }catch (err){
        throw err
    }
}
