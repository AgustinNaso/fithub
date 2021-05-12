<template>
  <div class="mainContainer">
    <NavBar/>
    <div class="mainBg">
      <div class="errorMsg">
        <h1>Enhorabuena!</h1>
        <div class="verified" v-show="verified">Su cuenta ha sido verificada correctamente</div>
      </div>
      <img src="../assets/undraw_done.svg" alt="Cuenta verificada">
    </div>
    <Footer/>
  </div>
</template>

<script>
import router from "@/routes";
import {UserApi,EmailVerifier} from "@/backend/user";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default {
  name: "Verify",
  components: {Footer, NavBar},
  data(){
    return{
      verified:false
    }
  },
  async created() {
    try {
      const emailVerif = new EmailVerifier(this.$route.query.email,this.$route.query.code);
      await UserApi.verifyEmail(emailVerif);
    }catch (e){
      router.push("/permissionDenied");
    }
    this.verified= true;
  }
}
</script>

<style scoped>
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
  color: #399c70;
  justify-content: space-evenly;
  align-items: center;
}

h1{
  font-size: 50px;
}

.verified{
  font-size: 30px;
  color: #2c3e50;
  text-align: left;
  margin-left: 30px;
}

.errorMsg{
  display: flex;
  flex-direction: column;
  width:30vw;
}
img{
  width: 55vw;
}
</style>