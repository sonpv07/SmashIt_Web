import React, { createContext, useContext, useEffect, useState } from "react";
import { getRequest, postRequest } from "../service/request";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const baseURL = "http://api.smashit.com.vn/api";

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [chosenRole, setChosenRole] = useState("");

  useEffect(() => {
    const initializeUser = async () => {
      const userData = await loadUser();
      if (userData) {
        setIsLogged(true);
      }
      setLoading(false);
    };
    initializeUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        const userData = await getUserProfile(storedToken);
        if (userData) {
          setToken(storedToken);
          setUser(userData);
          return userData;
        }
        return null;
      } else {
        console.log("Token Not Valid");
        return null;
      }
    } catch (error) {
      console.error("Failed to load user", error);
      return null;
    }
  };

  const getUserProfile = async (accessToken) => {
    try {
      const res = await getRequest(`${baseURL}/User/get-profile`, accessToken);
      if (res?.statusCode >= 200 && res?.statusCode < 300) {
        const isValidRole = true;
        if (isValidRole) {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          return res.data;
        } else {
          return null;
        }
      } else {
        console.log("Get User Fail", res);
      }
      return null;
    } catch (error) {
      console.error("Error when get user profile: ", error);
    }
  };

  const login = async (body) => {
    try {
      const res = await postRequest(
        `${baseURL}/Authentication/login`,
        body,
        null
      );
      if (res?.statusCode >= 200 && res?.statusCode < 300) {
        const userData = await getUserProfile(res.data);

        if (userData) {
          setToken(res.data);
          localStorage.setItem("token", res.data);
          setIsLogged(true);
          return res.data;
        } else {
          return null;
        }
      } else {
        console.log("Login Fail");
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const signOut = async () => {
    setUser(null);
    setToken(null);
    setIsLogged(false);
    await localStorage.removeItem("token");
    await localStorage.removeItem("user");
  };

  const checkUserRole = (userRole) => {
    if (userRole !== chosenRole) {
      return false;
    }
    return true;
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        login,
        loadUser,
        signOut,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
