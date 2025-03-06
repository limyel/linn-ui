<script setup>
import {ref} from "vue";
import {useMenuStore} from "@/stores/menu.js";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {getTabList, setTabList} from "@/utils/tablist.js";

const route = useRoute()
const router = useRouter()

const activeTab = ref(route.path)
const tabList = ref([
  {
    title: '仪表盘',
    path: '/admin/index'
  }
])

const menuStore = useMenuStore()

const removeTab = path => {
  let tabs = tabList.value
  let actTab = activeTab.value

  if (actTab === path) {
    tabs.forEach((tab, index) => {
      if (tab.path === path) {
        // 拿到被选中的标签页下标，如果它后面还有标签页，则取下一个标签页，否则取上一个
        let nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          actTab = nextTab.path
        }
      }
    })
  }

  activeTab.value = actTab

  tabList.value = tabList.value.filter((tab) => tab.path !== path)

  setTabList(tabList.value)
  tabChange(activeTab.value)
}

const tabChange = path => {
  activeTab.value = path
  router.push(path)
}

function addTab(tab) {
  let isTabNotExist = tabList.value.findIndex(item => item.path === tab.path) === -1
  if (isTabNotExist) {
    tabList.value.push(tab)
  }
  console.log(tabList.value)
  setTabList(tabList.value)
}

onBeforeRouteUpdate((to, from) => {
  activeTab.value = to.path
  addTab({
    title: to.meta.title,
    path: to.path,
  })
})

const handleCloseTab = command => {
  let indexPath = '/admin/index'

  if (command === 'closeOther') {
    tabList.value = tabList.value.filter(tab => tab.path === indexPath || tab.path === activeTab.value)
  } else if (command === 'closeAll') {
    activeTab.value = indexPath
    tabList.value = tabList.value.filter(tab => tab.path === indexPath)
    tabChange(activeTab.value)
  }

  setTabList(tabList.value)
}

function initTabList() {
  let tabs = getTabList()
  if (tabs) {
    tabList.value = tabs
  }
}

initTabList()
</script>

<template>
  <div class="fixed top-[64px] h-[44px] px-2 right-0 z-50 flex items-center bg-white" :style="{left: menuStore.menuWidth}">
    <!-- 左边：标签导航栏 -->
    <el-tabs v-model="activeTab" type="card" class="demo-tabs" closable @tab-change="tabChange" @tab-remove="removeTab" style="min-width: 10px;">
      <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path" :closable="item.path !== '/admin/index'">
        {{ item.title }}
      </el-tab-pane>
    </el-tabs>

    <!-- 右侧下拉菜单 -->
    <span class="ml-auto flex items-center justify-center h-[32px] w-[32px]">
      <el-dropdown @command="handleCloseTab">
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right">
            <arrow-down/>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
            <el-dropdown-item command="closeAll">关闭全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>

  <div class="h-[44px]"></div>
</template>

<style>
.el-tabs__item {
  font-size: 12px;
  border: 1px solid #d8dce5!important;
  border-radius: 3px!important;
}

.el-tabs--card>.el-tabs__header .el-tabs__item {
  margin-left: 0.1rem!important;
  margin-right: 0.1rem!important;
}

.el-tabs__item.is-active {
  background-color: var(--el-color-primary)!important;
  color: #fff;
}

.el-tabs__item.is-active::before {
  content: "";
  background-color: #fff;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 4px;
}

.el-tabs {
  height: 32px;
}

.el-tabs__header {
  margin-bottom: 0;
}

.el-tabs--card>.el-tabs__header .el-tabs__nav {
  border: 0;
}

.el-tabs--card>.el-tabs__header .el-tabs__item {
  height: 32px;
  line-height: 32px;
  border: 0;
  background: #fff;
}

.el-tabs--card>.el-tabs__header {
  border: 0;
}

.el-tabs__nav-prev, .el-tabs__nav-next {
  line-height: 35px;
}

.is-disabled {
  cursor: not-allowed;
  color: #d1d5db;
}

</style>