import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const WealthSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <motion.div
        className="relative w-24 h-24"
        animate={{ rotate: 360 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      >

        <motion.div
          className="absolute inset-0 rounded-full border-4"
          style={{
            borderColor: "#FFD700",
            boxShadow: "0 0 25px #FFD70070",
            borderTopColor: "transparent",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

  
        <motion.div
          className="absolute inset-3 rounded-full border-4"
          style={{
            borderColor: "#FACC15",
            borderBottomColor: "transparent",
            boxShadow: "0 0 30px #FACC1570 inset",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />


        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.3, repeat: Infinity }}
        >
          <TrendingUp
            size={38}
            strokeWidth={2.5}
            style={{
              color: "#FFD700",
              filter: "drop-shadow(0 0 10px #FFD700)",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WealthSpinner;
