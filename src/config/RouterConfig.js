import React from "react";
import { Route, Routes } from "react-router";
import LoginForm from "../pages/auth/LoginForm";
import RegisterForm from "../pages/auth/RegisterForm";
import MenuPrincipal from "../pages/home/MenuPrincipal";
import RequireAuth from "../config/RequireAuth";
import { useSelector } from "react-redux";
import NoRequireAuth from "./NoRequireAuth";
import {
  ROUTER_HOME,
  ROUTER_INITIAL,
  ROUTER_REGISTER_FORM,
  ROUTER_RESET_PASSWORD_FORM,
  ROUTER_VERIFY_EMAIL,
} from "./Constant";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ResetPasswordForm from "../pages/auth/ResetPasswordForm";
import Header from "../components/Header";

const RouterConfig = () => {
  const Token = useSelector((state) => state.login.token);

  return (
    <Routes>
      <Route
        exact
        path={ROUTER_INITIAL}
        element={
          <NoRequireAuth Token={Token}>
            <LoginForm />
          </NoRequireAuth>
        }
      />
      <Route
        exact
        path={ROUTER_REGISTER_FORM}
        element={
          <NoRequireAuth Token={Token}>
            <RegisterForm />
          </NoRequireAuth>
        }
      />
      <Route
        exact
        path={ROUTER_HOME}
        element={
          <RequireAuth Token={Token}>
            <Header />
            <MenuPrincipal />
          </RequireAuth>
        }
      />
      <Route
        exact
        path={ROUTER_VERIFY_EMAIL}
        element={
          <NoRequireAuth Token={Token}>
            <VerifyEmail />
          </NoRequireAuth>
        }
      />
      <Route
        exact
        path={ROUTER_RESET_PASSWORD_FORM}
        element={
          <NoRequireAuth Token={Token}>
            <ResetPasswordForm />
          </NoRequireAuth>
        }
      />
    </Routes>
  );
};

export default RouterConfig;
