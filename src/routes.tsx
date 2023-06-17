import React from "react";
import Dashboard from "@/features/dashboard/pages/Dashboard";
import ServicesList from "@/features/services/pages/ServicesList";
import ServiceDetails from "@/features/services/pages/ServiceDetails";

export interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  name: string;
  isVisible: boolean;
  layout: "guest" | "admin" | "operator" | "aggregator";
}

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    isVisible: true,
    layout: "guest",
  },
  {
    path: "/services",
    name: "Services List",
    component: ServicesList,
    isVisible: true,
    layout: "guest",
  },
  {
    path: "/services/:serviceId",
    name: "Service Details",
    component: ServiceDetails,
    isVisible: true,
    layout: "guest",
  },
  {
    path: "*",
    name: "Dashboard",
    component: Dashboard,
    isVisible: true,
    layout: "guest",
  },
];

export default routes;
