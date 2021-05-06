<template>
  <div class="mainContainer">
    <NavBar/>
    <div class="mainBg">
      <Title title-name="Mis Ejercicios" to="/main"/>
      <div class="exerciseContainer">
        <Exercise
            is-activity
            class="exercise"
            title="Jump Squat"
            description="Twitter ucisco, California, EE. UU., con filiales en San Antonio (Texas) y Boston (Massachusetts) en Estados Unidos. Twitter, Inc. fue creado originalmente en California"
        />
        <Exercise
            is-activity
            class="exercise"
            title="Jump Squat"
            description="Twitter ucisco, California, EE. UU., con filiales en San Antonio (Texas) y Boston (Massachusetts) en Estados Unidos. Twitter, Inc. fue creado originalmente en California"
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
import Exercise from "../components/Exercise";
export default {
  name: "MyExercises",
  components: {Exercise, Title, Footer, NavBar}
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

.exerciseContainer{
  display: flex;
  flex-direction: column;
}

.exercise{
  margin-left: 50px;
  margin-bottom: 5px;
}
</style>