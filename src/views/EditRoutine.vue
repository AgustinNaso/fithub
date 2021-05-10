<template>
  <div class="generalContainer">
    <NavBar logged-in/>

    <div class="routineBg">
      <div class="routineIntro">
        <div class="titleDiv">
          <EditableTitle to="/myroutines" v-model="routineName" :model-value="routineName"/>
          <textarea class="subtitle" v-model="description"></textarea>
        </div>
        <div class="dataDiv">
          Dificultad:
          <select class="difficultyInput" v-model="difficulty">
            <option disabled value="" >Seleccione una dificultad</option>
            <option value="rookie">Novato</option>
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
            <option value="expert">Experto</option>
          </select>
        </div>
      </div>

      <div class="mainSection">

        <div class="cycleHeader">
          <h2 class="sectionTitle" style="color: #DC9F28">{{ warmUp.name }} - -  {{warmUp.repetitions}} set/s</h2>
          <img src="../assets/editicon.png" class="editIcon" alt="edit">
        </div>
        <div class="routineBlockDiv">
          <EditableRoutineBlock v-for="(el) in warmUp.exercises" :key="el.exercise.id" :orange="el.exercise.type === 'exercise'"
                                :exercise="el.exercise" :reps="el.repetitions" :secs="el.duration"
                                :exercises="exercises"  @removeExercise="removeExercise(warmUp,el.exercise.id)"/>
          <img class="addButton" src="../assets/add-button-yellow.png"  @click="addExercise(warmUp)" alt=""/>
        </div>

        <div v-for="(cycle,index) in cycles" :key="cycle.id">
          <div class="cycleContainer">
            <div class="cycleHeader">
            <h2 class="sectionTitle" style="color: #42b983"> {{cycle.name}} - -  {{cycle.repetitions}} set/s</h2>
              <img src="../assets/editicon.png" class="editIcon" alt="edit">
              <button class="removeCycleButton" @click="removeCycle(cycle.id)">Remover ciclo</button>
            </div>
            <div class="routineBlockDiv">
              <EditableRoutineBlock v-for="(el) in cycles[index].exercises" :key="el.exercise.id" :green="el.exercise.type === 'exercise'"
                                    :exercise="el.exercise" :reps="el.repetitions" :secs="el.duration"
                                    :exercises="exercises"  @removeExercise="removeExercise(warmUp,el.exercise.id)"/>
              <img class="addButton" src="../assets/add-button-green.png" @click="addExercise(cycles[index])"  alt=""/>
            </div>
          </div>
        </div>
        <button class="cycleButton" @click="addCycle()">+ Agregar ciclo</button>

        <div class="cycleHeader">
          <h2 class="sectionTitle" style="color: rgba(78,100,188,0.8)"> {{ cooldown.name }} - -  {{cooldown.repetitions}} set/s</h2>
          <img src="../assets/editicon.png" class="editIcon" alt="edit">
        </div>
        <div class="routineBlockDiv">
          <EditableRoutineBlock v-for="(el) in cooldown.exercises" :key="el.exercise.id" :blue="el.exercise.type === 'exercise'"
                                :exercise="el.exercise" :reps="el.repetitions" :secs="el.duration"
                                :exercises="exercises"  @removeExercise="removeExercise(warmUp,el.exercise.id)"/>
          <img class="addButton" src="../assets/add-button-blue.png" @click="addExercise(cooldown)" alt=""/>
        </div>
      </div>

      <div class="finalSection">
        <button class="acceptBtn" @click="confirmChanges"> Registrar Cambios</button>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import UserStore from "@/stores/UserStore";
import router from "../routes";
import {ExerciseApi} from "@/backend/exercises";
import {Cycle, RoutineApi, RoutineBase} from "@/backend/routines";
import {CycleApi} from "@/backend/cycles";
import EditableTitle from "@/components/editableComponent/EditableTitle";
import EditableRoutineBlock from "@/components/editableComponent/EditableRoutineBlock";

export default {
  name: "EditRoutine",
  components: {EditableRoutineBlock, EditableTitle, Footer, NavBar},
  data() {
    return {
      store: UserStore,
      routineName: "",
      description: "",
      difficulty:"",
      isPublic:true,
      warmUp: {},
      cooldown: {},
      cycles: [],
      exercises: [],
      cycleIdx: 0,
    }
  },
  methods: {
    async addCycle() {
      const cycle = new Cycle("Ciclo de Ejercitacion",'exercise',this.getMaxOrder()+1,1);
      try {
        const newCycle = await RoutineApi.addCycle(this.$route.params.id, cycle)
        this.cycles.push(newCycle);
        this.cycleIdx++;
      }
      catch (e) {
        alert(e);
      }
    },
    addExercise(cycle) {
      cycle.push({nombre: "Flexiones", reps: 10, secs: 30, uuid: new  Date().getTime()});
    },
    removeExercise(array,key) {
          array.splice(array.findIndex(a => a.uuid === key), 1)
    },
    async removeCycle(id){
      try{
        await RoutineApi.deleteCycle(this.$route.params.id,id);
        this.cycles.splice(this.cycles.findIndex(cycle => cycle.id === id), 1);
      }
      catch (e) {
        alert(e);
      }
    },
    getDateTime() {
      return new  Date().getTime();
    },
    getMaxOrder(){
      let maxOrder = -1;
      this.cycles.forEach((cycle) => maxOrder = cycle.order>maxOrder?cycle.order:maxOrder);
      return maxOrder
    },
    async confirmChanges(){
      try{
        const routineState = new RoutineBase(this.routineName, this.description,this.isPublic, this.difficulty);
        await RoutineApi.editRoutine(this.$route.params.id,routineState);
      }catch (e) {
        await router.push('/error');
      }

      await router.push(`/routine/${this.$route.params.id}`);
    }
  },
  async created() {
    if (!this.store.isLoggedIn()) {
      await router.push("/permissionDenied");
    }
    try {
      const data = await ExerciseApi.getExercises();
      this.exercises = data.content;

      const routine = await RoutineApi.getRoutineById(this.$route.params.id);
      this.routineName = routine.name;
      this.description = routine.detail;
      this.difficulty = routine.difficulty;
      this.isPublic = routine.isPublic;

      const cycles = await RoutineApi.getCycles(this.$route.params.id);
      for (const cycle of cycles.content) {
        const exerciseObj = await CycleApi.getCycleExercises(cycle.id);
        cycle.exercises = exerciseObj.content;
        console.log(cycle);
        switch (cycle.type){
          case 'warmup': this.warmUp = cycle; break;
          case 'cooldown': this.cooldown = cycle;break;
          case 'exercise': this.cycles.push(cycle);break;
        }
      }

    }catch (e) {
      await router.push("/error");
    }
  }
}
</script>

<style scoped>
.generalContainer{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.routineBg{
  flex: 1;
  background-color: #f3f9f9;
  padding: 30px 35px 90px 35px;
  display: flex;
  color: #42b983;
  flex-direction: column;
}

.subtitle{
  font-size: 24px;
  color: #606360;
  margin-left:50px;
  resize: none;
  width: 500px;
  height: 120px;
  border: solid 3px #42b983;
  border-radius: 20px;
  padding: 10px;
  outline: none;
}


.mainSection{
  margin-left:60px;
}

.routineBlockDiv{
  margin-top:20px;
  margin-bottom: 30px;
  display:flex;
  flex-wrap:wrap;
  align-items: center;

}

.routineIntro{
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
  justify-content: space-between;
}

.titleDiv{
  width: 60%;
  display: flex;
  flex-direction: column;
}

.dataDiv{
  color: #5d6165;
  font-size: 20px;
  text-align: right;
  margin-right: 20px;
  margin-top: 20px;
  font-weight:700;
}

.finalSection{
  padding-top:60px;
  display:flex;
  border-top: #aeb3b1 3px dotted ;
  justify-content: space-evenly;

}
.cycleButton,.acceptBtn{
  align-self: center;
  color: #35a371;
  text-align: center;
  background-color: inherit;
  border: 4px solid #42b983;
  border-radius: 25px;
  font-weight: 700;
  text-decoration: none;
  outline: none;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}

.cycleButton{
  width: 700px;
  font-size: 30px;
  padding: 8px 0 8px 0;
  margin-right: 10px;
  margin-bottom: 50px;
}

.acceptBtn{
  width: 500px;
  padding: 12px;
  font-size: 40px;
  cursor: pointer;
  color: #31ae7a;
  background-color: inherit;
  border-color: #31ae7a ;
  transition: 0.3s ease-in-out;
}



.addButton {
  height: 150px;
  margin-bottom: 25px;
}

.removeCycleButton{
  border: 4px solid #d01212;
  background: transparent;
  border-radius: 25px;
  font-weight: 700;
  color: #d01212;
  cursor: pointer;
  text-align: center;
  transition: 0.3s ease-in-out;
  text-decoration: none;
  outline: none;
}

.removeCycleButton{
  font-size: 20px;
  background-color: inherit;
  margin: 1px 0 0 15px;
  border-radius: 50px;
  border-width: medium;
  padding: 2px 5px 2px 5px;
  height: 40px;
}
.removeCycleButton:hover{
  background-color: #f7a6a6;
  transition: 0.3s ease-in-out;
  color: #950707;
}

.acceptBtn:hover,.cycleButton:hover{
  transition: 0.3s ease-in-out;
  background-color: #dbefe7;
  color: #156844;
}

.cycleHeader{
  display: flex;
  align-items: center;
}

.difficultyInput{
  margin-right: 30px;
  width: 160px;
  font-size: 20px;
  margin-left: 10px;
  padding:4px;
  border-radius: 10px;
  border: #31ae7a 2px solid;
}

.sectionTitle{
  font-size: 28px;
}

.editIcon{
  margin: 0 10px 0 20px;
  height: 32px;
  cursor: pointer;
}

</style>