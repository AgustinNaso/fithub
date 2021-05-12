<template>
  <div class="mainContainer">
    <NavBar/>
    <div class="mainBg">
      <Title :to="`/routine/${routineId}`" :title-name="routineName"></Title>
      {{this.countDown}}
      <h1 class="ready" v-show="!started && !finished">{{store.getName().split(" ")[0]}}, ¿Estás listo para comenzar tu entrenamiento?</h1>
      <h1 class="readySub" v-show="!started && !finished">¡Recordá siempre mantenerte hidratado!</h1>
      <button @click="()=>{this.started = !this.started;this.countDownTimer()}" v-show="!started && !finished" class="startBtn">Comenzar</button>
      <div class="executionContainer" v-show="started && !finished">
        <h2 v-if="totalEx[currentIdx]" :class="{cycleName:true, orange:totalEx[currentIdx].cycle.type ==='warmup',
         green:totalEx[currentIdx].cycle.type ==='exercise', blue:totalEx[currentIdx].cycle.type === 'cooldown'}">
          Ciclo actual: {{totalEx[currentIdx].cycle.name}}<br> (Set {{totalEx[currentIdx].currSet}} de {{totalEx[currentIdx].totalSets}})</h2>
        <div class="exerciseContainer">
          <img class="arrowBtn" src="../assets/arrowLeft.png" alt="arrowLeft" @click="findPrev"  v-show="currentIdx!==0">
          <ExerciseExecution
              v-if="totalEx[currentIdx]"
              with-image
              :warm-up="totalEx[currentIdx].cycle.type === 'warmup'"
              :cooldown="totalEx[currentIdx].cycle.type === 'cooldown'"
              :cycle="totalEx[currentIdx].cycle.type === 'exercise'"
              :repetitions="totalEx[currentIdx].repetitions"
              :title="totalEx[currentIdx].exercise.name"
              :duration="countDown"
              :img="totalEx[currentIdx].exercise.img? totalEx[currentIdx].exercise.img.url: 'https://cdn.iconscout.com/icon/free/png-512/physical-exercise-33-1104205.png'"
              :is-first="currentIdx === 0"
          />
          <img class="arrowBtn" src="../assets/arrowRight.png" alt="arrowRight" @click="findNext" >
        </div>
        <div class="buttonContainer">
          <router-link :to="{ name: 'routine', params: {id: this.routineId }}"><button type="button" class="finishButton">Terminar</button></router-link>
          <button v-show="!paused" type="button" class="pauseButton" @click="handlePause">Pausar</button>
          <button v-show="paused" type="button" class="pausedButton" @click="handlePause">Despausar</button>
        </div>
      </div>
      <h1 class="ready" v-show="finished">¡Ya terminaste, {{store.getName().split(" ")[0]}}! ¡Excelente entrenamiento!</h1>
      <h1 class="readySub" v-show="finished">Es momento de que te tomes tu tan merecido descanso.</h1>
      <router-link :to="`/routine/${routineId}`"><button v-show="finished" class="startBtn">Volver</button></router-link>
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
import {ExerciseApi} from "@/backend/exercises";
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
      started:false,
      currSet:1,
      countDown:30,
      paused:false
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
          const ret =  await ExerciseApi.getImgs(exercise.exercise.id);
          if (ret.content.length > 0) {
            exercise.exercise.img = ret.content[0]
          }
        }
        let rep = 1;
        for (rep=1;rep<= cycle.repetitions;rep++) {
          for (const exercise of exerciseObj.content) {
            this.totalEx.push({...exercise, cycle: cycle, currSet:rep, totalSets:cycle.repetitions});
            this.totalSize += 1;
          }
        }
      }

      for (const cycle of data.content) {
        if (cycle.type !== 'cooldown') continue;
        const exerciseObj = await CycleApi.getCycleExercises(cycle.id);
        for (const exercise of exerciseObj.content){
          const ret =  await ExerciseApi.getImgs(exercise.exercise.id);
          if (ret.content.length > 0) {
            exercise.exercise.img = ret.content[0]
          }
        }
        let rep = 1;
        for (rep=1;rep<= cycle.repetitions;rep++) {
          for (const exercise of exerciseObj.content){
            this.totalEx.push({...exercise,cycle:cycle,currSet:rep, totalSets:cycle.repetitions});
            this.totalSize+=1;
          }
        }

        if (this.totalEx.length > 0){
          this.countDown = this.totalEx[0].duration;
        }else{
          this.finished = true;
          this.started = true;
        }
      }

    }catch (e){
      await router.push("/error");
    }
  },
  methods:{
    findNext() {
      if (this.currentIdx + 1 === this.totalSize){
        this.started = true;
        this.finished = true;
        return;
      }
      this.currentIdx++;
      this.countDown = this.totalEx[this.currentIdx].duration;

    },
    findPrev() {
      if (this.currentIdx - 1 >= 0){
        this.currentIdx--;
        this.countDown = this.totalEx[this.currentIdx].duration;
      }
    },
    countDownTimer() {
      if(this.countDown > 0 && !this.paused) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      }
      if (this.countDown === 0 && !this.paused){
        this.findNext();
        this.countDownTimer();
      }
    },
    handlePause(){
      this.paused = !this.paused
      if (!this.paused){
        this.countDownTimer();
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
  color: #399c70;
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
  display: flex;
  justify-content: space-evenly;
  width: 600px;
}

.pauseButton{
  width: 200px;
  border-radius: 25px;
  padding:10px;
  border: 4px solid #399c70;
  background: transparent;
  font-size: 26px;
  font-weight: 700;
  color: #399c70;
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

.pausedButton{
  width: 200px;
  border-radius: 25px;
  padding:10px;
  border: 4px solid #7f7f7f;
  background: transparent;
  font-size: 26px;
  font-weight: 700;
  color: #7f7f7f;
  cursor: pointer;
  text-align: center;
  transition: 0.3s ease-in-out;
  text-decoration: none;
  outline: none;
}

.pausedButton:hover{
  transition: 0.3s ease-in-out;
  background-color: #d5d5d5;
  color: #7f7f7f;
}

.pausedButton:active {
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

.ready{
  color: black;
  font-size: 40px;
  text-align: center;
  width: 100%;
  margin-top: 100px;
}

.readySub{
  font-size: 32px;
  color:#399c70;
  margin-top: 12px;  text-align: center;
  width: 100%;

}

.startBtn{
  color: white;
  border: none;
  text-align: center;
  align-self: center;
  margin-top:40px;
  background-color: #399c70;
  border-radius: 25px;
  font-size: 32px;
  font-weight: 700;
  text-decoration: none;
  outline: none;
  width: 400px;
  height: 80px;
  cursor: pointer;
}

.startBtn:hover{
  background-color: #77c6a2;
  transition: 0.2s ease-in-out;
}

a{
  align-self: center;
}

.cycleName{
  font-size: 40px;
  margin: 20px 0 -20px 0;
  text-align: center;
}


.orange{
  color: rgb(236,169,39);
}

.blue{
  color: rgb(133,158,255);
}

.green{
  color: rgb(65,214,152);
}
</style>