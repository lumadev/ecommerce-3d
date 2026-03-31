import { Mail, User } from "lucide-react";
import { InputField } from "../components/InputField";
import { PasswordField } from "../components/PasswordField";

interface AuthSignupFormProps {
  onToggleMode: () => void;
}

export const AuthSignupForm = ({ onToggleMode }: AuthSignupFormProps) => {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-4"
      >
        <InputField
          icon={<User size={16} />}
          placeholder="Nome completo"
        />

        <InputField
          icon={<Mail size={16} />}
          type="email"
          placeholder="Email"
        />

        <PasswordField />

        <button
          type="submit"
          className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Criar conta
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