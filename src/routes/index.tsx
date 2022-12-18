import { Routes, BrowserRouter, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
  </Routes>
);

export default AppRoutes;
