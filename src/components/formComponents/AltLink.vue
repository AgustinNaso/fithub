<template>
<router-link :to="to"><p>{{text}}</p></router-link>
</template>

<script>
export default {
  name: "AltLink",
  props:{
    text:String,
    to:String
  }
}
</script>

<style scoped>
p{
  font-size: 14px;
  width: 100%;
  text-align: right;
  text-decoration: none;
  margin-top: 10px;
  color:#399c70;
}
a{
  width: 100%;
  text-decoration: none;
}
</style>