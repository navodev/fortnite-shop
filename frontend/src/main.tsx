import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Shop from "./pages/Shop.tsx";
import ShopDetail from "./pages/ShopDetail.tsx";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/shop" replace />,
    errorElement: <h1>Not found</h1>,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/shop/:itemId",
    element: <ShopDetail />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
