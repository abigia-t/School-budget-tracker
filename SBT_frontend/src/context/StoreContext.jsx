import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios, { setAuthHeader } from "../axiosHeaderRequestConfig.js"; // Import setAuthHeader
import { toast } from "react-toastify";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalActors: 0,
    totalStudents: 0,
    totalRegistered: 0,
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/stats");
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      console.log("Login response data:", response.data);

      if (response.data.requiresPasswordChange) {
        return { 
          requiresPasswordChange: true,
          email: response.data.email,
          role: response.data.role
        };
      }

      const { user, token } = response.data;

      if (!token) {
        console.error("🚨 No token received in response!");
        return { success: false, message: "No token received" };
      }

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setAuthHeader(); // Now this will work
      navigate("/"); 
      console.log("✅ Token stored successfully:", localStorage.getItem("token"));

      return { success: true, user, role: user.role };
    } catch (error) {
      console.error("🚨 Login error:", error.response?.data || error);
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    console.log("Token in storage:", token);

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    const publicRoutes = ["/", "/login"];
    if (!token && !publicRoutes.includes(location.pathname)) {
      console.log("Token missing, redirecting...");
      navigate("/login");
    }
  }, [location]);

  // Reset password function
  const resetPassword = async (email, newPassword, confirmPassword, role) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/change-password",
        { email, newPassword, confirmPassword }
      );

      if (response.data.status) {
        toast.success("Password changed successfully!");
        return { success: true };
      } else {
        toast.error(response.data.message);
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Password change failed";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Persist user state on reload
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    console.log("Token in storage:", token);

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    const publicRoutes = ["/", "/login"];
    if (!token && !publicRoutes.includes(location.pathname)) {
      console.log("Token missing, redirecting...");
      navigate("/login");
    }
  }, [location]);

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <StoreContext.Provider value={{ 
      user, 
      login, 
      logout, 
      stats, 
      resetPassword 
    }}>
      {children}
    </StoreContext.Provider>
  );
};