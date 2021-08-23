import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CaseForm from "@/views/CaseForm";
import Login from "@/views/Login";
import  store from "../store";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {requiresAuth: true},
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/case-form",
        name: "CaseForm",
        component: CaseForm,
        meta: {requiresAuth: true},
    },
    {
        path: "/case-list",
        name: "List",
        meta: {requiresAuth: true},
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "list" */ "../views/List.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters.auth) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})

export default router;
