import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import DonorRegisterPage from "../pages/DonorRegisterPage";
import DonatePage from "../pages/DonatePage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/donor-register" element={<DonorRegisterPage />} />
      <Route path="/donate" element={<DonatePage />} />
    </Routes>
  );
};

export default AppRouter;
