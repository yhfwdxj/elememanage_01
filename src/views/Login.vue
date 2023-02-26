<template>
  <div class="container">
    <el-form :rules="rules" ref="formRef" :model="form" label-width="80px" class="form">
      <h2 class="text">后台管理系统</h2>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type=password v-model="form.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:150px" @click="submit">登录/注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { login, getUserInfo } from '~/api/getData.js'
import { message } from '~/utils/message'
import router from '~/router'
const form = reactive({
  username: '',
  password: ''
})
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const formRef = ref(null)
const userInfo = async () => {
  let res = await getUserInfo()
  if (res.data.status === 1) {
    window.localStorage.setItem('loginState', 'true')
    router.push('/home')
    message('检测到您已经登录,自动跳转到首页', 'success')
  } else {
    message('登录已过期请重新登录', 'warning')
    window.localStorage.setItem('loginState', 'false')
  }

}
userInfo()
const submit = () => {
  formRef.value.validate(async valid => {
    if (!valid) {
      return
    }
    const { username, password } = form
    let res = await login({
      user_name: username,
      password
    })
    if (res.status === 1) {
      window.localStorage.setItem('loginState', 'true')
      router.push('/home')
      message('登录成功', 'success')
    } else {
      window.localStorage.setItem('loginState', 'false')
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  background-color: #324057;
  border: 1px solid transparent;
}

.form {
  min-width: 350px;
  width: 25%;
  margin: 20% auto;
  border: 1px solid white;
  border-radius: 15px;
  padding: 20px;
  background-color: #fff;

  .text {
    text-align: center;
    margin-bottom: 20px;
  }

  :deep(.el-form-item__content) {
    justify-content: center;
    margin-left: 0 !important;
  }
}
</style>