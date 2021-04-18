import Vue from "vue";
import VueRouter from 'vue-router'

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register";
import CreateRoutine from "./views/CreateRoutine";

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
        path:"/createRoutine",
        name: "createRoutine",
        component: CreateRoutine
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;