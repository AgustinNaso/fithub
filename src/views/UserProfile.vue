<template>
  <div class="mainContainer">
    <NavBar/>
      <Title title-name="Mi cuenta" to="./main"/>
      <div class="userContainer">
        <div class="userData"> Buena Data
        </div>
        <div class="userProf">
          <img class="imgContainer" src = "../assets/logo.png" alt="user image">
          <div class="nameContainer">John Doe</div>
        </div>
      </div>
  </div>
</template>

<script>
import Title from "../components/Title";
import NavBar from "../components/NavBar";
export default {
  name: "UserProfile",
  components: {Title,NavBar}
}
</script>

<style scoped>

.userContainer {
  display: flex;
  border: 3px solid black;
  justify-content: space-around;
  height: 90%;

}

.userProf {
  display: flex;
  flex-direction: column;
  width: 25vw;
  height: 450px;
  align-items: center;
  background: linear-gradient(0, rgba(36, 56, 48, 0.53), rgba(46, 173, 120, 0.56));
  border-radius: 40px;
  justify-content: space-evenly;

}

.imgContainer {
  height: 300px;
  width: 300px;
  box-shadow: 4px 10px 20px rgba(0,0,0,0.57);
  border-radius: 50%;
}

.nameContainer {
  font-size: 52px;
  text-align: center;
  color: whitesmoke;
  text-shadow: 0 3px 6px rgba(0,0,0,0.57);

}

.userData {
  border: 2px solid black;
  width: 30vw;
  height: 50vh;
}

</style>