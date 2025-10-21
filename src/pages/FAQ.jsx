import React, { useState } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/footer';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState([1]);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All', count: 12 },
    { id: 'account', name: 'Account', count: 4 },
    { id: 'billing', name: 'Billing', count: 3 },
    { id: 'security', name: 'Security', count: 2 },
    { id: 'platform', name: 'Platform Features', count: 3 }
  ];

  const faqs = [
    {
      id: 1,
      question: "How do I create a Placerly account?",
      answer: "To create a Placerly account, click the 'Sign Up' button on our homepage. You will be guided through a secure registration process, which includes verifying your identity and setting up your investment profile. The process is designed to be quick and straightforward, getting you started on your wealth management journey in no time.",
      category: 'account'
    },
    {
      id: 2,
      question: "What are the billing options available?",
      answer: "Placerly offers flexible billing options including monthly and annual subscriptions. We accept all major credit cards, debit cards, and bank transfers. Annual subscriptions come with a 16% discount compared to monthly billing. You can update your payment method and billing preferences at any time from your account settings.",
      category: 'billing'
    },
    {
      id: 3,
      question: "How is my data secured on Placerly?",
      answer: "We use bank-level 256-bit SSL encryption to protect your data. All sensitive information is encrypted both in transit and at rest. We are PCI DSS compliant and regularly undergo security audits. Additionally, we use multi-factor authentication and advanced fraud detection systems to ensure your account remains secure.",
      category: 'security'
    },
    {
      id: 4,
      question: "Can I link multiple bank accounts?",
      answer: "Yes, you can link multiple bank accounts, investment accounts, and credit cards to Placerly. Our platform supports connections to over 10,000 financial institutions. This allows you to get a comprehensive view of your entire financial picture in one place, making wealth management more efficient and effective.",
      category: 'account'
    },
    {
      id: 5,
      question: "What investment strategies does Placerly offer?",
      answer: "Placerly offers a range of investment strategies including passive indexing, active management, ESG (Environmental, Social, Governance) investing, and customized portfolios. Our algorithms analyze your risk tolerance, financial goals, and time horizon to recommend the optimal strategy for your unique situation.",
      category: 'platform'
    },
    {
      id: 6,
      question: "Is there a mobile app available?",
      answer: "Yes, Placerly offers a fully-featured mobile app for both iOS and Android devices. The app provides all the functionality of our web platform, including portfolio tracking, investment management, bill payments, and financial planning tools. You can download it from the App Store or Google Play Store.",
      category: 'platform'
    },
    {
      id: 7,
      question: "How do I update my personal information?",
      answer: "You can update your personal information at any time by navigating to the 'Settings' section of your account. From there, you can modify your contact details, communication preferences, security settings, and linked financial accounts. All changes are saved automatically and take effect immediately.",
      category: 'account'
    },
    {
      id: 8,
      question: "What happens if I want to cancel my subscription?",
      answer: "You can cancel your Placerly subscription at any time from your account settings. If you cancel, you'll continue to have access to premium features until the end of your current billing period. After cancellation, your account will revert to our free plan, which still includes basic portfolio tracking and financial insights.",
      category: 'billing'
    }
  ];

  const toggleItem = (id) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return faqs.length;
    return faqs.filter(faq => faq.category === categoryId).length;
  };

  return (
    <>
    <Header/>
      <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#F9C74F] text-sm font-semibold mb-4">
            <div className="w-2 h-2 bg-[#F9C74F] rounded-full"></div>
            SUPPORT
          </div>
          <h1 className="text-4xl md:text-6xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-[#F8FAFC]/70 max-w-2xl mx-auto leading-relaxed">
            Find answers to your most common questions about Placerly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-6 sticky top-6">
              {/* Search */}
              <div className="mb-6">
                <label className="block text-[#F8FAFC] font-semibold mb-3">
                  Q What can we help you with?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
                  />
                  <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F8FAFC]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#F8FAFC]/10 mb-6"></div>

              {/* Categories */}
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-semibold'
                        : 'text-[#F8FAFC]/70 hover:text-[#F8FAFC] hover:bg-white/5'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-sm ${
                      activeCategory === category.id ? 'text-[#0B1F3A]' : 'text-[#F8FAFC]/40'
                    }`}>
                      {getCategoryCount(category.id)}
                    </span>
                  </button>
                ))}
              </nav>

              {/* Help Card */}
              <div className="mt-8 p-4 bg-gradient-to-br from-[#F9C74F]/10 to-[#F9844A]/10 border border-[#F9C74F]/20 rounded-xl">
                <h4 className="text-[#F8FAFC] font-semibold mb-2">Still need help?</h4>
                <p className="text-[#F8FAFC]/70 text-sm mb-3">
                  Can't find the answer you're looking for?
                </p>
                <button className="w-full py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-sm">
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - FAQs */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#F9C74F]/30"
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                    >
                      <h3 className="text-xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        <svg
                          className={`w-4 h-4 text-[#F9C74F] transition-transform duration-300 ${
                            openItems.includes(faq.id) ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {openItems.includes(faq.id) && (
                      <div className="px-6 pb-6">
                        <div className="border-t border-[#F8FAFC]/10 mb-4"></div>
                        <p className="text-[#F8FAFC]/80 leading-relaxed">
                          {faq.answer}
                        </p>
                        
                        {/* Helpful Actions */}
                        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-[#F8FAFC]/10">
                          <span className="text-[#F8FAFC]/60 text-sm">Was this helpful?</span>
                          <button className="flex items-center gap-1 text-[#F8FAFC]/60 hover:text-[#F9C74F] transition-colors text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            Yes
                          </button>
                          <button className="flex items-center gap-1 text-[#F8FAFC]/60 hover:text-red-400 transition-colors text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                            </svg>
                            No
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                /* Empty State */
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">❓</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#F8FAFC] mb-2">No questions found</h3>
                  <p className="text-[#F8FAFC]/60 mb-4">
                    We couldn't find any questions matching your search.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Contact Section */}
            <div className="mt-12 bg-gradient-to-br from-[#F9C74F]/10 to-[#F9844A]/10 border border-[#F9C74F]/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-4">
                Still have questions?
              </h2>
              <p className="text-[#F8FAFC]/70 mb-6 max-w-2xl mx-auto">
                Our support team is here to help you with any additional questions you might have about Placerly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:shadow-lg hover:shadow-[#F9C74F]/30 transition-all duration-300 hover:scale-105">
                  Contact Support
                </button>
                <button className="px-6 py-3 bg-white/5 border border-[#F8FAFC]/20 text-[#F8FAFC] rounded-lg hover:border-[#F9C74F] transition-colors">
                  Schedule a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    <Footer/>
    </>
  );
};

export default FAQ;