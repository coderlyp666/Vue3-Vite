<template>
  <div class="login">
    <el-container class="container">
      <el-header>
        <NavBar />
      </el-header>
      <el-main><Main /></el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script setup>
import NavBar from "../../components/navbar/NavBar.vue";
import Main from "../../components/main/Main.vue";
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
    background-color: rgb(246, 247, 248);
  }

  .el-header {
    background-color: #fff;
    height: 50px;
  }
}
</style>
