import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { showSuccess } from "../utils/notifications";

export default function Login() {
  const { UserLogin, googleLogin } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState({ email: "", password: "", general: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({ email: "", password: "", general: "" });
    const { email, password } = form;

    if (!email || !password) {
      setError({
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      });
      return;
    }

    UserLogin(email, password)
      .then(() => {
        toast.success("Welcome back! Drive safely 🚘");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        if (err.message.includes("auth/user-not-found")) {
          setError({ ...error, general: "User not found. Please sign up first." });
        } else if (err.message.includes("auth/wrong-password")) {
          setError({ ...error, general: "Incorrect password. Try again." });
        } else {
          setError({ ...error, general: err.message });
        }
      });
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      console.log("button clicked")
    showSuccess("Signed in with Google 🚗")
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Google sign-in failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 relative overflow-hidden ">
      {/* Background car image overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-2xl relative z-10"
      >
        {/* Logo */}
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
          RentWheels
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Login to continue your journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="input input-bordered w-full bg-black/40 text-gray-100 border-gray-600 focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            {error.email && (
              <p className="text-red-400 text-sm mt-1">{error.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="input input-bordered w-full bg-black/40 text-gray-100 border-gray-600 focus:ring-2 focus:ring-blue-500 pr-10 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 text-gray-400 hover:text-blue-400"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error.password && (
              <p className="text-red-400 text-sm mt-1">{error.password}</p>
            )}
          </div>

          {error.general && (
            <p className="text-red-400 text-center text-sm">{error.general}</p>
          )}

          {/* Buttons */}
          <div className="flex justify-between items-center text-sm mt-6">
            <Link
              to="/forgot-password"
              className="text-blue-400 hover:underline"
            >
              Forgot Password?
            </Link>
            <button className="btn bg-gradient-to-r from-blue-500 to-cyan-400 border-none text-white hover:opacity-90 px-6">
              Login
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="divider text-gray-400 mt-6">OR</div>

        {/* Google Sign-in */}
        <button
          onClick={handleGoogle}
          className="btn btn-outline border-gray-600 text-gray-200 hover:bg-white/10 w-full flex items-center justify-center gap-2"
        >
          <FcGoogle size={20} /> Continue with Google
        </button>

        {/* Register Link */}
        <p className="text-center text-sm mt-6 text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:underline font-semibold"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
