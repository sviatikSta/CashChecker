<template>
  <div id="app">
    <globalHeader />
    <router-view />
  </div>
</template>

<script>
import globalHeader from '@/components/layouts/Header'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


export default {
  name: 'App',
  components: {
    globalHeader: globalHeader,
  },
}
</script>

<style>
body,html{
  padding:0;
  margin:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}
</style>
