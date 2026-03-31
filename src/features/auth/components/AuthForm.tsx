import { AuthLoginForm } from "../login/AuthLoginForm";
import { AuthSignupForm } from "../signup/AuthSignupForm";

interface AuthFormProps {
  isSignUp: boolean;
  onToggleMode: () => void;
}

export const AuthForm = ({ isSignUp, onToggleMode }: AuthFormProps) => {
  if (isSignUp) {
    return <AuthSignupForm onToggleMode={onToggleMode} />;
  }

  return <AuthLoginForm onToggleMode={onToggleMode} />;
};