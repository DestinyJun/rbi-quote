<template>
   <div id="login" class="login">
      <div class="form">
         <div class="title">
            <h1>报告验证识别系统</h1>
         </div>
        <div class="content" >
          <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" >
            <FormItem label="用户名" prop="username">
              <Input type="text" v-model="formCustom.username"></Input>
            </FormItem>
            <FormItem label="密码" prop="passwd">
              <Input type="password" v-model="formCustom.passwd" ></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formCustom')" long>登 <span style="display: inline-block; width: 20px
"></span> 录</Button>
<!--              <Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>-->
            </FormItem>
          </Form>
        </div>

      </div>
   </div>
</template>
<!--导入页面逻辑-->
<script src="./login.component.js">
</script>

<!--导入页面样式-->
<style lang="scss" scoped>
  @import "login.component";
</style>
