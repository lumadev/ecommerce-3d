import { AuthLoginForm } from "../login/AuthLoginForm";
import { AuthSignupForm } from "../signup/AuthSignupForm";

interface AuthFormProps {
  isSignUp: boolean;
  onToggleMode: () => void;
  onLoginSucess: () => void;
}

export const AuthForm = ({ isSignUp, onToggleMode, onLoginSucess }: AuthFormProps) => {
  if (isSignUp) {
    return <AuthSignupForm onToggleMode={onToggleMode} />;
  }

  return (
    <AuthLoginForm
      onToggleMode={onToggleMode}
      onLoginSucess={onLoginSucess}
    />
  );
};