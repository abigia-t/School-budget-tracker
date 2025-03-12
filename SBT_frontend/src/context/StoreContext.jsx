//1 
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//2
export const StoreContext = createContext();
//3
export const StoreContextProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Simulate login function (replace with API call)
const login = async (email, password) => {
  try {
    // Define the correct API endpoint based on user role
    const endpoint = email.includes("@actor")
      ? "http://localhost:5000/api/actors/login"
      : "http://localhost:5000/api/students/login";

    // Send login request to backend
    const response = await axios.post(endpoint, { email, password });

    // Extract user data and token from response
    const { user, token } = response.data;

    // Store user details and token in state & localStorage
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token); // Store token for authentication

    return { success: true, role: user.role };
  } catch (error) {
    console.error("Login error:", error.response?.data?.message || error.message);
    return { success: false, message: error.response?.data?.message || "Invalid credentials" };
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
    <StoreContext.Provider value={{ user, login, logout }}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
