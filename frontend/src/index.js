import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";
import "assets/scss/black-dashboard-react.scss";
import { InfinitySpin } from "react-loader-spinner";

const Index = lazy(() => import("views/Index.js"));
const LandingPage = lazy(() => import("views/examples/LandingPage.js"));
const RegisterPage = lazy(() => import("views/examples/RegisterPage.js"));
const ProfilePage = lazy(() => import("views/examples/ProfilePage.js"));
const AdminLayout = lazy(() => import("layouts/Admin/Admin.js"));
const LoginPage = lazy(() => import("views/examples/LoginPage"));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Suspense fallback={<InfinitySpin width="200" height="200" color="#4fa94d" />}>
      <Routes>
        <Route path="/components" element={<Index />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/register-page" element={<RegisterPage />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="*" element={<Navigate to="/login-page" replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
