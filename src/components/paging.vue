<template>
   <div id="paging" class="paging">
     <div class="left-set-row">
       <div>
         <span>共36页</span>
         <span style="margin-left: 0.6vw">每页</span>
         <div style="" class="row-select">
           <div style="display: inline-block;border-radius: 2px;font-size: 12px;border: 1px solid #DBDBDB;margin: 0 6px">
             <span style="display: inline-block;width: 2.5vw;padding: 4px">{{now_num}}</span>
             <span style="display: inline-block;width: 1.5vw;border-left: 1px solid #DBDBDB;padding: 4px" @click="showSelectRowBox">
               <Icon :type="icon" />
             </span>
           </div>
           <div class="row-select-list" :hidden="rowHide">
             <li v-for="item in rowList" :key="item" @click="selectRow(item)">{{item}}</li>
           </div>
         </div>
         <span>条</span>
         <span style="margin-left: 0.6vw">共356条记录</span>
       </div>
     </div>
     <div class="right-set-page">
       <div class="select-page">
         <li>
           <Icon type="md-arrow-dropleft" />
         </li>
         <li>1</li>
         <li>2</li>
         <li>3</li>
         <li>4</li>
         <li>5</li>
         <li>
           <Icon type="md-arrow-dropright" />
         </li>
         <input type="text" style="width: 3vw;height: 3vh;margin-left: 0.4vw;border: 1px solid #EAEAEA">
         <li style="width: 2vw">前往</li>
       </div>
     </div>
   </div>
</template>

<script>
    export default {
        name: 'paging',
        data(){
           return {
               rowHide: true,
               icon: 'md-arrow-dropdown',
               rowList: [1,2,3,4,5,6,7,8,9,10],
               now_num: 10
           }
        },
        methods: {
            showSelectRowBox(){
                console.log(123);
                if (  this.rowHide )  {
                    this.rowHide = false;
                    this.icon = 'md-arrow-dropup';
                }else {
                    this.rowHide = true;
                    this.icon = 'md-arrow-dropdown';
                }

            },
            selectRow(data) {
                this.rowHide = true;
                this.icon = 'md-arrow-dropdown';
                this.now_num = data;
            }
        }
    }
</script>

<style scoped lang="scss">
  .paging {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    .left-set-row {
      //position: relative;
      padding: 2vh 1vw;

      .row-select{
        position: relative;
        display: inline-block;
        .row-select-list {
          position: absolute;
          list-style: none;
          top: -28vh;
          background: #fff;
          margin-left: 6px;
          width: 4.5vw;
          border-radius: 4px;
          //border: 1px solid #EAEAEA;
          box-shadow: 0 0 5px #2E3235;
          li {
            border-radius: 4px;
            padding: 4px 0;
          }
          li:first-child {
            padding-top: 4px;
          }
          li:hover {
            background: #CDE5FE;

          }
        }
      }


    }
    .right-set-page {
      padding: 1.8vh 1vw;
      .select-page {
        li {
          list-style: none;
          display: inline-block;
          width: 1.6vw;
          height: 3vh;
          line-height: 3vh;
          border: 1px solid #EAEAEA;
          margin-left: 4px;
        }
      }

    }
  }

</style>
