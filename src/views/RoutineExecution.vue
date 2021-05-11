<template>
  <div class="mainContainer">
    <NavBar/>
    <div class="mainBg">
      <Title :to="`/routine/${routineId}`" :title-name="routineName"></Title>
      <div class="executionContainer">
        <div class="exerciseContainer">
          <img class="arrowBtn" src="../assets/arrowLeft.png" alt="arrowLeft" @click="findPrev"  v-show="currentIdx!==0">
          <ExerciseExecution
              v-if="totalEx[currentIdx]"
              with-image
              :warm-up="totalEx[currentIdx].cycleType === 'warmup'"
              :cooldown="totalEx[currentIdx].cycleType === 'cooldown'"
              :cycle="totalEx[currentIdx].cycleType === 'exercise'"
              :repetitions="totalEx[currentIdx].repetitions"
              :title="totalEx[currentIdx].exercise.name"
              :duration="totalEx[currentIdx].duration"
          />
          <img class="arrowBtn" src="../assets/arrowRight.png" alt="arrowRight" @click="findNext" v-show="currentIdx < totalSize - 1">
        </div>
        <div class="buttonContainer">
          <button type="button" class="pauseButton">Pausar</button>
          <router-link :to="{ name: 'routine', params: {id: this.routineId }}"><button type="button" class="finishButton">Terminar</button></router-link>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ExerciseExecution from "../components/ExerciseExecution";
import Title from "../components/Title";
import {RoutineApi} from "@/backend/routines";
import {CycleApi} from "@/backend/cycles";
import router from "@/routes";
import UserStore from "@/stores/UserStore";
export default {
  name: "RoutineExecution",
  components: {Title, ExerciseExecution, Footer, NavBar},
  data() {
    return {
      routineName: "Rutina",
      description: "",
      store: UserStore,
      totalEx: [],
      totalSize:0,
      routineId: -1,
      currentIdx:0,
      firstEx:undefined,
      finished:false,
    }
  },
  async created() {
    this.routineId = this.$route.params.id;
    try{
      const routine = await RoutineApi.getRoutineById(this.routineId);
      this.routineName = routine.name;
      this.description = routine.detail;
      const data = await RoutineApi.getCycles(this.routineId);
      for (const cycle of data.content) {
        if (cycle.type === 'cooldown') continue;
        const exerciseObj = await CycleApi.getCycleExercises(cycle.id);
        for (const exercise of exerciseObj.content){
          this.totalEx.push({...exercise,cycleType:cycle.type});
          this.totalSize+=1;
        }
      }

      for (const cycle of data.content) {
        if (cycle.type !== 'cooldown') continue;
        const exerciseObj = await CycleApi.getCycleExercises(cycle.id);
        for (const exercise of exerciseObj.content){
          this.totalEx.push({...exercise,cycleType:cycle.type});
          this.totalSize+=1;
        }
      }

    }catch (e){
      await router.push("/error");
    }
  },
  methods:{
    findNext() {
      if (this.currentIdx + 1 === this.totalSize){
        this.finished = true;
        return;
      }
      this.currentIdx++;
    },
    findPrev() {
      if (this.currentIdx - 1 >= 0){
        this.currentIdx--;
      }
    }

  }
}
</script>

<style scoped>
div{
  overflow-x: hidden
}

.mainContainer{
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  max-width: 100vw;
}

.mainBg{
  flex: 1;
  background-color: #f3f9f9;
  padding: 30px 35px 90px 35px;
  display: flex;
  flex-direction: column;
  color: #42b983;
}

.executionContainer{
  display: flex;
  align-items: center;
  flex-direction: column;
}

.exerciseContainer{
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  width: 100%;
}

.arrowBtn{
  height: 100px;
  width: 100px;
  margin: 0 70px 5px 70px;
  cursor: pointer;

}

.buttonContainer{
  margin-top: 35px;
  display: flex;
  justify-content: space-evenly;
  width: 600px;
}

.pauseButton{
  width: 200px;
  border-radius: 25px;
  padding:10px;
  border: 4px solid #42b983;
  background: transparent;
  font-size: 26px;
  font-weight: 700;
  color: #42b983;
  cursor: pointer;
  text-align: center;
  transition: 0.3s ease-in-out;
  text-decoration: none;
  outline: none;
}

.pauseButton:hover{
  transition: 0.3s ease-in-out;
  background-color: #dbefe7;
  color: #156844;
}

.pauseButton:active {
  background: transparent;
}

.finishButton{
  width: 200px;
  border-radius: 25px;
  padding: 10px;
  border: 4px solid #d01212;
  background: transparent;
  font-size: 26px;
  font-weight: 700;
  color: #d01212;
  cursor: pointer;
  text-align: center;
  transition: 0.3s ease-in-out;
  text-decoration: none;
  outline: none;
}

.finishButton:hover{
  background-color: #f7a6a6;
  transition: 0.3s ease-in-out;
  color: #950707;
}

.finishButton:active {
  background: transparent;
}
</style>