import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiGrid,
  FiDollarSign,
  FiUsers,
  FiSettings,
  FiShield,
  FiTrendingUp,
  FiCreditCard,
  FiClipboard,
  FiFileText,
  FiMenu,
  FiBell,
  FiSearch,
} from 'react-icons/fi';

const DashboardLayout = ({ children }) => {
  const path = useLocation().pathname;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigation = [
    { name: 'Dashboard', icon: <FiGrid />, path: '/dashboard' },
    { name: 'Assets', icon: <FiGrid />, path: '/dashboard/assets' },
    { name: 'Debts', icon: <FiDollarSign />, path: '/dashboard/debts' },
    { name: 'Executors', icon: <FiUsers />, path: '/dashboard/executors' },
    { name: 'Utilities', icon: <FiSettings />, path: '/dashboard/utilities' },
    { name: 'Insurance', icon: <FiShield />, path: '/dashboard/insurance' },
    { name: 'Investments', icon: <FiTrendingUp />, path: '/dashboard/investments' },
    { name: 'Banking', icon: <FiCreditCard />, path: '/dashboard/banking' },
    { name: 'Planning', icon: <FiClipboard />, path: '/dashboard/planning' },
    { name: 'Reports', icon: <FiFileText />, path: '/dashboard/reports' },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] text-[#F8FAFC]">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-[#0B1F3A]/90 border-r border-[#F8FAFC]/10 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#F8FAFC]/10">
          {isSidebarOpen ? (
            <h1 className="text-2xl font-['Playfair_Display',serif] font-bold bg-gradient-to-r from-[#F9C74F] to-[#F9844A] bg-clip-text text-transparent">
              Placerly
            </h1>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] rounded-full"></div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <Link key={item.name} to={item.path}>
                <li>
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      path === item.path
                        ? 'bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-semibold'
                        : 'text-[#F8FAFC]/70 hover:text-[#F8FAFC] hover:bg-white/5'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {isSidebarOpen && <span>{item.name}</span>}
                  </button>
                </li>
              </Link>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-[#F8FAFC]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] rounded-full flex items-center justify-center">
              <span className="text-[#0B1F3A] font-bold">EP</span>
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <div className="text-[#F8FAFC] font-semibold text-sm truncate">
                  Eleanor Pana
                </div>
                <div className="text-[#F8FAFC]/60 text-xs truncate">
                  eleanor@placerly.com
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#0B1F3A]/80 border-b border-[#F8FAFC]/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <FiMenu className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-['Playfair_Display',serif] font-bold">
              Dashboard
            </h2>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors relative">
              <FiBell className="w-5 h-5" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-[#F9C74F] rounded-full"></div>
            </button>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors w-64"
              />
              <FiSearch className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F8FAFC]/40" />
            </div>
          </div>
        </header>

        {/* Main children content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>

        {/* Footer */}
        <footer className="bg-[#0B1F3A]/80 border-t border-[#F8FAFC]/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-[#F8FAFC]/60 text-sm">
              © 2024 Placerly. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a
                href="#"
                className="text-[#F8FAFC]/60 hover:text-[#F8FAFC] transition-colors"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-[#F8FAFC]/60 hover:text-[#F8FAFC] transition-colors"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-[#F8FAFC]/60 hover:text-[#F8FAFC] transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-[#F8FAFC]/60 hover:text-[#F8FAFC] transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
