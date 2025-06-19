import type {ApiResponse} from "@/http/axios.ts";
import http from '@/http/http.ts'

export interface UserList{
    total: number;
    users: UserInfo[] | null
}

export interface UserInfo{
    usercode: string;
    username: string;
    role: string;
}


export async function addUser(usercode: string, password: string, username: string, role: string): Promise<ApiResponse<null>> {
    try{
        return await http.post<null>('/api/addUser', {
            usercode: usercode,
            username: username,
            password: password,
            role: role
        })
    }catch (err){
        return Promise.reject(err)
    }
}

export async function getUserList(skip: number, limit: number): Promise<ApiResponse<UserList>> {
    try{
        return http.get<UserList>(`/api/getUsers?skip=${skip}&limit=${limit}`)
    }catch(err){
        return Promise.reject(err)
    }
}
