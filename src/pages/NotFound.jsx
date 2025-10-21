import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiArrowLeftCircle } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] text-[#F8FAFC] px-6">
      {/* Glowing Background Circle */}
      <div className="absolute w-[500px] h-[500px] bg-[#F9C74F]/10 rounded-full blur-3xl animate-pulse"></div>

      {/* 404 Text */}
      <h1 className="text-[120px] md:text-[160px] font-bold bg-gradient-to-r from-[#F9C74F] to-[#F9844A] bg-clip-text text-transparent drop-shadow-lg">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl md:text-3xl font-['Playfair_Display',serif] font-bold mt-4">
        Oops! Page Not Found
      </h2>

      <p className="text-[#F8FAFC]/70 mt-3 max-w-md text-center">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-semibold hover:scale-105 transition-transform shadow-lg"
        >
          <FiHome className="text-lg" />
          Go to Dashboard
        </Link>

        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#F8FAFC]/20 text-[#F8FAFC]/80 hover:text-[#F9C74F] hover:border-[#F9C74F]/40 transition-all cursor-pointer"
        >
          <FiArrowLeftCircle className="text-lg" />
          Go Back
        </button>
      </div>

      
    </div>
  );
};

export default NotFound;
