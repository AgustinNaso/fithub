<template>
<div class="profileContainer">
  <router-link to="/userProfile"><img class="userImg" :src="userImg" alt="Ir al perfil"></router-link>
  <p>{{userName}}</p>
  <img  @click="isOpen = !isOpen" class="arrow" src="../assets/chevron_down_green.png" alt="">
  <transition name="fade" appear>
    <div v-if="isOpen" class="dropdown">
      <ul>
        <router-link to="/userProfile"><li>Mi Cuenta</li></router-link>
        <router-link to="/myfavourites"><li>Mis Favoritos</li></router-link>
        <li @click="logOut" class="signOut">Cerrar Sesión</li>
      </ul>
    </div>
  </transition>

</div>
</template>

<script>
import router from "@/routes";

export default {
  name: "ProfileNav",
  props:{
    userName: String,
    userImg: String,
    userStore: Object
  },
  data(){ return {isOpen: false}},
  methods: {
    logOut(){
      this.userStore.logOut();
      router.push("/");
    }
  }
}
</script>

<style scoped>
.profileContainer{
  display: flex;
  align-items: center;
  position: relative;
}
.userImg{
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 16px;
  object-fit:cover;
  border: 3px solid #42b983;
}
p{
  font-size: 22px;
}
.arrow{
  height: 50px;
}

.dropdown{
  position: absolute;
  background-color: #77c6a2;
  top: calc(100%  + 9px);
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  border-radius: 0 0 16px 16px;
}

ul {
  list-style-type: none;
}

li{
  color:white;
  font-size: 21px;
  padding: 3px 3px 3px 12px;
  border-bottom: #5d6165 2px solid;
  max-width: 100%;
  text-shadow: 1px 1px 2px #111;
  cursor: pointer;
}

.signOut{
  color:black;
  border:none;
  text-shadow: none;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-to{
  transition: all 0.2s ease-out;
}

.fade-enter,
.fade-leave-to{
  opacity: 0;
}

a{
  text-decoration: none;
  margin: 0;
  padding: 0;
}
</style>