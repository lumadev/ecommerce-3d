import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export const PasswordField = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Lock
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />

      <input
        type={show ? "text" : "password"}
        placeholder="Senha"
        className="w-full rounded-lg border border-border bg-secondary py-3 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
};