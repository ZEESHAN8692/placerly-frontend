import React, { useState } from 'react';

const Insurance = () => {
  const [insurances, setInsurances] = useState([
    {
      id: 1,
      provider: 'State Farm',
      policyType: 'Term Life Insurance',
      coverage: 500000,
      premium: 1200,
      premiumFrequency: 'year',
      renewalDate: '2024-12-15',
      policyNumber: 'SF-789456123',
      isSelected: false
    },
    {
      id: 2,
      provider: 'Geico',
      policyType: 'Auto Insurance',
      coverage: 50000,
      premium: 1200,
      premiumFrequency: 'year',
      renewalDate: '2024-11-20',
      policyNumber: 'GE-456123789',
      isSelected: false
    },
    {
      id: 3,
      provider: 'Prudential',
      policyType: 'Homeowners Insurance',
      coverage: 750000,
      premium: 2500,
      premiumFrequency: 'year',
      renewalDate: '2025-01-10',
      policyNumber: 'PR-123456789',
      isSelected: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newInsurance, setNewInsurance] = useState({
    provider: '',
    policyType: '',
    coverage: '',
    premium: '',
    premiumFrequency: 'year',
    renewalDate: ''
  });

  const toggleSelectAll = () => {
    const allSelected = insurances.every(insurance => insurance.isSelected);
    setInsurances(insurances.map(insurance => ({ ...insurance, isSelected: !allSelected })));
  };

  const toggleSelectInsurance = (id) => {
    setInsurances(insurances.map(insurance => 
      insurance.id === id ? { ...insurance, isSelected: !insurance.isSelected } : insurance
    ));
  };

  const handleAddInsurance = (e) => {
    e.preventDefault();
    const insurance = {
      id: insurances.length + 1,
      provider: newInsurance.provider,
      policyType: newInsurance.policyType,
      coverage: parseFloat(newInsurance.coverage),
      premium: parseFloat(newInsurance.premium),
      premiumFrequency: newInsurance.premiumFrequency,
      renewalDate: newInsurance.renewalDate,
      policyNumber: `${newInsurance.provider.substring(0, 2).toUpperCase()}-${Math.floor(100000000 + Math.random() * 900000000)}`,
      isSelected: false
    };
    setInsurances([...insurances, insurance]);
    setNewInsurance({ provider: '', policyType: '', coverage: '', premium: '', premiumFrequency: 'year', renewalDate: '' });
    setShowAddForm(false);
  };

  const deleteSelectedInsurances = () => {
    setInsurances(insurances.filter(insurance => !insurance.isSelected));
  };

  const totalCoverage = insurances.reduce((sum, insurance) => sum + insurance.coverage, 0);
  const totalAnnualPremium = insurances.reduce((sum, insurance) => sum + insurance.premium, 0);
  const selectedInsurances = insurances.filter(insurance => insurance.isSelected);

  const getPolicyIcon = (policyType) => {
    switch (policyType.toLowerCase()) {
      case 'term life insurance':
        return '🛡️';
      case 'auto insurance':
        return '🚗';
      case 'homeowners insurance':
        return '🏠';
      case 'health insurance':
        return '🏥';
      default:
        return '📄';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-[#F9C74F] text-sm font-semibold mb-4">
            <div className="w-2 h-2 bg-[#F9C74F] rounded-full"></div>
            INSURANCE MANAGEMENT
          </div>
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-4">
            Your Insurances
          </h1>
          <p className="text-[#F8FAFC]/70 text-lg">
            Manage and track all your insurance policies in one place.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#F8FAFC] mb-2">${(totalCoverage / 1000).toFixed(0)}K</div>
            <div className="text-[#F8FAFC]/60 text-sm">Total Coverage</div>
          </div>
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#F8FAFC] mb-2">{insurances.length}</div>
            <div className="text-[#F8FAFC]/60 text-sm">Active Policies</div>
          </div>
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#F8FAFC] mb-2">
              ${totalAnnualPremium.toLocaleString()}
            </div>
            <div className="text-[#F8FAFC]/60 text-sm">Annual Premium</div>
          </div>
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#F8FAFC] mb-2">
              {selectedInsurances.length}
            </div>
            <div className="text-[#F8FAFC]/60 text-sm">Selected</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Insurance Table */}
          <div className="lg:col-span-3">
            {/* Actions Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleSelectAll}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors"
                >
                  <div className="w-4 h-4 border border-[#F8FAFC]/40 rounded"></div>
                  Select All
                </button>
                {selectedInsurances.length > 0 && (
                  <button
                    onClick={deleteSelectedInsurances}
                    className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    Delete Selected ({selectedInsurances.length})
                  </button>
                )}
              </div>
              
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:shadow-lg hover:shadow-[#F9C74F]/30 transition-all duration-300 hover:scale-105"
              >
                Add New Insurance
              </button>
            </div>

            {/* Insurance Table */}
            <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 border-b border-[#F8FAFC]/10 text-[#F8FAFC] font-semibold text-sm">
                <div className="col-span-1"></div>
                <div className="col-span-3">PROVIDER</div>
                <div className="col-span-4">POLICY TYPE</div>
                <div className="col-span-2">VALUE / PREMIUM</div>
                <div className="col-span-2">ACTIONS</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-[#F8FAFC]/10">
                {insurances.map((insurance) => (
                  <div key={insurance.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition-colors">
                    {/* Checkbox */}
                    <div className="col-span-1 flex items-center">
                      <input
                        type="checkbox"
                        checked={insurance.isSelected}
                        onChange={() => toggleSelectInsurance(insurance.id)}
                        className="w-4 h-4 text-[#F9C74F] bg-white/5 border-[#F8FAFC]/20 rounded focus:ring-[#F9C74F] focus:ring-2"
                      />
                    </div>

                    {/* Provider */}
                    <div className="col-span-3 flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <span className="text-lg">{getPolicyIcon(insurance.policyType)}</span>
                      </div>
                      <div>
                        <div className="text-[#F8FAFC] font-semibold">{insurance.provider}</div>
                        <div className="text-[#F8FAFC]/60 text-xs">Policy: {insurance.policyNumber}</div>
                      </div>
                    </div>

                    {/* Policy Type */}
                    <div className="col-span-4 flex items-center">
                      <div>
                        <div className="text-[#F8FAFC] font-medium">{insurance.policyType}</div>
                        <div className="text-[#F8FAFC]/60 text-xs">
                          Renews: {new Date(insurance.renewalDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Value / Premium */}
                    <div className="col-span-2 flex items-center">
                      <div>
                        <div className="text-[#F8FAFC] font-bold text-lg">
                          ${insurance.coverage.toLocaleString()}
                        </div>
                        <div className="text-[#F9C74F] text-sm font-semibold">
                          ${insurance.premium.toLocaleString()} / {insurance.premiumFrequency}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 flex items-center gap-2">
                      <button className="p-2 text-[#F8FAFC]/40 hover:text-[#F9C74F] transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="p-2 text-[#F8FAFC]/40 hover:text-red-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Empty State */}
            {insurances.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-2">No Insurance Policies</h3>
                <p className="text-[#F8FAFC]/60 mb-4">Get started by adding your first insurance policy.</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-6 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Add Your First Policy
                </button>
              </div>
            )}
          </div>

          {/* Sidebar - Add Form or Summary */}
          <div className="lg:col-span-1 space-y-6">
            {showAddForm ? (
              <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
                <h3 className="text-xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-4">
                  Add New Insurance
                </h3>
                <form onSubmit={handleAddInsurance} className="space-y-4">
                  <div>
                    <label className="block text-[#F8FAFC] text-sm font-semibold mb-2">
                      Provider
                    </label>
                    <input
                      type="text"
                      value={newInsurance.provider}
                      onChange={(e) => setNewInsurance({...newInsurance, provider: e.target.value})}
                      placeholder="e.g., State Farm, Geico"
                      className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#F8FAFC] text-sm font-semibold mb-2">
                      Policy Type
                    </label>
                    <select
                      value={newInsurance.policyType}
                      onChange={(e) => setNewInsurance({...newInsurance, policyType: e.target.value})}
                      className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] focus:outline-none focus:border-[#F9C74F] transition-colors"
                      required
                    >
                      <option value="">Select policy type</option>
                      <option value="Term Life Insurance">Term Life Insurance</option>
                      <option value="Auto Insurance">Auto Insurance</option>
                      <option value="Homeowners Insurance">Homeowners Insurance</option>
                      <option value="Health Insurance">Health Insurance</option>
                      <option value="Renters Insurance">Renters Insurance</option>
                      <option value="Disability Insurance">Disability Insurance</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-[#F8FAFC] text-sm font-semibold mb-2">
                      Coverage Amount
                    </label>
                    <input
                      type="number"
                      value={newInsurance.coverage}
                      onChange={(e) => setNewInsurance({...newInsurance, coverage: e.target.value})}
                      placeholder="500000"
                      className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#F8FAFC] text-sm font-semibold mb-2">
                      Premium Amount
                    </label>
                    <input
                      type="number"
                      value={newInsurance.premium}
                      onChange={(e) => setNewInsurance({...newInsurance, premium: e.target.value})}
                      placeholder="1200"
                      className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      Add Policy
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
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">Insurance Summary</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-[#F8FAFC]/60 text-sm">Total Coverage</div>
                    <div className="text-2xl font-bold text-[#F8FAFC]">${(totalCoverage / 1000).toFixed(0)}K</div>
                  </div>
                  <div>
                    <div className="text-[#F8FAFC]/60 text-sm">Annual Premium</div>
                    <div className="text-lg font-semibold text-[#F8FAFC]">
                      ${totalAnnualPremium.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#F8FAFC]/60 text-sm">Policies</div>
                    <div className="text-lg font-semibold text-[#F8FAFC]">
                      {insurances.length} Active
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-[#F9C74F]/10 to-[#F9844A]/10 border border-[#F9C74F]/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-left">
                  Policy Documents
                </button>
                <button className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-left">
                  Renewal Calendar
                </button>
                <button className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-left">
                  Claims History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;