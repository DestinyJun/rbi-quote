<template>
  <div id="sidebar" class="sidebar">
     <div class="Menu">
       <ul class="MenuOne">
         <li v-for="(item, index) in MenuData" :key="index">
           <div class="one-list" v-if="item.children.length !== 0"  @click="openThisMenuClick(index)">
             <i :class="['iconfont', item.icon]" style="float: left;padding: 0 1.6vw"/>
             <span>{{item.label}}</span>
           </div>
           <div class="one-li" v-if="item.children.length === 0">
             <router-link class="one-link" :to="item.link" tag="span">
               <i :class="['iconfont', item.icon]" style="float: left;padding: 0 1.6vw"/>
               <span>{{item.label}}</span>
             </router-link>
           </div>
            <ul class="MeneTwo" :hidden = "item.ishidden" >
              <li v-for="(item_two, index2) in item.children" :key="index2">
                <router-link class="one-link" :to="item_two.link" tag="span">
<!--                  <img src="assets/images/ic_point.png" alt="" style="width: 20px">-->
<!--                  <i :class="['iconfont', item.icon]" style="float: left;padding: 0 0.4vw;font-size: 12px"/>-->
                  <span style="font-size: 10px;margin-right: 12px;">•</span>
                  <span class="two-li"> {{item_two.label}}</span>
                </router-link>
              </li>
            </ul>
         </li>
       </ul>

     </div>
  </div>
</template>

<script>
    export default {
        name: 'sidebar',
        data(){
            return{
                MenuData: [
                    {
                        label: '报告管理',
                        icon: 'iconguani',
                        link: '/home/report',
                        value: '1',
                        children:[]
                    },
                    {
                        label: '报告审核',
                        icon: 'iconshenhe',
                        link: '2',
                        value: '2',
                        ishidden: true,
                        children:[
                            {
                                label: '二级审核',
                                icon: 'iconquanxian',
                                link: '/home/secreview?id=2',
                                children:[]
                            },
                            {
                                label: '三级审核',
                                icon: 'iconquanxian',
                                link: '/home/thrReview?id=2',
                                children:[]
                            }
                        ]
                    },
                    {
                        label: '项目查询',
                        icon: 'iconxinfangchayue-copy',
                        link: '123',
                        value: '3',
                        children:[]
                    },
                    {
                        label: '图形统计',
                        icon: 'icontongji',
                        link: '123',
                        value: '4',
                        children:[]
                    },
                    {
                        label: '权限管理',
                        icon: 'iconweifashenhetongji',
                        link: '123',
                        value: '5',
                        ishidden: true,
                        children:[
                            {
                                label: '用户权限',
                                icon: '',
                                link: '123',
                                children:[]
                            },
                            {
                                label: '签字人员权限',
                                icon: '',
                                link: '123',
                                children:[]
                            },
                        ]
                    },
                ]
            }
        },
        created() {
            this.MenuData.forEach( v => {
                if(v.value === this.$route.query.id) {
                    v.ishidden = false;
                }
            })
        },
        methods: {
            openThisMenuClick(index){
                console.log(index);
                console.log(this.MenuData);
                this.MenuData[index].ishidden = this.MenuData[index].ishidden !== true;
            }
        }
    }
</script>

<style lang="scss" scoped>
.sidebar {
  margin-top: 6vh;
  position: absolute;
  height: 94%;
  width: 12vw;
  background: #363B3E;
  color: #EAEAEA;
  /*padding: 1px;*/
  .Menu {
    background: #363B3E;
    margin-top: 4vh;
    text-align: left;
    .MenuOne {
      font-size: 1rem;
      > li {
        list-style: none;
        margin: 1.8vh 0;
        .one-list {
          padding: 1.4vh 0;
        }
        .one-list:hover{
          background: #404346;
        }
        .one-link {
          padding: 1.4vh 0;
          display: block;
          /*width: 12vw;*/
          height: 5.2vh;
          /*line-height: 5.2vh;*/

        }
        .one-link:hover{
          background: #404346;
        }
        > span {
          display: block;
          padding-left: 4vw;
        }
        .MeneTwo {
          font-size: 0.8rem;
          >li {
            margin: 0.6vh 0;
            text-align: left;
            > span {
              padding-left: 4.2vw;
            }

          }
        }
      }
      /*>div:hover {*/
      /*  background: #ffa489;*/
      /*}*/
    }

  }

}
</style>
