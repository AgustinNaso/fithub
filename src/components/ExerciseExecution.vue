<template>
  <div :class="{exerciseBox:true, orange:warmUp, green:cycle, blue:cooldown,first:isFirst}">
    <div class="titleContainer">
      <h3 class="title">{{title}}</h3>
    </div>
    <img v-show="img" class="icon" :src="img" alt="Imagen de rutina"/>
    <hr>
    <div class="durationCont">
      <p v-show="repetitions!==0">{{repetitions}} repeticiones</p>
      <p v-show="duration!==0">{{duration}} segundos</p>
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
    duration:Number,
    repetitions:Number,
    withImage:Boolean,
    isFirst:Boolean,
    isLast:Boolean,
    img:String
  },

}
</script>

<style scoped>
.exerciseBox{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 460px;
  width: 600px;
  padding: 30px;
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

.titleContainer{
  display: flex;
  height: 65px;
}

.title{
  flex: 1;
  text-align: center;
  font-size: 40px;
  height: 120px;
  color: white;
  text-shadow: #030b10 3px 2px 7px;
}

.icon{
  min-height: 290px;
  min-width:460px;
  max-height: 290px;
  max-width:460px;
  object-fit:cover;
  border-radius: 20px;
  border: white 5px solid;
}

.durationCont{
  display: flex;
  height: 60px;
  flex-direction: column;
}

p{
  flex: 1;
  text-align: center;
  justify-content: flex-end;
  font-size: 28px;
  color: white;
  font-weight: bold;
  text-shadow: #030b10 3px 2px 7px;
}

.first{
  margin-left: 240px;
}

hr{
  width: 90%;
  margin-top: 10px;
}

</style>