import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Addcar from "./Pages/Addcar";
import ProtectedRoute from "./Components/ProtectedRoute";
import Mylisting from "./Pages/Mylisting";
import Mybookings from "./Pages/Mybookings";
import BrowseCar from "./Pages/BrowseCar";
import CarDetails from "./Pages/CarDetails";
import EditForm from "./Pages/EditForm";
import ErrorPage from "./Pages/ErrorPage";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement:<ErrorPage/>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path:"dashboard",
        element:<ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>
      },
      {
        path:"profile",
        element:<ProtectedRoute><Profile></Profile></ProtectedRoute>
      },
      {
        path:"add-car",
        element:<ProtectedRoute><Addcar></Addcar></ProtectedRoute>
      },
    {
      path:"my-listings",
      element:<ProtectedRoute><Mylisting/></ProtectedRoute>
    },
    {
      path:"my-bookings",
      element:<ProtectedRoute><Mybookings></Mybookings></ProtectedRoute>
    },
    {
      path:"browse-cars",
      element:<BrowseCar></BrowseCar>
    },
    {
      path:"car-details/:id",
      element:<CarDetails></CarDetails>
    },
    {
      path:"/car-edit/:id",
      element:<ProtectedRoute><EditForm></EditForm></ProtectedRoute>
    }
    ],
  },
  {
    path:"/errorpage",
    element:<ProtectedRoute><ErrorPage></ErrorPage></ProtectedRoute>
  },
  {
    path: "login",
    Component: Login,
  },
  {
    path: "register",
    Component: SignUp,
  },
]);
