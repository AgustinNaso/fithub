<template>
  <div class="titleContainer">
    <div class="createBox">
      <img class="backArrow" src="https://cdn.discordapp.com/attachments/819676698919305216/832336576129662986/imageedit_7_8358263029.png" alt="backArrow"/>
      <p>{{ titleName }}</p>
    </div>
    <div class="underline"/>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    titleName:String
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

p {
  font-size: 35px;
  line-height: 1;
  margin: 0;
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