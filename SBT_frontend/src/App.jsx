import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { StoreContext } from "./context/StoreContext"; // Context API for global auth state
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";
import NoPage from "./pages/NoPage";
import RoleRoute from "./config/RoleRoute";

/// system admin routes
import SystemAdminPage from "./pages/SA/SystemAdminPage";
import SystemAdminDashboard from "./pages/SA/SystemAdminDashboard";
import ManageActors from "./pages/SA/ManageActors";
import ManageStudents from "./pages/SA/ManageStudents";
import ManageChapa from "./pages/SA/ManageChapa";

//general manager routes
import GeneralManagerPage from "./pages/GM/GeneralManagerPage";
import GeneralManagerDashboard from "./pages/GM/GeneralManagerDashboard";
import BudgetRequested from "./pages/GM/BudgetRequested";
import PaymentRequested from "./pages/GM/PaymentRequested";
import ViewReport from "./pages/GM/ViewReport";

// school director routes
import SchoolDirectorPage from "./pages/SD/SchoolDirectorPage";
import SchoolDirectorDashboard from "./pages/SD/SchoolDirectorDashboard";
import SchoolDirectorRequest from "./pages/SD/SchoolDirectorRequest";

// auditor routes
import AuditorPage from "./pages/AU/AuditorPage";
import Dashboard from "./pages/AU/AuditorDashboard";
import ApprovedExpenditure from "./pages/AU/ApprovedBudget";
import ABP from "./pages/AU/ABP";
import ParentReceipt from "./pages/AU/ParentReceipt";

// resource and finance head
import ResourceAndFinanceHeadPage from "./pages/RFH/ResourceAndFinanceHeadPage";
import ResourceAndFinanceHeadDashboard from './pages/RFH/ResourceAndFinanceHeadDashboard';
import PreparePayroll from './pages/RFH/PreparePayroll';
import ResourceAndFinanceHeadRequest from './pages/RFH/ResourceAndFinanceHeadRequest';

// human resource head routes
import HumanResourcePage from "./pages/HR/HumanResourcePage";
import HumanResourceDashboard from "./pages/HR/HumanResourceDashboard";
import HumanResourceRequest from "./pages/HR/HumanResourceRequest";

// parents routes
import Parent from "./pages/Parent/parent";
import ParentDashboard from "./pages/Parent/Dashboard";
import ParentPayment from "./pages/Parent/Payment";
import PaymentHistory from "./pages/Parent/PaymentHistory";
import Notification from "./pages/Parent/Notifications";
import ParentProfile from "./pages/Parent/Profile";
import PaymentReturn from "./pages/Parent/PaymentReturn";
import Wellcome from "./pages/Parent/Welcome";


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
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NoPage />} />

        {/* System Admin Routes */}
        <Route path="/system-admin-page" element={<SystemAdminPage />}>
        <Route index element={<SystemAdminDashboard />} />
          <Route path="system-admin-dashboard" element={<SystemAdminDashboard />} />
          <Route path="manage-actors" element={<ManageActors />} />
          <Route path="manage-students" element={<ManageStudents />} />
          <Route path="manage-chapa" element={<ManageChapa />} />
        </Route>
  {/* General Manager Routes */}
  <Route path="/general-manager-page" element={<GeneralManagerPage />}>
          <Route path="general-manager-dashboard" element={<GeneralManagerDashboard />} />
          <Route path="budget-requested" element={<BudgetRequested />} />
          <Route path="payment-requested" element={<PaymentRequested />} />
          <Route path="veiw-report" element={<ViewReport />} />
        </Route>

        {/* School Director Routes */}
        <Route path="/school-director-page" element={<SchoolDirectorPage />}>
          <Route index element={<SchoolDirectorDashboard />} />
          <Route path="school-director-dashboard" element={<SchoolDirectorDashboard />} />
          <Route path="school-director-request" element={<SchoolDirectorRequest />} />
        </Route>

        {/* Auditor Routes */}
        <Route path="/auditor-page" element={<AuditorPage />}>
          <Route index element={<Dashboard />} />
          <Route path="auditor-dashboard" element={<Dashboard />} />
          <Route path="abp" element={<ABP />} />
          <Route path="ab" element={<ApprovedExpenditure />} />
          <Route path="pr" element={<ParentReceipt />} />
        </Route>

        {/* Resource and Finance Head Routes */}
        <Route path="/resource-and-finance-head-page" element={<ResourceAndFinanceHeadPage />}>
          <Route index element={<ResourceAndFinanceHeadDashboard />} /> {/* Default route */}
          <Route path="resource-and-finance-head-dashboard" element={<ResourceAndFinanceHeadDashboard />} />
          <Route path="resource-and-finance-head-request" element={<ResourceAndFinanceHeadRequest />} />
          <Route path="prepare-payroll" element={<PreparePayroll />} />
        </Route>


        {/* Human Resource Head Routes */}
        <Route path="/human-resource-page" element={<HumanResourcePage />}>
          <Route index element={<HumanResourceDashboard />} />
          <Route path="human-resource-dashboard" element={<HumanResourceDashboard />} />
          <Route path="human-resource-request" element={<HumanResourceRequest />} />
        </Route>

        {/* Parent Routes */}
        <Route path="/parent" element={<Parent />}>
          <Route index element={<Wellcome />} />
          <Route path="dashboard" element={<ParentDashboard />} />
          <Route path="profile" element={<ParentProfile />} />
          <Route path="payment" element={<ParentPayment />} />
          <Route path="pyament-history" element={<PaymentHistory />} />
          <Route path="notification" element={<Notification />} />
          <Route path="payment-return" element={<PaymentReturn />} />
        </Route>
      </Routes>
      

      <Footer />
    </div>
  );
};

export default App;