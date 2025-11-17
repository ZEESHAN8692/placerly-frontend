import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/footer';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const SingleService = ({ title, description, image, features }) => {
  const relatedServices = [
    {
      title: "Mobile App Development",
      category: "Development",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
      url: "/services/mobile-app"
    },
    {
      title: "Digital Marketing",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
      url: "/services/digital-marketing"
    },
    {
      title: "Software Solutions",
      category: "Software",
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80",
      url: "/services/software-solutions"
    }
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] py-16 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Back Button */}
          <div className="mb-8">
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-full px-4 py-2 bg-[#F9C74F] hover:bg-[#F9844A] transition-colors duration-300"
            >
              <FaArrowLeft />
            </Link>
          </div>

          {/* Page Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-6 leading-tight">
              {title}
            </h1>

            <p className="text-lg text-[#F8FAFC]/70 max-w-3xl">
              We offer premium, modern and scalable solutions to grow your business digitally.
            </p>
          </header>

          {/* Image */}
          <div className="mb-12 rounded-2xl overflow-hidden">
            <div
              className="w-full h-64 md:h-80 bg-cover bg-center"
              style={{ backgroundImage: `url('${image}')` }}
            ></div>
          </div>

          {/* Main Content */}
          <article className="prose prose-lg prose-invert max-w-none mb-16">
            <div className="text-[#F8FAFC]/80 leading-relaxed space-y-6">

              <p className="text-xl font-light">
                {description}
              </p>

              <h2 className="text-3xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mt-12 mb-6">
                Why Choose This Service?
              </h2>

              <div className="space-y-6">
                {features?.map((feature, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6"
                  >
                    <h3 className="text-xl font-bold text-[#F9C74F] mb-2">{feature.title}</h3>
                    <p className="text-[#F8FAFC]/80">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>

              <p>
                We combine creativity, technology and business understanding to provide outstanding digital solutions that help you grow faster.
              </p>

            </div>
          </article>

          {/* CTA */}
          <div className="text-center mb-16">
            <a
              href="/contact"
              className="px-8 py-3 bg-[#F9C74F] text-[#0B1F3A] font-semibold rounded-xl hover:bg-[#ffda77] transition-all shadow-lg"
            >
              Contact Us For This Service →
            </a>
          </div>

          {/* Related Services */}
          <section className="mb-16">
            <h2 className="text-3xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-8">
              Related Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((service, index) => (
                <Link
                  key={index}
                  to={service.url}
                  className="group bg-white/5 border border-[#F8FAFC]/10 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-[#F9C74F]/10 transition-all duration-300"
                >
                  <div
                    className="w-full h-32 bg-cover bg-center"
                    style={{ backgroundImage: `url(${service.image})` }}
                  ></div>

                  <div className="p-4">
                    <span className="inline-block px-2 py-1 bg-[#F9C74F] text-[#0B1F3A] text-xs font-bold rounded mb-2">
                      {service.category}
                    </span>

                    <h3 className="text-[#F8FAFC] font-semibold mb-2 group-hover:text-[#F9C74F] transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default SingleService;
