import { UserCircle } from "lucide-react";

const NavbarUserMenu = ({
  isAuthenticated,
  isCheckingSession,
  user,
  onLoginClick,
}) => {
  const accountLabel = isCheckingSession
    ? "Carregando..."
    : isAuthenticated
    ? user?.name ?? "Minha conta"
    : "Entrar";

  const handleClick = () => {
    if (!isAuthenticated) {
      onLoginClick?.();
    } else {
      console.log("Abrir menu do usuário");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex h-10 items-center gap-2 rounded-lg border border-border bg-secondary px-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      aria-label={accountLabel}
    >
      <UserCircle size={18} />
      <span className="hidden sm:inline">{accountLabel}</span>
    </button>
  );
};

export default NavbarUserMenu;