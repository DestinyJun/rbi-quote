<template>
  <div class="home">
    <headers></headers>
    <sidebar></sidebar>
    <div class="home_mian">
      <router-view></router-view>
    </div>
<!--    <footer></footer>-->
  </div>
</template>

<script>
import headers from '@/views/home/header/header.vue'
import sidebar from '@/views/home/sidebar/siderbar.vue'
export default {
  name: 'Home',
  components: {
      headers,
      sidebar
}

}
</script>
<style lang="scss">
  .home{
    margin: 0;
    padding: 0;
    .home_mian{
         margin-top: 6vh;
         margin-left: 12vw;
         width: 88vw;
         height: 94vh;
       }
  }

</style>
