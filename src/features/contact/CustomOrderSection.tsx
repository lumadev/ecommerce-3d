import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

import { customOrderRepository } from "@/features/contact/repositories/customOrderRepository";
import { useToast } from "@/hooks/use-toast";
import { isValidEmail } from "@/lib/validation";

const contactFields = [
  { id: "name", label: "Nome", type: "text", placeholder: "Seu nome" },
  { id: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" },
  {
    id: "description",
    label: "Descreva sua ideia",
    type: "textarea",
    placeholder:
      "Descreva o produto que você gostaria de encomendar, incluindo tamanho, cor, formato...",
  },
] as const;

type ContactField = (typeof contactFields)[number]["id"];
type ContactValues = Record<ContactField, string>;
type ContactErrors = Partial<Record<ContactField, string>>;

const initialValues: ContactValues = { name: "", email: "", description: "" };

const validateField = (field: ContactField, value: string) => {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return "Este campo é obrigatório.";
  }

  if (field === "email" && !isValidEmail(normalizedValue)) {
    return "Informe um e-mail válido.";
  }

  return undefined;
};

const CustomOrderSection = () => {
  const { toast } = useToast();
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (field: ContactField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) =>
      current[field] ? { ...current, [field]: validateField(field, value) } : current,
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = contactFields.reduce<ContactErrors>(
      (current, { id }) => ({
        ...current,
        [id]: validateField(id, values[id]),
      }),
      {},
    );

    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    setIsLoading(true);

    try {
      await customOrderRepository.send({
        name: values.name.trim(),
        email: values.email.trim(),
        description: values.description.trim(),
      });

      toast({
        description: "Encomenda enviada com sucesso! Entraremos em contato em breve.",
      });

      setValues({ ...initialValues });
      setErrors({});
    } catch {
      toast({ description: "Ocorreu um erro ao enviar a sua encomenda" });
    } finally {
      setIsLoading(false);
    }
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
            <h2 className="mb-3 font-display text-3xl font-bold text-foreground">
              Crie Algo <span className="text-gradient-primary">Único</span>
            </h2>
            <p className="text-muted-foreground">
              Descreva sua ideia e nós transformamos em realidade com impressão 3D.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {contactFields.map((field) => {
              const error = errors[field.id];
              const inputClassName =
                "w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors";
              const inputProps = {
                id: field.id,
                value: values[field.id],
                onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                  handleFieldChange(field.id, event.target.value),
                "aria-invalid": Boolean(error),
                "aria-describedby": error ? `${field.id}-error` : undefined,
                className:
                  field.id === "description"
                    ? `${inputClassName} resize-none`
                    : inputClassName,
                placeholder: field.placeholder,
              };

              return (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    {field.label}
                  </label>
                  {field.id === "description" ? (
                    <textarea {...inputProps} rows={4} />
                  ) : (
                    <input {...inputProps} type={field.type} />
                  )}
                  {error && (
                    <p
                      id={`${field.id}-error`}
                      role="alert"
                      className="mt-1 text-sm text-destructive"
                    >
                      {error}
                    </p>
                  )}
                </div>
              );
            })}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-cta py-3 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-glow-strong hover:scale-[1.02] disabled:opacity-50"
            >
              <Send size={16} />
              {isLoading ? "Enviando..." : "Enviar Encomenda"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomOrderSection;
