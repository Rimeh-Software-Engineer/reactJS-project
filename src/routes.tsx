import React, { lazy } from "react";

export interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  name: string;
  isVisible: boolean;
  layout?: "admin";
}

const DashboardLazy = lazy(
  () => import("@/features/dashboard/pages/Dashboard")
);

const UsersListLazy = lazy(() => import("./features/users/pages/UsersList"));
const UsersDetailsLazy = lazy(
  () => import("./features/users/pages/UsersDetails")
);

const ComplaintsListLazy = lazy(
  () => import("./features/complaints/pages/ComplaintsList")
);
const OffersListLazy = lazy(() => import("./features/offers/pages/OffersList"));
const ProductsListLazy = lazy(
  () => import("./features/products/pages/ProductsList")
);

const CategoriesListLazy = lazy(
  () => import("./features/categories/pages/CategoriesList")
);

const RecommendationsListLazy = lazy(
  () => import("./features/recommendations/pages/RecommendationsList")
);
const LoginLazy = lazy(() => import("./features/login/pages/Login"));
const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Dashboard",
    component: DashboardLazy,
    isVisible: true,
    layout: "admin",
  },

  {
    path: "/users",
    name: "Users",
    component: UsersListLazy,
    isVisible: true,
    layout: "admin",
  },
  {
    path: "/users/:usersId",
    name: "Users",
    component: UsersDetailsLazy,
    isVisible: true,
    layout: "admin",
  },

  {
    path: "/feedbacks",
    name: "Feedbacks",
    component: ComplaintsListLazy,
    isVisible: true,
    layout: "admin",
  },

  {
    path: "/offers",
    name: "Offers",
    component: OffersListLazy,
    isVisible: true,
    layout: "admin",
  },

  {
    path: "/login",
    name: "Login",
    component: LoginLazy,
    isVisible: true,
    layout: "admin",
  },

  {
    path: "/products",
    name: "Products",
    component: ProductsListLazy,
    isVisible: true,
    layout: "admin",
  },

  {
    path: "/categories",
    name: "Categories",
    component: CategoriesListLazy,
    isVisible: true,
    layout: "admin",
  },

  {
    path: "/recommendations",
    name: "Recommendations",
    component: RecommendationsListLazy,
    isVisible: true,
    layout: "admin",
  },

  {
    path: "*",
    name: "Dashboard",
    component: DashboardLazy,
    isVisible: true,
    layout: "admin",
  },
];

export default routes;
