<script setup lang="ts">
import {type DeviceOnlineInfoReply, getDeviceOnlineInfo, getDeviceOnlineList} from "@/api/deviceInfo.ts";
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";

const option = ref({
  legend: {
    data: ['总设备', '在线设备']
  },
  xAxis: {
    type: 'category',
    data: ['12:00']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: "总设备",
      data: [0],
      type: 'bar',
      stack: 'x'
    },
    {
      name: "在线设备",
      data: [0],
      type: 'bar',
      stack: 'x'
    },
  ]
})

const defaultDeviceInfo: DeviceOnlineInfoReply = {
  total_devices: 0,
  online_devices: 0,
  offline_devices: 0
}

const deviceInfo = ref<DeviceOnlineInfoReply>(defaultDeviceInfo)

onMounted(()=>{
  // 获取当前在离线设备数量
  getDeviceOnlineInfo().then(res=>{
    if(res.code==200){
      deviceInfo.value = res.data
      ElMessage.success("获取设备信息成功")
    }
  }).catch(err=>{
    console.log(err)
  })

  // 获取历史在离线设备情况
  getDeviceOnlineList().then(res=>{
    if(res.code == 200){
      console.log(res.data)
      option.value.xAxis.data = res.data.map(item=>item.time)
      option.value.series[1].data=res.data.map(item=>item.online_devices)
      option.value.series[0].data=res.data.map(item=>item.total_devices-item.online_devices)
    }
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

    <!--近24小时在离线情况统计-->
    <el-col :span="16">
      <div class="device-online-card">
        <el-row>
          <el-col :span="24"><h6 style="padding: 10px 10px 10px 20px; color: rgba(0,0,0,60%)">近24小时在离线统计</h6></el-col>
        </el-row>
        <e-charts :option="option"></e-charts>
      </div>
    </el-col>
  </el-row>

  <!--今日报警统计-->
  <el-row :gutter="20" style="padding: 30px 0 0 0">
    <el-col :span="12">
      <div class="device-online-card">
        <el-row>
          <el-col :span="24"><h6 style="padding: 10px 10px 10px 20px; color: rgba(0,0,0,60%)">今日报警统计</h6></el-col>
        </el-row>

        <el-row class="device-info-card" style="color: rgba(0,0,0,44%); font-size: 10px">
          <el-col :span="1"/>
          <el-col :span="6" class="card-info">
            <b style="color: rgb(52, 98, 253); font-size: 23px">1</b>
            <div>报警类型1</div>
          </el-col>
          <el-col :span="2"/>
          <el-col :span="6" class="card-info">
            <b style="color: rgb(52, 98, 253); font-size: 23px">2</b>
            <div>报警类型2</div>
          </el-col>
          <el-col :span="2"/>
          <el-col :span="6" class="card-info">
            <b style="color: rgb(52, 98, 253); font-size: 23px">3</b>
            <div>报警类型3</div>
          </el-col>
          <el-col :span="1"/>
        </el-row>

        <el-row class="device-info-card" style="color: rgba(0,0,0,44%);">
          <el-col :span="1"/>
          <el-col :span="6" class="card-info">
            <b style="color: rgb(52, 98, 253); font-size: 23px">1</b>
            <div>报警类型4</div>
          </el-col>
          <el-col :span="2"/>
          <el-col :span="6" class="card-info">
            <b style="color: rgb(52, 98, 253); font-size: 23px">2</b>
            <div>报警类型5</div>
          </el-col>
          <el-col :span="2"/>
          <el-col :span="6" class="card-info">
            <b style="color: rgb(52, 98, 253); font-size: 23px">3</b>
            <div>报警类型6</div>
          </el-col>
          <el-col :span="1"/>
        </el-row>

      </div>
    </el-col>

    <!--今日报警统计饼状图-->
    <el-col :span="12">
      <div class="device-online-card">
        <el-row>
          <el-col :span="24"><h6 style="padding: 10px 10px 10px 20px; color: rgba(0,0,0,60%)">巡检任务配置</h6></el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>

  <!--本月报警趋势折线图-->
  <el-row style="padding: 30px 0 0 0">
    <el-col :span="24">
      <div class="device-online-card">
        <el-row>
          <el-col :span="24"><h6 style="padding: 10px 10px 10px 20px; color: rgba(0,0,0,60%)">本月报警趋势</h6></el-col>
        </el-row>
      </div>
    </el-col>

  </el-row>

</template>

<style scoped>
.device-info-card {
  height: 90px;
  padding: 5px 0 0 0;
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
