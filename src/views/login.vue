<template>
  <!-- <el-container>
    <el-main>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-col :span="8">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="密码">
          <el-col :span="8">
            <el-input v-model="form.password"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="8">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container> -->
  <div class="container">
    <el-form ref="form" :model="form" label-width="80px" class="login-page" >
      <h2>后台登录</h2>
      <el-form-item label="用  户:" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名">
          <el-button slot="prepend" icon="el-icon-user"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="密 码:">
        <el-input v-model="form.password" type="password" placeholder="请输入密码">
          <el-button slot="prepend" icon="el-icon-key"></el-button>
        </el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-user-solid" @click="login">登 录</el-button>
    </el-form>
  </div>
</template>
<script>
import { login }  from '../api/login'
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "admin",
        password: "admin"
      }
    };
  },
  mounted() {},
  beforeDestroy() {},
  created() {},
  methods: {
    login() {
      let that=this;
      login(that.form).then(response=>{
          console.log(response);
          if(response.code==200){
            that.$message(response.msg);
            this.$router.push({ name: "Home" });
          }else{
            that.$message(response.msg);
          }
      });
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 200px;
  width: 100%;
  height: 100%;
}
.login-page {
  border-radius: 5px;
  margin: auto;
  width: 350px;
  padding: 35px 55px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>