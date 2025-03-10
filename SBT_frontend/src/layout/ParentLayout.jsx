import { Outlet } from "react-router-dom";
import Sidebar from "../components/parent/sidebar/Index";

const ParentLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default ParentLayout;