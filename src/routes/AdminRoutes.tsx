import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { AdminAuthProvider } from "@/features/auth/providers/admin-auth.provider";
import { useAdminAuth } from "@/features/auth/hooks/useAdminAuth";
import { AdminLayout } from "@/features/admin/AdminLayout";
import AdminLogin from "@/features/admin/login/AdminLogin";

const RequireAdmin = () => {
  const { isAuthenticated, isCheckingSession } = useAdminAuth();
  const location = useLocation();

  if (isCheckingSession) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <AdminLayout />;
};

const RedirectIfAuthenticated = () => {
  const { isAuthenticated, isCheckingSession } = useAdminAuth();

  if (isCheckingSession) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <AdminLogin />;
};

export const AdminRoutes = () => (
  <AdminAuthProvider>
    <Routes>
      <Route path="/login" element={<RedirectIfAuthenticated />} />
      <Route path="/*" element={<RequireAdmin />} />
    </Routes>
  </AdminAuthProvider>
);
