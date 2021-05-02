<template>
<div class="mainContainer">
  <NavBar logged-in/>
  <div class="mainBg">
    <div v-show="featured">
      <Title title-name="Rutinas Recomendadas"/>
      <div class="routineContainer">
        <Routine
            class="routine"
            is-featured
            v-for="i in 6"
            :key="i"
            title="Brazos"
            :rating="3"
            owner="Juan Oriana"
            owner-img="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg/1200px-John_Doe%2C_born_John_Nommensen_Duchac.jpg"
            description="Esta rutina es increible. AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
        />
      </div>
    </div>
    <Title title-name="Explorar Rutinas"/>
    <div class="searchBar">
      <div searchBox>
        <input name="search" type="text" class="searchInput"/>
        <button name="search" class="searchBtn">Buscar!</button>
      </div>
    </div>
    <div class="routineContainer">
      <Routine
          class="routine"
          v-for="i in 9"
          :key="i"
          title="Brazos"
          :rating="3"
          owner="Juan Oriana"
          owner-img="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg/1200px-John_Doe%2C_born_John_Nommensen_Duchac.jpg"
          description="Esta rutina es increible. AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
      />
    </div>

    <div class="paging">
      <p class="pageNumber">Página {{$route.params.id > 0 ? $route.params.id : 1 }}</p>
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
  components: { Routine, Title, Footer, NavBar},
  props:{
    featured:Boolean
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

h1{
  color: black;
  font-size: 64px;
  margin-left:  25px;
}

.searchBar{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
}

.searchInput{
  width: 400px;
  font-size: 24px;
  padding: 5px;
  border-radius: 12px 0 0 12px;
  color: #0a2118;
  outline: none;
  border: #31ae7a 2px solid;
}

.searchBtn{
  height: 100%;
  font-size: 24px;
  border-radius: 0 12px 12px 0;
  padding: 7px;
  background: #31ae7a;
  border:none;
  cursor: pointer;
  color: white;
  text-shadow: 1px 1px 4px #030b10;
}

.searchBtn:hover{
  background-color: #42c18c;
  transition: 0.2s ease-in-out;
}

.paging{
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pageNumber{
  color: black;
  font-size: 32px;
  font-weight: 700;
}

</style>