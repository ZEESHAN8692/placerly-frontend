import React from 'react'
import ChatBox from '../components/ChatBox'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className="border-t border-[#F8FAFC]/10 bg-gradient-to-b from-[#0B1F3A] to-[#08101D] px-6 md:px-20 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <img src="logo.png" alt="" className='h-[60px]'/>
              <p className="text-[#F8FAFC]/60 max-w-md leading-relaxed">
                Your trusted partner in wealth management. Empowering financial freedom through innovative technology and personalized insights.
              </p>
            </div>
            <div>
              <h4 className="text-[#F8FAFC] font-bold mb-4">Product</h4>
              <div className="space-y-2">
                {[{name: "Features", link: "/features"}, {name: "Pricing", link: "/pricing"}, {name: "Security", link: "/security"}, {name: "Reviews", link: "/reviews"}].map((obj) => (
                  <Link key={obj.name} to={obj.link} className="block text-[#F8FAFC]/60 hover:text-[#F9C74F] transition-colors">
                    {obj.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[#F8FAFC] font-bold mb-4">Company</h4>
              <div className="space-y-2">

                {[{name: "About", link: "/about"}, {name: "Careers", link: "#"}, {name: "Contact", link: "/contact"}, {name: "Press", link: "#"}].map((obj) => (
                  <Link key={obj.name} to={obj.link} className="block text-[#F8FAFC]/60 hover:text-[#F9C74F] transition-colors">
                    {obj.name}
                  </Link>
                ))}
                
              </div>
            </div>
          </div>
          <div className="border-t border-[#F8FAFC]/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#F8FAFC]/50 text-sm">
              © 2025 Placerly. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              {[{name: "Privacy Policy", link: "/privacy"}, {name: "Terms of Service", link: "/terms"}, {name: "Cookie Policy", link: "#"}].map((obj) => (
                <Link key={obj.name} to={obj.link} className="text-[#F8FAFC]/50 text-sm hover:text-[#F9C74F] transition-colors">
                  {obj.name}
                </Link>
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