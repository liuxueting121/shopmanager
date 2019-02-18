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
                <el-input placeholder="请输入内容" class="searchbox">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="primary">添加用户</el-button>
            </el-col>
        </el-row>

        <!-- 表格 -->

        <el-table :data="list" style="width: 100%">
            <el-table-column prop="id" type="index" label="#" width="80"></el-table-column>
            <el-table-column prop="username" label="姓名" width="100"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
            <el-table-column prop="mobile" label="电话" width="140"></el-table-column>
            <el-table-column prop="create_time" label="创建日期" width="200"></el-table-column>
            <el-table-column label="用户状态" width="120">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>

                </template>

            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
                    <el-button type="success" icon="el-icon-check" circle size="mini" plain></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页功能 -->
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
</template>
<script>
export default {
  data() {
    return {
      // 写搜索功能时的关键字
      query: "",
      //分页功能-前提是接口必须支持分页-通常在接口url参数中有类似page的参数名
      pagenum: 1,
      pagesize: 2,
      total:-1,
      //表格数据
      list: []
    };
  },
  created() {
    this.getTableData();
  },
  methods: {

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagenum = 1;
        this.pagesize = val;
        this.getTableData();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenum = val;
        this.getTableData();    

      },


    async getTableData() {
      //  设置请求头
      // 设置发送请求时的请求头->axios库->找axios中有没有可以设置headers头部的API
      const AUTH_TOKEN = localStorage.getItem("token");
      console.log(AUTH_TOKEN);

      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      //   console.log(res);
      const { data, meta: { status, msg } } = res.data;
      if (status === 200) {
        this.total = data.total;
        this.list = data.users;
        console.log(this.list);
      }
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
