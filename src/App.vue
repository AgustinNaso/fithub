<template>
  <div id="app">
    <Home/>

  </div>
</template>

<script>

import Home from "./views/Home";
export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: #2c3e50;
}
*{
  margin: 0;
  padding: 0;
}
</style>
