// src/auth/ProtectedSubscription.js
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { profile_end } from "../api/urls";

const ProtectedSubscription = () => {
  const token = sessionStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isExecutor, setIsExecutor] = useState(false);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const checkAccess = async () => {
      try {
        const res = await axiosInstance.get(profile_end);

        const userRole = res?.data?.role;
        const subscriptionStatus = res?.data?.subscription?.status;

        // Role check
        if (userRole === "executor") {
          setIsExecutor(true);
        }

        // Subscription check
        setIsSubscribed(subscriptionStatus === "active");
      } catch (error) {
        console.log("Access Check Error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [token]);

  if (loading) return <div className="text-white">Checking Access...</div>;
  if (!token) return <Navigate to="/login" />;
  if (isExecutor) return <Outlet />;
  if (!isSubscribed) return <Navigate to="/pricing" />;
  return <Outlet />;
};

export default ProtectedSubscription;
