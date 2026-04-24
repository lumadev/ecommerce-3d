import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster as Sonner } from "@/shared/components/ui/sonner/sonner.tsx";
import { Toaster } from "@/shared/components/ui/toaster.tsx";
import { TooltipProvider } from "@/shared/components/ui/tooltip.tsx";

import { ClientAuthProvider } from "@/features/auth/providers/auth.provider.tsx";
import { CartProvider } from "@/features/cart/cart.provider";
import { AppRoutes } from "@/routes/AppRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <ClientAuthProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </ClientAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;