import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import Layout from "./layout/Layout/Layout.tsx";
import Menu from "./pages/Menu/Menu.tsx";
import Product from "./pages/Product/Product.tsx";
import Basket from "./pages/Basket/Basket.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Menu />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/basket",
        element: <Basket />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
