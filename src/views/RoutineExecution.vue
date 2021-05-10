<template>
  <div class="mainContainer">
    <NavBar/>
    <div class="mainBg">
      <Title :to="`/routine/${routineId}`" :title-name="routineName"></Title>
      <div class="executionContainer">
        <div class="exerciseContainer">
          <img class="arrowBtn" src="../assets/arrowLeft.png" alt="arrowLeft">
          <ExerciseExecution
              v-if="cycles[0]"
              with-image
              :warm-up="cycles[0].type === 'warmup'"
              :cooldown="cycles[0].type === 'cooldown'"
              :cycle="cycles[0].type === 'exercise'"
              :repetitions="cycles[0].exercises[0].repetitions"
              :title="cycles[0].exercises[0].exercise.name"
              :duration="cycles[0].exercises[0].duration"
          />
          <img class="arrowBtn" src="../assets/arrowRight.png" alt="arrowRight">
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
      warmUp: {},
      cooldown: {},
      cycles: [],
      routineId: -1,
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
        const exerciseObj = await CycleApi.getCycleExercises(cycle.id);
        cycle.exercises = exerciseObj.content;
        switch (cycle.type){
          case 'warmup': this.warmUp = cycle; break;
          case 'cooldown': this.cooldown = cycle;break;
          case 'exercise': this.cycles.push(cycle);break;
        }
      }

    }catch (e){
      await router.push("/error");
    }
  },
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
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}

.arrowBtn{
  height: 100px;
  width: 100px;
  margin-bottom: 5px;
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