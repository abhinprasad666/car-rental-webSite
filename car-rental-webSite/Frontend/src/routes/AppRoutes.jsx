import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/authpages/signup/Signup";
import AuthLayout from "../layouts/authLayout/AuthLayout";
import NotFound from "../pages/notfound/NotFound";
import Login from "../pages/authpages/login/Login";
import MainLayout from "../layouts/userLayout/MainLayout";
import Homepage from "../pages/homepage/Homepage";
import CarDetails from "../pages/userPages/CarDetailsPage/CarDetails";
import CustomerProfile from "../pages/userPages/CustomerProfile/CustomerProfile";
import AvailableCars from "../components/user/AvailableCars/AvailableCars";
import PaymentSuccess from "../components/user/payment/PaymentSuccess";
import PaymentFailed from "../components/user/payment/PaymentFailed";
import ConfirmBooking from "../components/user/booking/ConfirmBooking";
import BookingHistory from "../pages/userPages/CustomerProfile/BookingHistory";
import ProtectedRoute from "./ProtectedRoute";
import AdminLogin from "../pages/authpages/admin/adminLogin";
import AdminLayout from "../layouts/adminLayout/AdminLayout";
import Dashboard from "../pages/adminpages/Dashboard/Dashboard";
import AddCar from "../pages/adminpages/Add Car/AddCar";
import ManageCars from "../pages/adminpages/Manage Bookings/ManageCars";
import ManageBookings from "../pages/adminpages/Manage Cars/ManageBookings";
import ManageUsers from "../pages/adminpages/ManageUsers/ManageUsers";
import UpdateCar from "../pages/adminpages/UpdateCar/UpdateCar";


// ─── Router Setup ─────────────────────────────────────────────────────────
const router = createBrowserRouter([
  // ─── Public & Main User Routes ─────────────────────────────
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Homepage /> },
     
         // ─── Protected Routes for Logged-in Users ──────────────
 {
        element: <ProtectedRoute />,
        children: [
          { path: "car/availabile", element: <AvailableCars/> },
       { path: "user/profile", element: <CustomerProfile/> },
        { path: "car/:id", element: <CarDetails/> },
       { path: "confirm-booking", element: <ConfirmBooking /> },
       { path:"/booking-history" ,element:<BookingHistory />}
        
        ],
      },
      
    ],
  },
  // ─── Admin Routes ──────────────────────────────────────────
{
    path: "/admin",
    children: [
      { path: "login", element: <AdminLogin /> },
      {
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "add-car", element: <AddCar /> },
          { path: "manage-cars", element: <ManageCars /> },
          { path: "manage-bookings", element: <ManageBookings /> },
             { path: "manage-users", element: <ManageUsers /> },
               { path: "edit-car/:id", element: <UpdateCar/>},
          
        ],
      },
    ],
  },

  
  // ─── Auth Routes ────────────────────────────────────────────
  {
    path: "/singup",
    element: <AuthLayout />,
    children: [{ path: "", element: <Signup/> }],
  },
    {
    path: "/login",
    element: <AuthLayout />,
    children: [{ path: "", element: <Login/> }],
  },
  //    {
  //   path: "/admin/login",
  //   element: <AuthLayout />,
  //   children: [{ path: "", element: <AdminLogin/> }],
  // },

  
 
    // ─── Payment Result Pages ──────────────────────────────────
  { path: "/payment/success", element: <PaymentSuccess /> },
  { path: "/payment/failure", element: <PaymentFailed /> },

  // ─── Fallback: 404 Not Found ───────────────────────────────
  { path: "*", element: <NotFound/> },
]);

export default router;