<template>
  <el-menu default-active="1">
    <el-menu-item index="1">
        <el-icon>
          <location/>
        </el-icon>
        <span>首页</span>
    </el-menu-item>

    <el-menu-item index="2">
        <el-icon>
          <icon-menu/>
        </el-icon>
        <span>设备管理</span>
    </el-menu-item>

    <el-menu-item index="3">
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
      <el-menu-item index="4-1">用户管理</el-menu-item>
      <el-menu-item index="4-2">用户操作记录</el-menu-item>
      <el-menu-item index="4-3">设备资产管理</el-menu-item>
    </el-sub-menu>

  </el-menu>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

</script>


<style scoped>
.el-menu--horizontal {
  --el-menu-horizontal-height: 100px;
}

</style>
