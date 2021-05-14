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
      <router-link :to="`/editRoutine/${routineId}`"><button class="editRoutine" v-show="isMine">Editar Rutina</button></router-link>
      <hr class="hrMine"/>
      <div class="mainSection">
        <h2 class="sectionTitle" style="color: #b88625">{{warmUp.name}} - -  {{warmUp.repetitions}} set/s</h2>
        <div class="routineBlockDiv">
          <RoutineBlock v-for="(el) in warmUp.exercises" :key="el.exercise.id" :orange="el.exercise.type === 'exercise'" :excercise-name="el.exercise.name" :reps="el.repetitions" :secs="el.duration" />
        </div>

        <div v-for="cycle in cycles" :key="cycle.id">
          <h2 class="sectionTitle" style="color: #399c70">{{ cycle.name }} - -  {{cycle.repetitions}} set/s</h2>
          <div class="routineBlockDiv">
            <RoutineBlock v-for="(el) in cycle.exercises" :key="el.exercise.id" :green="el.exercise.type === 'exercise'" :excercise-name="el.exercise.name" :reps="el.repetitions" :secs="el.duration" />
          </div>
        </div>

        <h2 class="sectionTitle" style="color: #4D6DEB">{{cooldown.name }} - -  {{cooldown.repetitions}} set/s</h2>
        <div class="routineBlockDiv">
          <RoutineBlock v-for="(el) in cooldown.exercises" :key="el.exercise.id" :blue="el.exercise.type === 'exercise'" :excercise-name="el.exercise.name" :reps="el.repetitions" :secs="el.duration" />
        </div>
      </div>
      <div :class={finalSection:true,toLeft:!loggedIn}>
        <router-link :to="`/routineExecution/${routineId}`"><button class="startRoutine" v-show="loggedIn">Iniciar Rutina</button></router-link>
        <div class="share">
          <h2 class="shareTitle" v-show="!alreadyRated && loggedIn">Puntuar Rutina</h2>
          <div class="ratingWrap" v-show="!alreadyRated && loggedIn">
            <img v-for="n in 5" class="star" :key="n" :src="decideImg(n)" alt="star" @mouseover="rating=n" @mouseleave="leaveHandle" @click="rate(n)">
          </div>
          <h2 class="shareTitle" v-show="alreadyRated">¡Ya Puntuaste Esta Rutina!</h2>
          <div class="ratingWrap" v-show="alreadyRated">
            <img v-for="n in 5" class="star noclick" :key="n" :src="decideImg(n)" alt="star">
          </div>
          <h2 v-show="isPublic" class="shareTitle">Compartir Rutina</h2>
          <div class="shareWrap">
            <button class="shareBtn" v-show="isPublic" @click="copyLink">Copiar Enlace</button>
            <p class="clipboardMessage" v-show="copied && isPublic">¡URL copiado al clipboard!</p>
          </div>
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
import {ReviewsApi, Review} from "@/backend/reviews";
import RoutineBlock from "@/components/RoutineBlock";

export default {
  name: "RoutineView",
  components: {  RoutineBlock, Title, Footer, NavBar},
  async created() {
    this.routineId = this.$route.params.id;
    try{
      const routine = await RoutineApi.getRoutineById(this.routineId);
      this.routineName = routine.name;
      this.description = routine.detail;
      this.difficulty = routine.difficulty;
      this.shareLink = window.location.href;
      this.isPublic = routine.isPublic;

      const userRoutines = await RoutineApi.getUserRoutines();
      userRoutines.content.forEach((rout) => {
        if (rout.id === routine.id){
          this.isMine = true;
        }
      })

      this.isMine = this.isMine && this.store.isLoggedIn();


      if (!routine.isPublic && !this.isMine){
        await router.push("/permissionDenied");
        return;
      }


      const data = await RoutineApi.getCycles(this.routineId);
      for (const cycle of data.content) {
        const exerciseObj = await CycleApi.getCycleExercises(cycle.id);
        cycle.exercises = exerciseObj.content;
        switch (cycle.type){
          case 'warmup': this.warmUp = cycle; break;
          case 'cooldown': this.cooldown = cycle;break;
          case 'exercise': this.cycles.push(cycle);break;
        }


        /////
      }

      const reviews = await ReviewsApi.getReviews(this.routineId);
      reviews.content.forEach((review) => {
        if (review.user.id === parseInt(this.store.getUserId())){
          this.rating = review.score;
          this.alreadyRated = true;
        }
      })
      // if (data.totalCount !== 0){
      //   this.rating = data.content[0].score;
      //   this.alreadyRated = true;
      // }
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
    cycles: [],
    rating: 0,
    alreadyRated: false,
    routineId: -1,
    shareLink:"",
    copied: false,
    isPublic: false,
    isMine: false
  }},
  methods:{
    difficultyToSpanish(difficulty){
      return difficultyToSpanish(difficulty);
    },
    decideImg(i){
      if (i <= this.rating){
        return require("../assets/Video_Star.png");
      }
      return  require("../assets/empty-star.png");
    },
    async rate(n){
      const review = new Review(n);
      await ReviewsApi.addReview(this.routineId,review);
      this.alreadyRated = true;
      this.rating = n;
    },
    leaveHandle(){
      if(!this.alreadyRated){
        this.rating = 0;
      }
    },
    copyLink(){
      const el = document.createElement('textarea');
      el.value = window.location.href;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.copied = true;
    }
  },
  computed:{
    loggedIn(){
      return this.store.isLoggedIn();
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
  color: #399c70;
  flex-direction: column;
}

.subtitle{
  font-size: 24px;
  color: #606360;
  margin-left:60px;
  word-break: break-word;
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
  color: white;
  border: none;
  text-align: center;
  background-color: #399c70;
  border-radius: 25px;
  font-size: 36px;
  font-weight: 700;
  margin-left: 100px;
  text-decoration: none;
  outline: none;
  width: 400px;
  height: 80px;
  cursor: pointer;
}

.startRoutine:hover{
  background-color: #77c6a2;
  transition: 0.2s ease-in-out;
}

.shareTitle{
  color:black;
  width:100%;
  font-size:30px;
  text-align: right;
  border-bottom: #030b10 3px solid;
}
.share{
  width:400px;
}

.shareWrap{
  display: flex;
  margin-left: 60px;
  flex-direction: column;
  justify-content: space-evenly;
  width: 80%;
  margin-top: 10px;
}

.shareBtn{
  color: #7f7f7f;
  margin-right: 10px;
  text-align: center;
  padding: 8px 35px 8px 35px;
  background-color: inherit;
  border: 4px solid #7f7f7f;
  border-radius: 25px;
  font-size: 26px;
  font-weight: 700;
  text-decoration: none;
  outline: none;
  transition: 0.3s ease-in-out;
  margin-bottom: 10px;
  cursor: pointer;
}

.shareBtn:hover{
  transition: 0.3s ease-in-out;
  background-color: #e7e7e7;
  color: #a0a0a0;
}

.clipboardMessage{
  font-size: 18px;
  font-weight: 550;
  margin-left: 40px;
  color: #5d6165;
}

.star{
  width: 40px;
  filter: drop-shadow(0.1rem 0.2rem 0.25rem rgba(0, 0, 0, 0.5));
  cursor: pointer;
}
.ratingWrap{
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin: 5px 0 25px 0;
}

.noclick{
  cursor: auto;
}

.sectionTitle{
  font-size: 28px;
}

.toLeft{
  justify-content: flex-end;
}


.editRoutine{
  width: 200px;
  border-radius: 25px;
  padding: 10px;
  border: 4px solid #848484;
  background: transparent;
  font-size: 26px;
  font-weight: 700;
  color: #848484;
  cursor: pointer;
  text-align: center;
  transition: 0.3s ease-in-out;
  text-decoration: none;
  outline: none;
  margin: -30px 0 10px 50px;
}

.editRoutine:hover{
  background-color: #d0d0d0;
  transition: 0.3s ease-in-out;
  color: #616161;
}

.hrMine{
  border-top: #aeb3b1 3px dotted ;
  margin-bottom: 20px;
}

</style>