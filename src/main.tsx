import React, { Suspense, lazy } from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";

import "./index.css";
import Layout from "./layout/Layout/Layout.tsx";
import Menu from "./pages/Menu/Menu.tsx";
import Product from "./pages/Product/Product.tsx";
import { BASE_URL } from "./helpers/API.ts";
import AuthLayout from "./layout/Auth/AuthLayout.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import RequireAuth from "./helpers/RequireAuth.tsx";

const Basket = lazy(() => import("./pages/Basket/Basket.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: <Menu />,
      },
      {
        path: "/product/:id",
        element: <Product />,
        loader: async ({ params }) => {
          return defer({
            data: axios
              .get(`${BASE_URL}/products/${params.id}`)
              .then((data) => data),
          });
        },
      },
      {
        path: "/basket",
        element: (
          <Suspense fallback={<>Loading...</>}>
            <Basket />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
