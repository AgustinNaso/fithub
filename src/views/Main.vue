<template>
<div class="mainContainer">
  <NavBar/>
  <div class="mainBg">
    <h1>Hola, Usuario!</h1>
    <Title title-name="Rutinas Recomendadas"/>
    <div class="routineContainer">
      <Routine
          class="routine"
          v-for="i in 4"
          :key="i"
          title="Brazos"
          :rating="3"
          owner="Juan Oriana"
          description="Esta rutina es increible"
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
export default {
  name: "Main",
  components: {Routine, Title, Footer, NavBar}
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
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 15px 0 15px;
}

.routine{
  margin-bottom: 30px;
}

h1{
  color: black;
  font-size: 64px;
  margin-left:  25px;
}
</style>