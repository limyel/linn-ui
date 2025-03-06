<script setup>
import AdminMenu from "@/layout/admin/components/AdminMenu.vue";
import AdminHeader from "@/layout/admin/components/AdminHeader.vue";
import AdminFooter from "@/layout/admin/components/AdminFooter.vue";
import AdminTagList from "@/layout/admin/components/AdminTagList.vue";
import {useMenuStore} from "@/stores/menu.js";

const menuStore = useMenuStore()
</script>

<template>
  <!-- 外层容器 -->
  <el-container>

    <!-- 左边侧边栏 -->
    <el-aside class="transition-all duration-300" :width="menuStore.menuWidth">
      <AdminMenu></AdminMenu>
    </el-aside>

    <!-- 右边主内容区域 -->
    <el-container>
      <!-- 顶栏容器 -->
      <el-header>
        <AdminHeader></AdminHeader>
      </el-header>

      <el-main>
        <!-- 标签导航栏 -->
        <AdminTagList></AdminTagList>

        <router-view></router-view>
      </el-main>

      <!-- 底栏容器 -->
      <el-footer>
        <AdminFooter></AdminFooter>
      </el-footer>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-header {
  padding: 0!important;
}

.el-footer {
  padding: 0!important;
}
</style>