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
import Parent from "./pages/Parent/Parent";

import ParentDashboard from "./components/parent/Dashbord";
import ParentPayment from "./components/parent/Payment";
import PaymentHistory from "./components/parent/PaymentHistory";
import Notifications from "./components/parent/Notifications";
import ParentProfile from "./components/parent/Profile";
import PaymentReturn from "./components/PaymentReturn";
import Wellcome from "./components/parent/Wellcome";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NoPage />} />
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
        <Route path="/gm" element={<GM />}>
          <Route index element={<Navigate to="/gm/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="sd" element={<SD />} />
          <Route path="hr" element={<HR />} />
          <Route path="rf" element={<RFH />} />
          <Route path="payment" element={<Payment />} />
          <Route path="vr" element={<ViewReport />} />
        </Route>
        {/* parent route */}
        <Route>
          <Route path="/parent" element={<Parent />}>
            <Route index element={<Wellcome />} />
            <Route path="dashboard" element={<ParentDashboard />} />
            <Route path="profile" element={<ParentProfile />} />
            <Route path="payment" element={<ParentPayment />} />
            <Route path="pyament-history" element={<PaymentHistory />} />
            <Route path="notfication" element={<Notifications />} />
            <Route path="payment-return" element={<PaymentReturn />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
