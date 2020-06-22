<template>
  <div id="home">
    <el-container>
      <el-aside width="8%">
        <el-menu default-active="/modules" class="el-menu-vertical-demo" :collapse="true" router>
          <el-menu-item index="/modules">
            <i class="el-icon-document"></i>
            <span slot="title">模块列表</span>
          </el-menu-item>
          <el-menu-item index="/editor">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">编辑器</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="margin: 0; padding: 0;">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'

export default {
  name: 'Home',
  async mounted() {
  }
}
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  height: 100vh;
}
</style>
