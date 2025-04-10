import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./Navbar"; // Adjusted path
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";
const Parent = () => {
  const {logout} = useContext(StoreContext)

  const handleLogout = () => {
    console.log("Logout");
    logout()
  };

  return (
    <>
      <NavBar onLogout={handleLogout} />
      <div className="mt-20">
        <Outlet />
      </div>
    </>
  );
};

export default Parent;
