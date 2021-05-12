<template>
<button>{{text}}</button>
</template>

<script>
export default {
  name: "FormBtn",
  props:{
    text:String
  }
}
</script>

<style scoped>
button{
  width: 100%;
  height: 45px;
  border-radius: 12px;
  font-size: 22px;
  font-weight: 400;
  background: #399c70;
  color: #030b10;
  border: none;
  outline: none;
  cursor: pointer;
}
button:hover{
  background-color: #51cd94;
  transition: 0.2s ease-in-out;
}
</style>