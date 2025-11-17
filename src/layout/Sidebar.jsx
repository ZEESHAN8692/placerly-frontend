import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  FiGrid,
  FiDollarSign,
  FiUsers,
  FiSettings,
  FiShield,
  FiTrendingUp,
  FiCreditCard,
  FiClipboard,
  FiMenu,
  FiBell,
  FiSearch,
  FiBox,
  FiUser,
  FiCalendar,
} from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { profile } from '../queryFunction/queryFunction';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(false);

  const token = Cookies.get("token");
  console.log("Token from cookie:", token);

  const {data: user , isLoading ,isError ,error}= useQuery({
    queryKey: ['profile'],
    queryFn: profile,
  })

  console.log("User",user);
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate('/login');
  }
  

  const navigation = [
    { name: 'Dashboard', icon: <FiGrid />, path: '/dashboard' },
    { name: 'Assets', icon: <FiBox />, path: '/dashboard/assets' },
    { name: 'Debts', icon: <FiDollarSign />, path: '/dashboard/debts' },
    { name: 'Utilities', icon: <FiClipboard />, path: '/dashboard/utilities' },
    { name: 'Insurance', icon: <FiShield />, path: '/dashboard/insurance' },
    { name: 'Executors', icon: <FiUsers />, path: '/dashboard/executors' },
    { name: 'Investments', icon: <FiTrendingUp />, path: '/dashboard/investments' },
    { name: 'Banking', icon: <FiCreditCard />, path: '/dashboard/banking' },
    { name: 'Calendar', icon: <FiCalendar />, path: '/dashboard/calendar' },
    { name: 'Profile', icon: <FiUser />, path: '/dashboard/profile' },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] text-[#F8FAFC]">

      <aside
        className={`${isSidebarOpen ? 'w-64' : 'w-20'
          } bg-[#0B1F3A]/90 border-r border-[#F8FAFC]/10 transition-all duration-300 flex flex-col`}
      >

        <div className="p-6 border-b border-[#F8FAFC]/10">
          {isSidebarOpen ? (
            <h1 className="text-2xl font-['Playfair_Display',serif] font-bold bg-gradient-to-r from-[#F9C74F] to-[#F9844A] bg-clip-text text-transparent">
              Placerly
            </h1>
            // <img src="logo.png" alt="" className='h-[40px]'/>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] rounded-full"></div>
          )}
        </div>


        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <Link key={item.name} to={item.path}>
                <li>
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${path === item.path
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


        <div
          className="p-4 border-t border-[#F8FAFC]/10 relative group"
        >
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] rounded-full flex items-center justify-center">
              <span className="text-[#0B1F3A] font-bold text-2xl">{user?.name.charAt(0).toUpperCase()}</span>
            </div>

            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <div className="text-[#F8FAFC] font-semibold text-sm truncate">
                  {user?.name}
                </div>
                <div className="text-[#F8FAFC]/60 text-xs truncate">
                  {user?.email}
                </div>
              </div>
            )}
          </div>

          {/* Dropdown (hover controlled) */}
          <div
            className="
      absolute bottom-14 left-4 w-40 bg-[#0B1F3A] border 
      border-[#F8FAFC]/10 rounded-xl shadow-xl p-2 
      opacity-0 invisible 
      group-hover:opacity-100 group-hover:visible 
      transition-all duration-200 ease-out
    "
          >
            <Link to="/dashboard/profile">
              <button className="w-full text-left text-[#F8FAFC] px-3 py-2 rounded-lg hover:bg-[#1A2C4A] text-sm">
                Profile
              </button>
            </Link>

            <button className="w-full text-left text-red-400 px-3 py-2 rounded-lg hover:bg-red-500/20 text-sm
            "
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </aside>


      <div className="flex-1 flex flex-col overflow-hidden">

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


          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors relative">
              <FiBell className="w-5 h-5" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-[#F9C74F] rounded-full"></div>
            </button>


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


        <main className="flex-1 overflow-auto p-6">{children}</main>


        <footer className="bg-[#0B1F3A]/80 border-t border-[#F8FAFC]/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-[#F8FAFC]/60 text-sm">
              © 2025 Placerly. All rights reserved.
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
