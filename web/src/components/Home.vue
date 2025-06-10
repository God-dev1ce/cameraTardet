<script setup lang="ts">
import Aside from "@/layout/aside/Aside.vue";

</script>

<template>
  <div class="common-layout">
    <el-container>
      <!--顶部-->
      <el-header>
        <el-row class="header-title" flex="flex" align="middle" >
          <el-col :span="12">
            <div>视频智能应用运维平台</div>
          </el-col>
        </el-row>
      </el-header>

      <el-container>

        <!--侧边栏-->
        <el-aside width="200px">
          <Aside></Aside>
        </el-aside>

        <!--主界面-->
        <el-main>
          <router-view/>
        </el-main>

      </el-container>
    </el-container>
  </div>



</template>



<style scoped>
.header-title{
  padding: 20px;
}

.el-header{
  padding: 0;
  height: 60px;
  background: #1B1F4B;
  color: white;
}

.el-aside{
  height: 100vh;
}

.el-main{
  background: aqua;
}
</style>
