import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import UIStateProvider from "./providers/UIStateProvider.jsx";
import AppThemeProvider from "./providers/AppThemeProvider.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import CssBaseline from "@mui/material/CssBaseline";

import AdminAddForm from "./pages/AdminAddForm.jsx";
import AdminQuestions from "./pages/AdminQuestions.jsx";
import Home from "./pages/Home.jsx";
import LoginForm from "./pages/LoginForm.jsx";
import RegisterForm from "./pages/RegisterForm.jsx";
import EditUserProfile from "./pages/EditUserProfile.jsx";
import Result from "./pages/Result.jsx"

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Users from "./pages/Users.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/edit/:id",
        element: <EditUserProfile />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/adminAddForm",
        element: <AdminAddForm />,
      },
      {
        path: "/adminQuestions",
        element: <AdminQuestions />,
      },
      {
        path: "/adminQuestions/edit/:id",
        element: <AdminAddForm />,
      },
      {
        path: "/result",
        element: <Result />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppThemeProvider>
      <UIStateProvider>
        <AuthProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </AuthProvider>
      </UIStateProvider>
    </AppThemeProvider>
  </React.StrictMode>
);
