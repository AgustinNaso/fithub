<template>
  <div class="blockContainer">
    <div class="blockBg" :class="{orange:orange, blue:blue, green:green}">
      <input class="routineInput" type="text" name="routineName">
      <div class="valueFill"><input type="number" class="numInput" name="reps"><p> repeticiones</p></div>
      <div class="valueFill"><input type="number" class="numInput" name="secs"><p> segundos</p></div>
    </div>
    <img class="routineDiv" src = "../../assets/right-arrow.png" alt="blockDiv"/>
  </div>
</template>

<script>
export default {
  name: "EditableRoutineBlock",
  props:{
    orange: Boolean,
    blue: Boolean,
    green: Boolean
  }
}
</script>

<style scoped>

.blockBg{
  height: 150px;
  width: 255px;
  border-radius: 68px;
  background: rgb(207,198,177);
  background: linear-gradient(rgba(207,198,177,1) 0%, rgba(173,168,156,1) 100%);
  text-align: center;
  color: black;
  display: flex;
  font-weight: 600;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  margin-right: 35px;
  margin-bottom:30px;
}

.orange{
  background: rgb(236,169,39);
  background: linear-gradient(rgba(236,169,39,1) 0%, rgba(186,148,74,1) 100%);
}

.blue{
  background: rgb(133,158,255);
  background: linear-gradient( rgba(133,158,255,1) 0%, rgba(78,100,188,1) 100%);
}

.green{
  background: rgb(65,214,152);
  background: linear-gradient(rgba(65,214,152,1) 0%, rgba(54,158,115,1) 100%);
}

.routineDiv {
  height: 140px;
  width: 50px;
  margin: 0 10px 30px -30px;
}

.blockContainer {
  display: flex;
  align-items: center;
}

.routineInput{
  background: none;
  border: grey 1px solid;
  outline: none;
  width: 80%;
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 5px;
  border-radius: 30px;
  padding:2px;
}

.valueFill{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
}

.numInput{
  width: 45px;
  font-size: 16px;
  margin-right: 10px;
  background: none;
  border: black 1px solid;
  border-radius: 10px;
  outline: none;
  padding: 3px;
}
</style>