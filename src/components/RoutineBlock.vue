<template>
<div class="blockBg" :class="{orange:orange, blue:blue, green:green}">
  <h4>{{excerciseName}}</h4>
  <p v-show="reps">{{reps}} repeticiones</p>
  <p v-show="secs">{{secs}} segundos</p>
</div>
</template>

<script>
export default {
  name: "RoutineBlock",
  props:{
    excerciseName:String,
    reps:Number,
    secs:Number,
    orange: Boolean,
    blue: Boolean,
    green: Boolean
  }
}
</script>

<style scoped>
.blockBg{
  height: 160px;
  width: 320px;
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
}

h4{
  width: 80%;
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 5px;
}
p{
  width: 90%;
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
</style>