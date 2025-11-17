import React from 'react';
import Footer from '../layout/footer';
import Header from '../layout/Header';
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { getBlog } from '../queryFunction/queryFunction';

const Blog = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['blog'],
    queryFn: getBlog,
  });

  console.log("Blogs :", data);

  const categories = ["All", "Investment", "Retirement", "Markets", "Planning", "Sustainable", "Tax"];

  if (isLoading) {
    return (
      <div className="text-center mt-20 text-white text-xl">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-20 text-red-500 text-xl">
        Failed to load blogs
      </div>
    );
  }

  return (
    <>
      <Header />

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
              Insights on wealth management and financial planning.
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

          {/* Blog Listing from API */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

            {data?.data?.map((post, index) => (
              <Link to={`/blog/${post.slug}`} key={post.slug}>
                <article
                  className="group bg-gradient-to-b from-[#0B1F3A] to-[#08101D] border border-[#F8FAFC]/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-[#F9C74F]/10 transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-48">
                    <div
                      className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url(${post.coverImage})` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] to-transparent opacity-60"></div>

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#F9C74F] text-[#0B1F3A] text-xs font-bold rounded-full">
                        {post.subject}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-[#F8FAFC]/60 mb-3">
                      <span>{new Date(post.createdAt).toDateString()}</span>
                      <span className="w-1 h-1 bg-[#F8FAFC]/40 rounded-full"></span>
                      <span>by {post.author}</span>
                    </div>

                    <h3 className="text-xl font-bold font-['Playfair_Display',serif] text-[#F8FAFC] mb-3 group-hover:text-[#F9C74F] transition-colors duration-300 leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-[#F8FAFC]/70 text-sm leading-relaxed mb-4">
                      {post.subject}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#F8FAFC]/10">
                      <span className="flex items-center gap-2 text-[#F9C74F] text-sm font-bold">
                        Read More →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Blog;
