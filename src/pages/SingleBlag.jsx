import React, { useState } from 'react';
import Footer from '../layout/footer';
import Header from '../layout/Header';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const SingleBlog = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = (platform) => {
    // In a real app, this would use the platform's sharing API
    if (platform === 'copy') {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const relatedPosts = [
    {
      title: "Asset Allocation Strategies",
      category: "Investment",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Risk Management Fundamentals",
      category: "Strategy",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Long-Term Investment Planning",
      category: "Planning",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1579154204601-015dbf4aa745?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] py-16 sm:px-6 lg:px-8  ">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center justify-center rounded-full px-4 py-2 bg-[#F9C74F] hover:bg-[#F9844A] transition-colors duration-300"
          >
            <FaArrowLeft className="transform -translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12">
        
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-6 leading-tight">
            The Art of Diversification
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-[#F8FAFC]/70">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] rounded-full"></div>
                <span className="font-medium">John Doe</span>
              </div>
              <span className="hidden sm:block">•</span>
              <span>Published on August 24, 2023</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span>8 min read</span>
              <span>•</span>
              <span>1,248 views</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12 rounded-2xl overflow-hidden">
          <div 
            className="w-full h-64 md:h-80 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
            }}
          ></div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg prose-invert max-w-none mb-16">
          <div className="text-[#F8FAFC]/80 leading-relaxed space-y-6">
            <p className="text-xl font-light leading-relaxed">
              Diversification is a core principle of investing, yet it's often misunderstood. It's not just about owning a lot of different stocks. True diversification means spreading your investments across various asset classes, industries, and geographic regions. This strategy helps to mitigate risk, as a downturn in one area is less likely to have a catastrophic impact on your entire portfolio.
            </p>

            <h2 className="text-3xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mt-12 mb-6">
              Why Diversity?
            </h2>

            <p>
              The primary reason to diversify is to manage risk. No single investment performs well all the time. By holding a mix of assets, you can smooth out returns and protect yourself from the volatility of any single investment. For example, when stocks are down, bonds might be up, and vice versa. This balancing act is what makes diversification so powerful.
            </p>

            {/* Quote */}
            <blockquote className="border-l-4 border-[#F9C74F] pl-6 py-2 my-8 bg-[#0B1F3A]/50 rounded-r-lg">
              <p className="text-xl italic text-[#F8FAFC] font-['Playfair_Display',serif]">
                "The only investors who shouldn't diversify are those who are right 100% of the time."
              </p>
              <footer className="mt-4 text-[#F9C74F] font-semibold">
                — John Templeton
              </footer>
            </blockquote>

            <h2 className="text-3xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mt-12 mb-6">
              How to Build a Diversified Portfolio
            </h2>

            <p>
              Building a diversified portfolio involves several key steps:
            </p>

            <div className="space-y-6 my-8">
              <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#F9C74F] mb-3">Asset Allocation</h3>
                <p className="text-[#F8FAFC]/80">
                  Determine the right mix of stocks, bonds, and other assets based on your risk tolerance and financial goals.
                </p>
              </div>

              <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#F9C74F] mb-3">Geographic Diversification</h3>
                <p className="text-[#F8FAFC]/80">
                  Invest in both domestic and international markets to reduce country-specific risk.
                </p>
              </div>

              <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#F9C74F] mb-3">Sector Diversification</h3>
                <p className="text-[#F8FAFC]/80">
                  Spread your investments across different industries to avoid over-exposure to a single sector.
                </p>
              </div>

              <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#F9C74F] mb-3">Regular Rebalancing</h3>
                <p className="text-[#F8FAFC]/80">
                  Periodically review and adjust your portfolio to maintain your desired asset allocation.
                </p>
              </div>
            </div>

            <p>
              Remember, diversification doesn't guarantee profits or protect against all losses. However, it is a proven strategy for managing risk and achieving more consistent long-term returns. At Placerly, we can help you build a personalized, diversified portfolio tailored to your unique financial situation.
            </p>
          </div>
        </article>

        {/* Share Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-8 border-t border-b border-[#F8FAFC]/10 mb-16">
          <div className="text-[#F8FAFC] font-semibold">
            Share this article:
          </div>
          <div className="flex items-center gap-4">
            {[
              { icon: '💬', label: 'Twitter', platform: 'twitter' },
              { icon: '💬', label: 'LinkedIn', platform: 'linkedin' },
              { icon: '✅️', label: 'Copy', platform: 'copy' }
            ].map((social) => (
              <button
                key={social.platform}
                onClick={() => handleShare(social.platform)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:bg-[#F9C74F] hover:text-[#0B1F3A] transition-all duration-300 hover:scale-105"
              >
                <span>{social.icon}</span>
                <span>{social.label}</span>
                {social.platform === 'copy' && isCopied && (
                  <span className="text-xs text-[#F9C74F]">Copied!</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-8 mb-16">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-20 h-20 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] rounded-full flex-shrink-0"></div>
            <div>
              <h3 className="text-xl font-bold text-[#F8FAFC] mb-2">John Doe</h3>
              <p className="text-[#F9C74F] font-semibold mb-4">Senior Investment Strategist</p>
              <p className="text-[#F8FAFC]/70 leading-relaxed">
                John has over 15 years of experience in portfolio management and investment strategy. 
                He specializes in helping clients build diversified portfolios that align with their long-term financial goals.
              </p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <section className="mb-16">
          <h2 className="text-3xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-8">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post, index) => (
              <Link key={index} to={`/blog/${post.slug}`} className="group bg-white/5 border border-[#F8FAFC]/10 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-[#F9C74F]/10 transition-all duration-300">
                <div 
                  className="w-full h-32 bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.image})` }}
                ></div>
                <div className="p-4">
                  <span className="inline-block px-2 py-1 bg-[#F9C74F] text-[#0B1F3A] text-xs font-bold rounded mb-2">
                    {post.category}
                  </span>
                  <h3 className="text-[#F8FAFC] font-semibold mb-2 group-hover:text-[#F9C74F] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[#F8FAFC]/60 text-xs">{post.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

       
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SingleBlog;