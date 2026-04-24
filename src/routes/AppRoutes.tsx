import { Route, Routes } from "react-router-dom";

import { CustomerRoutes } from "./CustomerRoutes";
import { AdminRoutes } from "./AdminRoutes";

export const AppRoutes = () => (
  <Routes>
    <Route path="/admin/*" element={<AdminRoutes />} />
    <Route path="/*" element={<CustomerRoutes />} />
  </Routes>
);
