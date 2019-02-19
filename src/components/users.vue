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
                <el-input @click="getAllUsers()" placeholder="请输入内容" class="searchbox" v-model="query">
                    <el-button @click="searchUsers()" slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button @click="showDiaAdduser()" type="primary">添加用户</el-button>
            </el-col>
        </el-row>

        <!-- 表格 -->

        <el-table :data="list" style="width: 100%">
            <el-table-column prop="id" type="index" label="#" width="80"></el-table-column>
            <el-table-column prop="username" label="姓名" width="100"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
            <el-table-column prop="mobile" label="电话" width="140"></el-table-column>
            <el-table-column label="创建日期" width="200">
                <template slot-scope="scope">
                    {{scope.row.create_time|fmtdate}}
                </template>
            </el-table-column>
            <el-table-column label="用户状态" width="120">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>

                </template>

            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="showDiaEditUser(scope.row)" type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
                    <el-button @click="showMsgBox(scope.row)" type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
                    <el-button type="success" icon="el-icon-check" circle size="mini" plain></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页功能 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <!-- 添加功能 -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
            <el-form label-position="left" label-width="80px" :model="fromData" class="login-form">
                <h2>用户登录</h2>
                <el-form-item label="用户名">
                    <el-input v-model="fromData.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="fromData.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="fromData.email"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="fromData.mobile"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="addUser()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑用户 -->
        <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
            <el-form label-position="left" label-width="80px" :model="fromData" class="login-form">
                <el-form-item label="用户名">
                    <el-input v-model="fromData.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="fromData.email"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="fromData.mobile"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                <el-button type="primary" @click="editUser()">确 定</el-button>
            </div>
        </el-dialog>
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
    //   添加用户数据
    dialogFormVisibleAdd :false,
    dialogFormVisibleEdit :false,
    fromData:{
        username:'',
        password:'',
        email:'',
        mobile:'',
    },
      list: []
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
      //编辑用户-显示对话框
      async showDiaEditUser(user) {
      this.dialogFormVisibleEdit = true;
      const res = await this.$http.get(`users/${user.id}`);
      this.fromData = res.data.data;
    },
    // 编辑用户-发出请求
    async editUser(){
        const res = await this.$http.put(`users/${this.fromData.id}`,this.fromData);
        
        const {meta: { msg, status }} = res.data;
        console.log(res);
        
       if (status === 200) {
        // 关闭对话框
        this.dialogFormVisibleEdit = false;
        // 更新表格
        this.getTableData();
      }
    },
    //   删除弹出确认框
    showMsgBox(user){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
            const res = await this.$http.delete(`users/${user.id}`);
            console.log(res);
            
            const {meta:{msg,status}} = res.data;
            if (status===200) {
                this.$message.success('删除成功');
                this.pagenum = 1;
                this.getTableData();
            }
        }).catch(() => {
          this.$message.info('已取消删除');
        });
    },

    //   添加用户-发送请求
      async addUser(){
          const res = await this.$http.post(`users`,this.fromData);
          this. dialogFormVisibleAdd = false;
          this.getTableData();
      },
    //   添加用户-显示对话框
    showDiaAdduser(){
        this.dialogFormVisibleAdd = true;
    },
      //清空时获取所有用户
      getAllUsers(){
          this.getTableData();
      },

      //搜索用户
      searchUsers(){
          this.pagenum = 1;
          this.getTableData();

      },

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
