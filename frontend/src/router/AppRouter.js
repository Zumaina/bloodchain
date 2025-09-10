import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import DonorRegisterPage from "../pages/DonorRegisterPage";
import DonatePage from "../pages/DonatePage";
import InfoPage from "../pages/Info/InfoPage";
import ProtectedRoute from "../components/ProtectedRoute";
import ProfilePage from "../pages/ProfilePage";
import RequestPage from "../pages/RequestPage"; 
import DonorsPage from "../pages/DonorsPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/donor-register" element={<DonorRegisterPage />} />
      <Route path="/donate" element={<DonatePage />} />
      <Route path="/donors" element={<DonorsPage />} />
      <Route path="/info/:slug" element={<InfoPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/request" element={<RequestPage />} /> 
      </Route>
    </Routes>
  );
};

export default AppRouter;