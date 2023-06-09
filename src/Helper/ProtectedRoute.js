import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRouter({ element: Element }) {
  const location = useLocation();
  const path = location.pathname;
  const isAuthenticated = useSelector((state) => state.authReducer.isLogin);
  return <>{isAuthenticated ? Element : <Navigate replace to="/" />}</>;
}
export default ProtectedRouter;
