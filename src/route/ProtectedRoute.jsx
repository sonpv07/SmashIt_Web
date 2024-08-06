import { Navigate, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalProvider";

function ProtectedRoute({ children }) {
  const { isLogged } = useGlobalContext();
  const navigation = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigation("/login");
    }
    console.log(isLogged);
  }, []);

  return isLogged ? children : null;
}

export default ProtectedRoute;
