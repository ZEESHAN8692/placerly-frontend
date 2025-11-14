
import React, { useEffect, useState } from "react";


import { motion } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import { executer_invite_end } from "../api/urls";
import Header from "../layout/Header";
import Footer from "../layout/footer";
import { useNavigate, useParams } from "react-router-dom";

const InvitePage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [executorData, setExecutorData] = useState(null);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    const validateInvite = async () => {
      try {
        const res = await axiosInstance.post(executer_invite_end, {
          action: "validate",
          token,
        });

        setExecutorData(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to validate invitation."
        );
      } finally {
        setLoading(false);
      }
    };

    validateInvite();
  }, [token]);

  const handleAction = async (action) => {
    setActionLoading(true);
    try {
      const res = await axiosInstance.post(executer_invite_end, {
        action,
        token,
      });

      setExecutorData({
        ...executorData,
        statusMessage: res.data.message,
        final: true,
      });

      if (action === "accept") {
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
    setActionLoading(false);
  };

  return (
    <>
      <Header />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] px-4 py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl w-full bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl backdrop-blur-lg"
        >
          {/* Loading */}
          {loading && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white text-xl"
            >
              Validating invite...
            </motion.h2>
          )}

          {/* Error */}
          {!loading && error && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <h2 className="text-red-400 text-xl font-semibold">{error}</h2>
            </motion.div>
          )}

          {/* Content */}
          {!loading && executorData && !error && (
            <>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
              >
                <h1 className="text-4xl font-bold text-white mb-2">
                  Executor Invitation
                </h1>
                <p className="text-[#F9C74F] text-lg">
                  Estate Owner: {executorData.ownerName}
                </p>
                <p className="text-white/70">
                  You have been invited as executor for this estate.
                </p>
              </motion.div>

              {/* When user accepts/rejects */}
              {executorData.final ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <p className="text-[#F9C74F] text-xl font-semibold">
                    {executorData.statusMessage}
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Executor Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-3 mb-8"
                  >
                    <p className="text-white">
                      <span className="text-[#F9C74F] font-semibold">
                        Executor Name:
                      </span>{" "}
                      {executorData.executorName}
                    </p>
                    <p className="text-white">
                      <span className="text-[#F9C74F] font-semibold">Email:</span>{" "}
                      {executorData.email}
                    </p>
                  </motion.div>

                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-6 mt-6"
                  >
                    <motion.button
                      whileTap={{ scale: 0.93 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleAction("accept")}
                      disabled={actionLoading}
                      className="px-6 py-3 rounded-xl text-white font-semibold bg-[#0BA34E] hover:bg-[#0C8E44] transition-all shadow-lg"
                    >
                      {actionLoading ? "Processing..." : "Accept Invitation"}
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.93 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleAction("reject")}
                      disabled={actionLoading}
                      className="px-6 py-3 rounded-xl text-white font-semibold bg-red-600 hover:bg-red-700 transition-all shadow-lg"
                    >
                      Reject
                    </motion.button>
                  </motion.div>
                </>
              )}
            </>
          )}
        </motion.div>
      </motion.div>

      <Footer />
    </>
  );
};

export default InvitePage;
