<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <n-card class="w-full max-w-md">
      <template #header>
        <h2 class="text-2xl font-bold text-center">欢迎回来</h2>
      </template>
      <n-form>
        <n-form-item-row label="用户名">
          <n-input placeholder="请输入用户名" />
        </n-form-item-row>
        <n-form-item-row label="密码">
          <n-input type="password" placeholder="请输入密码" />
        </n-form-item-row>
      </n-form>
      <n-button type="primary" block>
        登录
      </n-button>
    </n-card>
  </div>
</template>

<script setup>
</script>

<style scoped>

</style>
