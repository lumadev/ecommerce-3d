import { ArrowLeft, PackageSearch, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "@/layout/components/Footer";

const ProductBackLink = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="container mx-auto flex flex-col items-center px-4 pt-16 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-primary/30 bg-gradient-card shadow-glow"
        >
          <PackageSearch className="h-10 w-10 text-primary" />
          <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-primary" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="mb-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
            Ops! Esse produto sumiu no espaço 3D.
          </h1>
          <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-muted-foreground">
            Não encontramos o item que você procura. Ele pode ter sido removido ou o
            link pode estar incorreto. Que tal explorar o restante da nossa coleção?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={() => navigate("/produtos")}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-cta px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-glow"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar aos Produtos
          </button>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductBackLink;
