import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import RandoDetails, { loadProductsById } from "./pages/RandoDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./sass/index.scss";
import App from "./App";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/randos/:id",
        element: <RandoDetails />,
        loader: loadProductsById,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
