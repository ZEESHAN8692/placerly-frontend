import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { getBlog } from '../queryFunction/queryFunction';
import { FiChevronRight } from 'react-icons/fi';


const LatestBlogs = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['latestBlogs'],
    queryFn: getBlog,
  });

  if (isLoading) {
    return <div className="text-center text-white py-10">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500 py-10">Failed to load blogs.</div>;
  }

  // Get Only First 6 Blogs
  const blogs = data?.data?.slice(0, 6) || [];

  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] rounded-3xl">

      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-['Playfair_Display',serif] text-[#F8FAFC] font-bold">
          Latest <span className="text-[#F9C74F]">Blogs</span>
        </h2>
        <p className="text-[#F8FAFC]/70 mt-3">
          Fresh insights from our blog section.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

        {blogs.map((post) => (
          <Link to={`/blog/${post.slug}`} key={post.slug}>
            <article
              className="group bg-gradient-to-b from-[#0B1F3A] to-[#08101D] border border-[#F8FAFC]/10 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#F9C74F]/10 transition-all duration-500 hover:-translate-y-2"
            >

              {/* Blog Image */}
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

              {/* Blog Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-[#F8FAFC]/60 text-sm mb-3">
                  <span>{new Date(post.createdAt).toDateString()}</span>
                  <span className="w-1 h-1 bg-[#F8FAFC]/40 rounded-full"></span>
                  <span>by {post.author}</span>
                </div>

                <h3 className="text-lg font-bold font-['Playfair_Display',serif] text-[#F8FAFC] mb-2 group-hover:text-[#F9C74F] transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-[#F8FAFC]/60 text-sm">
                  {post.subject}
                </p>

                <div className="pt-4 mt-4 border-t border-[#F8FAFC]/10 flex justify-between items-center">
                  <span className="text-[#F9C74F] text-sm font-semibold">
                    Read More →
                  </span>
                </div>
              </div>

            </article>
          </Link>

        ))}
        

      </div>
      <div className="flex justify-end mt-8 max-w-7xl mx-auto">
          <div className="">
            <Link to="/blogs">
              <button className="cursor-pointer flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-semibold hover:scale-105 transition-transform shadow-lg">
                <span>Show More Blogs</span>
                <FiChevronRight className="text-lg" />
              </button>
            </Link>
          </div>
        </div>
    </div>
    
  );
};

export default LatestBlogs;


