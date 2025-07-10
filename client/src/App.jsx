import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CarList from "./pages/Car/CarList";
import CreateCar from "./pages/Car/CreateCar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import CarOwnerDashboard from "./pages/dashboard/CarOwnerDashboard/CarOwnerDashboard";
import UserDashboard from "./pages/dashboard/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// CarOwner
import Overview from "./pages/dashboard/CarOwnerDashboard/overview";
import MyCars from "./pages/dashboard/CarOwnerDashboard/Mycars";

import Bookings from "./pages/dashboard/CarOwnerDashboard/Bookings";
import Earnings from "./pages/dashboard/CarOwnerDashboard/Earnings";
import Messages from "./pages/dashboard/CarOwnerDashboard/Messages";
import Reviews from "./pages/dashboard/CarOwnerDashboard/Reviews";
import Profile from "./pages/dashboard/CarOwnerDashboard/Profile";
import Notifications from "./pages/dashboard/CarOwnerDashboard/Notifications";
import Support from "./pages/dashboard/CarOwnerDashboard/Support";
import AddCar from "./pages/dashboard/CarOwnerDashboard/AddCar";
function App() {
  
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/dashboard/owner"
          element={
            <ProtectedRoute allowedRoles={["carOwner"]}>
              <CarOwnerDashboard />
            </ProtectedRoute>
          }
        /> */}

 {/* Car Owner Dashboard with Nested Routes */}
        <Route
          path="/dashboard/owner"
          element={
            <ProtectedRoute allowedRoles={["carOwner"]}>
              <CarOwnerDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="overview" element={<Overview />} />
          <Route path="my-cars" element={<MyCars />} />
          <Route path="createCar" element={<AddCar />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="messages" element={<Messages />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="support" element={<Support />} />
        </Route>
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="createCar" element={<CreateCar />} />
         {/* <Route path="/dashboard/owner/overview" element={<Overview />} />
          <Route path="/dashboard/owner/my-cars" element={<MyCars />} />
          <Route path="/dashboard/owner/createCar" element={<AddCar />} />
          <Route path="/dashboard/owner/bookings" element={<Bookings />} />
          <Route path="/dashboard/owner/earnings" element={<Earnings />} />
          <Route path="/dashboard/owner/messages" element={<Messages />} />
          <Route path="/dashboard/owner/reviews" element={<Reviews />} />
          <Route path="/dashboard/owner/notifications" element={<Notifications />} />
          <Route path="/dashboard/owner/profile" element={<Profile />} />
          <Route path="/dashboard/owner/support" element={<Support />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
