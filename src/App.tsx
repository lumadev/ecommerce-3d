import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/shared/components/ui/sonner/sonner.tsx";
import { Toaster } from "@/shared/components/ui/toaster.tsx";
import { TooltipProvider } from "@/shared/components/ui/tooltip.tsx";

import { ClientAuthProvider } from "@/features/auth/providers/auth.provider.tsx";
import { AdminAuthProvider } from "@/features/auth/providers/admin-auth.provider.ts";
import { CartProvider } from "@/features/cart/cart.provider";

import Navbar from "@/layout/navbar/Navbar";
import { AdminLayout } from "@/features/admin/AdminLayout";

import Index from "./pages/Index.tsx";
import Products from "./features/product/Products.tsx";
import ProductDetails from "./features/product/details/ProductDetails.tsx";
import NotFound from "./pages/NotFound.tsx";
import MyOrders from "./features/order/MyOrders.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <ClientAuthProvider>
          <CartProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/produtos" element={<Products />} />
              <Route path="/produto/:id" element={<ProductDetails />} />
              <Route path="/meus-pedidos" element={<MyOrders />} />

              {/* ÁREA ADMIN */}
              <Route
                path="/admin/*"
                element={
                  <AdminAuthProvider>
                    <AdminLayout />
                  </AdminAuthProvider>
                }
              />

              {/* fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </ClientAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;