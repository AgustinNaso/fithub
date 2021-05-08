<template>
<div class="mainContainer">
  <NavBar :selected="featured?0:1"/>
  <div class="mainBg">
    <Title to="" title-name="Explorar Rutinas"/>
    <div class="searchBar">
      <div class="searchBox">
        <input name="search" type="text" class="searchInput" v-model="query"/>
        <button @click="search" name="search" class="searchBtn">Buscar!</button>
      </div>
      <div class="ordering">
        <div class="orderElement">
          <label class="textLabel">Ordenar por</label>
          <select class="textInput" v-model="orderBy" @change="search">
            <option disabled value="" >Seleccione un criterio de ordenamiento</option>
            <option value="averageRating">Puntuación</option>
            <option value="difficulty">Dificultad</option>
            <option value="name">Nombre</option>
            <option value="date">Fecha De Creación</option>
          </select>
        </div>
        <div class="orderElement">
          <label class="textLabel">Visualizar de forma</label>
          <select class="textInput" v-model="direction" @change="search">
            <option disabled value="" >Seleccione una forma de visualización</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>
    </div>
    <p class="error" v-show="error">La busqueda debes ser mayor a 3 caracteres para efectuarse!</p>
    <div class="routineContainer">
      <Routine
          class="routine"
          v-for="(routine) in routines"
          :key="routine.id"
          :id="routine.id"
          :title="routine.name"
          :rating="routine.averageRating"
          :owner="routine.user.username"
          :owner-img="routine.user.avatarUrl"
          :description="routine.detail"
          :difficulty="routine.difficulty"
      />
    </div>

    <div class="paging">
      <router-link :to="{path: '/explore/?page=' + (pageNumber - 1)}" v-show="pageNumber > 1"><img class="pageArrow" src="../assets/left-rounded-arrow.png" alt="página anterior"/></router-link>
      <p class="pageNumber">Página {{pageNumber}}</p>
      <router-link :to="{path: '/explore/?page=' + (pageNumber + 1)}" v-show="!lastPage"><img class="pageArrow" src="../assets/right-rounded-arrow.png" alt="página siguiente"/></router-link>
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
import {RoutineApi} from "@/backend/routines"

export default {
  name: "Main",
  components: { Routine, Title, Footer, NavBar},
  props:{
    featured:Boolean
  },
  data() {
    return {
      pageNumber: this.$route.query.page && parseInt(this.$route.query.page) > 0 ? parseInt(this.$route.query.page) : 1,
      orderBy:"averageRating",
      direction:"desc",
      query:"",
      lastPage: false,
      routines: undefined,
      error:false,
    }
  },
  watch:{
    $route () {
      this.pageNumber = this.$route.query.page && parseInt(this.$route.query.page) > 0 ? parseInt(this.$route.query.page) : 1;
      this.search();
    },
  },
  created() {
    this.search();
  },
  methods: {
    search() {
      this.error = !!(this.query && this.query.length < 3);
      RoutineApi.getRoutines(this.pageNumber, this.orderBy, this.direction,this.query).then((value) => {
        this.routines = value.content;
        this.lastPage = value.isLastPage;
      });
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
  padding-left: 100px;
  display: flex;
  justify-content: space-evenly;
  margin: -2px 0 10px 0;
  align-items: flex-end;
}

@media (max-width: 1200px){
  .searchBar{
    padding: 0;
    flex-direction: column;
    align-items: center;
  }

}

.searchInput{
  width: 460px;
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
  padding: 7px 22px 7px 7px;
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

.pageArrow {
  height: 32px;
  margin: 6px 15px 0 15px;

}

.textInput{
  border: solid 3px #42b983;
  border-radius: 20px;
  font-size: 18px;
  padding: 10px;
  resize: none;
  outline: none;
  color: #42b983;
  width: 210px;
}

.textLabel {
  color: #42b983;
  font-size: 20px;
  font-weight: 700;
  margin-left: 12px;
}

.orderElement{
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.searchBox{
  display: flex;
  height: 40px;
  margin-bottom: 6px;
}

.ordering{
  display: flex;
  justify-content: center;
  align-items: center;
}

.error{
  color: red;
  margin-left: 140px;
  margin-top: -12px;
  font-weight: 500;
  font-size:18px;
}
</style>

