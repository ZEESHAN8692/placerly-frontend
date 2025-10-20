import React, { useState, useEffect } from "react";
import Footer from "../layout/footer";
import Header from "../layout/Header";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] font-[Inter,sans-serif] text-[#F8FAFC] min-h-screen overflow-x-hidden">
      <div className="flex flex-col min-h-screen">
        <Header/>

        {/* Enhanced Hero Section */}
        <main className="flex flex-col gap-20 md:gap-32">
          <section
            className={`relative flex flex-col items-center justify-center text-center min-h-screen p-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#F9C74F]/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F9844A]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#43AA8B]/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 flex flex-col gap-8 max-w-4xl">
              <h1 className="text-[#F8FAFC] text-5xl md:text-8xl font-['Playfair_Display',serif] font-black leading-tight tracking-tight">
                One Place For Your{" "}
                <span className="bg-gradient-to-r from-[#F9C74F] via-[#F9844A] to-[#43AA8B] bg-clip-text text-transparent">
                  Wealth
                </span>
              </h1>
              <p className="text-[#F8FAFC]/80 text-xl max-w-2xl mx-auto leading-relaxed">
                A modern-classic wealth management platform that transforms how you grow and protect your financial future.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                <button className="h-14 px-8 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-[#F9C74F]/40 hover:scale-105 transition-all duration-300 group">
                  <span className="flex items-center gap-2">
                    Get Started
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </button>
                <button className="h-14 px-8 bg-white/10 backdrop-blur-sm border border-white/20 text-[#F8FAFC] font-bold text-lg rounded-xl hover:bg-white/20 hover:shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300">
                  Watch Demo
                </button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-12 mt-16 pt-8 border-t border-[#F8FAFC]/10">
                {["10K+", "99%", "4.9/5"].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-[#F9C74F]">{stat}</div>
                    <div className="text-sm text-[#F8FAFC]/60">
                      {["Active Users", "Satisfaction", "Rating"][i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Enhanced How It Works */}
          <section className="px-6 md:px-20">
            <h2 className="text-center text-5xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-20">
              How It <span className="text-[#F9C74F]">Works</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: "🔗",
                  title: "Connect Your Accounts",
                  desc: "Securely link all your financial accounts in one place with bank-level encryption.",
                },
                {
                  icon: "💡",
                  title: "Get Personalized Insights",
                  desc: "Receive AI-powered tailored advice and analysis based on your unique portfolio.",
                },
                {
                  icon: "📈",
                  title: "Track Your Growth",
                  desc: "Monitor your investments and net worth with our beautiful, intuitive dashboard.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-6 text-center items-center border border-[#F8FAFC]/10 bg-gradient-to-b from-[#0B1F3A] to-[#08101D] p-8 rounded-2xl transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-[#F9C74F]/20 group"
                >
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="w-12 h-1 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] rounded-full mb-2"></div>
                  <h3 className="text-[#F8FAFC] text-2xl font-bold font-['Playfair_Display',serif]">
                    {item.title}
                  </h3>
                  <p className="text-[#F8FAFC]/70 text-base leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Enhanced About Section */}
          <section className="px-6 md:px-20 py-24 grid md:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 text-[#F9C74F] text-sm font-semibold mb-2">
                <div className="w-2 h-2 bg-[#F9C74F] rounded-full"></div>
                ABOUT US
              </div>
              <h2 className="text-5xl text-[#F8FAFC] font-['Playfair_Display',serif] font-bold leading-tight">
                Building Financial <span className="text-[#F9C74F]">Freedom</span> Together
              </h2>
              <p className="text-[#F8FAFC]/80 text-lg max-w-xl leading-relaxed">
                Placerly was founded with a simple vision: to democratize wealth management. 
                Our mission is to provide a transparent, accessible, and comprehensive platform 
                that empowers you to take control of your financial future with confidence.
              </p>
              <div className="flex gap-4 mt-4">
                <button className="h-12 px-6 bg-[#F9C74F] text-[#0B1F3A] font-bold rounded-lg hover:scale-105 transition-transform">
                  Learn More
                </button>
                <button className="h-12 px-6 border border-[#F8FAFC]/30 text-[#F8FAFC] rounded-lg hover:bg-white/10 transition-all">
                  Meet the Team
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-[#F9C74F]/20 to-[#F9844A]/20 rounded-2xl overflow-hidden">
                <div
                  className="w-full h-full bg-center bg-cover rounded-2xl transform hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
                  }}
                ></div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#F9C74F]/10 rounded-2xl backdrop-blur-sm border border-[#F9C74F]/20"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#F9844A]/10 rounded-2xl backdrop-blur-sm border border-[#F9844A]/20"></div>
            </div>
          </section>

          {/* Enhanced Blog Section */}
          <section className="px-6 md:px-20 py-24 bg-gradient-to-b from-[#0B1F3A] to-[#08101D]">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 text-[#F9C74F] text-sm font-semibold mb-4">
                  <div className="w-2 h-2 bg-[#F9C74F] rounded-full"></div>
                  LATEST INSIGHTS
                </div>
                <h2 className="text-5xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC]">
                  From Our <span className="text-[#F9C74F]">Blog</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Investing in a Volatile Market",
                    desc: "Navigating market fluctuations requires a steady hand. Here are our top tips for staying the course...",
                    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                    tag: "Investing",
                  },
                  {
                    title: "Retirement Planning 101",
                    desc: "It's never too early to start planning for your golden years. Learn the fundamentals of retirement planning.",
                    img: "https://images.unsplash.com/photo-1579154204601-015dbf4aa745?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                    tag: "Retirement",
                  },
                  {
                    title: "The Power of Compound Interest",
                    desc: "Discover how small, consistent investments can grow into substantial wealth over time through compounding.",
                    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                    tag: "Wealth",
                  },
                ].map((post, i) => (
                  <div
                    key={i}
                    className="flex flex-col border border-[#F8FAFC]/10 bg-gradient-to-b from-[#0B1F3A] to-[#08101D] rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-[#F9C74F]/10 transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="relative overflow-hidden">
                      <div
                        className="w-full h-48 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                        style={{ backgroundImage: `url(${post.img})` }}
                      ></div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#F9C74F] text-[#0B1F3A] text-xs font-bold rounded-full">
                          {post.tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col gap-4">
                      <h3 className="text-xl font-bold font-['Playfair_Display',serif] text-[#F8FAFC] group-hover:text-[#F9C74F] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-[#F8FAFC]/70 text-sm leading-relaxed">{post.desc}</p>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-[#F9C74F] text-sm font-bold mt-2 group-hover:gap-3 transition-all"
                      >
                        Read More
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Enhanced FAQ */}
          <section className="px-6 md:px-20 py-24">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl text-center font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-4">
                Frequently Asked <span className="text-[#F9C74F]">Questions</span>
              </h2>
              <p className="text-center text-[#F8FAFC]/60 text-lg mb-16 max-w-2xl mx-auto">
                Everything you need to know about Placerly. Can't find the answer? Contact our support team.
              </p>
              <div className="space-y-4">
                {[
                  {
                    q: "Is my financial data secure?",
                    a: "Absolutely. We use bank-level 256-bit encryption and state-of-the-art security protocols to ensure your data is always protected. We never store your banking credentials and use read-only access.",
                  },
                  {
                    q: "What types of accounts can I connect?",
                    a: "You can connect a wide range of accounts including checking, savings, investment, retirement (401k, IRA), credit cards, loans, and mortgages from over 10,000 financial institutions.",
                  },
                  {
                    q: "Is there a fee to use Placerly?",
                    a: "Placerly offers a comprehensive free basic plan with essential features. Our premium options start at $9.99/month and include advanced analytics, personalized advisor access, and premium support.",
                  },
                  {
                    q: "How often is my financial data updated?",
                    a: "Your connected accounts are updated automatically every 4 hours. You can also manually refresh your accounts at any time to get real-time updates.",
                  },
                ].map((faq, i) => (
                  <details
                    key={i}
                    className="bg-gradient-to-b from-[#0B1F3A] to-[#08101D] border border-[#F8FAFC]/10 p-6 rounded-xl hover:border-[#F9C74F]/30 transition-all duration-300 group"
                  >
                    <summary className="flex justify-between items-center text-lg font-semibold text-[#F8FAFC] cursor-pointer list-none">
                      {faq.q}
                      <span className="text-[#F9C74F] transform group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="text-[#F8FAFC]/70 mt-4 text-base leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-6 md:px-20 py-24">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-br from-[#F9C74F]/10 to-[#F9844A]/10 border border-[#F9C74F]/20 rounded-3xl p-12 backdrop-blur-sm">
                <h2 className="text-4xl md:text-5xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-6">
                  Ready to Transform Your <span className="text-[#F9C74F]">Wealth</span> Journey?
                </h2>
                <p className="text-[#F8FAFC]/70 text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of users who are already taking control of their financial future with Placerly.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="h-14 px-8 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-[#F9C74F]/40 hover:scale-105 transition-all duration-300">
                    Start Free Trial
                  </button>
                  <button className="h-14 px-8 border border-[#F8FAFC]/30 text-[#F8FAFC] font-bold text-lg rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300">
                    Schedule a Demo
                  </button>
                </div>
                <p className="text-[#F8FAFC]/50 text-sm mt-6">
                  No credit card required • 14-day free trial • Cancel anytime
                </p>
              </div>
            </div>
          </section>

         <Footer/>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;