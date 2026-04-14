import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { InputField } from "../components/InputField";
import { PasswordField } from "../components/PasswordField";
import { authRepository } from "../repositories/authRepository";

interface AuthLoginFormProps {
  onToggleMode: () => void;
}

export const AuthLoginForm = ({ onToggleMode }: AuthLoginFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authRepository.login({
        email: formData.email,
        password: formData.password,
      });

      console.log("Resposta do backend:", response);
    } catch (error) {
      console.error("Erro no login:", error);
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
          icon={<Mail size={16} />}
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={updateFormData("email")}
          autoComplete="off"
        />

        <PasswordField
          value={formData.password}
          onChange={updateFormData("password")}
        />

        <div className="text-right">
          <button
            type="button"
            className="text-xs text-primary hover:underline"
          >
            Esqueceu a senha?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            "Entrar"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Não tem uma conta?{" "}
        <button
          onClick={onToggleMode}
          className="font-medium text-primary hover:underline"
        >
          Criar conta
        </button>
      </div>
    </>
  );
};