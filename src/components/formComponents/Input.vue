<template>
<div :class="{inputContainer: true, small: small}">
  <label :class="{light:light}">{{label}}</label>
  <input :type="type" :name="name" :class="{light:light, error:error}"/>
</div>
</template>

<script>

export default {
  name: "Input",
  props:{
    type:String,
    small:Boolean,
    name:String,
    label:String,
    error:Boolean,
    light:Boolean
  }
}
</script>

<style scoped>
.inputContainer{
  width: 400px;
  color: #42b983;
  height: 45px;
  margin-bottom: 36px;
  display: flex;
}

label{
  position: absolute;
  font-size: 12px;
  background: #030b10;
  padding: 0 8px;
  margin: -8px 0 0 25px;
}
input {
  width: 100%;
  background: #030b10;
  font-size: 18px;
  border: solid 2px #333;
  border-radius: 12px;
  padding: 12px 30px 12px 30px;
  color: #42b983;
}

input:hover {
   transition: 0.2s ease-in-out;
   border: solid 2px #777;
 }

input:focus {
   transition: 0.2s ease-in-out;
   border: solid 2px #42b983;
   outline: none;
}
.light{
  background-color: #F3F9F9;
}
.small{
  width:185px;
}
.error{
  border:solid 2px red;
}
.error:hover{
  border:solid 2px #FF3333;
}

</style>