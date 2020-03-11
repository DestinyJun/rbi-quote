<template>
  <div class="error">
  <p>
    <span class="h3 text-warning">您输入的页面不存在，亲！</span>
    <router-link to="/login">
      <button class="btn btn-danger">返回登录</button>
    </router-link>
  </p>
  </div>
</template>

<script>
  export default {
    name: 'error'
  }
</script>

<style scoped lang="scss">
.error{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #17A2B8;
}
</style>
