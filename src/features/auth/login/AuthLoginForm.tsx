import { Mail } from "lucide-react";
import { InputField } from "../components/InputField";
import { PasswordField } from "../components/PasswordField";

interface AuthLoginFormProps {
  onToggleMode: () => void;
}

export const AuthLoginForm = ({ onToggleMode }: AuthLoginFormProps) => {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-4"
      >
        <InputField
          icon={<Mail size={16} />}
          type="email"
          placeholder="Email"
        />

        <PasswordField />

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
          className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Entrar
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