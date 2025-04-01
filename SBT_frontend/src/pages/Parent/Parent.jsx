import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./Navbar";

const Parent = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logout");
    navigate("/");
  };
  return (
    <>
      <NavBar onLogout={handleLogout} />
      <div className="mt-20 min-h-[80vh]">
        <Outlet />
      </div>
    </>
  );
};

export default Parent;
