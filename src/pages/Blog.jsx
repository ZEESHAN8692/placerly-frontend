import React from 'react';
import Footer from '../layout/footer';
import Header from '../layout/Header';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      title: "The Art of Diversification",
      description: "A deep dive into building a resilient portfolio.",
      category: "Investment",
      readTime: "8 min read",
      date: "Dec 12, 2024",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Retirement Planning in Your 30s",
      description: "It's never too early to start planning for your future.",
      category: "Retirement",
      readTime: "6 min read",
      date: "Dec 8, 2024",
      image: "https://images.unsplash.com/photo-1579154204601-015dbf4aa745?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Navigating Market Volatility",
      description: "How to stay calm and make smart decisions.",
      category: "Markets",
      readTime: "10 min read",
      date: "Dec 5, 2024",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Understanding Estate Planning",
      description: "Securing your legacy for future generations.",
      category: "Planning",
      readTime: "7 min read",
      date: "Nov 28, 2024",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "The Rise of ESG Investing",
      description: "Investing with your values in mind.",
      category: "Sustainable",
      readTime: "9 min read",
      date: "Nov 22, 2024",
      image: "https://images.unsplash.com/photo-1569163139394-de44cb54d5a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Tax-Efficient Investing Strategies",
      description: "Maximizing your returns by minimizing your tax burden.",
      category: "Tax",
      readTime: "11 min read",
      date: "Nov 15, 2024",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  const categories = ["All", "Investment", "Retirement", "Markets", "Planning", "Sustainable", "Tax"];

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#F9C74F] text-sm font-semibold mb-4">
            <div className="w-2 h-2 bg-[#F9C74F] rounded-full"></div>
            OUR BLOG
          </div>
          <h1 className="text-4xl md:text-6xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-6">
            Placerly <span className="text-[#F9C74F]">Blog</span>
          </h1>
          <p className="text-xl text-[#F8FAFC]/70 max-w-2xl mx-auto leading-relaxed">
            Insights on wealth management and financial planning. Stay informed with expert analysis and practical advice.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                index === 0 
                  ? "bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] shadow-lg shadow-[#F9C74F]/20"
                  : "bg-white/5 text-[#F8FAFC] hover:bg-white/10 border border-white/10 hover:border-[#F9C74F]/30"
              } hover:scale-105`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <Link to={`/blog/${index}`} key={index}>
            <article 
              key={index}
              className="group bg-gradient-to-b from-[#0B1F3A] to-[#08101D] border border-[#F8FAFC]/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-[#F9C74F]/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-48">
                <div 
                  className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${post.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#F9C74F] text-[#0B1F3A] text-xs font-bold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-[#F8FAFC]/60 mb-3">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-[#F8FAFC]/40 rounded-full"></span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold font-['Playfair_Display',serif] text-[#F8FAFC] mb-3 group-hover:text-[#F9C74F] transition-colors duration-300 leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-[#F8FAFC]/70 text-sm leading-relaxed mb-4">
                  {post.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#F8FAFC]/10">
                  <a 
                    href="#" 
                    className="flex items-center gap-2 text-[#F9C74F] text-sm font-bold hover:gap-3 transition-all duration-300 group/readmore"
                  >
                    Read More
                    <span className="group-hover/readmore:translate-x-1 transition-transform">→</span>
                  </a>
                  <button className="text-[#F8FAFC]/40 hover:text-[#F9C74F] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </article>
            </Link>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-br from-[#F9C74F]/10 to-[#F9844A]/10 border border-[#F9C74F]/20 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto backdrop-blur-sm">
          <h2 className="text-2xl md:text-3xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-4">
            Stay Updated with Financial Insights
          </h2>
          <p className="text-[#F8FAFC]/70 mb-6 max-w-2xl mx-auto">
            Get the latest articles, market updates, and investment strategies delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:shadow-lg hover:shadow-[#F9C74F]/30 transition-all duration-300 hover:scale-105">
              Subscribe
            </button>
          </div>
          <p className="text-[#F8FAFC]/50 text-xs mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-4">
            Looking for Personalized Financial Advice?
          </h3>
          <p className="text-[#F8FAFC]/70 mb-6 max-w-2xl mx-auto">
            Our expert advisors are here to help you create a customized wealth management strategy.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-xl hover:shadow-2xl hover:shadow-[#F9C74F]/40 hover:scale-105 transition-all duration-300">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Blog;