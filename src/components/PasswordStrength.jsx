// components/PasswordStrength.js
import React from 'react';

const PasswordStrength = ({ strength }) => {
  const getStrengthClass = () => {
    switch (strength) {
      case 'weak':
        return 'weak';
      case 'medium':
        return 'medium';
      case 'strong':
        return 'strong';
      default:
        return 'weak';
    }
  };

  return (
    <div className="mt-2 password-strength-meter">
      <div className={`strength-bar ${getStrengthClass()}`}></div>
    </div>
  );
};

export default PasswordStrength;