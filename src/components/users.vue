<template>
    <!-- 面包屑 -->
    <el-card class="box">
        <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
 
</el-breadcrumb>

<!-- 搜索框 -->
 <el-row>
     <el-col>
          <el-input placeholder="请输入内容" v-model="input5" class="searchbox">
              <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
              <el-button type="primary">添加用户</el-button>
     </el-col>
 </el-row>
    </el-card>
</template>
<script>
export default {

}
</script>

<style>
    .searchbox {
        margin-top: 20px;
        width: 400px;
    }
</style>
