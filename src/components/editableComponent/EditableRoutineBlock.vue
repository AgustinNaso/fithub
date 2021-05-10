<template>
  <div class="blockContainer">
    <div class="blockBg" :class="{orange:orange && currentEx.type === 'exercise', blue:blue && currentEx.type === 'exercise', green:green && currentEx.type === 'exercise'}">
      <select v-show="isEditing" class="routineInput" v-model="currentEx">
        <option v-for="exercise in exercises" :value="exercise" :key="exercise.id">{{exercise.name}}</option>
      </select>
      <h4 v-show="!isEditing">{{currentEx.name}}</h4>
      <div class="valueFill">
        <input  v-show="isEditing" type="number" class="numInput" name="reps" v-model.number="reps">
        <p class="realVal" v-show="!isEditing && reps">{{reps}}</p>
        <p v-show="isEditing || reps"> repetición/es</p>
      </div>
      <div class="valueFill">
        <input v-show="isEditing" type="number" class="numInput" name="secs" v-model.number="secs">
        <p class="realVal" v-show="!isEditing && secs">{{secs}}</p>
        <p v-show="isEditing || secs"> segundo/s</p>
      </div>
      <div class="icons">
        <img v-show="!isEditing" @click="$emit('removeExercise',id)" class="trash" src="../../assets/basuraicon.png" alt="delete"/>
        <img v-show="!isEditing" @click="handleEdit" class="edit" src="../../assets/editicon.png" alt="edit"/>
        <div class="confirmChanges" v-show="isEditing"  @click="handleEdit">
          <p>Confirmar cambios</p>
          <img class="edit" src="../../assets/tick.png" alt="confirm"/>
        </div>
      </div>
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
    green: Boolean,
    id: Number,
    exercises: Array,
    reps: Number,
    secs: Number,
    exercise: Object,
    isEditing: Boolean,
    isCreating: Boolean
  },
  data(){
    return {
      currentEx : this.exercises[0],
    }
  },
  methods:{
    handleEdit: function (){
      this.isEditing = !this.isEditing;
    }
  },created() {
    this.currentEx = this.exercise?this.exercise:this.exercises[0];
  }
}
</script>

<style scoped>

.blockBg{
  height: 180px;
  width: 300px;
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

h4{
  width: 90%;
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 5px;
  border-radius: 30px;
  padding:2px;
}

.routineInput{
  background: none;
  border: black 1px solid;
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
  margin-bottom: 3px;
  background: none;
  border: black 1px solid;
  border-radius: 10px;
  outline: none;
  padding: 3px;
}
.icons{
  margin-top:10px;
  display: flex;
  width: 80%;
  justify-content: space-evenly;
}
.trash{
  height: 28px;
  cursor: pointer;
}

.edit{
  height: 28px;
  cursor: pointer;
}

.realVal{
  margin-right: 8px;
}

.confirmChanges{
  background-color: rgba(128, 128, 128, 0.36);
  border: 1px dotted black;
  border-radius: 12px;
  padding: 0 6px 0 6px;
  font-size: 18px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>