import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { categories } from "@/data/categories";
import { ArrowRight } from "lucide-react";

const CategoriesSection = () => {
  const navigate = useNavigate();

  return (
    <section id="categorias" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Explore por <span className="text-gradient-primary">Categoria</span>
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Descubra o que é possível criar com impressão 3D. De decoração a acessórios tech, temos algo para cada estilo.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => navigate("/produtos")}
              className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-card cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.url}
                  alt={category.name}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="mb-1 font-display text-xl font-bold text-foreground">
                  {category.name}
                </h3>
                <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                  {category.description}
                </p>

                <div className="mb-3 flex flex-wrap gap-2">
                  {category.hashtags.map((example) => (
                    <span
                      key={example}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {example}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                  Ver produtos <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
