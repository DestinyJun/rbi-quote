<template>
    <div id="user" class="user">
      <div class="user-title">
           <div class="title">
              <h2>用户权限</h2>
           </div>
           <div class="btn">
             <button @click="btnClick('add')">添加</button>
             <button @click="btnClick('modify')">修改</button>
             <button @click="btnClick('delete')">删除</button>
           </div>
      </div>
      <div class="user-select">
        <!--      报告类型-->
        <span>用户权限：</span>
        <Select v-model="selectType" style="width:200px" @on-change="changeType">
          <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="user-centent">
        <div class="user-search">
          <Input suffix="ios-search" placeholder="请输入用户名..." style="width: auto" v-model="searchUserData" @on-search="searchData" search />
        </div>
        <div class="user-table">
          <tables :table-option="tableOption"></tables>
        </div>
        <div class="user-paging">
          <paging :page-option="pageOption" @getPageDate="getPageDate"></paging>
        </div>
      </div>
      <Modal v-model="addModal" draggable scrollable :transfer="false"  :styles="{top: '250px'}">
        <p slot="header" style="color:#1C1C1C;text-align:left">
          <span>添加用户</span>
        </p>
        <div style="text-align:center">
          <Form ref="addUser" :model="addUser" :rules="ruleValidate" :label-width="100" :label-colon="true">

            <FormItem label="用户名" prop="username" style="margin-left: 2vw">
              <Col span="16">
                <Input  v-model="addUser.username" placeholder="请输入您的用户名"></Input>
              </Col>
            </FormItem>
            <FormItem label="真实姓名" prop="realname" style="margin-left: 2vw">
              <Col span="16">
                <Input  v-model="addUser.realname" placeholder="请输入您的真实姓名"></Input>
              </Col>
            </FormItem>
            <FormItem label="电话号码" prop="phone" style="margin-left: 2vw">
              <Col span="16">
                <Input v-model="addUser.phone" placeholder="请输入您的电话号码"></Input>
              </Col>
            </FormItem>
            <FormItem label="用户权限" prop="roleList" style="margin-left: 2vw">
              <Col span="18">
                <CheckboxGroup v-model="addUser.roleList">
                  <Col span="12"  v-for="(item, index) in roleList" :key="index" style="text-align: left">
                    <Checkbox :label="item.value" style="margin: 0 0 10px 0">{{item.label}}</Checkbox>
                  </Col>
                </CheckboxGroup>
              </Col>
            </FormItem>
          </Form>
        </div>
        <div slot="footer" style="text-align: center">
          <Button style="background-color:#3DA2F8;color: #fff;width: 6vw" @click="addSure('addUser')">确认</Button>
          <Button style="background: #FFFFFF;color: #2E3235;width: 6vw"  @click="addModal = false">取消</Button>
        </div>
      </Modal>
    </div>
</template>
<script src="./user.component.js">
</script>
<style lang="scss" scoped>
@import "user.component.scss";
</style>
