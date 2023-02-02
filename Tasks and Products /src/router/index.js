import { createRouter, createWebHistory } from "vue-router";
import ProductsView from "../views/ProductsPage.vue";
import ProductsDetails from "../views/ProductDetails.vue";
import SignIn from "../views/SignIn.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Products",
      component: ProductsView,
    },
    {
      path: "/product/:id",
      name: "ProductsDetails",
      component: ProductsDetails,
    },
    {
      path: "/sign-in",
      name: "SignIn",
      component: SignIn,
    }
  ],
});

export default router;
