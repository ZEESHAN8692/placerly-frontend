import React, { use, useState } from "react";
import Header from "../layout/Header";
import Cookies from "js-cookie";

import { loadStripe } from "@stripe/stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPricingById } from "../queryFunction/queryFunction";
import axiosInstance from "../api/axiosInstance";
import { create_checkout_session_end } from "../api/urls";
import Footer from "../layout/Footer";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const token  = Cookies.get("token");
  const { data: plan, isLoading, isError } = useQuery({
    queryKey: ["singlePlan", id],
    queryFn: () => getPricingById(id),
  });

  const [billingAddress, setBillingAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(!token){
        toast.error('Please login first')
        navigate('/login')
      }else{
         const response = await axiosInstance.post(create_checkout_session_end, {
        planId: id,
        address: billingAddress,
      })

      const session = await response.data

      // const session = await response.json();

      if (session.url) {
        window.location.href = session.url;
      } else {
        alert("Failed to start payment. Please try again.");
      }
      }

     
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  if (isLoading)
    return (
      <div className="text-center text-white py-20">Loading plan details...</div>
    );
  if (isError)
    return (
      <div className="text-center text-red-500 py-20">
        Failed to load plan details.
      </div>
    );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-4">
              Checkout
            </h1>
            <p className="text-[#F8FAFC]/70 text-lg">
              Complete your purchase securely
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT SIDE - Billing Address */}
            <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-[#F8FAFC] mb-6 font-['Playfair_Display',serif]">
                Billing Address
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { label: "Full Name", name: "fullName", placeholder: "John Doe" },
                  { label: "Street Address", name: "street", placeholder: "123 Main St" },
                  { label: "City", name: "city", placeholder: "San Francisco" },
                  { label: "State / Province", name: "state", placeholder: "California" },
                  { label: "ZIP / Postal Code", name: "zip", placeholder: "94111" },
                  { label: "Country", name: "country", placeholder: "United States" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-[#F8FAFC] font-semibold mb-2">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      name={field.name}
                      value={billingAddress[field.name]}
                      onChange={handleBillingChange}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F]"
                      required
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-[#F9C74F]/40 hover:scale-105 transition-all duration-300 mt-6"
                >

                  Proceed to Payment
                </button>
              </form>
            </div>

 
            <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-[#F8FAFC] mb-6 font-['Playfair_Display',serif]">
                Order Summary
              </h2>

              <div className="border-b border-[#F8FAFC]/10 pb-4 mb-4">
                <h3 className="text-xl text-[#F8FAFC] font-semibold">
                  {plan?.planName}
                </h3>
                <p className="text-[#F8FAFC]/70 text-sm mb-2">
                  {plan?.description}
                </p>
                <p className="text-[#F9C74F] font-bold text-3xl">
                  ${plan?.price}{" "}
                  <span className="text-sm text-[#F8FAFC]/60">/ {plan?.type}</span>
                </p>
              </div>

              <div className="space-y-2">
                {plan?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#F9C74F] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-[#0B1F3A]"
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
                    </div>
                    <span className="text-[#F8FAFC] text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
