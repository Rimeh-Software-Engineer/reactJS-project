import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Suspense } from "react";
import routes from "./routes";
import AdminLayout from "./layout/AdminLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./features/login/pages/Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const adminRoutes = routes.filter((route) => route.layout === "admin");
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 366000,
        cacheTime: Infinity,
        refetchInterval: 311000,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              {adminRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
