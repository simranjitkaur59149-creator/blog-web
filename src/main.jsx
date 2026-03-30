import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import router from "./Routing/Routes.jsx";
import PostProvider from "./pages/PostProvider.jsx";
import { AuthProvider } from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  //using addPost we adding the new blog and using post we display the blogs both previous and new

  <AuthProvider>
   <PostProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
   </PostProvider>
  </AuthProvider>,
);
