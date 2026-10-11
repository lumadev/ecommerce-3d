import { useState } from "react";
import { ArrowLeft, Loader2, Mail } from "lucide-react";

import { getErrorMessage } from "@/infra/http/httpError";
import { useToast } from "@/hooks/use-toast";
import { isValidEmail } from "@/lib/validation";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { InputField } from "../components/InputField";

interface AuthForgotPasswordFormProps {
  onBack: () => void;
}

export const AuthForgotPasswordForm = ({ onBack }: AuthForgotPasswordFormProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const { forgotPassword, isLoading } = useForgotPassword();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Preencha um email válido");
      return;
    }

    try {
      await forgotPassword({ email: email.trim() });
      toast({
        description: "Se o email estiver cadastrado, você receberá as instruções.",
      });
      onBack();
    } catch (err) {
      toast({ description: getErrorMessage(err) });
    }
  };

  const handleChange = (value: string) => {
    setEmail(value);
    if (isValidEmail(value)) setError(undefined);
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <InputField
          id="forgot-password-email"
          icon={<Mail size={16} />}
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          autoComplete="off"
          error={error}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            "Enviar"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
        >
          <ArrowLeft size={14} />
          Voltar
        </button>
      </div>
    </>
  );
};
