import React from 'react'

const Sidebar = () => {
  return (
    <>
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#0B1F3A]/90 border-r border-[#F8FAFC]/10 transition-all duration-300 flex flex-col`}>
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
              <li key={item.name}>
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${item.active
                      ? 'bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-semibold'
                      : 'text-[#F8FAFC]/70 hover:text-[#F8FAFC] hover:bg-white/5'
                    }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {isSidebarOpen && <span>{item.name}</span>}
                </button>
              </li>
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
                <div className="text-[#F8FAFC] font-semibold text-sm truncate">Eleanor Pana</div>
                <div className="text-[#F8FAFC]/60 text-xs truncate">eleanor@placerly.com</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar