import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";


const AboutUs = () => {
  const aboutData = {
    title: "Empowering Smart Financial Growth",
    descriptionOne:
      "At Placerly, we believe in building wealth through knowledge and strategy.",
    descriptionTwo:
      "Our mission is to simplify complex financial concepts and make them accessible for everyone.",
    mission: "Empower Growth",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    values: [
      "Transparency in every transaction",
      "Client-first approach",
      "Innovation-driven solutions",
      "Sustainable financial growth",
    ],
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-[#F9C74F] text-sm font-semibold mb-4">
              <div className="w-2 h-2 bg-[#F9C74F] rounded-full"></div>
              ABOUT US
            </div>
            <h1 className="text-4xl md:text-6xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-6">
              {aboutData.title.split(" ").slice(0, 2).join(" ")}{" "}
              <span className="text-[#F9C74F]">
                {aboutData.title.split(" ").slice(2).join(" ")}
              </span>
            </h1>
            <p className="text-xl text-[#F8FAFC]/70 max-w-2xl mx-auto leading-relaxed">
              {aboutData.descriptionOne}
            </p>
          </div>

          {/* About Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-['Playfair_Display',serif] font-bold text-[#F9C74F] mb-4">
                  Our Story
                </h2>
                <p className="text-[#F8FAFC]/70 leading-relaxed text-lg">
                  {aboutData.descriptionTwo}
                </p>
              </div>

              <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-6 mb-8">
                <h3 className="text-2xl font-bold text-[#F8FAFC] mb-3">
                  Mission
                </h3>
                <p className="text-[#F9C74F] font-semibold text-lg">
                  {aboutData.mission}
                </p>
              </div>

              {/* Values Section */}
              <div>
                <h3 className="text-2xl font-bold text-[#F8FAFC] mb-4">
                  Our Core Values
                </h3>
                <ul className="space-y-3">
                  {aboutData.values.map((value, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-[#F8FAFC]/80 hover:text-[#F9C74F] transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-[#F9C74F]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Section (Image) */}
            <div className="relative group">
              <div className="overflow-hidden rounded-2xl border border-[#F9C74F]/20">
                <img
                  src={aboutData.image}
                  alt="About Us"
                  className="rounded-2xl w-full h-[450px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-[#F9C74F]/20 to-[#F9844A]/10 rounded-full blur-3xl group-hover:blur-2xl transition-all"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
