<template>
    <el-container class="container">
        <el-header class="header">
            <el-row>
                <el-col :span="4">
                    <div><img src="static/logo.png" alt=""></div>
                </el-col>
                <el-col :span="19" class="middle">
                    <h2>电商管理系统</h2>
                </el-col>
                <el-col :span="1">
                    <a href="#" @click.prevent="handleloginout()" class="loginout">退出</a>
                </el-col>
            </el-row>
        </el-header>

        <el-container>
            <el-aside class="aside" width="200px">
                <el-menu default-active="1" :router="true" :unique-opened="true">
                    <!-- 用户管理 -->
                    <el-submenu :index="item1.order+''"
                    v-for="(item1,i) in menus" :key="item1.id"
                    >
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item1.authName}}</span>
                        </template>
                        <el-menu-item :index="item2.path+''" v-for="(item2,i) in item1.children" :key="item2.id">
                            <i class="el-icon-menu"></i>
                            {{item2.authName}}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
export default {
    data(){
        return{
            menus:[]
        }
    },
  beforeMount () {
    // console.log('beforeMount---')

    if (!localStorage.getItem('token')) {
      this.$router.push({
        name: 'login'
      })
    }
  },
  created() {
      this.getMenus();
  },
  methods: {
      async getMenus() {
          const res = await this.$http.get(`menus`);
          console.log(res);
          const {meta:{msg,status},data} = res.data;
          if (status===200) {
              this.menus = data;
              console.log(this.menus);
              
          } 
      },
    //   退出
    handleloginout () {
      // 1.清除token
      localStorage.clear()
      this.$router.push({
        name: 'login'
      })
      this.$message.warning('退出成功')
    }
  }
}
</script>

<style>
.container {
  height: 100%;
  background: #ccc;
}
.header,.middle{
    /* height: 60px; */
    line-height: 60px;
    text-align: center;
    color: #fff;
}

.loginout {
    line-height: 60px;
    text-decoration: none;
}
.aside {
  background: #fff;
}
.main {
  background: gray;
}
</style>
