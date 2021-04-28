<template>
  <div class="mainContainer">
    <NavBar logged-in :selected="3"/>
    <Title title-name="Crear Rutina" to="/main"/>
    <div class="bodyContainer">
      <div class="completeInfo">
        <form>
          <h2>Nombre</h2>
          <textarea class="nameBox" cols="30" rows="1"></textarea>
          <h2>Descripción</h2>
          <textarea class="descBox" cols="30" rows="8"></textarea>
          <div class="checkbox">
            <div class="pBox">
              <input class="checkBtn" type="radio" id="public" name="security">
              <label for="public">Pública</label>
            </div>
            <div class="pBox">
              <input class="checkBtn" type="radio" id="private" name="security">
              <label for="private">Privada</label>
            </div>
          </div>
          <button class="createbtn">Crear Rutina</button>
        </form>
      </div>
      <div class="insertImg">
        <img src="../assets/imageicon.png" alt="imageIcon"/>
        <h2>Elegir imagen</h2>
      </div>
      <img src="../assets/activity_tracker.svg" alt="activityTracker"/>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Title from "../components/Title";
export default {
  name: "CreateRoutine",
  components: {NavBar, Title}
}
</script>

<style scoped>

.bodyContainer {
  display: flex;
  margin: 0 25px;
}

.completeInfo {
  width: 30vw;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
  text-align: left;
}

h2 {
  color: #42b983;
  font-size: 25px;
  font-weight: 700;
  width: 100%;
  margin-left: 25px;
  margin-top: 5px;
}

form {
  display: flex;
  align-items: center;
  flex-direction: column;
}

textarea {
  margin-left: 10px;
  border: solid 3px #42b983;
  border-radius: 20px;
  font-size: 20px;
  padding: 5px;
  resize: none;
  outline: none;
}

.checkbox {
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin: 15px 0 15px 25px;
}

.pBox {
  width: 140px;
  color: #42b983;
  font-size: 18px;
  font-weight: 700;
}

input[type="radio"] {
  display: none;
}

input[type="radio"] + *::before {
  content: "";
  display: inline-block;
  vertical-align: bottom;
  width: 1rem;
  height: 1rem;
  border-color: #42b983;
  border-radius: 50%;
  border-style: solid;
  margin-right: 0.3rem;
}

input[type="radio"]:checked + *::before {
  /*background: radial-gradient(#42b983 0%, #42b983 40%, transparent 50%, transparent);*/
  background-color: #42b983;
  border-color: #42b983;
}

.createbtn {
  color: white;
  border: none;
  text-align: center;
  background-color: #42b983;
  border-radius: 25px;
  font-size: 24px;
  font-weight: 400;
  text-decoration: none;
  outline: none;
  width: 230px;
  height: 40px;
  cursor: pointer;
}

.insertImg {
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 300px;
  border-color: #42b983;
  border-style: solid;
  border-radius: 30px;
  margin-top: 70px;
  border-width: 5px;
  margin-left: 25px;
  position: relative;
  background:  rgba(66, 185, 131, 0.25);
  justify-content: center;
}

.insertImg img {
  height: 200px;
  width: 200px;
}

.insertImg h2 {
  color: #030303;
  width: 250px;
  text-align: center;
}

img {
  width: 500px;
  height: 500px;
  margin-left: 50px;
}

</style>