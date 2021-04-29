import Vue from "vue";
import VueRouter from 'vue-router'

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register";
import CreateRoutine from "./views/CreateRoutine";
import Main from "./views/Main";
import UserProfile from "./views/UserProfile";
import RoutineView from "./views/RoutineView";
import MyRoutines from "@/views/MyRoutines";
import MissingPage from "@/views/MissingPage";
import EditProfile from "./views/EditProfile";
import EditRoutine from "@/views/EditRoutine";

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
    },
    {
        path: "/routine",
        name:"routine",
        component: RoutineView
    },
    {
        path: "/myroutines",
        name:"myroutines",
        component: MyRoutines
    },
    {
        path: "/editProfile",
        name: "editProfile",
        component: EditProfile
    },
    {
        path: "/editRoutine",
        name: "editRoutine",
        component: EditRoutine
    },
    {
        path: "*",
        name: "notFound",
        component: MissingPage
    },
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;