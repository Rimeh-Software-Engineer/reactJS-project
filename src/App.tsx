import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import routes from "./routes";
import AdminLayout from "./layout/AdminLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const adminRoutes = routes.filter((route) => route.layout === "admin");
  const guestRoutes = routes.filter((route) => route.layout === "guest");
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 900000,
        retry: false,
        staleTime: 366000,
        cacheTime: Infinity,
        refetchInterval: 311000,
        refetchOnWindowFocus: false,
      },
      // mutations: {
      // 	// onSuccess: () => toast.success("Operation Successful"),
      // 	onError: () => toast.error("Something Went Wrong 😓"),
      // 	// retry: 1,
      // },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<AdminLayout />}>
            {guestRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
          <Route element={<AdminLayout />}>
            {adminRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

