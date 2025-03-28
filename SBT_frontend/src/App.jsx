import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { StoreContext } from "./context/StoreContext"; // Context API for global auth state
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";
import NoPage from "./pages/NoPage";
<<<<<<< HEAD
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
import ResourceAndFinanceHeadRequest from './pages/RFH/ResourceAndFinanceHeadRequest';

// human resource head routes
import HumanResourcePage from "./pages/HR/HumanResourcePage";
import HumanResourceDashboard from "./pages/HR/HumanResourceDashboard";
import HumanResourceRequest from "./pages/HR/HumanResourceRequest";
import PreparePayroll from './pages/HR/PreparePayroll';

// parents routes
import Parent from "./pages/Parent/parent";
import ParentDashboard from "./pages/Parent/Dashboard";
import ParentPayment from "./pages/Parent/Payment";
import PaymentHistory from "./pages/Parent/PaymentHistory";
import Notification from "./pages/Parent/Notifications";
import ParentProfile from "./pages/Parent/Profile";
import PaymentReturn from "./pages/Parent/PaymentReturn";
import Wellcome from "./pages/Parent/Welcome";

=======
import Auditor from "./pages/Auditor/Auditor";
import ApprovedBudget from "./pages/Auditor/ApprovedBudget";
import APB from "./pages/Auditor/ABP";
import ParentRecipt from "./pages/Auditor/parentRecipt";
import RequestBudget from "./pages/Auditor/RequestBudget";
import PreparePayroll from "./pages/RFHead/PreparePayroll";
import RFHead from "./pages/RFHead/RFHead";
import RRequestBudget from "./pages/RFHead/RRequestBudget";
import SMHead from "./pages/SchoolManager/SMHead";
import SM_Dashboard from "./pages/SchoolManager/Dashboard";
import SM_RequestBudget from "./pages/SchoolManager/SM_RequestBudget";
>>>>>>> 69d30179b39cca79304f10922ab012fe0af19153

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
<<<<<<< HEAD
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
        </Route>


        {/* Human Resource Head Routes */}
        <Route path="/human-resource-page" element={<HumanResourcePage />}>
          <Route index element={<HumanResourceDashboard />} />
          <Route path="human-resource-dashboard" element={<HumanResourceDashboard />} />
          <Route path="human-resource-request" element={<HumanResourceRequest />} />
          <Route path="prepare-payroll" element={<PreparePayroll />} />
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
=======

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

        {/* Auditor Routes */}
        <Route path="/auditor" element={<Auditor />}>
          <Route index element={<Navigate to="/auditor/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="abp" element={<APB />} />
          <Route path="ab" element={<ApprovedBudget />} />
          <Route path="pr" element={<ParentRecipt />} />
          <Route path="rb" element={<RequestBudget />} />
        </Route>

        {/* Resource and Financial Head Routes */}
        <Route path="/rfhead" element={<RFHead />}>
          <Route index element={<Navigate to="/rfhead/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pp" element={<PreparePayroll />} />
          <Route path="rrb" element={<RRequestBudget />} />
        </Route>

        {/* School Manager Routes */}
        <Route path="/sm/*" element={<SMHead />}>
          <Route index element={<Navigate to="/sm/dashboard" replace />} />
          <Route path="dashboard" element={<SM_Dashboard />} />
          <Route path="rrb" element={<SM_RequestBudget />} />
>>>>>>> 69d30179b39cca79304f10922ab012fe0af19153
        </Route>
      </Routes>
      

      <Footer />
    </div>
  );
};

export default App;