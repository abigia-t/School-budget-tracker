import { Outlet } from "react-router-dom";
import Sidebar from "../components/parent/Sidebar";

const ParentLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default ParentLayout;
