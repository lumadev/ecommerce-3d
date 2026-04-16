import { Outlet, useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";

export const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-border bg-background p-4 flex flex-col">
        <h1 className="mb-6 text-lg font-bold text-primary">
          ADMIN
        </h1>

        <nav className="flex flex-col gap-2 text-sm">
          <button
            onClick={() => navigate("/admin/orders")}
            className="text-left px-3 py-2 rounded-md hover:bg-secondary"
          >
            Pedidos
          </button>

          <button
            onClick={() => navigate("/admin/products")}
            className="text-left px-3 py-2 rounded-md hover:bg-secondary"
          >
            Produtos
          </button>
        </nav>

        <div className="mt-auto flex flex-col gap-2">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <div className="flex-1 flex flex-col">
        <header className="border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto flex h-16 items-center gap-4 px-4">
            <div className="ml-auto flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Olá, <span className="font-medium text-foreground">Administrador</span>
              </span>
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
              >
                <LogOut size={16} />
                Sair
              </button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};