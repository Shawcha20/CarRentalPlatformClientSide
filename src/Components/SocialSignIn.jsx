import React from "react";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function SocialSignIn() {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleLogin()
      .then(() => navigate(from, { replace: true }))
      .catch((error) => alert(error));
  };

  return (
    <div className="w-full mt-4">
      <div className="divider text-gray-500">OR</div>
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline btn-success w-full flex items-center justify-center gap-2"
      >
        <FaGoogle className="text-lg" />
        Continue with Google
      </button>
    </div>
  );
}
