<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
} from '@element-plus/icons-vue'
</script>

<template>
  <el-menu default-active="/device_info"
    :router="true"
  >
    <el-menu-item index="/device_info">
      <el-icon>
        <location/>
      </el-icon>
      <span>首页</span>
    </el-menu-item>

    <el-menu-item index="/device_manage">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <span>设备管理</span>
    </el-menu-item>

    <el-menu-item index="/device_alarm_manage">
      <el-icon>
        <document/>
      </el-icon>
      <span>预警管理</span>
    </el-menu-item>

    <el-sub-menu index="4">
      <template #title>
        <el-icon>
          <icon-menu/>
        </el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/user_manage">用户管理</el-menu-item>
      <el-menu-item index="/user_operate_info">用户操作记录</el-menu-item>
      <el-menu-item index="/device_resource_manage">设备资产管理</el-menu-item>
    </el-sub-menu>

  </el-menu>
</template>

<style scoped>

</style>
