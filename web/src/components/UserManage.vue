<script setup lang="ts">

import {onMounted, ref} from "vue";
import {getUserList, type UserList} from "@/api/userInfo.ts";

const userInfoList = ref<UserList>({
  total: 100,
  users: null
})

function changeSize(num: number){
  getUserList((num-1)*10, 10).then(res=>{
    if(res.code == 200){
      userInfoList.value = res.data
    }
  })
}

onMounted(()=>{
  changeSize(1)
})
</script>

<template>
  <h1 class="title">用户管理</h1>
  <el-row>
    <!--查询筛选添加删除按钮列表-->
    <el-col class="user-card">

    </el-col>

    <el-col style="height: 20px"/>

    <!--用户表单-->
    <el-col class="user-card" style="height: 100vh">
      <el-table :data="userInfoList?.users" style="width: 100%; background: rgba(0,0,0,0); padding: 20px 20px 0 20px" >
        <el-table-column type="index" width="50" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="usercode" label="用户代码" />
        <el-table-column prop="role" label="用户角色">
          <template #default="{ row }">
            <el-tag :type="row.role=='admin' ? 'success' : 'danger'">
              {{ row.role=='admin' ? '管理员' : '用户' }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :total="userInfoList.total" current-page="1" @current-change="changeSize" :page-size=2 layout="prev, pager, next"/>
    </el-col>
  </el-row>
</template>

<style scoped>
.title {
  padding: 10px;
}

.user-card {
  background: white;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 20px;
  height:100px;
}
</style>
