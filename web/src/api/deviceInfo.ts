import type {ApiResponse} from "@/http/axios.ts";
import http from '@/http/http.ts'


export interface DeviceOnlineInfoReply{
    total_devices: number;
    online_devices: number;
    offline_devices: number;
}

export interface DevicesReply{
    total: number;
    devices: DeviceInfo[]
}

export interface DeviceInfo{
    id: string;
    name: string;
    code: string;
    director: string | undefined
    ip_address: string;
    port: string;
    node_id: string;
    connected_time: string;
    disconnected_time: string;
    sync_time: string | undefined;
    is_online: boolean;
}

export async function getDeviceOnlineInfo(): Promise<ApiResponse<DeviceOnlineInfoReply>> {
    try {
        return await http.get<DeviceOnlineInfoReply>('/api/getDevicesStats')
    }catch (err){
        return Promise.reject(err);
    }
}

export async function getNodeDeviceList(node_id: string): Promise<ApiResponse<DevicesReply>> {
    try {
        return await http.get<DevicesReply>(`/api/getDevicesByNode/${node_id}`)
    }catch (err){
        return Promise.reject(err);
    }
}
