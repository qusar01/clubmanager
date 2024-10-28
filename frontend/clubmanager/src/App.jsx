import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import MainLayout from "./layouts/MainLayout";
import AccessLayout from "./layouts/AccessLayout";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SetPasswordPage from "./pages/SetPasswordPage";
import AccountPage from "./pages/AccountPage";
import { UserProvider } from "./context/UserContext";
import ConditionalLayout from "./layouts/ConditionalLayout";
import PublicRoutes from "./utils/PublicRoutes";
import MembersPage from "./pages/MembersPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route element={<ProtectedRoutes />}>
            <Route index element={<HomePage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/members" element={<MembersPage />} />
          </Route>
        </Route>

        <Route path="/" element={<AccessLayout />}>
          <Route element={<PublicRoutes />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>
        </Route>

        <Route path="/" element={<ConditionalLayout />}>
          <Route path="/set-password" element={<SetPasswordPage />} />
        </Route>
      </>
    )
  );

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
