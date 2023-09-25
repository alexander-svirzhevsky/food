import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";

import "./index.css";
import Layout from "./layout/Layout/Layout.tsx";
import Menu from "./pages/Menu/Menu.tsx";
import Product from "./pages/Product/Product.tsx";
import axios from "axios";
import { BASE_URL } from "./helpers/API.ts";

const Basket = lazy(() => import("./pages/Basket/Basket.tsx"));

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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <Suspense fallback={<>Loading...</>}> */}
    <RouterProvider router={router} />
    {/* </Suspense> */}
  </React.StrictMode>
);
