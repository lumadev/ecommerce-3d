import { ReactNode } from "react";

interface InputFieldProps {
  icon: ReactNode;
  type?: string;
  placeholder: string;
}

export const InputField = ({
  icon,
  type = "text",
  placeholder,
}: InputFieldProps) => {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        {icon}
      </div>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-secondary py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
};