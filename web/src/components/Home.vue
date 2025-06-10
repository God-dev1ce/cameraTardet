<script setup lang="ts">
import Aside from "@/layout/aside/Aside.vue";

</script>

<template>
  <div class="common-layout">
    <el-container>
      <!--顶部-->
      <el-header>Header</el-header>

      <el-container>

        <!--侧边栏-->
        <el-aside width="200px">
          <Aside></Aside>
        </el-aside>

        <!--主界面-->
        <el-main>Main</el-main>

      </el-container>
    </el-container>
  </div>



</template>



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
