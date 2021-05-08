<template>
  <div class="generalContainer">
    <NavBar/>

    <div class="routineBg">
      <div class="routineIntro">
        <div class="titleDiv">
          <Title to="" :title-name="routineName"/>
          <p class="subtitle">{{description}}</p>
        </div>

        <div class="dataDiv">
          Dificultad: {{ difficultyToSpanish(difficulty)}}
        </div>
      </div>
      <div class="mainSection">
        <h2 class="sectionTitle" style="color: #DC9F28">{{warmUp.name}} - -  {{warmUp.repetitions}} set/s</h2>
        <div class="routineBlockDiv">
<!--          <RoutineBlock v-for="(rout,idx) in warmUp" :key="idx" :orange="rout.name !== 'Descanso'" :excercise-name="rout.name" :reps="rout.reps" :secs="rout.secs" />-->
        </div>

        <div v-for="cycle in cycles" :key="cycle.id">
          <h2 class="sectionTitle" style="color: #42b983">{{ cycle.name }} - -  {{cycle.repetitions}} set/s</h2>
          <div class="routineBlockDiv">
  <!--          <RoutineBlock v-for="(rout,idx) in cycle" :key="idx" :green="rout.name !== 'Descanso'" :excercise-name="rout.name" :reps="rout.reps" :secs="rout.secs" />-->
          </div>
        </div>

        <h2 class="sectionTitle" style="color: #4D6DEB">{{ cooldown.name }} - -  {{cooldown.repetitions}} set/s</h2>
        <div class="routineBlockDiv">
<!--          <RoutineBlock v-for="(rout,idx) in cooldown" :key="idx" :blue="rout.name !== 'Descanso'" :excercise-name="rout.name" :reps="rout.reps" :secs="rout.secs" />-->
        </div>
      </div>
      <div class="finalSection">
        <button class="startRoutine">Iniciar Rutina</button>
        <div class="share">
          <h2 class="shareTitle">Compartir Rutina</h2>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Title from "../components/Title";
import UserStore from "@/stores/UserStore";
import router from "@/routes";
import {RoutineApi} from "@/backend/routines";
import {CycleApi} from "@/backend/cycles";
import {difficultyToSpanish} from "@/backend/utils";

export default {
  name: "RoutineView",
  components: {  Title, Footer, NavBar},
  async created() {
    if (!this.store.isLoggedIn()) {
      await router.push("/permissionDenied");
    }
    try{
      const routine = await RoutineApi.getRoutineById(this.$route.params.id);
      this.routineName = routine.name;
      this.description = routine.detail;
      this.difficulty = routine.difficulty;
      // if (!routine.isPublic){
      //   await router.push("/permissionDenied");
      //   return;
      // }
      const data = await RoutineApi.getCycles(this.$route.params.id);
      for (const cycle of data.content) {
        switch (cycle.type){
          case 'warmup': this.warmUp = cycle; break;
          case 'cooldown': this.cooldown = cycle;break;
          case 'exercise': this.cycles.push(cycle);break;
        }
        console.log(await CycleApi.getCycleExercises(cycle.id));
      }
    }catch (e){
      await router.push("/error");
    }
  },
  data() {return {
    store: UserStore,
    routineName: "",
    description: "",
    difficulty:"",
    warmUp: {},
    cooldown: {},
    cycles: []
  }},
  methods:{
    difficultyToSpanish(difficulty){
      return difficultyToSpanish(difficulty);
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
  margin-left:60px;
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
  display: flex;
  flex-direction: column;
  width: 70%;
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
  justify-content: space-between;
}
.startRoutine{
  background-color: #77c6a2;
  width: 460px;
  color:white;
  font-size: 36px;
  border: white 3px solid;
  padding: 10px;
  margin-left: 100px;
  border-radius: 30px;
  font-weight: 700;
  box-shadow: 3px 3px 10px #111;
  cursor:pointer;
}

.share{
  width:320px;
}

.shareTitle{
  color:black;
  width:100%;
  font-size:30px;
  text-align: right;
  border-bottom: #030b10 3px solid;
}

</style>