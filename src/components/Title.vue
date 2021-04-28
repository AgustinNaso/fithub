<template>
  <div class="titleContainer">
    <div class="createBox">
      <router-link :to="to" v-show="to"><img class="backArrow" src="../assets/chevron_left_grey.png" alt="backArrow"/></router-link>
      <h1 :class="{withArrow:to}">{{ titleName }}</h1>
    </div>
    <div class="underline"/>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    titleName:String,
    to:String
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
  width: 100%;
}

.backArrow {
  height: 56px;
  margin-top: 11px;
}

h1 {
  margin-left: 55px;
  font-size: 35px;
  line-height: 1;
  padding: 10px 0 10px 0;
  color: #42b983;
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