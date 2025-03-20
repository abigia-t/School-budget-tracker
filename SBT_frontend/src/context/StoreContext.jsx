import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalActors: 0,
    totalStudents: 0,
    totalRegistered: 0,
  });

  const navigate = useNavigate();

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
      const endpoint = email.includes("@actor")
        ? "http://localhost:5000/api/actors/login"
        : "http://localhost:5000/api/students/login";

      const response = await axios.post(endpoint, { email, password });
      const { user, token } = response.data;

      // Check if the user is logging in with the default password
      if (password === "12345678") {
        toast.warning("Please change your default password.");
        navigate("/reset-password", { state: { email, role: user.role } });
        return { success: false, message: "Please change your default password." };
      }

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      return { success: true, role: user.role };
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      return { success: false, message: error.response?.data?.message || "Invalid credentials" };
    }
  };

  // Reset password function
  const resetPassword = async (email, newPassword, confirmPassword, role) => {
    try {
      const endpoint = role === "actor"
        ? "http://localhost:5000/api/actors/change-password"
        : "http://localhost:5000/api/students/change-password";

      const response = await axios.put(endpoint, { email, newPassword, confirmPassword });

      if (response.data.status) {
        toast.success("Password changed successfully! Please login again.");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Failed to change password. Please try again.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to change password. Please try again.";
      toast.error(errorMessage);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  // Persist user state on reload
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <StoreContext.Provider value={{ user, login, logout, stats, resetPassword }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;