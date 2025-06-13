import type {ApiResponse} from "@/http/axios.ts";
import http from '@/http/http.ts'


export interface DeviceOnlineInfoReply{
    total_devices: number;
    online_devices: number;
    offline_devices: number;
}

export async function getDeviceOnlineInfo(): Promise<ApiResponse<DeviceOnlineInfoReply>> {
    try {
        return await http.get<DeviceOnlineInfoReply>('/api/getDevicesStats')
    }catch (err){
        return Promise.reject(err);
    }
}
