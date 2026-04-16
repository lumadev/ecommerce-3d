import { useState } from "react";

import { motion } from "framer-motion";

import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar/sidebar";
import AdminSidebar, { AdminSection } from "@/features/admin/components/AdminSidebar";
import OrderPage from "@/features/admin/order/OrderPage";

export const AdminLayout = () => {
  const [section, setSection] = useState<AdminSection>("pedidos");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <AdminSidebar active={section} onNavigate={setSection} />

        <div className="flex-1 flex flex-col">
          <header className="border-b border-border bg-background/80 backdrop-blur-xl">
            <div className="flex h-16 items-center gap-4 px-4">
              <SidebarTrigger />
              <span className="text-sm text-muted-foreground">
                Olá, <span className="font-medium text-foreground">Administrador</span>
              </span>
            </div>
          </header>

          <main className="flex-1 p-6">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {section === "pedidos" && <OrderPage />}
            </motion.div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};