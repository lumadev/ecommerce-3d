import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar/sidebar";

import AdminSidebar from "@/features/admin/components/AdminSidebar";

export const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
        <AdminSidebar className="hidden md:flex" />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="shrink-0 border-b border-border bg-background/80 backdrop-blur-xl">
            <div className="flex h-16 items-center gap-4 px-4">
              <SidebarTrigger />

              <span className="text-sm text-muted-foreground">
                Olá,{" "}
                <span className="font-medium text-foreground">
                  Administrador
                </span>
              </span>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto p-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};