import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CarList from "./pages/Car/CarList";
import CreateCar from "./pages/Car/CreateCar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./components/Profile";
// Auth & Dashboard Components
import AdminDashboard from "./pages/dashboard/AdminDashboard/AdminDashboard";
import Overview from "./pages/dashboard/AdminDashboard/Overviews/OverView";
import AllUsers from "./pages/dashboard/AdminDashboard/Users/AllUsers";
import BannedUsers from "./pages/dashboard/AdminDashboard/Users/BannedUsers";
// import PendingCars from "./pages/dashboard/AdminDashboard/Cars/PendingCars";
// import ApprovedCars from "./pages/dashboard/AdminDashboard/Cars/ApprovedCars";
// import RejectedCars from "./pages/dashboard/AdminDashboard/Cars/RejectCars";

import AllBookings from "./pages/dashboard/AdminDashboard/Bookings/AllBookings";
import FraudulentBookings from "./pages/dashboard/AdminDashboard/Bookings/FraudulentBookings";
import PlatformEarnings from "./pages/dashboard/AdminDashboard/Earnings/PlatformEarnings";
import CarOwnerPayouts from "./pages/dashboard/AdminDashboard/Earnings/CarOwnerPayouts";
import Refunds from "./pages/dashboard/AdminDashboard/Earnings/Refunds";
import OwnerRequests from "./pages/dashboard/AdminDashboard/Requests/OwnerRequests";
import ReviewOwnerProfile from "./pages/dashboard/AdminDashboard/Requests/ReviewOwnerProfile";
import EarningsReport from "./pages/dashboard/AdminDashboard/Reports/EarningsReport";
import UserActivity from "./pages/dashboard/AdminDashboard/Reports/UserActivity";
import BookingTrends from "./pages/dashboard/AdminDashboard/Reports/BookingTrends";
import AllReviews from "./pages/dashboard/AdminDashboard/Reviews/AllReviews";

import Notifications from "./pages/dashboard/AdminDashboard/Notifications/Notifications";
import Support from "./pages/dashboard/AdminDashboard/Support/Support";
import TermsConditions from "./pages/dashboard/AdminDashboard/CMS/TermsConditions";
import HomeBanner from "./pages/dashboard/AdminDashboard/CMS/HomeBanner";

import GeneralSettings from "./pages/dashboard/AdminDashboard/Settings/GeneralSettings";
import RolePermissions from "./pages/dashboard/AdminDashboard/Settings/RolePermissions";
import PaymentSettings from "./pages/dashboard/AdminDashboard/Settings/PaymentSettings";

import CarOwnerDashboard from "./pages/dashboard/CarOwnerDashboard/CarOwnerDashboard";
import UserDashboard from "./pages/dashboard/UserDashboard/UserDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Car Owner Pages
import COOverview from "./pages/dashboard/CarOwnerDashboard/overview";
import MyCars from "./pages/dashboard/CarOwnerDashboard/Mycars";
import Bookings from "./pages/dashboard/CarOwnerDashboard/Bookings";
import Earnings from "./pages/dashboard/CarOwnerDashboard/Earnings";
import Messages from "./pages/dashboard/CarOwnerDashboard/Messages";
import Reviews from "./pages/dashboard/CarOwnerDashboard/Reviews";
import NotificationsCO from "./pages/dashboard/CarOwnerDashboard/Notifications";
import SupportCO from "./pages/dashboard/CarOwnerDashboard/Support";
import AddCar from "./pages/dashboard/CarOwnerDashboard/AddCar";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./features/auth/authSlice";
import EditCar from "./pages/Car/EditCar";
import CarDetails from "./components/carDetails";
import AllCars from "./pages/dashboard/AdminDashboard/Cars/AllCars";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Dashboard */}
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Car Owner Dashboard */}
        <Route
          path="/dashboard/owner"
          element={
            <ProtectedRoute allowedRoles={["carOwner"]}>
              <CarOwnerDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="overview" element={<COOverview />} />
          <Route path="my-cars" element={<MyCars />} />
          <Route path="createCar" element={<AddCar />} />
          <Route path="update-car/:id" element={<EditCar />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="messages" element={<Messages />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="notifications" element={<NotificationsCO />} />
          <Route path="profile" element={<Profile />} />
          <Route path="support" element={<SupportCO />} />
        </Route>

        {/* Admin Dashboard */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          {/* Overview */}
          <Route path="overview" element={<Overview />} />

          {/* User Management */}
          <Route path="users" element={<AllUsers />} />
          <Route path="users/banned" element={<BannedUsers />} />

          {/* Car Management */}
          <Route path="cars/AllCars" element={<AllCars />} />
          {/* <Route path="cars/pending" element={<PendingCars />} />
          <Route path="cars/approved" element={<ApprovedCars />} />
          <Route path="cars/rejected" element={<RejectedCars />} /> */}
      
          <Route path="cars/edit" element={<EditCar />} />
          {/* Bookings Management */}
          <Route path="bookings" element={<AllBookings />} />
          <Route path="bookings/fraud" element={<FraudulentBookings />} />

          {/* Earnings */}
          <Route path="earnings/platform" element={<PlatformEarnings />} />
          <Route path="earnings/payouts" element={<CarOwnerPayouts />} />
          <Route path="earnings/refunds" element={<Refunds />} />

          {/* Car Owner Requests */}
          <Route path="requests" element={<OwnerRequests />} />
          <Route path="requests/review" element={<ReviewOwnerProfile />} />

          {/* Reports */}
          <Route path="reports/earnings" element={<EarningsReport />} />
          <Route path="reports/activity" element={<UserActivity />} />
          <Route path="reports/bookings" element={<BookingTrends />} />

          {/* Reviews */}
          <Route path="reviews" element={<AllReviews />} />

          {/* Notifications */}
          <Route path="notifications" element={<Notifications />} />

          {/* Support */}
          <Route path="support" element={<Support />} />

          {/* CMS */}
          <Route path="cms/terms" element={<TermsConditions />} />
          <Route path="cms/banner" element={<HomeBanner />} />

          {/* Settings */}
          <Route path="settings/general" element={<GeneralSettings />} />
          <Route path="settings/roles" element={<RolePermissions />} />
          <Route path="settings/payments" element={<PaymentSettings />} />
        </Route>

        {/* Car Routes */}
        <Route path="/cars" element={<CarList />} />
        <Route path="/createCar" element={<CreateCar />} />
        <Route path="/car/:id" element={<CarDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
