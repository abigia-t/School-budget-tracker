import { Outlet } from "react-router-dom";
import NavBar from "../../components/parent/Navbar";

const Parent = () => {
  // return <ParentLayout />;
  return (
    <>
      <NavBar />
      <div className="mt-20">
        <Outlet />
      </div>
    </>
  );
};

export default Parent;
