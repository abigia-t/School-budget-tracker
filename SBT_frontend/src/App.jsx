import React, { useContext, useEffect } from "react";
import { Routes, Route,useNavigate } from "react-router-dom";
import { StoreContext } from "./context/StoreContext"; // Context API for global auth state
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";
import NoPage from "./pages/NoPage";
import RoleRoute from "./config/RoleRoute";

// system admin routes
import SA from "./pages/SA/SA";
import Dashboard from "./pages/SA/Dashboard";
import ManageActors from "./pages/SA/ManageActors";
import ManageStudents from "./pages/SA/ManageStudents";
import SendNotifications from "./pages/SA/SendNotifications";
import ManageChapa from "./pages/SA/ManageChapa";

//general manager routes
// import Dashboard from "./pages/GM/Dashboard";
import GM from "./pages/GM/GM";
import SD from "./pages/GM/SD";
import HR from "./pages/GM/HRH";
import RFH from "./pages/GM/RFH";
import Payment from "./pages/GM/Payment";
import ViewReport from "./pages/GM/ViewReport";
//school director routes
// import SD from "./pages/SD/SD";
//human resource head routes
// import HR from "./pages/HR/HRH";
//resource and finance head
// import RFH from "./pages/RFH/RFH";
//auditor routes
// import AU from "./pages/AU/AU";
//parents routes
// import PA from "./pages/PA/PA";


const App = () => {
  const { userRole } = useContext(StoreContext); // Get role from Context API
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole) {
      const redirectPath = RoleRoute[userRole] || "/";
      navigate(redirectPath);
    }
  }, [userRole, navigate]);

  return (
    <div>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="*" element={<NoPage />} />

  
        {/* System Admin Routes */}
        <Route path="/sa" element={<SA />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="actors" element={<ManageActors />} />
          <Route path="students" element={<ManageStudents />} />
          <Route path="notifications" element={<SendNotifications />} />
          <Route path="chapa" element={<ManageChapa />} />
        </Route>
  {/* General Manager Routes */}
  <Route path="/gm" element={<GM />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="sd" element={<SD />} />
          <Route path="hr" element={<HR />} />
          <Route path="rf" element={<RFH />} />
          <Route path="payment" element={<Payment />} />
          <Route path="vr" element={<ViewReport />} />
        </Route>
        {/* school director Routes */}
        {/* <Route path="/sd" element={<SD />}>
          <Route index element={<Navigate to="/sd/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dd" element={<DD />} />
        </Route> */}
        {/* human resource head Routes */}
        {/* <Route path="/hr" element={<HR />}>
          <Route index element={<Navigate to="/hr/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ad" element={<AD />} />
        </Route> */}
        
        {/* finance and resource head Routes */}
        {/* <Route path="/fr" element={<FR />}>
          <Route index element={<Navigate to="/fr/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="er" element={<ER />} />
        </Route> */}
        {/* auditor head Routes */}
        {/* <Route path="/au" element={<AU />}>
          <Route index element={<Navigate to="/au/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ny" element={<NY />} />
        </Route> */}
         {/* parent Routes */}
         {/* <Route path="/pa" element={<PA />}>
          <Route index element={<Navigate to="/pa/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="payment" element={<Payment />} />
        </Route>{" "} */}
</Routes>

      <Footer />
    </div>
  );
};

export default App;
