/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ParentAuthContext = createContext();

const ParentAuthProvider = ({ children }) => {
  const [parent, setParent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for an existing session when the app loads
  useEffect(() => {
    const storedParent = localStorage.getItem("parent");
    if (storedParent) {
      setParent(JSON.parse(storedParent));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/parents/login",
        {
          email,
          password,
        }
      );
      setParent(response.data);
      localStorage.setItem("parent", JSON.stringify(response.data));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // Logout function
  const logout = () => {
    setParent(null);
    localStorage.removeItem("parent");
  };

  return (
    <ParentAuthContext.Provider value={{ parent, login, logout, loading }}>
      {children}
    </ParentAuthContext.Provider>
  );
};

export default ParentAuthProvider;
