import { Outlet, useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";

export const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
          
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft size={16} />
            Voltar
          </button>

          <h1 className="text-lg font-bold text-primary">
            ADMIN
          </h1>

          {/* MENU */}
          <nav className="ml-8 flex gap-6 text-sm">
            <button onClick={() => navigate("/admin/orders")}>
              Pedidos
            </button>

            <button onClick={() => navigate("/admin/products")}>
              Produtos
            </button>
          </nav>

          <div className="ml-auto">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive"
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};