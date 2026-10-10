import { useState } from "react";
import { Mail, User, Loader2 } from "lucide-react";
import { getErrorMessage } from "@/infra/http/httpError";
import { useToast } from "@/hooks/use-toast";
import { isValidEmail } from "@/lib/validation";

import { InputField } from "../components/InputField";
import { PasswordField } from "../components/PasswordField";
import { useAuth } from "../hooks/useAuth";
import { authRepository } from "../repositories/authRepository";


interface AuthSignupFormProps {
  onToggleMode: () => void;
  onLoginSucess: () => void;
}

export const AuthSignupForm = ({ onToggleMode, onLoginSucess }: AuthSignupFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: typeof errors = {};
    if (!formData.name.trim()) {
      nextErrors.name = "Preencha seu nome";
    }
    if (!isValidEmail(formData.email)) {
      nextErrors.email = "Preencha um email válido";
    }
    if (!formData.password) {
      nextErrors.password = "Preencha sua senha";
    }
    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = "Confirme sua senha";
    } else if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = "As senhas informadas precisam ser iguais";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsLoading(true);

    try {
      await authRepository.register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      toast({ description: "Registro feito com sucesso." });
      onLoginSucess(); // closes modal
    } catch (error) {
      toast({ description: getErrorMessage(error) });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (field === "name" && value.trim()) {
        return { ...prev, name: undefined };
      }
      if (field === "email" && isValidEmail(value)) {
        return { ...prev, email: undefined };
      }
      if (field === "password") {
        return {
          ...prev,
          password: value ? undefined : prev.password,
          confirmPassword: formData.confirmPassword
            ? value !== formData.confirmPassword
              ? "As senhas informadas precisam ser iguais"
              : undefined
            : prev.confirmPassword,
        };
      }
      if (field === "confirmPassword") {
        return {
          ...prev,
          confirmPassword: value
            ? value === formData.password
              ? undefined
              : "As senhas informadas precisam ser iguais"
            : prev.confirmPassword,
        };
      }
      return prev;
    });
  };

  return (
    <>
      <form 
        onSubmit={handleSubmit} 
        noValidate
        className="space-y-4"
      >
        <InputField
          id="signup-name"
          icon={<User size={16} />}
          placeholder="Nome completo"
          value={formData.name}
          onChange={updateFormData("name")}
          autoComplete="off"
          error={errors.name}
        />

        <InputField
          id="signup-email"
          icon={<Mail size={16} />}
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={updateFormData("email")}
          autoComplete="off"
          error={errors.email}
        />

        <PasswordField
          id="signup-password"
          placeholder="Senha"
          value={formData.password}
          onChange={updateFormData("password")}
          error={errors.password}
        />

        <PasswordField
          id="signup-confirm-password"
          placeholder="Confirmar Senha"
          value={formData.confirmPassword}
          onChange={updateFormData("confirmPassword")}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            "Criar conta"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Já tem uma conta?{" "}
        <button
          onClick={onToggleMode}
          className="font-medium text-primary hover:underline"
        >
          Entrar
        </button>
      </div>
    </>
  );
};