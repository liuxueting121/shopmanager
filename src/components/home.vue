<template>
    <el-container class="container">
  <el-header>
      <h3>电商管理系统</h3>
  </el-header>
  <el-container>
    <el-aside class="aside" width="200px">
            <el-menu
      default-active="1"
      :router="true"
      :unique-opened="true"
      >
      <!-- 用户管理 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
          <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              用户列表
        </el-menu-item>
      </el-submenu>
      <!-- 权限管理 -->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
          <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              角色列表
        </el-menu-item>
         <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              权限列表
        </el-menu-item>
      </el-submenu>
      <!-- 商品 -->
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
          <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              商品列表
        </el-menu-item>
         <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              分类参数
        </el-menu-item>
        <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              商品分类
        </el-menu-item>
      </el-submenu>
      <!-- 订单 -->
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
          <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              订单列表
        </el-menu-item>
      </el-submenu>
      <!-- 数据 -->
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
          <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              数据列表
        </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main class="main">Main</el-main>
  </el-container>
</el-container>



</template>

<script>
export default {

}
</script>

<style>
.container {
    height: 100%;
    background: #ccc;
    text-align: center;
}
.aside {
    background: #fff;
}
.main {
    background: gray;
}
</style>
