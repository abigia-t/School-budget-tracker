import { Outlet } from "react-router-dom";
import SideBar from "../components/parent/sideBar/Index"
const ParentLayout = () => {
  return (
    <div className="flex">
      <SideBar />
      <Outlet />
    </div>
  );
};
export default ParentLayout;
