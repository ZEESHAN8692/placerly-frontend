import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const TermsAndConditions = () => {
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
          Terms & <span className="text-[#F9C74F]">Conditions</span>
        </h1>
        <p className="text-[#F8FAFC]/70 max-w-2xl mx-auto text-lg">
          Please read these terms carefully before using our website and services.
        </p>
      </section>

      {/* Content */}
      <section className="px-6 md:px-20 pb-24">
        <div className="max-w-5xl mx-auto space-y-12 text-[#F1F5F9]">

          {/* 1 */}
          <div>
            <h2 className="text-3xl font-['Playfair_Display',serif] text-[#F9C74F] mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-[#F8FAFC]/70 leading-relaxed">
              By accessing or using our website, services, or products, you agree to be bound
              by these Terms and Conditions. If you do not agree with any part of these terms,
              you must discontinue the use of our services immediately.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-3xl font-['Playfair_Display',serif] text-[#F9C74F] mb-3">
              2. Eligibility
            </h2>
            <p className="text-[#F8FAFC]/70 leading-relaxed">
              You must be at least 18 years old to access or use our platform. By using our
              services, you confirm that you meet this eligibility requirement.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-3xl font-['Playfair_Display',serif] text-[#F9C74F] mb-3">
              3. Account Responsibilities
            </h2>
            <ul className="list-disc ml-5 text-[#F8FAFC]/70 leading-relaxed space-y-2">
              <li>You are responsible for maintaining the confidentiality of your account.</li>
              <li>You are responsible for all activities conducted under your account.</li>
              <li>You must notify us immediately of any unauthorized access.</li>
              <li>You agree to provide accurate and updated information during registration.</li>
            </ul>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-3xl font-['Playfair_Display',serif] text-[#F9C74F] mb-3">
              4. Use of Services
            </h2>
            <p className="text-[#F8FAFC]/70 leading-relaxed">
              You agree not to misuse our services, including but not limited to:
            </p>
            <ul className="list-disc ml-5 text-[#F8FAFC]/70 leading-relaxed space-y-2">
              <li>Engaging in fraudulent or illegal activities.</li>
              <li>Uploading harmful or malicious content.</li>
              <li>Attempting to hack, disrupt, or damage our systems.</li>
            </ul>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-3xl font-['Playfair_Display',serif] text-[#F9C74F] mb-3">
              5. Payments & Subscriptions
            </h2>
            <p className="text-[#F8FAFC]/70 leading-relaxed">
              If you purchase any paid service or subscription:
            </p>
            <ul className="list-disc ml-5 text-[#F8FAFC]/70 leading-relaxed space-y-2">
              <li>All payments are processed securely via trusted third-party gateways.</li>
              <li>Subscription fees are non-refundable unless stated otherwise.</li>
              <li>Cancellation will take effect at the end of the current billing cycle.</li>
            </ul>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-3xl font-['Playfair_Display',serif] text-[#F9C74F] mb-3">
              6. Intellectual Property Rights
            </h2>
            <p className="text-[#F8FAFC]/70 leading-relaxed">
              All content on this website—including text, graphics, logos, designs, and software—
              is the property of Placerly or its licensors. Unauthorized reproduction,
              distribution, or modification is strictly prohibited.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-3xl font-['Playfair_Display',serif] text-[#F9C74F] mb-3">
              7. Limitation of Liability
            </h2>
            <p className="text-[#F8FAFC]/70 leading-relaxed">
              We are not responsible for any direct, indirect, incidental, or consequential
              damages resulting from the use or inability to use our services. All financial or
              investment decisions made using our platform are your sole responsibility.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-3xl font-['Playfair_Display',serif] text-[#F9C74F] mb-3">
              8. Termination
            </h2>
            <p className="text-[#F8FAFC]/70 leading-relaxed">
              We reserve the right to suspend or terminate your account at any time for violations
              of these terms or for any activity that may be harmful to other users or the platform.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-3xl font-['Playfair_Display',serif] text-[#F9C74F] mb-3">
              9. Changes to Terms
            </h2>
            <p className="text-[#F8FAFC]/70 leading-relaxed">
              We may update or modify these Terms & Conditions at any time. Continued use of our
              platform after changes implies acceptance of the updated terms.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="text-3xl font-['Playfair_Display',serif] text-[#F9C74F] mb-3">
              10. Contact Us
            </h2>
            <p className="text-[#F8FAFC]/70 leading-relaxed">
              For any questions or concerns regarding these Terms & Conditions, please contact us:
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

export default TermsAndConditions;
