<template>
  <div class="common-layout">
    <el-container>
      <!--顶部-->
      <el-header>Header</el-header>

      <el-container>

        <!--侧边栏-->
        <el-aside width="200px">
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
        </el-aside>

        <!--主界面-->
        <el-main>Main</el-main>

      </el-container>
    </el-container>
  </div>



</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
} from '@element-plus/icons-vue'

</script>


<style scoped>
.el-header{
  background: gainsboro;
}

.el-aside{
  background: lightyellow;
  height: 100vh;
}

.el-main{
  background: aqua;
}
</style>
