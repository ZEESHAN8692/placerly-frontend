import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const PrivacyPolicy = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] min-h-screen text-[#F8FAFC]">
      <Header />

      {/* Hero Section */}
      <section
        className={`relative text-center px-6 py-28 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-[#F9C74F]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F9844A]/10 rounded-full blur-3xl animate-pulse delay-300"></div>
        </div>

        <h1 className="text-5xl md:text-7xl font-['Playfair_Display',serif] font-bold mb-6">
          Privacy <span className="text-[#F9C74F]">Policy</span>
        </h1>
        <p className="text-[#F8FAFC]/70 max-w-2xl mx-auto text-lg">
          Your privacy is important to us. Please read how we collect, store, and protect your data.
        </p>
      </section>

      {/* Content Section */}
      <section className="px-6 md:px-20 pb-24">
        <div className="max-w-5xl mx-auto space-y-12 text-[#F1F5F9]">

          {/* 1 */}
          <div>
            <h2 className="text-3xl font-['Playfair_Display',serif] text-[#F9C74F] mb-3">
              1. Introduction
            </h2>
            <p className="text-[#F8FAFC]/70 leading-relaxed">
              This Privacy Policy explains how we collect, use, and protect your personal
              information when you use our website, products, and services. By accessing our
              platform, you agree to the practices described in this policy.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-3xl font-['Playfair_Display',serif] text-[#F9C74F] mb-3">
              2. Information We Collect
            </h2>
            <ul className="space-y-2 text-[#F8FAFC]/70 list-disc ml-5 leading-relaxed">
              <li>Personal information such as name, email, and contact number.</li>
              <li>Account-related details when you sign up or log in.</li>
              <li>Payment information (securely processed via third-party providers).</li>
              <li>Device and usage information such as IP address, browser type, etc.</li>
              <li>Data provided voluntarily such as comments, support requests, or uploads.</li>
            </ul>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-3xl font-['Playfair_Display',serif] text-[#F9C74F] mb-3">
              3. How We Use Your Information
            </h2>
            <ul className="space-y-2 text-[#F8FAFC]/70 list-disc ml-5 leading-relaxed">
              <li>To provide and improve our services.</li>
              <li>To personalize your user experience.</li>
              <li>To send important notifications and updates.</li>
              <li>For analytics, security, and fraud prevention.</li>
              <li>For customer support and service enhancement.</li>
            </ul>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-3xl font-['Playfair_Display',serif] text-[#F9C74F] mb-3">
              4. Sharing of Information
            </h2>
            <p className="text-[#F8FAFC]/70 leading-relaxed">
              We do not sell your personal data. However, we may share information with:
            </p>
            <ul className="space-y-2 text-[#F8FAFC]/70 list-disc ml-5 leading-relaxed">
              <li>Trusted third-party service providers.</li>
              <li>Payment processing companies.</li>
              <li>Law enforcement agencies if required by law.</li>
            </ul>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-3xl font-['Playfair_Display',serif] text-[#F9C74F] mb-3">
              5. Cookies & Tracking Technologies
            </h2>
            <p className="text-[#F8FAFC]/70 leading-relaxed">
              We use cookies to improve your browsing experience, analyze traffic, and deliver
              personalized content. You may disable cookies through your browser settings.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-3xl font-['Playfair_Display',serif] text-[#F9C74F] mb-3">
              6. Data Security
            </h2>
            <p className="text-[#F8FAFC]/70 leading-relaxed">
              Your data is protected with bank-level encryption and security measures. However, no
              system is 100% secure, and we recommend using a strong password and keeping your
              account safe.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-3xl font-['Playfair_Display',serif] text-[#F9C74F] mb-3">
              7. Your Rights
            </h2>
            <ul className="space-y-2 text-[#F8FAFC]/70 list-disc ml-5 leading-relaxed">
              <li>Right to access your data.</li>
              <li>Right to request deletion or correction of information.</li>
              <li>Right to withdraw consent at any time.</li>
            </ul>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-3xl font-['Playfair_Display',serif] text-[#F9C74F] mb-3">
              8. Changes to This Policy
            </h2>
            <p className="text-[#F8FAFC]/70 leading-relaxed">
              We may update this Privacy Policy from time to time. The updated version will be
              posted on this page with a revised “Last Updated” date.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-3xl font-['Playfair_Display',serif] text-[#F9C74F] mb-3">
              9. Contact Us
            </h2>
            <p className="text-[#F8FAFC]/70 leading-relaxed">
              If you have any questions regarding this Privacy Policy, please contact us at:
              <br />
              <span className="text-[#F9C74F] font-semibold">
                support@placerly.com
              </span>
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
