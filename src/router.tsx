import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Home from "./pages/homePage";
import Profile from "./pages/ProfilePage";
import Login from "./pages/loginPage";
import Register from "./pages/registerPage";
import Notification from "./pages/notificationPage";
import NotFound from "./pages/notFoundPage";
import ProtectedRoute from "./components/routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/profile/:id", element: <Profile /> },
          { path: "/notification", element: <Notification /> },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
]);

export default router;
