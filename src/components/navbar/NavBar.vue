<template>
  <div class="navbar">
    <div class="left">
      <div class="left-l">
        <img
          class="img"
          src="https://test.nttcc.com.cn/_nuxt/img/logo_1.e54ae31.png"
        />
        <h1 class="text">共创云</h1>
      </div>
      <div class="left-r">
        <a v-for="item in list">{{ item }}</a>
      </div>
    </div>
    <div class="right">
      <el-button type="primary">登录</el-button>
      <el-button type="primary" plain>注册</el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

let list = reactive(["服务产品", "科创需求", "专利论文", "交易大数据"]);
</script>
<style scoped>
.navbar {
  width: 1200px;
  height: 100%;
  background: #fff;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    flex: 1;
    display: flex;

    .left-l {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-right: 40px;

      .img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
      .text {
        font-size: 16px;
        font-weight: 700;
        color: #3473e6;
      }
    }

    .left-r {
      width: 40%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #606266;
      font-size: 14px;
    }
  }

  .right {
    width: 15%;
  }
}
</style>
