import type {ApiResponse} from "@/http/axios.ts";
import http from '@/http/http.ts'

export interface BaseNode {
    id: string;
    name: string;
    parent_id: string;
    node_js: string;
    node_fjm: string;
    node_mx: string;
}

export interface NodeInfo extends BaseNode{
    children: NodeInfo[];
}

export async function getNodeTree(): Promise<ApiResponse<NodeInfo[]>> {
    try{
        return await http.get<NodeInfo[]>('/api/getNodesTree')
    }catch (err){
        return Promise.reject(err)
    }
}

export async function addNode(node_name: string, parent_id: string): Promise<ApiResponse<null>> {
    try{
        return await http.post<null>('/api/addNode', {
            node_name: node_name,
            parent_id: parent_id
        })
    }catch(err){
        return Promise.reject(err)
    }
}


