import { Route, Routes } from "react-router-dom";

import Navbar from "@/layout/navbar/Navbar";
import PagesIndex from "@/pages/PagesIndex";
import Products from "@/features/product/ProductsIndex";
import ProductDetails from "@/features/product/details/ProductDetails";
import MyOrders from "@/features/order/MyOrders";
import NotFound from "@/pages/NotFound";

export const CustomerRoutes = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<PagesIndex />} />
      <Route path="/produtos" element={<Products />} />
      <Route path="/produto/:id" element={<ProductDetails />} />
      <Route path="/meus-pedidos" element={<MyOrders />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);
