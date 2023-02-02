<script setup>
import { reactive, ref } from 'vue'
import axios from "axios";

const formRef = ref()
const isError = ref(false)
const isLoading = ref(false)

const numberValidateForm = reactive({
  username: 'kminchelle',
  password: '0lelplR'
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate( async (valid) => {
    if (valid) {
      isLoading.value = true
      try {
        const response = await axios.post('https://dummyjson.com/auth/login', {
          username: numberValidateForm.username,
          password: numberValidateForm.password
        })
        const { token } = (response.data);
        localStorage.setItem('token', token)
        window.location.href='/'
      }catch (e) {
        console.log(e.response);
        isError.value = true
      }
      isLoading.value = false
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<template>
  <div class="sign-body">
    <el-form
      ref="formRef"
      :model="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
      style="margin-top: 100px"
    >
      <el-alert type="error" show-icon :closable="false" style="margin: 10px 0" v-if="isError">
        <p>Message successfully sent!</p>
      </el-alert>
      <el-form-item
        label="Username"
        prop="username"
        :rules="[
        { required: true, message: 'username is required' },
      ]"
      >
        <el-input
          v-model.number="numberValidateForm.username"
          type="text"
          autocomplete="off"
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item
        label="password"
        prop="password"
        :rules="[
        { required: true, message: 'age is required' },
      ]"
      >
        <el-input
          v-model.number="numberValidateForm.password"
          type="text"
          autocomplete="off"
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)" :loading="isLoading">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.sign-body {
  display: flex;
  justify-content: center;
}
</style>
