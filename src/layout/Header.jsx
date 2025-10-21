import React, { use, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  const path = useLocation().pathname
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>
      {/* Enhanced Header */}
      <header className="flex items-center justify-between border-b border-[#F8FAFC]/10 px-6 py-6 md:px-20 lg:px-40 backdrop-blur-sm bg-[#0A1D35] sticky top-0 z-50">
        <Link to="/">
        <h2 className="text-[#F8FAFC] text-2xl font-['Playfair_Display',serif] font-bold bg-gradient-to-r from-[#F9C74F] to-[#F9844A] bg-clip-text text-transparent">
          Placerly
        </h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-12">
          {[
            { name: 'Home', path: '/' },
            { name: 'How It Works', path: '#how-it-works' },
            { name: 'About', path: '/about' },
            { name: 'Blogs', path: '/blogs' },
            { name: 'FAQs', path: '/faq' },
            { name: 'Contact', path: '/contact' },
          ].map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`text-[#F8FAFC] text-sm font-medium hover:text-[#F9C74F] transition-all duration-300 hover:scale-105 relative group ${
                path === link.path ? 'text-[#F9C74F]' : ''}`}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F9C74F] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button className="h-10 px-6 border border-[#F8FAFC]/30 text-[#F8FAFC] rounded-lg font-bold text-sm hover:bg-[#F8FAFC] hover:text-[#0B1F3A] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#F8FAFC]/20 cursor-pointer" onClick={() => { navigate('/login') }} >
            Login
          </button>
          <button className="h-10 px-6 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] rounded-lg font-bold text-sm hover:shadow-xl hover:shadow-[#F9C74F]/30 transition-all duration-300 hover:scale-105 cursor-pointer" onClick={() => { navigate('/signup') }}>
            Signup
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col items-center justify-center w-8 h-8 relative"
          onClick={toggleSidebar}
        >
          <span className={`w-6 h-0.5 bg-[#F8FAFC] transition-all duration-300 ${isSidebarOpen ? 'rotate-45 translate-y-1' : ''
            }`}></span>
          <span className={`w-6 h-0.5 bg-[#F8FAFC] transition-all duration-300 mt-1.5 ${isSidebarOpen ? 'opacity-0' : ''
            }`}></span>
          <span className={`w-6 h-0.5 bg-[#F8FAFC] transition-all duration-300 mt-1.5 ${isSidebarOpen ? '-rotate-45 -translate-y-2' : ''
            }`}></span>
        </button>
      </header>

      {/* Mobile Sidebar */}
      <div className={`
        fixed inset-0 z-40 transition-all duration-300 md:hidden
        ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-all duration-300 ${isSidebarOpen ? 'bg-opacity-50' : 'bg-opacity-0'
            }`}
          onClick={closeSidebar}
        ></div>

        {/* Sidebar Panel */}
        <div className={`
          absolute top-0 right-0 w-80 h-full bg-gradient-to-b from-[#0B1F3A] to-[#08101D] border-l border-[#F8FAFC]/10 backdrop-blur-lg
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#F8FAFC]/10">
            <h2 className="text-[#F8FAFC] text-2xl font-['Playfair_Display',serif] font-bold bg-gradient-to-r from-[#F9C74F] to-[#F9844A] bg-clip-text text-transparent">
              Placerly
            </h2>
            <button
              onClick={closeSidebar}
              className="w-8 h-8 flex items-center justify-center text-[#F8FAFC] hover:text-[#F9C74F] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="p-6">
            <div className="space-y-6">
              {[
                { name: 'How It Works', path: '#how-it-works' },
                { name: 'About', path: '/about' },
                { name: 'Blogs', path: '/blogs' },
                { name: 'FAQs', path: '#faqs' },
                { name: 'Contact', path: '/contact' },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="block text-[#F8FAFC] text-lg font-medium hover:text-[#F9C74F] transition-all duration-300 hover:translate-x-2 py-2 border-b border-[#F8FAFC]/5"
                  onClick={closeSidebar}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Buttons */}
            <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-[#F8FAFC]/10">
              <button
                className="w-full h-12 border border-[#F8FAFC]/30 text-[#F8FAFC] rounded-lg font-bold text-sm hover:bg-[#F8FAFC] hover:text-[#0B1F3A] transition-all duration-300"
                onClick={closeSidebar}
              >
                Login
              </button>
              <button
                className="w-full h-12 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] rounded-lg font-bold text-sm hover:shadow-xl hover:shadow-[#F9C74F]/30 transition-all duration-300"
                onClick={closeSidebar}
              >
                Signup
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-12 pt-8 border-t border-[#F8FAFC]/10">
              <div className="text-[#F8FAFC]/60 text-sm space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Bank-level Security</span>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Prevent body scroll when sidebar is open */}
      <style jsx>{`
        body {
          overflow: ${isSidebarOpen ? 'hidden' : 'auto'};
        }
      `}</style>
    </>
  )
}

export default Header