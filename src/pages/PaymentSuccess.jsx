import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import { verify_payment_end } from "../api/urls";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) return;

      try {
        const res = await axiosInstance.get(`${verify_payment_end}?session_id=${sessionId}`);

        if (res.data?.data) {
          setVerified(true);
          toast.success("Payment verified successfully!");
          setTimeout(() => navigate("/"), 7000);
        } else {
          toast.warning("Payment verified, but no subscription data found!");
        }
      } catch (err) {
        console.error("Payment verification error:", err);
        toast.error(err.response?.data?.message || "Payment verification failed!");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] text-white">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <p className="text-lg font-semibold mb-2">Verifying your payment...</p>
          <p className="text-sm opacity-70">Please wait a moment</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/10 border border-[#F9C74F]/20 rounded-3xl p-10 text-center shadow-xl max-w-md w-full backdrop-blur-md"
      >
        {verified ? (
          <>
            <motion.div
              initial={{ rotate: -45, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-6"
            >
              <CheckCircle size={100} className="text-green-500 mx-auto" />
            </motion.div>

            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-[#F8FAFC] mb-3"
            >
              Payment Successful 🎉
            </motion.h1>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-[#F8FAFC]/70 mb-4 text-sm"
            >
              Your subscription has been activated successfully.
            </motion.p>

            <p className="text-[#F9C74F]/70 text-xs mb-6">
              Redirecting to Dashboard in 7 seconds...
            </p>

            {sessionId && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-[#F9C74F]/80 text-xs font-mono mb-6"
              >
                Session ID: {sessionId}
              </motion.p>
            )}
          </>
        ) : (
          <>
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl font-bold text-red-400 mb-3"
            >
              Payment Failed ❌
            </motion.h1>
            <p className="text-white/70 mb-6 text-sm">
              We couldn't verify your payment. Please contact support.
            </p>
          </>
        )}

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
        >
          <Link
            to="/"
            className="px-8 py-3 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-semibold rounded-xl shadow-lg hover:shadow-[#F9C74F]/40 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Go to Dashboard
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 0.5 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#F9C74F,transparent_70%)]"
      ></motion.div>
    </div>
  );
};

export default PaymentSuccess;
