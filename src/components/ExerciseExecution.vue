<template>
  <div :class="{exerciseBox:true, orange:warmUp, green:cycle, blue:cooldown}">
    <div class="title">
      <h3>{{title}}</h3>
    </div>
    <img v-show="warmUp" class="warmUpIcon" src="../assets/warmup.png" alt="warmUpIcon"/>
    <img v-show="cycle" class="cycleIcon" src="../assets/cycle.png" alt="cycleIcon"/>
    <img v-show="cooldown" class="cooldownIcon" src="../assets/cooldown.png" alt="cooldownIcon"/>
    <div class="duration">
      <p v-show="repetitions">{{duration}} repeticiones</p>
      <p v-show="seconds">{{duration}} segundos</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExerciseExecution",
  props:{
    title:String,
    warmUp:Boolean,
    cycle:Boolean,
    cooldown:Boolean,
    id:Number,
    duration:String,
    repetitions:Boolean,
    seconds:Boolean
  }
}
</script>

<style scoped>
.exerciseBox{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 450px;
  width: 600px;
  border-radius: 100px;
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

.title{
  display: flex;
  height: 65px;
}

h3{
  flex: 1;
  text-align: center;
  font-size: 45px;
  height: 35px;
  color: white;
  text-shadow: #030b10 3px 2px 7px;
}

.warmUpIcon{
  width: 325px;
  height: 325px;
}

.cycleIcon{
  width: 300px;
  height: 300px;
}

.cooldownIcon{
  width: 300px;
  height: 300px;
}

.duration{
  display: flex;
  height: 60px;
}

p{
  flex: 1;
  text-align: center;
  justify-content: flex-end;
  font-size: 40px;
  color: white;
  font-weight: bold;
}

</style>