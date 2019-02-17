<template>
    <!-- 面包屑 -->
    <el-card class="box">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
                <a href="/">用户管理</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>

        </el-breadcrumb>

        <!-- 搜索框 -->
        <el-row>
            <el-col>
                <el-input placeholder="请输入内容" v-model="input5" class="searchbox">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="primary">添加用户</el-button>

                <!-- 表格 -->
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="日期" width="180">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </el-card>
</template>
<script>
export default {
      data() {
        return {
            query:"",
            //表格数据
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      }
};
</script>

<style>
.searchbox {
  margin-top: 20px;
  width: 400px;
}
</style>
