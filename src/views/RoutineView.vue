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
          <h2 class="shareTitle" v-show="!alreadyRated">Puntua esta rutina</h2>
          <div class="ratingWrap" v-show="!alreadyRated">
            <img v-for="n in 5" class="star" :key="n" :src="decideImg(n)" alt="star" @mouseover="rating=n" @mouseleave="leaveHandle" @click="rate(n)">
          </div>
          <h2 class="shareTitle" v-show="alreadyRated">Ya puntuaste esta rutina!</h2>
          <div class="ratingWrap" v-show="alreadyRated">
            <img v-for="n in 5" class="star noclick" :key="n" :src="decideImg(n)" alt="star">
          </div>
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
// import {CycleApi} from "@/backend/cycles";
import {difficultyToSpanish} from "@/backend/utils";
import {ReviewsApi, Review} from "@/backend/reviews";

export default {
  name: "RoutineView",
  components: {  Title, Footer, NavBar},
  async created() {
    if (!this.store.isLoggedIn()) {
      await router.push("/permissionDenied");
    }
    this.routineId = this.$route.params.id;
    try{
      const routine = await RoutineApi.getRoutineById(this.routineId);
      this.routineName = routine.name;
      this.description = routine.detail;
      this.difficulty = routine.difficulty;
      // if (!routine.isPublic){
      //   await router.push("/permissionDenied");
      //   return;
      // }
      const data = await RoutineApi.getCycles(this.routineId);
      for (const cycle of data.content) {
        switch (cycle.type){
          case 'warmup': this.warmUp = cycle; break;
          case 'cooldown': this.cooldown = cycle;break;
          case 'exercise': this.cycles.push(cycle);break;
        }
        // console.log(await CycleApi.getCycleExercises(cycle.id));


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
    routineId: -1
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
    }
  },
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
  width:360px;
}

.shareTitle{
  color:black;
  width:100%;
  font-size:30px;
  text-align: right;
  border-bottom: #030b10 3px solid;
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

</style>