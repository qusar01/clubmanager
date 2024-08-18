import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AccessLayout from "./layouts/AccessLayout";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route path="/" element={<AccessLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
