<script setup>
import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";
import {useMenuStore} from "@/stores/menu.js";

const route = useRoute()
const router = useRouter()

// 根据路由，判断默认选中的菜单
const defaultActive = ref(route.path)

const menuStore = useMenuStore()

const isCollapse = computed(() => !(menuStore.menuWidth === '250px'))

const menus = [
  {
    'name': '仪表盘',
    'icon': 'Odometer',
    'path': '/admin/index'
  },
  {
    'name': '博客管理',
    'icon': 'Notebook',
    'children': [
      {
        'name': '文章管理',
        'path': '/admin/blog/articles'
      },
      {
        'name': '标签管理',
        'path': '/admin/blog/tags'
      },
      {
        'name': '博客设置',
        'path': '/admin/blog/setting'
      }
    ]
  },
  {
    'name': '系统设置',
    'icon': 'Setting',
    'path': '/admin/setting'
  }
]

function handleSelect(path) {
  router.push(path)
}
</script>

<template>
  <!-- 添加动画 -->
  <div class="bg-slate-800 h-screen text-white transition-all duration-300" :style="{ width: menuStore.menuWidth }">
    <!-- 顶部 Logo, 指定高度为 64px, 和右边的 Header 头保持一样高 -->
    <div class="flex items-center justify-center h-[64px]">
      <p v-if="menuStore.menuWidth === '250px'">Linn 后台管理系统</p>
      <p v-else>Linn</p>
    </div>

    <!-- 下方菜单 -->
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :default-active="defaultActive"
        text-color="#fff"
        @select="handleSelect"
        @close="handleClose"
        :collapse="isCollapse"
        :collapse-transition="false"
    >
      <template v-for="(item, index) in menus" :key="index">
        <el-sub-menu :index="index" v-if="item.children">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="(child, childIndex) in item.children" :key="childIndex">
            <el-menu-item :index="child.path">{{ child.name }}</el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item v-else :index="item.path">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
/* 重写 el-menu 的样式 */
.el-menu {
  background-color: rgb(30 41 59 / 1);
  border-right: 0;
}

.el-sub-menu__title, * {
  color: #fff;
}

.el-sub-menu__title:hover {
  background-color: var(--el-color-primary);
}

.el-menu-item.is-active {
  background-color: var(--el-color-primary);
  color: #fff;
}

.el-menu-item.is-active:hover {
  background-color: var(--el-color-primary);
}

.el-menu-item {
  background-color: rgb(30 41 59 / 1);
  color: #fff;
}

.el-menu-item:hover {
  background-color: var(--el-color-primary);
}
</style>