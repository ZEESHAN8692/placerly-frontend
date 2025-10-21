import React, { useState } from 'react';
import DashboardLayout from '../layout/sidebar';

const AssetsPage = () => {
  const [assets, setAssets] = useState([
    {
      id: 1,
      name: 'Chase Sapphire Reserve',
      amount: 12543.21,
      type: 'CREDIT CARD',
      change: '+2.3%',
      changeType: 'positive',
      icon: '💳',
    },
    {
      id: 2,
      name: 'Bank of America Checking',
      amount: 5231.89,
      type: 'CHECKING',
      change: '+1.1%',
      changeType: 'positive',
      icon: '🏦',
    },
    {
      id: 3,
      name: 'Savings Account',
      amount: 25890.12,
      type: 'SAVINGS',
      change: '+3.7%',
      changeType: 'positive',
      icon: '💰',
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAsset, setNewAsset] = useState({
    name: '',
    amount: '',
    type: '',
    icon: '💎',
  });

  const handleAddAsset = (e) => {
    e.preventDefault();
    const asset = {
      id: assets.length + 1,
      ...newAsset,
      amount: parseFloat(newAsset.amount),
      change: '+0.0%',
      changeType: 'neutral',
    };
    setAssets([...assets, asset]);
    setNewAsset({ name: '', amount: '', type: '', icon: '💎' });
    setShowAddForm(false);
  };

  const totalAssets = assets.reduce((sum, a) => sum + a.amount, 0);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 text-[#F9C74F] text-sm font-semibold mb-4">
              <div className="w-2 h-2 bg-[#F9C74F] rounded-full"></div>
              ASSETS MANAGEMENT
            </div>
            <h1 className="text-4xl md:text-5xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-4">
              Assets
            </h1>
            <p className="text-[#F8FAFC]/70 text-lg">
              View and manage all your financial assets in one place.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
              <div className="text-2xl font-bold text-[#F8FAFC] mb-2">
                ${totalAssets.toLocaleString()}
              </div>
              <div className="text-[#F8FAFC]/60 text-sm">Total Assets Value</div>
            </div>
            <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
              <div className="text-2xl font-bold text-[#F8FAFC] mb-2">
                {assets.length}
              </div>
              <div className="text-[#F8FAFC]/60 text-sm">Total Accounts</div>
            </div>
            <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
              <div className="text-2xl font-bold text-[#F8FAFC] mb-2">
                {Math.max(...assets.map((a) => a.amount)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </div>
              <div className="text-[#F8FAFC]/60 text-sm">Largest Asset</div>
            </div>
            <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
              <div className="text-2xl font-bold text-[#F8FAFC] mb-2">💎</div>
              <div className="text-[#F8FAFC]/60 text-sm">Portfolio Symbol</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Assets List */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#F8FAFC]">Your Assets</h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-6 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:shadow-lg hover:shadow-[#F9C74F]/30 transition-all duration-300 hover:scale-105"
                >
                  Add New Asset
                </button>
              </div>

              <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 border-b border-[#F8FAFC]/10 text-[#F8FAFC] font-semibold text-sm">
                  <div className="col-span-1"></div>
                  <div className="col-span-4">ASSET NAME</div>
                  <div className="col-span-3">TYPE</div>
                  <div className="col-span-2">VALUE</div>
                  <div className="col-span-2">CHANGE</div>
                </div>

                <div className="divide-y divide-[#F8FAFC]/10">
                  {assets.map((asset) => (
                    <div
                      key={asset.id}
                      className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="col-span-1 flex items-center text-2xl">{asset.icon}</div>
                      <div className="col-span-4 flex flex-col justify-center">
                        <div className="text-[#F8FAFC] font-semibold">{asset.name}</div>
                      </div>
                      <div className="col-span-3 flex items-center">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            asset.type === 'CREDIT CARD'
                              ? 'bg-purple-500/20 text-purple-300'
                              : asset.type === 'CHECKING'
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-green-500/20 text-green-300'
                          }`}
                        >
                          {asset.type}
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center text-[#F8FAFC] font-bold">
                        ${asset.amount.toLocaleString()}
                      </div>
                      <div
                        className={`col-span-2 flex items-center font-semibold ${
                          asset.changeType === 'positive'
                            ? 'text-green-400'
                            : asset.changeType === 'negative'
                            ? 'text-red-400'
                            : 'text-[#F8FAFC]/60'
                        }`}
                      >
                        {asset.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Empty State */}
              {assets.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💎</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#F8FAFC] mb-2">No Assets Found</h3>
                  <p className="text-[#F8FAFC]/60 mb-4">
                    Get started by adding your first asset.
                  </p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="px-6 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Add Your First Asset
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {showAddForm ? (
                <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
                  <h3 className="text-xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-4">
                    Add New Asset
                  </h3>
                  <form onSubmit={handleAddAsset} className="space-y-4">
                    <div>
                      <label className="block text-[#F8FAFC] text-sm font-semibold mb-2">
                        Asset Name
                      </label>
                      <input
                        type="text"
                        value={newAsset.name}
                        onChange={(e) =>
                          setNewAsset({ ...newAsset, name: e.target.value })
                        }
                        placeholder="e.g., Bank Account"
                        className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[#F8FAFC] text-sm font-semibold mb-2">
                        Type
                      </label>
                      <input
                        type="text"
                        value={newAsset.type}
                        onChange={(e) =>
                          setNewAsset({ ...newAsset, type: e.target.value })
                        }
                        placeholder="e.g., SAVINGS"
                        className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[#F8FAFC] text-sm font-semibold mb-2">
                        Amount
                      </label>
                      <input
                        type="number"
                        value={newAsset.amount}
                        onChange={(e) =>
                          setNewAsset({ ...newAsset, amount: e.target.value })
                        }
                        placeholder="0.00"
                        className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F]"
                        required
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:shadow-lg transition-all duration-300"
                      >
                        Add Asset
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="px-4 py-2 border border-[#F8FAFC]/30 text-[#F8FAFC] rounded-lg hover:bg-white/10 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">
                    Asset Summary
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-[#F8FAFC]/60 text-sm">Total Assets</div>
                      <div className="text-2xl font-bold text-[#F8FAFC]">
                        ${totalAssets.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#F8FAFC]/60 text-sm">Accounts</div>
                      <div className="text-lg font-semibold text-[#F8FAFC]">
                        {assets.length}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#F8FAFC]/60 text-sm">Highest Asset</div>
                      <div className="text-lg font-semibold text-[#F8FAFC]">
                        $
                        {Math.max(...assets.map((a) => a.amount)).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-br from-[#F9C74F]/10 to-[#F9844A]/10 border border-[#F9C74F]/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-left">
                    Asset Growth Report
                  </button>
                  <button className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-left">
                    Export Portfolio
                  </button>
                  <button className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-left">
                    View Chart Analysis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AssetsPage;
