<script setup>
import {User, Lock} from '@element-plus/icons-vue'
import {login} from "@/api/admin/user.js";
import {onMounted, onBeforeUnmount, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {showMsg} from "@/utils/msg.js";
import {setToken} from "@/utils/auth.js";

const router = useRouter()

let loading = ref(false)

const form = reactive({
  username: '',
  password: ''
})

const formRef = ref(null)
const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    }
  ]
}

const onSubmit = () => {

  formRef.value.validate(valid => {
    if (!valid) {
      console.log('表单验证不通过')
      return false
    }

    login(form.username, form.password).then(resp => {
      loading.value = true

      if (resp.code === 0) {
        setToken(resp.data.token)
        showMsg('登录成功')
        router.push("/admin/index")
      }
    }).finally(() => {
      loading.value = false
    })
  })
}

// 按回车键后，执行登录事件
function onKeyUp(e) {
  if (e.key === 'Enter') {
    onSubmit()
  }
}

// 添加键盘监听
onMounted(() => {
  document.addEventListener('keyup', onKeyUp)
})
// 移除键盘监听
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyUp)
})
</script>

<template>
  <!-- 使用 grid 网格布局，指定列数为 2，高度占满全屏 -->
  <div class="grid grid-cols-4 h-screen">
    <!-- 默认先适配移动端，占用两列，order 指定排列顺序 -->
    <div class="col-span-2 order-2 p-10 md:col-span-2 md:order-1 bg-slate-900">
      <!-- 垂直水平居中，高度 100% -->
      <div class="flex justify-center items-center h-full flex-col">
        <h2 class="font-bold text-4xl mb-7 text-white">linn 系统登录</h2>
        <p class="text-white">一个针对 Spring 全家桶和 Vue3 的练手项目。</p>
        <img src="@/assets/login.png" class="w-1/2"/>
      </div>
    </div>
    <div class="col-span-2 order-1 md:col-span-2 md:order-2 bg-white">
      <div class="flex justify-center items-center h-full flex-col">
        <h1 class="font-bold text-4xl mb-5">欢迎回来</h1>
        <!-- 子内容水平方向 x 轴间距 -->
        <div class="flex items-center justify-center mb-7 text-gray-400 space-x-2">
          <span class="h-[1px] w-16 bg-gray-200"></span>
          <span>用户名密码登录</span>
          <span class="h-[1px] w-16 bg-gray-200"></span>
        </div>
        <el-form ref="formRef" :rules="rules" :model="form" class="w-5/6 md:w-2/5">
          <el-form-item prop="username">
            <el-input v-model="form.username" size="large" placeholder="请输入用户名" :prefix-icon="User" clearable/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" size="large" type="password" placeholder="请输入密码" :prefix-icon="Lock"
                      clearable show-password/>
          </el-form-item>
          <el-form-item>
            <!-- 宽度设置为 100% -->
            <el-button @click="onSubmit" :loading="loading" class="w-full" size="large" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>