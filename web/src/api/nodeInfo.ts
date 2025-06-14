import type {ApiResponse} from "@/http/axios.ts";
import http from '@/http/http.ts'

export interface NodeInfo{
    id: string;
    name: string;
    parent_id: string;
    node_js: string;
    node_fjm: string;
    node_mx: string;
    children: NodeInfo[];
}

export async function getNodeTree(): Promise<ApiResponse<NodeInfo[]>> {
    try{
        return await http.get<NodeInfo[]>('/api/getNodesTree')
    }catch (err){
        return Promise.reject(err)
    }
}


