import React, { useState } from "react";
import Footer from "../layout/footer";
import Header from "../layout/Header";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBlogBySlug,
  addComment,
} from "../queryFunction/queryFunction";
import { toast } from "react-toastify";

const SingleBlog = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogBySlug(slug),
  });

  const blog = data?.data;

  const addCommentMutation = useMutation({
    mutationFn: ({ blogId, comment }) => addComment(blogId, { comment }),

    onSuccess: (res) => {
      toast.success(res?.message || "Comment added successfully!");
      queryClient.invalidateQueries(["blog", slug]);
      setCommentText("");
    },

    onError: (error) => {
      const backendMsg =
        error?.response?.data?.message || "Something went wrong!";
      toast.error(backendMsg);
    },
  });

  if (isLoading) {
    return <div className="text-center text-white py-20">Loading...</div>;
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-6">
            <Link
              to="/blogs"
              className="inline-flex items-center px-4 py-2 bg-[#F9C74F] rounded-full"
            >
              <FaArrowLeft />
            </Link>
          </div>

          <h1 className="text-4xl text-white font-bold mb-2">
            {blog?.title}
          </h1>

          <p className="text-gray-400 mb-6">
            {blog?.author} • {new Date(blog?.createdAt).toDateString()}
          </p>

          <img
            src={blog?.coverImage}
            className="w-full rounded-xl mb-10"
            alt="cover"
          />

          <h2 className="text-white text-3xl font-bold">Description</h2>
          <article
            className="prose prose-invert mb-14 text-white"
            dangerouslySetInnerHTML={{ __html: blog?.description }}
          />

          <h2 className="text-3xl font-bold text-white mb-6">Comments</h2>

          <div className="bg-white/5 p-6 rounded-xl mb-10">
            <form
              onSubmit={(e) => {
                e.preventDefault();

                addCommentMutation.mutate({
                  blogId: blog._id,
                  comment: commentText,
                });
              }}
            >
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-transparent border border-white/20 p-3 rounded-xl text-white"
                rows={4}
                placeholder="Write your comment..."
              ></textarea>

              <button
                type="submit"
                className="mt-4 px-6 py-3 bg-[#F9C74F] text-black rounded-xl"
              >
                Submit Comment
              </button>
            </form>
          </div>

          {/* Show Comments */}
          <div className="space-y-4 ">
            {blog?.comments?.length === 0 ? (
              <p className="text-gray-400">No comments yet.</p>
            ) : (
              blog?.comments?.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-white/5 p-5 rounded-xl border border-white/10"
                >
                  <div className="flex justify-between mb-2">
                    <h4 className="text-[#F9C74F] font-semibold">
                      {comment.name || "Anonymous"}
                    </h4>
                    <span className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-gray-200">{comment.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SingleBlog;
