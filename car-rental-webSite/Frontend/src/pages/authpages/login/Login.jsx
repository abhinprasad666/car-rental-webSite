import React, { useEffect } from "react";
import LoginLeftPanel from "./LoginLeftPanel";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { showToast } from "../../../utils/toastUtils";
import Loader from "../../../common/loaders/Loader";

const Login = () => {


  const navigate = useNavigate();
  const { error, isAuthenticated, loginMessage, loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const redirect = location.state?.redirect || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
      if (loginMessage) {
        showToast("Login successful!", "success");
      }
    }
  }, [isAuthenticated, navigate, loginMessage, redirect]);

  useEffect(() => {
    if (error) {
      showToast(`${error}`, "error", "api-error");
    }
  }, [error]);

  
  return (
  <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 via-blue-100 to-teal-200">
    {loading ? (
      <Loader />
    ) : (
      <>
        <LoginLeftPanel />
        <LoginForm />
      </>
    )}
  </div>
);

};

export default Login;