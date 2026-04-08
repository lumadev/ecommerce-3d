import { useState } from "react";
import { Mail, User, Loader2 } from "lucide-react";
import { InputField } from "../components/InputField";
import { PasswordField } from "../components/PasswordField";
import { authRepository } from "../repositories/authRepository";

interface AuthSignupFormProps {
  onToggleMode: () => void;
}

export const AuthSignupForm = ({ onToggleMode }: AuthSignupFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authRepository.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      console.log("Resposta do backend:", response);
    } catch (error) {
      console.error("Erro no registro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <form 
        onSubmit={handleSubmit} 
        className="space-y-4"
      >
        <InputField
          icon={<User size={16} />}
          placeholder="Nome completo"
          value={formData.name}
          onChange={updateFormData("name")}
          autoComplete="off"
        />

        <InputField
          icon={<Mail size={16} />}
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={updateFormData("email")}
          autoComplete="off"
        />

        <PasswordField
          placeholder="Senha"
          value={formData.password}
          onChange={updateFormData("password")}
        />

        {/* <PasswordField
          placeholder="Confirmar Senha"
          value={formData.confirmPassword}
          onChange={updateFormData("confirmPassword")}
        /> */}

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