import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/root";
import Companies from "./pages/companies";
import Dashboard from "./pages/dashboard";

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
  return <RouterProvider router={router} />;
}

export default App;
