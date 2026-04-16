import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/shared/components/ui/sonner/sonner.tsx";
import { Toaster } from "@/shared/components/ui/toaster.tsx";
import { TooltipProvider } from "@/shared/components/ui/tooltip.tsx";
import { AuthProvider } from "@/features/auth/auth.provider.tsx";
import { AdminLayout } from "@/features/admin/AdminLayout";

import Index from "./pages/Index.tsx";
import Products from "./pages/Products.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import NotFound from "./pages/NotFound.tsx";
import MyOrders from "./pages/MyOrders.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/produto/:id" element={<ProductDetails />} />
            <Route path="/admin" element={<AdminLayout />} />
            <Route path="/meus-pedidos" element={<MyOrders />} />

            {/* ADMIN */}
            {/* <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<OrderPage />} />
              <Route path="orders" element={<OrderPage />} /> */}
              {/* <Route path="products" element={<ProductPage />} /> */}
            {/* </Route> */}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
