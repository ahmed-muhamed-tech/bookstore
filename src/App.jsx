import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Books from "./pages/Books";
import NotFound from "./pages/NotFound";
import DetailsBook from "./components/home/DetailsBook";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import PrivateRoute from "./contexts/PrivateRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const App = () => {
  const routing = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/books",
          element: <Books />,
        },
        {
          path: "/dashboard",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
        { path: "/detailsBook/:id", element: <DetailsBook /> },
        { path: "/login", element: <Login /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routing} />
      <ToastContainer position="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
