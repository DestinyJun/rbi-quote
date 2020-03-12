<template>
   <div id="login" class="login">
      <div class="form">
         <div class="title">
           <h1 style="position: absolute;top: -5.6vh;margin-left: 6.2vw;font-size: 40px;font-weight: normal;color:rgba(255, 255, 255, 0.5)">LOGIN</h1>
           <span style="display: inline-block;width: 6vw;height: 1px;background: rgba(255, 255, 255, 0.5);line-height: 2vh"></span>
           <h2  style="display: inline-block;margin: 0  10px;">请登录</h2>
           <span style="display: inline-block;width: 6vw;height: 1px;background: rgba(255, 255, 255, 0.5);line-height: 2vh;"></span>
         </div>
        <div class="content" >
          <img src="@/assets/images/login_logo.png" alt="">
          <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" >
            <FormItem label="" prop="username">
              <Input type="text" v-model="formCustom.username" placeholder="请输入用户名" ></Input>
            </FormItem>
            <FormItem label="" prop="passwd">
              <Input type="password" v-model="formCustom.passwd" placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem>
              <CheckboxGroup v-model="formCustom.checkbox" style="text-align: left" @on-change="delItem">
                <Checkbox label="记住密码"></Checkbox>
              </CheckboxGroup>
              <Button type="primary" @click="handleSubmit('formCustom')" long>登 <span style="display: inline-block; width: 20px"></span> 录</Button>
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
