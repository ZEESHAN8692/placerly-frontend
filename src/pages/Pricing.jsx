import React, { useState } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/footer';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('standard');

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: { monthly: 49, yearly: 490 },
      description: 'Perfect for getting started with wealth management',
      popular: false,
      features: [
        'Portfolio Tracking',
        'Financial Planning Tools',
        'Basic Investment Analytics',
        'Email Support',
        'Mobile App Access',
        'Secure Document Storage'
      ],
      cta: 'Get Started'
    },
    {
      id: 'standard',
      name: 'Standard',
      price: { monthly: 99, yearly: 990 },
      description: 'Our most popular plan for serious investors',
      popular: true,
      features: [
        'Everything in Basic',
        'Personal Advisor',
        'Advanced Analytics',
        'Tax Optimization',
        'Priority Support',
        'Custom Reports',
        'Retirement Planning',
        'Estate Planning Tools'
      ],
      cta: 'Start Free Trial'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: { monthly: 199, yearly: 1990 },
      description: 'Complete wealth management solution',
      popular: false,
      features: [
        'Everything in Standard',
        '24/7 Premium Support',
        'Dedicated Wealth Manager',
        'Legal Document Review',
        'Family Office Services',
        'Alternative Investments',
        'Charitable Giving Planning',
        'Business Succession Planning',
        'Concierge Service'
      ],
      cta: 'Contact Sales'
    }
  ];

  const savings = {
    basic: 98,
    standard: 198,
    premium: 398
  };

  return (
    <>
    <Header/>
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
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl transition-all duration-500 hover:scale-105 ${
                plan.popular
                  ? 'bg-gradient-to-b from-[#0B1F3A] to-[#08101D] border-2 border-[#F9C74F] shadow-2xl shadow-[#F9C74F]/20'
                  : 'bg-white/5 border border-[#F8FAFC]/10'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
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
                    {plan.name}
                  </h3>
                  <p className="text-[#F8FAFC]/60 text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-[#F8FAFC]">
                      ${billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly}
                    </span>
                    {billingCycle === 'monthly' && (
                      <span className="text-[#F8FAFC]/60">/ month</span>
                    )}
                  </div>
                  {billingCycle === 'yearly' && (
                    <div className="text-[#F9C74F] font-semibold">
                      Save ${savings[plan.id]} annually
                    </div>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
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

                {/* CTA Button */}
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-4 font-bold rounded-xl transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] hover:shadow-2xl hover:shadow-[#F9C74F]/40'
                      : 'bg-white/10 border border-[#F8FAFC]/20 text-[#F8FAFC] hover:bg-white/20 hover:border-[#F9C74F]'
                  } hover:scale-105`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto mt-20">
          <h2 className="text-3xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] text-center mb-12">
            Plan Comparison
          </h2>
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#F8FAFC]/10">
                  <th className="text-left p-6 text-[#F8FAFC] font-semibold">Features</th>
                  {plans.map((plan) => (
                    <th key={plan.id} className="p-6 text-center">
                      <div className="text-[#F8FAFC] font-bold text-lg">{plan.name}</div>
                      <div className="text-[#F9C74F] font-semibold">
                        ${billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly}
                        {billingCycle === 'monthly' && '/mo'}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  'Portfolio Tracking',
                  'Financial Planning Tools',
                  'Personal Advisor',
                  '24/7 Support',
                  'Tax Optimization',
                  'Estate Planning',
                  'Dedicated Manager',
                  'Family Office Services'
                ].map((feature) => (
                  <tr key={feature} className="border-b border-[#F8FAFC]/5">
                    <td className="p-6 text-[#F8FAFC] font-medium">{feature}</td>
                    {plans.map((plan) => (
                      <td key={plan.id} className="p-6 text-center">
                        <div className="flex justify-center">
                          {plan.features.some(f => f.includes(feature) || f === feature) ? (
                            <div className="w-6 h-6 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-[#0B1F3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-[#F8FAFC]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <h2 className="text-3xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Can I change plans later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes, all plans come with a 14-day free trial. No credit card required."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
              },
              {
                question: "Do you offer discounts for families?",
                answer: "Yes, we offer family plans and group discounts. Contact our sales team for more information."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6 hover:border-[#F9C74F]/30 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-3">{faq.question}</h3>
                <p className="text-[#F8FAFC]/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-[#F9C74F]/10 to-[#F9844A]/10 border border-[#F9C74F]/20 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-4">
              Ready to Transform Your Financial Future?
            </h3>
            <p className="text-[#F8FAFC]/70 mb-6 max-w-2xl mx-auto">
              Join thousands of investors who trust Placerly with their wealth management needs.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-xl hover:shadow-2xl hover:shadow-[#F9C74F]/40 hover:scale-105 transition-all duration-300">
              Start Your Free Trial
            </button>
            <p className="text-[#F8FAFC]/50 text-sm mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Pricing;