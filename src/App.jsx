import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Root from "./pages/root";
import Companies from "./pages/companies";
import Dashboard from "./pages/dashboard";

const queryClient = new QueryClient()

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
    ],
  },
]);

function App() {
  return <QueryClientProvider client={queryClient}><RouterProvider router={router} /></QueryClientProvider>;
}

export default App;
