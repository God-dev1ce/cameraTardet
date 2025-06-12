<script setup lang="ts">
import {ref, reactive} from 'vue'
import {useRouter} from "vue-router";
import {login} from "@/api/login.ts";
const router = useRouter()

let user = reactive({
  username: '',
  password: ''
})

const loginFormRef = ref(null)

const rules = ref({
  username:[
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password:[
    { required: true, message: 'Please input Activity password', trigger: 'blur' },
    { min: 6, max: 16, message: 'Length should be 3 to 5', trigger: 'blur' },
  ]
})

function handlerLogin(formEl: any){
  formEl.validate((valid:any)=>{
    if(valid){
      // router.push('/home')
      login(user.username, user.password).then(res=>{
        if(res.code == 200){
          console.log(res.data)
        }
      }).catch(err=>{
        console.log(err)
      })
    }else{
      console.log("err submit!")
    }
  })
}
</script>

<template>
  <router-view/>
  <el-row :justify="'center'">
    <el-col :span="8">
      <div class="login-box">
        <h2>登录</h2>

        <el-form label-position="right"
            ref="loginFormRef"
            :model="user"
            :rules="rules"
            label-width="auto"
        >
          <!--用户名-->
          <el-form-item label="用户名:" prop="username">
              <el-input v-model="user.username"></el-input>
          </el-form-item>

          <!--密码-->
          <el-form-item label="密码:" prop="password">
            <el-input v-model="user.password" type="password"></el-input>
          </el-form-item>

          <!--登录按钮-->
          <el-form-item>
            <el-button class="login-btn" @click="handlerLogin(loginFormRef)" type="primary">登录</el-button>
          </el-form-item>
        </el-form>

      </div>
    </el-col>
  </el-row>
</template>

<style>
.login-box{
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 1px 1px 5px #ccc;
  padding: 20px;
  margin-top: 50px;
}

.login-btn{
  width: 100%;
}
</style>
