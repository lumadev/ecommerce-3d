import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

const CustomOrderSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Encomenda enviada com sucesso! Entraremos em contato em breve.");
    setName("");
    setEmail("");
    setDescription("");
  };

  return (
    <section id="encomenda" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl rounded-2xl border border-border bg-gradient-card p-8 shadow-glow sm:p-12"
        >
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles size={14} />
              Encomenda Personalizada
            </div>
            <h2 className="mb-3 font-display text-3xl font-bold text-foreground">
              Crie Algo <span className="text-gradient-primary">Único</span>
            </h2>
            <p className="text-muted-foreground">
              Descreva sua ideia e nós transformamos em realidade com impressão 3D.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                Nome
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label htmlFor="description" className="mb-2 block text-sm font-medium text-foreground">
                Descreva sua ideia
              </label>
              <textarea
                id="description"
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                placeholder="Descreva o produto que você gostaria de encomendar, incluindo tamanho, cor, formato..."
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-cta py-3 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-glow-strong hover:scale-[1.02]"
            >
              <Send size={16} />
              Enviar Encomenda
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomOrderSection;
