import React from "react";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/10 border border-red-500/20 rounded-3xl p-10 text-center shadow-xl max-w-md w-full backdrop-blur-md"
      >
        <motion.div
          initial={{ rotate: 45, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6"
        >
          <XCircle size={100} className="text-red-500 mx-auto" />
        </motion.div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-[#F8FAFC] mb-3"
        >
          Payment Failed ❌
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-[#F8FAFC]/70 mb-6 text-sm"
        >
          Oops! Something went wrong while processing your payment.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to="/pricing"
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-red-600/40 hover:scale-105 transition-all duration-300"
          >
            Try Again
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 0.5 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#ff0000,transparent_70%)]"
      ></motion.div>
    </div>
  );
};

export default PaymentFailed;
