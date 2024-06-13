import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Root from "./pages/root";
import Companies from "./pages/companies";
import Dashboard from "./pages/dashboard";
import CompanyDetail from "./pages/company-detail";
import { LoaderProvider } from "./context/Loader";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/companies",
        element: <Companies />,
      },
      {
        path: "/companies/:id",
        element: <CompanyDetail />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoaderProvider>
        <RouterProvider router={router} />
      </LoaderProvider>
    </QueryClientProvider>
  );
}

export default App;
