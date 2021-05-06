<template>
  <div class="mainContainer">
    <NavBar :selected="2"/>
    <div class="mainBg">
      <div class="titleContainer">
        <Title title-name="Mis Rutinas" to="/main"/>
        <router-link to="createRoutine"><button>Crear Rutina</button></router-link>
      </div>
      <div class="routineContainer">
        <Routine
            is-mine
            class="routine"
            v-for="(routine,i) in routines"
            :key="i"
            :title="routine.name"
            :rating="routine.averageRating"
            :owner="store.getName()"
            :owner-img="store.getImg()"
            :description="routine.detail"
            :difficulty="routine.difficulty"
        />
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Title from "@/components/Title";
import Routine from "@/components/Routine";
import {RoutineApi} from "@/backend/routines";
import UserStore from "@/stores/UserStore";
import router from "@/routes";
export default {
  name: "MyRoutines",
  components: {Routine, Title, Footer, NavBar},
  data() {
    return {
      store: UserStore,
      routines: undefined
    }
  },
  created() {
      if (!this.store.isLoggedIn()) {
        router.push("/permissionDenied");
      }
    RoutineApi.getUserRoutines().then((value) => {
      this.routines = value.content;
    });
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

.routineContainer{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 20px;
  padding: 0 15px 0 15px;
}

.routine{
  margin-bottom: 30px;
}

.titleContainer{
  display: flex;
  width: 100%;
}

button{
  width: 320px;
  height: 80px;
  border-radius: 12px;
  font-size: 32px;
  font-weight: 400;
  background: #42b983;
  color: #030b10;
  outline: none;
  cursor: pointer;
  margin-right: 30px;
  border: black 3px solid;
}
button:hover{
  background-color: #51cd94;
  transition: 0.2s ease-in-out;
}

a{
  width: 320px;
}
</style>