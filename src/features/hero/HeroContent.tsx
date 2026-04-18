import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroContent = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-center lg:text-left"
    >
      <h1 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
        <span className="text-gradient-primary">Criações 3D</span>
        <br />
        <span className="text-foreground">Sob Medida</span>
      </h1>

      <p className="mb-10 max-w-lg text-lg text-muted-foreground sm:text-xl lg:mx-0 mx-auto">
        Transformamos suas ideias em objetos reais com impressão 3D de alta qualidade. Produtos únicos, personalizados e prontos para encantar.
      </p>

      <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start sm:justify-center">
        <button
          onClick={() => navigate("/produtos")}
          className="rounded-lg bg-gradient-cta px-8 py-3 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-glow-strong hover:scale-105"
        >
          Ver Produtos
        </button>

        <button
          onClick={() =>
            document.getElementById("encomenda")?.scrollIntoView({ behavior: "smooth" })
          }
          className="rounded-lg border border-primary/30 px-8 py-3 font-display text-sm font-semibold uppercase tracking-wider text-primary transition-all hover:border-primary hover:shadow-glow"
        >
          Encomenda Personalizada
        </button>
      </div>
    </motion.div>
  );
};

export default HeroContent;