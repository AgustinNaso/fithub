<template>
  <div class="titleContainer">
    <div class="createBox">
      <router-link :to="to" v-show="to"><img class="backArrow" src="../assets/chevron_left_grey.png" alt="backArrow"/></router-link>
      <h1>{{ titleName }}</h1>
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
  height: 80px;
  margin-top: 10px;
}

.createBox {
  height: 50px;
  display: flex;
  align-items: center;
  width: 100%;
}

.backArrow {
  height: 56px;
}

h1 {
  margin-left: 55px;
  font-size: 35px;
  line-height: 1;
  padding: 10px 0 10px 0;
  color: #42b983;
  font-weight: 700;
}

.underline {
  padding-top: 0;
  margin-top: 5px;
  margin-left: 50px;
  height: 5px;
  width: 30%;
  background-color: #707070;
}

</style>