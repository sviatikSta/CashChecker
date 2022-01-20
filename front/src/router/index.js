import { createWebHistory, createRouter } from "vue-router";
import Transactions from "../views/Transactions.vue";
import Categories from "../views/Categories.vue";
import AddTransaction from "../views/AddTransaction.vue";
import AddCategory from "../views/AddCategory.vue";
import EditTransaction from "../views/EditTransaction.vue";
import EditCategory from "../views/EditCategory.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Reports from "../views/Reports.vue";

const routes = [
  {
    path: "/transactions",
    name: "transactionsTable",
    component: Transactions,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/categories",
    name: "categoriesTable",
    component: Categories,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/AddTransaction",
    name: "AddTransaction",
    component: AddTransaction,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/AddCategory",
    name: "AddCategory",
    component: AddCategory,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/EditCategory/:id",
    name: "EditCategory",
    component: EditCategory,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/EditTransaction/:id",
    name: "EditTransaction",
    component: EditTransaction,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },  
  {
    path: "/:catchAll(.*)",
    name: "AnyAnother",
    component: Transactions,
    meta: {
      requiresAuth: true
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
