import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../components/parent/Navbar";

const Parent = () => {
  const navigate = useNavigate();
  const handleLogout=()=>{
    console.log("Logout")
    navigate('/');
  }
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
