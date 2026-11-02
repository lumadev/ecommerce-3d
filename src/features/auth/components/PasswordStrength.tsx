import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import {
  hasMinPasswordLength,
  hasUpperAndLowerCase,
  PASSWORD_MIN_LENGTH,
} from "../passwordValidation";

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const rules = [
    {
      label: `Mínimo de ${PASSWORD_MIN_LENGTH} caracteres`,
      valid: hasMinPasswordLength(password),
    },
    {
      label: "Letras maiúsculas e minúsculas",
      valid: hasUpperAndLowerCase(password),
    },
  ];

  return (
    <ul
      aria-live="polite"
      className="space-y-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5"
    >
      {rules.map(({ label, valid }) => (
        <li
          key={label}
          className={`flex items-center gap-2.5 text-xs transition-colors duration-300 ${
            valid ? "text-emerald-600" : "text-muted-foreground"
          }`}
        >
          <span
            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
              valid
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-muted-foreground/40 bg-transparent"
            }`}
          >
            <AnimatePresence initial={false}>
              {valid && (
                <motion.span
                  key="check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex"
                >
                  <Check size={10} strokeWidth={3} />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
};
