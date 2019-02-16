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
  data () {
    return {
      fromData: {
        username: '',
        password: ''
      }
    }
  },
<<<<<<< HEAD
  methods: {
    handlelogin () {
      this.$http
        .post(`login`, this.fromData)
        .then((res) => {
          console.log(res)
          const {data:{
            data,meta:{msg,status}
          }} = res
          if (status===200) {
            console.log('login---success---');
          }else {
            console.log('error----')

            
=======
  methods :{
    handlelogin() {
      this.$http
        .post(`login`,this.fromData)
        .then((res)=> {
          console.log(res)
          const {data:{
            data,meta:{msg,status}
          }}=res
          if (status===200) {
            console.log('login---succes--');
          }else {
            
            this.$message.error(msg);
>>>>>>> dev-login
          }
        })
    }
  }
}
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
