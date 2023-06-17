import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const isMobile = window.matchMedia("(max-width: 768px)");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ loader: "bars" }}
    >
      <App />
    </MantineProvider>
    <ToastContainer
      position={isMobile.matches ? "top-center" : "top-right"}
      limit={3}
      autoClose={5000}
      theme="colored"
      closeButton={true}
      toastStyle={{
        borderWidth: isMobile.matches ? 0 : 2,
        borderBottomWidth: 2,
      }}
    />
  </React.StrictMode>
);

