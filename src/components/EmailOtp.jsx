import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { verifyEmail } from "../queryFunction/queryFunction";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { toast } from "react-toastify";

const OtpVerificationModal = ({ isOpen, onClose, userId }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [success, setSuccess] = useState(false);

  // ✅ OTP Input Handling
  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  // ✅ Mutation (API Call)
  const { mutate, isLoading } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      console.log("✅ OTP Success Response:", data);

      // Check for actual success keys from backend
      if (
        data?.success === true ||
        data?.status === 200 ||
        data?.message?.toLowerCase().includes("verified")
      ) {
        setSuccess(true);
        toast.success("OTP Verified Successfully 🎉", { theme: "colored" });

        // 🕒 2-second success animation, then redirect
        setTimeout(() => {
          setSuccess(false);
          onClose();
          navigate("/login");
        }, 2000);
      } else {
        toast.error(data?.message || "Invalid OTP. Please try again.", {
          theme: "colored",
        });
      }
    },
    onError: (error) => {
      console.log("❌ OTP Error:", error);
      toast.error(
        error?.response?.data?.message ||
          "Invalid OTP or Server Error. Please try again.",
        { theme: "colored" }
      );
    },
  });

  // ✅ OTP Verify button
  const handleVerify = () => {
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP code.", { theme: "colored" });
      return;
    }

    mutate({ userId, otp: parseInt(code, 10) });
  };

  if (!isOpen) return null;

  // ✅ UI Section
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <AnimatePresence>
        {success ? (
          <motion.div
            key="success"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="bg-[#0B1F3A] text-white p-8 rounded-2xl w-[90%] max-w-sm shadow-2xl text-center"
          >
            <FiCheckCircle className="text-green-400 mx-auto text-6xl mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-[#F8FAFC]">Verified!</h3>
            <p className="text-[#F8FAFC]/70 mt-2">
              Your account has been successfully verified.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="otp"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="bg-[#0B1F3A] text-white p-8 rounded-2xl w-[90%] max-w-sm shadow-2xl text-center"
          >
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <div className="bg-[#F9C74F] w-10 h-10 rounded-lg flex items-center justify-center text-[#0B1F3A] font-bold text-xl">
                  P
                </div>
                <h2 className="text-lg font-semibold mt-2 text-[#F8FAFC]/80">
                  Placerly
                </h2>
              </div>

              <h3 className="text-2xl font-bold mb-2 text-[#F8FAFC]">
                Verify Your Identity
              </h3>
              <p className="text-[#F8FAFC]/70 mb-6 text-sm">
                A 6-digit code has been sent to your registered email or phone.
              </p>

              <div className="flex justify-center gap-3 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    className="w-10 h-12 text-center rounded-md bg-[#08101D] border border-[#F8FAFC]/20 text-lg focus:ring-2 focus:ring-[#F9C74F] focus:border-transparent outline-none transition-all duration-200"
                  />
                ))}
              </div>

              <button
                onClick={handleVerify}
                disabled={isLoading}
                className="w-full bg-[#F9C74F] hover:bg-[#F9844A] text-[#0B1F3A] font-semibold py-3 rounded-lg transition duration-300 shadow-lg disabled:opacity-70"
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>

              <p className="text-sm text-[#F8FAFC]/60 mt-4">
                Didn’t receive the code?{" "}
                <button className="text-[#F9C74F] hover:text-[#F9844A]">
                  Resend
                </button>
              </p>

              <button
                onClick={onClose}
                className="text-sm text-[#F8FAFC]/50 hover:text-[#F9C74F] mt-6"
              >
                ← Back to Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OtpVerificationModal;
