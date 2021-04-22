<template>
  <div class="mainContainer">
    <NavBar logged-in :selected="3"/>
    <Title title-name="Crear Rutina" to="/"/>
    <div class="bodyContainer">
      <div class="completeInfo">
        <form>
          <h2>Nombre</h2>
          <textarea class="nameBox" cols="30" rows="1"></textarea>
          <h2>Descripción</h2>
          <textarea class="descBox" cols="30" rows="10"></textarea>
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
        </form>
      </div>
      <div></div>
      <div></div>
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
}

textarea {
  margin-left: 10px;
  border: solid 3px #42b983;
  border-radius: 12px;
  font-size: 20px;
}

.bodyContainer {
  margin: 0 25px;
}

.checkbox {
  display: flex;
  justify-content: space-between;
  width: 250px;
  margin-top: 10px;
  margin-left: 25px;
}

.pBox {
  display: flex;
  justify-content: space-between;
  width: 85px;
  align-items: center;
  color: #42b983;
  font-size: 18px;
  font-weight: 700;
}

</style>