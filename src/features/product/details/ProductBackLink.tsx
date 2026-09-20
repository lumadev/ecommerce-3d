import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/layout/components/Footer";

const ProductBackLink = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 pt-12 text-center">
        <p className="text-xl text-muted-foreground">Produto não encontrado.</p>
        <button
          onClick={() => navigate("/produtos")}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 font-display text-sm font-medium text-primary transition-all hover:border-primary hover:shadow-glow"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar aos Produtos
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ProductBackLink;
