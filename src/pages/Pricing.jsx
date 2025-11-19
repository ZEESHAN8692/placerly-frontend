import React, { useState } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPricing } from '../queryFunction/queryFunction';

const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const { data, isLoading, isError } = useQuery({
    queryKey: ["plans"],
    queryFn: getPricing
  });

  if (isLoading) return <div className="text-center text-white py-20">Loading...</div>;
  if (isError) return <div className="text-center text-red-500 py-20">Failed to load pricing data.</div>;


  const monthlyPlans = data?.filter(plan => plan.type === 'monthly') || [];
  const yearlyPlans = data?.filter(plan => plan.type === 'yearly') || [];

  // Choose which plans to show based on billingCycle
  const displayedPlans = billingCycle === 'monthly' ? monthlyPlans : yearlyPlans;

  const handleSelectPlan = (id) => {
    navigate("/checkout/" + id);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-[#F9C74F] text-sm font-semibold mb-4">
              <div className="w-2 h-2 bg-[#F9C74F] rounded-full"></div>
              PRICING
            </div>
            <h1 className="text-4xl md:text-6xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-6">
              Choose Your <span className="text-[#F9C74F]">Plan</span>
            </h1>
            <p className="text-xl text-[#F8FAFC]/70 max-w-2xl mx-auto leading-relaxed mb-8">
              Start with a free trial. No credit card required. Cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A]'
                    : 'text-[#F8FAFC] hover:text-[#F9C74F]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A]'
                    : 'text-[#F8FAFC] hover:text-[#F9C74F]'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs bg-green-500 text-[#0B1F3A] px-2 py-1 rounded-full">
                  Save 16%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {displayedPlans.map((plan, index) => (
              <div
                key={plan._id}
                className={`relative rounded-2xl transition-all duration-500 hover:scale-105 ${
                  index === 1
                    ? 'bg-gradient-to-b from-[#0B1F3A] to-[#08101D] border-2 border-[#F9C74F] shadow-2xl shadow-[#F9C74F]/20'
                    : 'bg-white/5 border border-[#F8FAFC]/10'
                }`}
              >
                {/* Popular Badge */}
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] px-6 py-2 rounded-full font-bold text-sm">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-2">
                      {plan.planName}
                    </h3>
                    <p className="text-[#F8FAFC]/60 text-sm">
                      {plan.description?.length > 100 ? plan.description.slice(0, 100) + '...' : plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-[#F8FAFC]">${plan.price}</span>
                      <span className="text-[#F8FAFC]/60">/ {plan.type}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {plan.features?.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-[#0B1F3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[#F8FAFC] text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelectPlan(plan._id)}
                    className={`w-full py-4 font-bold rounded-xl transition-all duration-300 ${
                      index === 1
                        ? 'bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] hover:shadow-2xl hover:shadow-[#F9C74F]/40'
                        : 'bg-white/10 border border-[#F8FAFC]/20 text-[#F8FAFC] hover:bg-white/20 hover:border-[#F9C74F]'
                    } hover:scale-105`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
