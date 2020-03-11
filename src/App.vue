<template>
  <div id="app" class="app">
    <transition name="rotate-fall">
      <router-view class="app-router-view"/>
    </transition>
    <loading/>
  </div>
</template>
<script>
    import loading from './components/loading'
    export default {
        components: {
            loading,
        }
    }
</script>
<style lang="scss">
  .app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    .app-router-view {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      overflow: hidden;
      backface-visibility: hidden;
      transform: translate3d(0, 0, 0);
      transform-style: preserve-3d;
      visibility: visible;
    }
    .router-link-active, .is_active {
      /*color: #3DA2F8;*/
      background: #2E3235;
      display: block;
      /*padding: 1.6vh 0;*/
      i {
        color: #3DA2F8;
      }
    }
  }
</style>
