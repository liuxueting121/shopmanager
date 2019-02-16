<template>
  <div class="login-wrap">
    <el-form label-position="top" label-width="80px" :model="fromData" class="login-form">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="fromData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="fromData.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handlelogin()" type="primary" class="login-button">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async handlelogin() {
      const res = await this.$http.post(`login`, this.fromData);
      // console.log(res);
      const { 
        data: { 
          data, 
          meta: { msg, status } 
          } 
        } = res;

      if (status === 200) {
        //渲染home.vue<-改标识/<-js代码编程导航$router
        this.$router.push({
          name: "home"
        });
      } else {
        this.$message.error(msg);
      }

      // .then((res) => {
      //   console.log(res)
      //   const {data:{
      //     data,meta:{msg,status}
      //   }} = res
      //   if (status===200) {
      //     //渲染home.vue<-改标识/<-js代码编程导航$router
      //     this.$router.push({
      //       name:'home'
      //     })
      //   }else {
      //     this.$message.error(msg);
      //   }
      // })
    }
  }
};
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
}
.login-wrap,
.login-button {
  width: 100%;
}
</style>
