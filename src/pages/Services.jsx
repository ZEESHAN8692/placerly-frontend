import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/footer";

const Services = () => {
  const servicesData = [
    {
      title: "Website Development",
      description:
        "Custom, high-performance website development with modern technologies that ensure speed, security and scalability.",
      url: "/services/website-development",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Mobile App Development",
      description:
        "We build smooth, fast and user-friendly Android & iOS apps tailored to your business needs.",
      url: "/services/mobile-app",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Digital Marketing",
      description:
        "Boost your business visibility with SEO, social media marketing and paid ads with proven ROI.",
      url: "/services/digital-marketing",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Custom Software Solutions",
      description:
        "High-quality software solutions that streamline operations and enhance productivity.",
      url: "/services/software-solutions",
      image:
        "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-[#F9C74F] text-sm font-semibold mb-3">
              <div className="w-2 h-2 bg-[#F9C74F] rounded-full"></div>
              OUR SERVICES
            </div>

            <h1 className="text-4xl md:text-6xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC]">
              What <span className="text-[#F9C74F]">We Offer</span>
            </h1>

            <p className="text-lg text-[#F8FAFC]/70 max-w-2xl mx-auto mt-4 leading-relaxed">
              We deliver smart, powerful and modern solutions to help your business grow efficiently.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {servicesData.map((service, index) => (
              <a
                key={index}
                href={service.url}
                className="group bg-white/5 border border-[#F8FAFC]/10 rounded-2xl overflow-hidden hover:border-[#F9C74F]/40 transition-all"
              >
                {/* Image Section */}
                <div className="w-full h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#F8FAFC] mb-3 group-hover:text-[#F9C74F] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-[#F8FAFC]/70 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <span className="text-[#F9C74F] font-semibold group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Services;
