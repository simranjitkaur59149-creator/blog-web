import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App.jsx";

import Content from "../pages/Content.jsx";
import WritePost from "../pages/WritePost.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import BlogPage from "../pages/BlogPage.jsx";
import Login from "../pages/register/Login.jsx";
import Signup from "../pages/register/Signup.jsx";
// import CreateBlog from "../pages/CreateBlog.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/app/content" replace />,
  },
  { path: "/login", element: <Login /> },

  { path: "register", element: <Signup /> },
  {
    path: "/blogpage/:slug",
    element: <BlogPage />,
  },
  {
    path: "/app",
    element: <App />,
    children: [
      {
        path: "content",
        element: <Content />,
      },
      {
        path: "writepost",
        element: <WritePost />,
        // element: <CreateBlog />,
      },
      {
        path: "writepost/:id",
        element: <WritePost />,
        // element: <CreateBlog />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
