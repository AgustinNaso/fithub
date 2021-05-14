<template>
  <div class="titleContainer">
    <div class="createBox">
      <router-link :to="to" v-show="to!==''"><img class="backArrow" src="../../assets/chevron_left_grey.png" alt="backArrow"/></router-link>
      <input type="text" class="titleInput" :value="modelValue" @input="$emit('input', $event.target.value)" :class="{withArrow:to}" maxlength="25"/>
    </div>
    <div class="underline"/>
  </div>
</template>

<script>
export default {
  name: "EditableTitle",
  props: {
    modelValue:String,
    to:String
  },
  methods:{
    getDir(){
      return this.to?this.to:'/';
    }
  }
}
</script>

<style scoped>

.titleContainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  height: 80px;
}

.createBox {
  height: 50px;
  display: flex;
  align-items: center;
  width: 60%;
}

.backArrow {
  height: 56px;
  margin-top: 11px;
}

.titleInput {
  margin-left: 55px;
  font-size: 35px;
  line-height: 1;
  height: 25px;
  border: #77c6a2 3px solid;
  border-radius: 12px;
  padding: 10px 0 10px 10px;
  color: #399c70;
  font-weight: 700;
}
.withArrow{
  margin: 0;
}

.underline {
  margin-top: 5px;
  margin-left: 50px;
  height: 5px;
  background-color: #707070;
  width: 500px
}


</style>