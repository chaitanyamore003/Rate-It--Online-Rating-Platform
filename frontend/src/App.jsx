import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoutes";

// Auth pages
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";

//error pages
import NotFound from "./pages/error/NotFound404";

// Dashboard pages — one per role, each role lands on its own home
import AdminDashboard from "./pages/DashBoard/AdminDashboard";
import OwnerDashboard from "./pages/DashBoard/OwnerDashBoard";
import UserDashboard from "./pages/DashBoard/UserDashBoard";

// Feature pages
import AdminUsers from "./pages/admin/AdminUsers";
import AdminStores from "./pages/admin/AdminStores";
import StoresList from "./pages/StoresList";
import ChangePassword from "./pages/Auth/ChangePassword";

const RootRedirect = () => {
  return <Navigate to="/dashboard" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ─────────────── Public / Auth routes ───────────────*/}
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signUp" element={<SignUp />} />
          </Route>

          {/* ─────────────── Protected routes ─────────────── */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              {/* ─── Shared route — any signed-in user ─── */}
              <Route path="/profile/password" element={<ChangePassword />} />

              {/* ─── Admin-only routes ─── */}
              <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/stores" element={<AdminStores />} />
              </Route>

              {/* ─── user routes ─── */}
              <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/stores" element={<StoresList />} />
              </Route>

              {/* ─── Store owner routes ─── */}
              <Route element={<ProtectedRoute allowedRoles={["OWNER"]} />}>
                <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              </Route>

              {/* ─── Root fallback ─── */}
              <Route path="/" element={<RootRedirect />} />
            </Route>
          </Route>

          {/* ─────────────── Catch-all ─────────────── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
