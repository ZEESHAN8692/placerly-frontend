import React from 'react'
import ChatBox from '../components/ChatBox'

const Footer = () => {
  return (
    <>
      {/* Enhanced Footer */}
      <footer className="border-t border-[#F8FAFC]/10 bg-gradient-to-b from-[#0B1F3A] to-[#08101D] px-6 md:px-20 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-['Playfair_Display',serif] font-bold bg-gradient-to-r from-[#F9C74F] to-[#F9844A] bg-clip-text text-transparent mb-4">
                Placerly
              </h3>
              <p className="text-[#F8FAFC]/60 max-w-md leading-relaxed">
                Your trusted partner in wealth management. Empowering financial freedom through innovative technology and personalized insights.
              </p>
            </div>
            <div>
              <h4 className="text-[#F8FAFC] font-bold mb-4">Product</h4>
              <div className="space-y-2">
                {["Features", "Pricing", "Security", "Reviews"].map((link) => (
                  <a key={link} href="#" className="block text-[#F8FAFC]/60 hover:text-[#F9C74F] transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[#F8FAFC] font-bold mb-4">Company</h4>
              <div className="space-y-2">
                {["About", "Careers", "Contact", "Press"].map((link) => (
                  <a key={link} href="#" className="block text-[#F8FAFC]/60 hover:text-[#F9C74F] transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-[#F8FAFC]/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#F8FAFC]/50 text-sm">
              © 2024 Placerly. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                <a key={link} href="#" className="text-[#F8FAFC]/50 text-sm hover:text-[#F9C74F] transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <ChatBox/>
    </>

  )
}

export default Footer