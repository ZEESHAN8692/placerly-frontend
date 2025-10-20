import React, { useState } from 'react';
import Footer from '../layout/footer';
import Header from '../layout/Header';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      value: "support@placerly.com",
      description: "We aim to respond within 24 hours"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Office",
      value: "123 Financial District",
      description: "San Francisco, CA 94111"
    }
  ];

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#F9C74F] text-sm font-semibold mb-4">
            <div className="w-2 h-2 bg-[#F9C74F] rounded-full"></div>
            CONTACT US
          </div>
          <h1 className="text-4xl md:text-6xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-6">
            Get in <span className="text-[#F9C74F]">Touch</span>
          </h1>
          <p className="text-xl text-[#F8FAFC]/70 max-w-2xl mx-auto leading-relaxed">
            We're here to help. Reach out to us with any questions or inquiries. We aim to respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-6">
                Contact Information
              </h2>
              <p className="text-[#F8FAFC]/70 mb-8 leading-relaxed">
                Get in touch with our team through any of the following methods. We're always happy to help with your wealth management needs.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-white/5 border border-[#F8FAFC]/10 rounded-xl hover:border-[#F9C74F]/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F9C74F] to-[#F9844A] rounded-lg flex items-center justify-center text-[#0B1F3A] group-hover:scale-110 transition-transform duration-300">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#F8FAFC] mb-1">{method.title}</h3>
                    <p className="text-[#F9C74F] font-semibold mb-1">{method.value}</p>
                    <p className="text-[#F8FAFC]/60 text-sm">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-[#F9C74F]/10 to-[#F9844A]/10 border border-[#F9C74F]/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[#F8FAFC] mb-3">Office Hours</h3>
              <div className="space-y-2 text-[#F8FAFC]/70">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-[#F9C74F] font-semibold">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-[#F9C74F] font-semibold">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-[#F8FAFC]/40">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-8">
            <h2 className="text-3xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-2">
              Send Us a Message
            </h2>
            <p className="text-[#F8FAFC]/70 mb-8">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-[#F8FAFC] font-semibold mb-3">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-[#F8FAFC] font-semibold mb-3">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
                  required
                />
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-[#F8FAFC] font-semibold mb-3">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] focus:outline-none focus:border-[#F9C74F] transition-colors"
                  required
                >
                  <option value="">What is your message about?</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-[#F8FAFC] font-semibold mb-3">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows="6"
                  className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors resize-none"
                  required
                ></textarea>
              </div>

              {/* Divider */}
              <div className="border-t border-[#F8FAFC]/10 my-6"></div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-[#F9C74F]/40 hover:scale-105 transition-all duration-300"
              >
                Send Message
              </button>

              <p className="text-center text-[#F8FAFC]/50 text-sm">
                We'll respond to your message within 24 hours
              </p>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[#F8FAFC]/70">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How quickly do you respond to inquiries?",
                answer: "We aim to respond to all inquiries within 24 hours during business days."
              },
              {
                question: "Do you offer personalized financial advice?",
                answer: "Yes, our certified financial advisors provide personalized advice based on your goals."
              },
              {
                question: "Is my financial information secure?",
                answer: "We use bank-level encryption and security protocols to protect your data."
              },
              {
                question: "Can I schedule a meeting with an advisor?",
                answer: "Absolutely! You can schedule a consultation through our contact form or phone."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6 hover:border-[#F9C74F]/30 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-2">{faq.question}</h3>
                <p className="text-[#F8FAFC]/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;