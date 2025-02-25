import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SA from "./pages/SA/SA";
import Dashboard from "./pages/SA/Dashboard";
import ManageActors from "./pages/SA/ManageActors";
import ManageStudents from "./pages/SA/ManageStudents";
import SendNotifications from "./pages/SA/SendNotifications";
import ManageChapa from "./pages/SA/ManageChapa";
import GM from "./pages/GM/GM";
import SD from "./pages/GM/SD";
import HR from "./pages/GM/HRH";
import RFH from "./pages/GM/RFH";
import Payment from "./pages/GM/Payment";
import ViewReport from "./pages/GM/ViewReport";
import Footer from "./components/Footer";
import NoPage from "./pages/NoPage";
import Auditor from "./pages/Auditor/Auditor";
import ApprovedBudget from "./pages/Auditor/ApprovedBudget";
import APB from "./pages/Auditor/ABP";
import ParentRecipt from "./pages/Auditor/parentRecipt";
import RequestBudget from "./pages/Auditor/RequestBudget";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NoPage/>}/>
        {/* System Admin Routes */}
        <Route path="/sa" element={<SA />}>
          <Route index element={<Navigate to="/sa/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="actors" element={<ManageActors />} />
          <Route path="students" element={<ManageStudents />} />
          <Route path="notifications" element={<SendNotifications />} />
          <Route path="chapa" element={<ManageChapa />} />
        </Route>
        {/* General Manager Routes */}
        <Route path="/" element={<GM />}>
          <Route index element={<Navigate to="/gm/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="sd" element={<SD />} />
          <Route path="hr" element={<HR />} />
          <Route path="rf" element={<RFH />} />
          <Route path="payment" element={<Payment />} />
          <Route path="vr" element={<ViewReport />} />
        </Route>
        {/* Auditor Routes */}
        <Route path="/auditor" element={<Auditor />}>
          <Route index element={<Navigate to="/auditor/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="abp" element={<APB />} />
          <Route path="ab" element={<ApprovedBudget />} />
          <Route path="pr" element={<ParentRecipt />} />
          <Route path="rb" element={<RequestBudget />} />
        </Route>{""}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
