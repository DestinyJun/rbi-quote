<template>
  <div id="QRCode" class="QRCode">
    <VueQr :margin='20' :size='200' :text='codeUrl' :logoSrc="config.logo" :logoScale="0.2"></VueQr>
  </div>
</template>

<script>
import VueQr from 'vue-qr';
export default {
      name: 'QRCode',
      data(){
          return{
              config: {
                  text:'123',		//必须写text属性,
                  margin: 20,
                  whiteMargin: true,
								  logo: require("../assets/logo.jpg"),
              }
          }
      },
      props:{
          codeUrl: {
              type: String,
              default: ''
          }
      },
     methods:{

      },
    components: {
        // eslint-disable-next-line vue/no-unused-components
        VueQr
    },
}
</script>

<style scoped>

</style>
