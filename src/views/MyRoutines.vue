<template>
  <div class="mainContainer">
    <NavBar :selected="2"/>
    <div class="mainBg">
      <Title title-name="Mis Rutinas" to="/main"/>
      <div class="routineContainer">
        <Routine
            is-mine
            class="routine"
            v-for="(routine,i) in routines"
            :key="i"
            :title="routine.name"
            :rating="routine.averageRating"
            :owner="routine.user.username"
            :owner-img="routine.user.avatarUrl"
            :description="routine.detail"
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
export default {
  name: "MyRoutines",
  components: {Routine, Title, Footer, NavBar},
  data() {
    return {
      routines: undefined
    }
  },
  created() {
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

</style>