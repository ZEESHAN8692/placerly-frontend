import React, { useState } from 'react';
import DashboardLayout from '../layout/sidebar';

const Dashboard = () => {

  const assets = [
    {
      id: 1,
      name: 'Classo Sapphire Reserve',
      type: 'Credit Card',
      value: 12543.21,
      change: '+2.3%',
      changeType: 'positive',
      icon: '💳'
    },
    {
      id: 2,
      name: 'Bank of America Checking',
      type: 'Bank Account',
      value: 5231.89,
      change: '+0.5%',
      changeType: 'positive',
      icon: '🏦'
    },
    {
      id: 3,
      name: 'Robinhood Investment',
      type: 'Investment',
      value: 25890.12,
      change: '+5.2%',
      changeType: 'positive',
      icon: '📈'
    },
    {
      id: 4,
      name: 'Coinbase Crypto',
      type: 'Cryptocurrency',
      value: 18450.50,
      change: '-1.2%',
      changeType: 'negative',
      icon: '₿'
    }
  ];

  const assetCategories = [
    { name: 'Darks', count: 12, value: '$45,230' },
    { name: 'Insurance', count: 4, value: '$12,500' },
    { name: 'Utilities', count: 8, value: '$3,200' }
  ];


  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const netWorthChange = '+3.1%';

  return (
    <DashboardLayout>

      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Net Worth Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-['Playfair_Display',serif] font-bold">Net Worth</h3>
                <span className="text-[#F9C74F] font-semibold">{netWorthChange}</span>
              </div>
              <div className="text-4xl font-bold">${totalAssets.toLocaleString()}</div>
              <p className="text-[#F8FAFC]/60 mt-2">Total assets across all accounts</p>
            </div>

            <div className="bg-gradient-to-br from-[#F9C74F]/10 to-[#F9844A]/10 border border-[#F9C74F]/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-left">
                  Add New Asset
                </button>
                <button className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-left">
                  Generate Report
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Assets Categories */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
                <h3 className="text-xl font-['Playfair_Display',serif] font-bold mb-6">Assets</h3>

                <div className="space-y-4">
                  {assetCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                      <div>
                        <div className="text-[#F8FAFC] font-semibold">{category.name}</div>
                        <div className="text-[#F8FAFC]/60 text-sm">{category.count} items</div>
                      </div>
                      <div className="text-[#F9C74F] font-semibold">{category.value}</div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-[#F8FAFC]/10 my-6"></div>

                {/* Add New Category */}
                <button className="w-full flex items-center gap-2 text-[#F9C74F] hover:text-[#F9844A] transition-colors">
                  <span>+</span>
                  <span>Add Category</span>
                </button>
              </div>
            </div>

            {/* Right Column - Asset Cards */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assets.map((asset) => (
                  <div key={asset.id} className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-6 hover:border-[#F9C74F]/30 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                          <span className="text-lg">{asset.icon}</span>
                        </div>
                        <div>
                          <h4 className="text-[#F8FAFC] font-semibold">{asset.name}</h4>
                          <p className="text-[#F8FAFC]/60 text-sm">{asset.type}</p>
                        </div>
                      </div>
                      <span className={`text-sm font-semibold ${asset.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                        }`}>
                        {asset.change}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-[#F8FAFC]">
                        ${asset.value.toLocaleString()}
                      </div>
                      <div className="text-[#F8FAFC]/60 text-sm">
                        {asset.changeType === 'positive' ? 'Total Value' : 'Current Holdings'}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 py-2 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-sm">
                        View Details
                      </button>
                      <button className="flex-1 py-2 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-sm">
                        Manage
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="mt-6 bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
                <h3 className="text-xl font-['Playfair_Display',serif] font-bold mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: 'Added new investment', account: 'Robinhood', amount: '+$2,500', time: '2 hours ago' },
                    { action: 'Credit card payment', account: 'Classo Sapphire', amount: '-$1,200', time: '1 day ago' },
                    { action: 'Dividend received', account: 'Investment Portfolio', amount: '+$345', time: '3 days ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                          <span className="text-sm">📊</span>
                        </div>
                        <div>
                          <div className="text-[#F8FAFC] font-medium">{activity.action}</div>
                          <div className="text-[#F8FAFC]/60 text-sm">{activity.account} • {activity.time}</div>
                        </div>
                      </div>
                      <div className={`font-semibold ${activity.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        }`}>
                        {activity.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;