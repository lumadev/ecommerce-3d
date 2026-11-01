import { Route, Routes } from "react-router-dom";

import { CustomerRoutes } from "./CustomerRoutes";

export const AppRoutes = () => (
  <Routes>
    <Route path="/*" element={<CustomerRoutes />} />
  </Routes>
);
