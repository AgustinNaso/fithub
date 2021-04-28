<template>
  <div class="mainContainer">
    <NavBar logged-in :selected="3"/>
    <div class="bodyContainer">
    <Title title-name="Crear Rutina" to="/main"/>
      <div class="content">
        <div class="completeInfo">
          <form>
            <label class="textLabel">Nombre</label>
            <input class="textInput" type="text" name="name">
            <label class="textLabel">Descripción</label>
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
          <img class="imgPic" src="../assets/imageicon.png" alt="imageIcon"/>
          <h3 class="imgh2" >Elegir imagen</h3>
        </div>
        <img class="mainImg" src="../assets/activity_tracker.svg" alt="activityTracker"/>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import Footer from "@/components/Footer";
export default {
  name: "CreateRoutine",
  components: {Footer, NavBar, Title}
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

.bodyContainer {
  flex: 1;
  background-color: #f3f9f9;
  padding: 30px 35px 90px 35px;
  display: flex;
  color: #42b983;
  width: auto;
  flex-direction: column;
}

.content{
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.completeInfo {
  width: 30vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
}

.textLabel {
  color: #42b983;
  font-size: 25px;
  font-weight: 700;
  width: 100%;
  margin: 5px 0 8px 25px;
}

form {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}

.textInput,
textarea {
  width: 100%;
  margin-left: 10px;
  border: solid 3px #42b983;
  border-radius: 20px;
  font-size: 20px;
  padding: 10px;
  resize: none;
  outline: none;
  color: #42b983;
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
  border: #42b983 5px solid;
  border-radius: 30px;
  margin: 70px 0 0 25px;
  position: relative;
  background:  rgba(66, 185, 131, 0.25);
  justify-content: center;
  align-items: center;
}

.insertImg img {
  height: 200px;
  width: 200px;
}

.imgh2 {
  color: #030303;
  width: 100%;
  text-align: center;
  font-size: 25px;
}

.mainImg {
  width: 450px;
}




</style>