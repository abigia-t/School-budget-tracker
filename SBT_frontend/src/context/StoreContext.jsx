import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Simulate login function (replace with API call)
  const login = async (email, password) => {
    const users = [
      { email: "admin@example.com", role: "System Admin" },
      { email: "gm@example.com", role: "General Manager" },
      { email: "sd@example.com", role: "School Director" },
      { email: "au@example.com", role: "Auditor" },
      { email: "hr@example.com", role: "Human Resource Head" },
      { email: "fh@example.com", role: "Finance Head" },
      { email: "pa@example.com", role: "Parent" },
    ];
  
    const foundUser = users.find((u) => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser)); // Store correct role
      return { success: true, role: foundUser.role };
    } else {
      return { success: false, message: "Invalid credentials" };
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
