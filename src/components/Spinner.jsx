import React from 'react';
import { motion } from 'framer-motion';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <motion.div
        className="relative w-16 h-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Main rotating ring */}
        <motion.div
          className="absolute inset-0 border-4 border-gold-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Secondary ring with delay */}
        <motion.div
          className="absolute inset-2 border-4 border-gold-300 border-b-transparent rounded-full"
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
            delay: 0.2
          }}
        />
        
        {/* Pulsing dot */}
        <motion.div
          className="absolute top-0 left-1/2 w-2 h-2 bg-gold-400 rounded-full transform -translate-x-1/2 -translate-y-1"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

// Alternative minimalist version
export const MinimalSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="w-8 h-8 border-3 border-gold-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

// Loading text with spinner
export const LoadingSpinnerWithText = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        className="relative w-12 h-12"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div
          className="absolute inset-0 border-3 border-gold-500 border-r-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute inset-1 border-2 border-gold-300 border-l-transparent rounded-full"
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
      
      <motion.p 
        className="text-gold-600 font-medium text-sm"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </div>
  );
};

// Elegant dot wave spinner
export const DotWaveSpinner = () => {
  const dots = [0, 1, 2, 3];
  
  return (
    <div className="flex space-x-1 items-center justify-center">
      {dots.map((dot) => (
        <motion.div
          key={dot}
          className="w-2 h-2 bg-gold-500 rounded-full"
          animate={{
            y: ["0%", "-50%", "0%"],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: dot * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default Spinner;