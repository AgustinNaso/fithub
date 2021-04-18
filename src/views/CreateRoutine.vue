<template>
  <div>
    <NavBar logged-in :selected="3"/>
    <Title title-name="Crear Rutina" to="/"/>
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

</style>