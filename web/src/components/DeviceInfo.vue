<script setup lang="ts">
import {type DeviceOnlineInfoReply, getDeviceOnlineInfo} from "@/api/deviceInfo.ts";
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";

const defaultDeviceInfo: DeviceOnlineInfoReply = {
  total_devices: 0,
  online_devices: 0,
  offline_devices: 0
}

const deviceInfo = ref<DeviceOnlineInfoReply>(defaultDeviceInfo)

onMounted(()=>{
  getDeviceOnlineInfo().then(res=>{
    if(res.code==200){
      deviceInfo.value = res.data
      ElMessage.success("成功获取设备信息")
    }
  }).catch(err=>{
    console.log(err)
  })
})

</script>

<template>
  <h1 class="title">设备信息</h1>
  <el-row :gutter="20">

    <el-col :span="8">
      <!--设备存在情况卡片-->
      <div class="device-online-card">
        <el-row>
          <el-col :span="12"><h6 style="padding: 10px 10px 10px 20px; color: rgba(0,0,0,60%)">接入设备总数</h6></el-col>
          <!--TODO 页面跳转 -->
          <el-col :span="12"><h6 style="padding: 10px 30px 10px 10px; color: #0F40F580; text-align: right">查看离线</h6>
          </el-col>
        </el-row>

        <el-row class="device-info-card">
          <el-col :span="2"/>
          <el-col :span="9" class="card-info">
            <b style="">{{ deviceInfo.total_devices }}</b>
            <div style="color: rgba(0,0,0,44%)">总数</div>
          </el-col>
          <el-col :span="2"/>
          <el-col :span="9" class="card-info">
            <b style="">{{ deviceInfo.online_devices }}</b>
            <div style="color: rgba(0,0,0,44%)">在线</div>
          </el-col>
          <el-col :span="2"/>
        </el-row>

        <el-row class="device-info-card">
          <el-col :span="2"/>
          <el-col :span="9" class="card-info">
            <b style="">{{ deviceInfo.offline_devices }}</b>
            <div style="color: rgba(0,0,0,44%)">离线</div>
          </el-col>
          <el-col :span="2"/>
          <el-col :span="9" class="card-info">
            <b style="">{{ ((deviceInfo.online_devices/deviceInfo.total_devices)*100).toFixed(2) }}%</b>
            <div style="color: rgba(0,0,0,44%)">在线率</div>
          </el-col>
          <el-col :span="2"/>
        </el-row>
      </div>
    </el-col>

    <el-col :span="16">
      <div class="device-online-card">
        <el-row>
          <el-col :span="12"><h6 style="padding: 10px 10px 10px 20px; color: rgba(0,0,0,60%)">近24小时在离线统计</h6></el-col>
          <!--TODO 页面跳转 -->
          <el-col :span="12"><h6 style="padding: 10px 30px 10px 10px; color: #0F40F580; text-align: right"></h6>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>

</template>

<style scoped>
.device-info-card {
  height: 90px;
  padding: 10px 0 0 0;
  text-align: center
}

.device-online-card {
  background: white;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 20px;
  height: 250px;
}

.title {
  padding: 10px;
}

.card-info{
  border-radius: 5px;
  background: #EFEFEF4D;
  padding: 20px 0 0 0
}
</style>
