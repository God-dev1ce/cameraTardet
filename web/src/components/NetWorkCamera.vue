<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from "vue";

const deviceId = defineProps(['deviceId'])

const data = ref({
  name: "ShowLive",
  frame: "",
  socket: null as WebSocket | null,
})

const pingInterval = ref<number | null>(null)

onMounted(()=>{
  console.log("链接socket")
  data.value.socket = new WebSocket("ws://localhost:8000/api/play/"+deviceId.deviceId);

  data.value.socket.onmessage = (event) =>{
    try{
      const [code, payload] = event.data.split('|')
      console.log(code)
      if(code === '200'){
        data.value.frame = payload
      }else{
        console.error('连接错误:', payload);
      }
    }catch (err){
      console.error('消息解析失败:', err);
    }
  };

  data.value.socket.onopen = () => {
    // 记录定时器Id
    pingInterval.value = setInterval(()=>{
      data.value.socket?.send("ping")
      console.log("发送心跳包保活")
    }, 30000)
  }

  data.value.socket.onerror = (err) =>{
    console.error("WebSocket 错误", err);
  }
})

onBeforeUnmount(()=>{

  // 关闭连接时清除定时器
  if(pingInterval.value!=null){
    clearInterval(pingInterval.value)
  }

  if(data.value.socket){
    console.log(`websocket已关闭, url:${data.value.socket.url}`)
    data.value.socket.close();
  }
})
</script>

<template>
  <div class="live">
    <h2>设备画面播放</h2>
    <img :src="data.frame" alt="实时画面" class="live-image">
  </div>
</template>

<style scoped>
.live {
  text-align: center;
}

.live-image {
  width: 80%;
  max-width: 960px;
  border: 2px solid #ccc;
  border-radius: 8px;
}
</style>
