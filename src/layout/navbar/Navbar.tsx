import { ShoppingCart, Search, UserCircle } from "lucide-react";
import { FaInstagram as Instagram } from "react-icons/fa";
import { useCartContext as useCart } from "@/features/cart/useCart";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { motion } from "framer-motion";
import { useState } from "react";

import SearchDialog from "../../features/search/SearchDialog";
import LoginModal from "../../features/auth/LoginModal";
import NavbarSearch from "./NavbarSearch";
import NavbarInstagramBtn from "./NavbarInstagramBtn";

const Navbar = () => {
  const { totalItems, setIsOpen } = useCart();
  const { isAuthenticated, isCheckingSession, user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const accountLabel = isCheckingSession
    ? "Carregando..."
    : isAuthenticated
      ? user?.name ?? "Minha conta"
      : "Entrar";

  return (
    <>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="/" className="font-display text-xl font-bold tracking-wider text-primary">
            PRINT<span className="text-foreground">3D</span>
          </a>

          <div className="flex items-center gap-3">
            <NavbarSearch onOpen={() => setSearchOpen(true)} />

            <button
              onClick={() => {
                if (!isAuthenticated) {
                  setLoginOpen(true);
                }
              }}
              className="flex h-10 items-center gap-2 rounded-lg border border-border bg-secondary px-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label={accountLabel}
            >
              <UserCircle size={18} />
              <span className="hidden sm:inline">{accountLabel}</span>
            </button>

            <NavbarInstagramBtn />

            <button
              onClick={() => setIsOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label="Carrinho"
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;