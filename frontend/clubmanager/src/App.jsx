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
import MemberDetailsPage from "./pages/MemberDetailsPage";
import InvitationPage from "./pages/InvitationPage";
import TrainingsPage from "./pages/TrainingsPage";
import EventsPage from "./pages/EventsPage";
import StatsPage from "./pages/StatsPage";
import PaymentsPage from "./pages/PaymentsPage";
import PaymentSuccess from "./components/payments/PaymentSuccess";
import PaymentCancel from "./components/payments/PaymentCancel";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route element={<ProtectedRoutes />}>
            <Route index element={<HomePage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/members/:memberId" element={<MemberDetailsPage />} />
            <Route path="/trainings" element={<TrainingsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/cancel" element={<PaymentCancel />} />
          </Route>
        </Route>

        <Route path="/" element={<AccessLayout />}>
          <Route element={<PublicRoutes />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/invite" element={<InvitationPage />} />
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
