// src/auth/ProtectedSubscription.js
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import axiosInstance from "../api/axiosInstance";
import { profile_end } from "../api/urls";

const ProtectedSubscription = () => {
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const checkSubscription = async () => {
      try {
        const res = await axiosInstance.get(profile_end);

        console.log("Subscription Status:", res.data.subscription?.status);

        setIsSubscribed(res.data.subscription?.status === "active");
      } catch (error) {
        console.log("Subscription check error:", error);
      } finally {
        setLoading(false);   // <<--- MOST IMPORTANT
      }
    };

    checkSubscription();
  }, [token]);

  if (loading) return <div className="text-white">Checking Subscription...</div>;

  if (!token) return <Navigate to="/login" />;

  if (!isSubscribed) return <Navigate to="/pricing" />;

  return <Outlet />;
};

export default ProtectedSubscription;
