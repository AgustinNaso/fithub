<template>
  <div class="blockContainer">
    <div class="blockBg" :class="{orange:orange && currentEx.type === 'exercise', blue:blue && currentEx.type === 'exercise', green:green && currentEx.type === 'exercise'}">
      <select v-show="dataIsEditing" class="routineInput" v-model="currentEx">
        <option v-for="exercise in exercises" :value="exercise" :key="exercise.id">{{exercise.name}}</option>
      </select>
      <h4 v-show="!dataIsEditing">{{currentEx.name}}</h4>
      <div class="valueFill">
        <input  v-show="dataIsEditing" type="number" class="numInput" name="reps" v-model.number="dataReps" min="0">
        <p class="realVal" v-show="!dataIsEditing && dataReps">{{dataReps}}</p>
        <p v-show="dataIsEditing || dataReps"> repetición/es</p>
      </div>
      <div class="valueFill">
        <input v-show="dataIsEditing" type="number" class="numInput" name="secs" v-model.number="dataSecs" min="0">
        <p class="realVal" v-show="!dataIsEditing && dataSecs">{{dataSecs}}</p>
        <p v-show="dataIsEditing || dataSecs"> segundo/s</p>
      </div>
      <div class="icons">
        <img v-show="!dataIsEditing" @click="$emit('removeExercise',currentEx)" class="trash" src="../../assets/basuraicon.png" alt="delete"/>
        <img v-show="!dataIsEditing" @click="handleEdit" class="edit" src="../../assets/editicon.png" alt="edit"/>
        <div class="confirmChanges" v-show="dataIsEditing"  @click="handleEdit">
          <p>Confirmar cambios</p>
          <img class="edit" src="../../assets/tick.png" alt="confirm"/>
        </div>
      </div>
    </div>
    <img class="routineDiv" src = "../../assets/right-arrow.png" alt="blockDiv"/>
  </div>
</template>

<script>
import {CycleExercise} from "@/backend/cycles";

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
    order:Number,
    exercise: Object,
    isCreating:Boolean,
    isEditing:Boolean,
  },
  data(){
    return {
      currentEx : this.exercises[0],
      dataIsCreating: true,
      dataIsEditing:true,
      dataReps : 0,
      dataSecs : 0,
      prevExercise: null,
      toRemove:false,
    }
  },
  methods:{
    async handleEdit(){
      this.dataIsEditing = !this.dataIsEditing;
      if (!this.dataIsEditing){
        const exToSend = new CycleExercise(this.order,this.dataReps,this.dataSecs);
        const data = {id: this.currentEx.id,isCreating:this.dataIsCreating,exToSend:exToSend, prevEx:this.prevExercise};
        await this.$emit('confirmExercise',data);
        this.$emit('setId',this.currentEx.id);
        this.$emit('release');
        this.prevExercise = this.currentEx;
        if (this.toRemove){
          this.exercises.splice(this.exercises.findIndex(a => a.id === data.id), 1);
        }
      }else{
        this.$emit('editing');
        this.toRemove= false;
        if (!this.exercises.includes(this.currentEx)){
          this.exercises.push(this.currentEx);
          this.toRemove = true;
        }
      }
      this.dataIsCreating = false;
    }
  },created() {
    if (this.isCreating) {
      this.$emit('editing');
    }
    if (!this.exercise || !this.exercise.type) {
      this.currentEx = this.exercises[0];
    }else{
      this.currentEx = this.exercise;
    }
    this.dataIsCreating = this.isCreating?this.isCreating:false;
    this.dataIsEditing = this.isEditing?this.isEditing:false;
    this.dataReps = this.reps;
    this.dataSecs = this.secs
    this.prevExercise = this.currentEx;
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