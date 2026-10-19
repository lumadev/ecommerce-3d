import { Route, Routes } from "react-router-dom";

import { CustomerRoutes } from "./CustomerRoutes";
import { AdminRoutes } from "./AdminRoutes";

export const AppRoutes = () => (
  <Routes>
    {/* Deprecated: the admin panel is moving to the ecommerce-admin project. */}
    <Route path="/admin/*" element={<AdminRoutes />} />
    <Route path="/*" element={<CustomerRoutes />} />
  </Routes>
);
