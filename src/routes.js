import Vue from "vue";
import VueRouter from 'vue-router'

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register";
import CreateRoutine from "./views/CreateRoutine";
import Main from "./views/Main";
import UserProfile from "./views/UserProfile";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: "/createRoutine",
        name: "createRoutine",
        component: CreateRoutine
    },
    {
        path: "/main",
        name:"main",
        component: Main
    },
    {
        path: "/userProfile",
        name:"userProfile",
        component: UserProfile
    }

];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;