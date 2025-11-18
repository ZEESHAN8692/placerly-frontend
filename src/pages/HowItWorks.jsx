import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate =useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const steps = [
    {
      icon: "🔗",
      title: "Connect Your Accounts",
      desc: "Securely link all your bank, investment, and financial accounts with world-class encryption.",
    },
    {
      icon: "💡",
      title: "Get Personalized Insights",
      desc: "AI studies your finances and provides smart, personalized strategies to grow your wealth.",
    },
    {
      icon: "📈",
      title: "Track Your Growth",
      desc: "Monitor investments and net worth with our intelligent dashboards and real-time analytics.",
    },
    {
      icon: "🎯",
      title: "Set Goals",
      desc: "Create custom financial goals and let our smart planner guide you to achieve them.",
    },
    {
      icon: "🛡️",
      title: "Stay Protected",
      desc: "We ensure bank-level security so your wealth and data always stay fully protected.",
    },
    {
      icon: "🚀",
      title: "Grow With Confidence",
      desc: "Make smarter decisions and grow faster with expert tools, insights, and automations.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] text-[#F8FAFC] ">
      <Header />

      <section
        className={`relative flex flex-col justify-center items-center min-h-[70vh] px-6 text-center transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#F9C74F]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F9844A]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#43AA8B]/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-['Playfair_Display',serif] font-black leading-tight mb-6">
            How <span className="text-[#F9C74F]">Placerly</span> Works
          </h1>
          <p className="text-[#F8FAFC]/70 text-xl max-w-2xl mx-auto">
            Understand the powerful workflow that transforms your financial future — step by step.
          </p>
        </div>
      </section>


      <section className="px-6 md:px-20 ">
        <h2 className="text-center text-5xl font-['Playfair_Display',serif] font-bold mb-16">
          Simple Steps, <span className="text-[#F9C74F]">Powerful Results</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl border border-[#F8FAFC]/10 bg-gradient-to-b from-[#0B1F3A] to-[#08101D] text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#F9C74F]/20 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <div className="w-12 h-1 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] mx-auto rounded-full mb-4"></div>

              <h3 className="text-2xl font-['Playfair_Display',serif] font-semibold mb-3 group-hover:text-[#F9C74F] transition-all">
                {step.title}
              </h3>
              <p className="text-[#F8FAFC]/70 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-20 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#F9C74F]/10 to-[#F9844A]/10 border border-[#F9C74F]/20 rounded-3xl p-12 backdrop-blur-sm">
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display',serif] font-bold mb-6">
              Ready to See <span className="text-[#F9C74F]">Placerly</span> in Action?
            </h2>
            <p className="text-[#F8FAFC]/70 text-lg mb-8">
              Explore the platform and discover how easily you can grow your wealth.
            </p>

            <div className="flex justify-center gap-4">
              <button className="cursor-pointer h-14 px-8 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold text-lg rounded-xl hover:scale-105 transition-all"
               onClick={() => navigate("/pricing")}
              >
                Get Started
              </button>
              <button className=" cursor-pointer  h-14 px-8 border border-[#F8FAFC]/30 text-[#F8FAFC] font-bold text-lg rounded-xl hover:bg-white/10 hover:scale-105 transition-all"
               onClick={() => navigate("/pricing")}
              >
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
