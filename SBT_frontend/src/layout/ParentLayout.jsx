import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar"
import Sidebar from "../components/parent/sidebar/Index";

const ParentLayout = () => {
  return (
    <div className="flex">
      <TopBar/>
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default ParentLayout;