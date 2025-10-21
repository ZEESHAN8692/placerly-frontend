import React, { useState } from 'react';
import DashboardLayout from '../layout/sidebar';

const Utilities = () => {
  const [viewMode, setViewMode] = useState('card');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('amount');
  const [searchTerm, setSearchTerm] = useState('');

  const utilities = [
    {
      id: 1,
      provider: 'City Power',
      service: 'Electricity',
      accountName: 'Primary Residence Electric',
      amount: 125.50,
      dueDate: '2024-02-15',
      status: 'pending',
      usage: '1,250 kWh',
      previousAmount: 118.75,
      icon: '⚡'
    },
    {
      id: 2,
      provider: 'National Gas Co.',
      service: 'Gas',
      accountName: 'Primary Residence Gas',
      amount: 75.00,
      dueDate: '2024-02-18',
      status: 'paid',
      usage: '45 therm',
      previousAmount: 72.50,
      icon: '🔥'
    },
    {
      id: 3,
      provider: 'EqualFlow Water',
      service: 'Water',
      accountName: 'Primary Residence Water',
      amount: 45.20,
      dueDate: '2024-02-20',
      status: 'pending',
      usage: '4,500 gal',
      previousAmount: 42.80,
      icon: '💧'
    },
    {
      id: 4,
      provider: 'FastNet Internet',
      service: 'Internet',
      accountName: 'Home Office Internet',
      amount: 89.99,
      dueDate: '2024-02-25',
      status: 'paid',
      usage: 'Unlimited',
      previousAmount: 89.99,
      icon: '🌐'
    },
    {
      id: 5,
      provider: 'EqualFlow Water',
      service: 'Water',
      accountName: 'Rental Property Water',
      amount: 38.50,
      dueDate: '2024-02-22',
      status: 'pending',
      usage: '3,200 gal',
      previousAmount: 36.90,
      icon: '💧'
    },
    {
      id: 6,
      provider: 'FastNet Internet',
      service: 'Internet',
      accountName: 'Vacation Home Internet',
      amount: 79.99,
      dueDate: '2024-02-28',
      status: 'pending',
      usage: 'Unlimited',
      previousAmount: 79.99,
      icon: '🌐'
    }
  ];

  const monthlyTotal = utilities.reduce((sum, utility) => sum + utility.amount, 0);
  const previousMonthTotal = utilities.reduce((sum, utility) => sum + utility.previousAmount, 0);
  const percentageChange = ((monthlyTotal - previousMonthTotal) / previousMonthTotal * 100).toFixed(1);

  const filteredUtilities = utilities
    .filter(utility => 
      utility.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      utility.accountName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(utility => 
      selectedType === 'all' || utility.service.toLowerCase() === selectedType.toLowerCase()
    )
    .sort((a, b) => {
      if (sortBy === 'amount') return b.amount - a.amount;
      if (sortBy === 'provider') return a.provider.localeCompare(b.provider);
      if (sortBy === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
      return 0;
    });

  const serviceTypes = ['all', ...new Set(utilities.map(u => u.service))];

  const getStatusColor = (status) => {
    return status === 'paid' ? 'text-green-400' : 'text-yellow-400';
  };

  const getStatusText = (status) => {
    return status === 'paid' ? 'Paid' : 'Pending';
  };

  const getChangeColor = (current, previous) => {
    const change = ((current - previous) / previous * 100);
    return change > 0 ? 'text-red-400' : change < 0 ? 'text-green-400' : 'text-gray-400';
  };

  const getChangeIcon = (current, previous) => {
    const change = ((current - previous) / previous * 100);
    return change > 0 ? '↗' : change < 0 ? '↘' : '→';
  };

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-[#F9C74F] text-sm font-semibold mb-4">
            <div className="w-2 h-2 bg-[#F9C74F] rounded-full"></div>
            UTILITY MANAGEMENT
          </div>
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-4">
            Utilities
          </h1>
          <p className="text-[#F8FAFC]/70 text-lg">
            Track and manage your utility expenses with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats and Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Monthly Total Card */}
              <div className="bg-gradient-to-br from-[#F9C74F]/10 to-[#F9844A]/10 border border-[#F9C74F]/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#F8FAFC]">This Month's Total</h3>
                  <span className={`text-sm font-semibold ${getChangeColor(monthlyTotal, previousMonthTotal)}`}>
                    {percentageChange}% vs last month
                  </span>
                </div>
                <div className="text-3xl font-bold text-[#F8FAFC]">${monthlyTotal.toFixed(2)}</div>
                
                {/* Utility Breakdown */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-[#F8FAFC] font-semibold">${utilities.find(u => u.service === 'Electricity')?.amount.toFixed(2)}</div>
                    <div className="text-[#F8FAFC]/60 text-sm">Electricity</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#F8FAFC] font-semibold">${utilities.find(u => u.service === 'Gas')?.amount.toFixed(2)}</div>
                    <div className="text-[#F8FAFC]/60 text-sm">Gas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#F8FAFC] font-semibold">${utilities.find(u => u.service === 'Water')?.amount.toFixed(2)}</div>
                    <div className="text-[#F8FAFC]/60 text-sm">Water</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#F8FAFC] font-semibold">${utilities.find(u => u.service === 'Internet')?.amount.toFixed(2)}</div>
                    <div className="text-[#F8FAFC]/60 text-sm">Internet</div>
                  </div>
                </div>
              </div>

              {/* Controls Card */}
              <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => setViewMode('card')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      viewMode === 'card'
                        ? 'bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A]'
                        : 'bg-white/5 text-[#F8FAFC] hover:bg-white/10'
                    }`}
                  >
                    Card View
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      viewMode === 'table'
                        ? 'bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A]'
                        : 'bg-white/5 text-[#F8FAFC] hover:bg-white/10'
                    }`}
                  >
                    Table View
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search by provider or account name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
                  />
                  <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F8FAFC]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#F8FAFC] text-sm font-semibold mb-2">All Types</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] focus:outline-none focus:border-[#F9C74F] transition-colors"
                    >
                      {serviceTypes.map(type => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#F8FAFC] text-sm font-semibold mb-2">Sort by</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] focus:outline-none focus:border-[#F9C74F] transition-colors"
                    >
                      <option value="amount">Amount</option>
                      <option value="provider">Provider</option>
                      <option value="dueDate">Due Date</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Utilities Grid */}
            {viewMode === 'card' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUtilities.map((utility) => (
                  <div key={utility.id} className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-6 hover:border-[#F9C74F]/30 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">{utility.icon}</span>
                        </div>
                        <div>
                          <h4 className="text-[#F8FAFC] font-semibold">{utility.provider}</h4>
                          <p className="text-[#F8FAFC]/60 text-sm">{utility.service}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(utility.status)}`}>
                        {getStatusText(utility.status)}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-[#F8FAFC]/60 text-sm">Account</div>
                        <div className="text-[#F8FAFC] font-medium">{utility.accountName}</div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-[#F8FAFC]/60 text-sm">Amount</div>
                          <div className="text-2xl font-bold text-[#F8FAFC]">${utility.amount.toFixed(2)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[#F8FAFC]/60 text-sm">Usage</div>
                          <div className="text-[#F8FAFC] font-medium">{utility.usage}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[#F8FAFC]/10">
                        <div className="text-[#F8FAFC]/60 text-sm">
                          Due {new Date(utility.dueDate).toLocaleDateString()}
                        </div>
                        <div className={`text-sm font-semibold ${getChangeColor(utility.amount, utility.previousAmount)}`}>
                          {getChangeIcon(utility.amount, utility.previousAmount)} ${Math.abs(utility.amount - utility.previousAmount).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 py-2 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-sm">
                        Pay Now
                      </button>
                      <button className="flex-1 py-2 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-sm">
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Table View */
              <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 border-b border-[#F8FAFC]/10 text-[#F8FAFC] font-semibold text-sm">
                  <div className="col-span-4">PROVIDER</div>
                  <div className="col-span-3">ACCOUNT NAME</div>
                  <div className="col-span-2">AMOUNT</div>
                  <div className="col-span-2">STATUS</div>
                  <div className="col-span-1">ACTIONS</div>
                </div>

                <div className="divide-y divide-[#F8FAFC]/10">
                  {filteredUtilities.map((utility) => (
                    <div key={utility.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition-colors">
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                          <span className="text-lg">{utility.icon}</span>
                        </div>
                        <div>
                          <div className="text-[#F8FAFC] font-semibold">{utility.provider}</div>
                          <div className="text-[#F8FAFC]/60 text-xs">{utility.service}</div>
                        </div>
                      </div>
                      <div className="col-span-3 flex items-center">
                        <div className="text-[#F8FAFC]">{utility.accountName}</div>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <div className="text-[#F8FAFC] font-bold">${utility.amount.toFixed(2)}</div>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(utility.status)}`}>
                          {getStatusText(utility.status)}
                        </span>
                      </div>
                      <div className="col-span-1 flex items-center gap-2">
                        <button className="p-1 text-[#F8FAFC]/40 hover:text-[#F9C74F] transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="p-1 text-[#F8FAFC]/40 hover:text-[#F9C74F] transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-left">
                  Add New Utility
                </button>
                <button className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-left">
                  Pay All Bills
                </button>
                <button className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-left">
                  Usage Reports
                </button>
              </div>
            </div>

            {/* Monthly Summary */}
            <div className="bg-gradient-to-br from-[#F9C74F]/10 to-[#F9844A]/10 border border-[#F9C74F]/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">Monthly Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#F8FAFC]/60">This Month</span>
                  <span className="text-[#F8FAFC] font-semibold">${monthlyTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#F8FAFC]/60">Last Month</span>
                  <span className="text-[#F8FAFC] font-semibold">${previousMonthTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#F8FAFC]/60">Change</span>
                  <span className={`font-semibold ${getChangeColor(monthlyTotal, previousMonthTotal)}`}>
                    {percentageChange}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default Utilities;