<template>
<p>{{text}}</p>
</template>

<script>
export default {
  name: "ErrorMsg",
  props:{
    text:String
  }
}
</script>

<style scoped>
p{
  font-size: 12px;
  color: red;
  margin: 4px 0 20px 20px;
  text-align: left;
  padding: 0;
}
</style>