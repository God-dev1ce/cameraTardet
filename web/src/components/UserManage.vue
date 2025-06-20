<script setup lang="ts">

import {onMounted, ref} from "vue";
import {addUser, deleteUser, getUserList, type UserList} from "@/api/userInfo.ts";
import {ElMessage, ElMessageBox} from "element-plus";

const dialogVisible = ref(false)

const form = ref({
  usercode: '',
  username: '',
  password: '',
  role: ''
})

const formRef = ref()

// 简单的表单校验规则
const rules = {
  usercode: [{ required: true, message: '请输入用户代码', trigger: 'blur' }],
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  role: [{ required: true, message: '请选择用户类型', trigger: 'change' }]
}

const userInfoList = ref<UserList>({
  total: 1,
  users: []
})

function changeSize(num: number) {
  getUserList((num - 1) * 10, 10).then(res => {
    if (res.code == 200) {
      userInfoList.value = res.data
    }
  })
}

const cleanFormInfo= () => {
  dialogVisible.value = true
  form.value.usercode = ''
  form.value.role = ''
  form.value.password = ''
  form.value.username = ''
}

function deleteUserInfo(usercode: string) {
  ElMessageBox.confirm('您确定要删除当前用户吗', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(()=>{
    deleteUser(usercode).then(res=>{
      if(res.code==200){
        changeSize(1)
        ElMessage({
          type: 'success',
          message: 'Delete completed',
        })
      }
    })
  })
}

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      addUser(form.value.usercode, form.value.password, form.value.username, form.value.role).then(res=>{
        if(res.data.code == 200){
          changeSize(1)
          console.log("aaaa")
          ElMessage.success(`添加成功：${form.value.username}`)
        }
      })
      dialogVisible.value = false
    } else {
      ElMessage.warning('请完整填写表单')
    }
  })
}

onMounted(() => {
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
      <el-table :data="userInfoList?.users" style="width: 100%; background: rgba(0,0,0,0); padding: 20px 20px 0 20px">
        <el-table-column type="index" width="50"/>
        <el-table-column prop="username" label="用户名"/>
        <el-table-column prop="usercode" label="用户代码"/>
        <el-table-column prop="role" label="用户角色">
          <template #default="{ row }">
            <el-tag :type="row.role=='admin' ? 'success' : 'danger'">
              {{ row.role == 'admin' ? '管理员' : '用户' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="row">
            <el-button type="danger" @click="deleteUserInfo(row.row.usercode)" text>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="toolbar">
        <el-pagination :total="userInfoList.total" current-page="1" @current-change="changeSize" :page-size=10
                       layout="prev, pager, next"/>
        <el-button style="margin: 0 20px 0 0" type="primary" @click="cleanFormInfo">添加用户</el-button>
      </div>

    </el-col>
  </el-row>

  <el-dialog
      v-model="dialogVisible"
      title="添加用户"
      width="400px"
      :close-on-click-modal="false"
  >
    <!-- 表单区域 -->
    <el-form :model="form" label-width="90px" :rules="rules" ref="formRef">
      <el-form-item label="用户代码" prop="usercode">
        <el-input v-model="form.usercode" placeholder="请输入用户代码" />
      </el-form-item>

      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password" />
      </el-form-item>

      <el-form-item label="用户类型" prop="role">
        <el-select v-model="form.role" placeholder="请选择用户类型">
          <el-option label="普通用户" value="user" />
          <el-option label="管理员" value="admin" />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="submitForm">确认添加</el-button>
    </template>
  </el-dialog>
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
  height: 100px;
}
.toolbar{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
</style>
