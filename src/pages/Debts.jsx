import React, { useState } from 'react';

const Debts = () => {
  const [debts, setDebts] = useState([
    {
      id: 1,
      provider: 'Chase',
      accountName: 'Sapphire Preferred',
      amount: 5432.10,
      interestRate: '18.5%',
      dueDate: '2024-02-15',
      minimumPayment: 125.00,
      isSelected: false
    },
    {
      id: 2,
      provider: 'Amex',
      accountName: 'Gold Card',
      amount: 2123.45,
      interestRate: '19.2%',
      dueDate: '2024-02-20',
      minimumPayment: 65.00,
      isSelected: false
    },
    {
      id: 3,
      provider: 'Citi',
      accountName: 'Double Cash',
      amount: 8785.90,
      interestRate: '17.9%',
      dueDate: '2024-02-25',
      minimumPayment: 185.00,
      isSelected: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newDebt, setNewDebt] = useState({
    provider: '',
    accountName: '',
    amount: '',
    interestRate: '',
    dueDate: ''
  });

  const toggleSelectAll = () => {
    const allSelected = debts.every(debt => debt.isSelected);
    setDebts(debts.map(debt => ({ ...debt, isSelected: !allSelected })));
  };

  const toggleSelectDebt = (id) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, isSelected: !debt.isSelected } : debt
    ));
  };

  const handleAddDebt = (e) => {
    e.preventDefault();
    const debt = {
      id: debts.length + 1,
      provider: newDebt.provider,
      accountName: newDebt.accountName,
      amount: parseFloat(newDebt.amount),
      interestRate: newDebt.interestRate,
      dueDate: newDebt.dueDate,
      minimumPayment: parseFloat(newDebt.amount) * 0.02,
      isSelected: false
    };
    setDebts([...debts, debt]);
    setNewDebt({ provider: '', accountName: '', amount: '', interestRate: '', dueDate: '' });
    setShowAddForm(false);
  };

  const deleteSelectedDebts = () => {
    setDebts(debts.filter(debt => !debt.isSelected));
  };

  const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);
  const selectedDebts = debts.filter(debt => debt.isSelected);
  const totalSelected = selectedDebts.reduce((sum, debt) => sum + debt.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-[#F9C74F] text-sm font-semibold mb-4">
            <div className="w-2 h-2 bg-[#F9C74F] rounded-full"></div>
            DEBT MANAGEMENT
          </div>
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-4">
            Debts
          </h1>
          <p className="text-[#F8FAFC]/70 text-lg">
            Manage and track all your outstanding debts in one place.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#F8FAFC] mb-2">${totalDebt.toLocaleString()}</div>
            <div className="text-[#F8FAFC]/60 text-sm">Total Debt</div>
          </div>
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#F8FAFC] mb-2">{debts.length}</div>
            <div className="text-[#F8FAFC]/60 text-sm">Accounts</div>
          </div>
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#F8FAFC] mb-2">
              ${debts.reduce((sum, debt) => sum + debt.minimumPayment, 0).toLocaleString()}
            </div>
            <div className="text-[#F8FAFC]/60 text-sm">Monthly Payments</div>
          </div>
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#F8FAFC] mb-2">
              {selectedDebts.length}
            </div>
            <div className="text-[#F8FAFC]/60 text-sm">Selected</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Debts Table */}
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
                {selectedDebts.length > 0 && (
                  <button
                    onClick={deleteSelectedDebts}
                    className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    Delete Selected ({selectedDebts.length})
                  </button>
                )}
              </div>
              
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:shadow-lg hover:shadow-[#F9C74F]/30 transition-all duration-300 hover:scale-105"
              >
                Add New Debt
              </button>
            </div>

            {/* Debts Table */}
            <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 border-b border-[#F8FAFC]/10 text-[#F8FAFC] font-semibold text-sm">
                <div className="col-span-1"></div>
                <div className="col-span-3">PROVIDER</div>
                <div className="col-span-4">ACCOUNT NAME</div>
                <div className="col-span-2">AMOUNT</div>
                <div className="col-span-2">ACTIONS</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-[#F8FAFC]/10">
                {debts.map((debt) => (
                  <div key={debt.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition-colors">
                    {/* Checkbox */}
                    <div className="col-span-1 flex items-center">
                      <input
                        type="checkbox"
                        checked={debt.isSelected}
                        onChange={() => toggleSelectDebt(debt.id)}
                        className="w-4 h-4 text-[#F9C74F] bg-white/5 border-[#F8FAFC]/20 rounded focus:ring-[#F9C74F] focus:ring-2"
                      />
                    </div>

                    {/* Provider */}
                    <div className="col-span-3 flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <span className="text-lg">🏦</span>
                      </div>
                      <div>
                        <div className="text-[#F8FAFC] font-semibold">{debt.provider}</div>
                        <div className="text-[#F8FAFC]/60 text-xs">{debt.interestRate} APR</div>
                      </div>
                    </div>

                    {/* Account Name */}
                    <div className="col-span-4 flex items-center">
                      <div>
                        <div className="text-[#F8FAFC] font-medium">{debt.accountName}</div>
                        <div className="text-[#F8FAFC]/60 text-xs">
                          Due {new Date(debt.dueDate).toLocaleDateString()} • Min: ${debt.minimumPayment}
                        </div>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="col-span-2 flex items-center">
                      <div className="text-[#F8FAFC] font-bold text-lg">
                        ${debt.amount.toLocaleString()}
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
            {debts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💳</span>
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-2">No Debts Found</h3>
                <p className="text-[#F8FAFC]/60 mb-4">Get started by adding your first debt account.</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-6 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Add Your First Debt
                </button>
              </div>
            )}
          </div>

          {/* Sidebar - Add Form or Summary */}
          <div className="lg:col-span-1 space-y-6">
            {showAddForm ? (
              <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
                <h3 className="text-xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-4">
                  Add New Debt
                </h3>
                <form onSubmit={handleAddDebt} className="space-y-4">
                  <div>
                    <label className="block text-[#F8FAFC] text-sm font-semibold mb-2">
                      Provider
                    </label>
                    <input
                      type="text"
                      value={newDebt.provider}
                      onChange={(e) => setNewDebt({...newDebt, provider: e.target.value})}
                      placeholder="e.g., Chase, Amex"
                      className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#F8FAFC] text-sm font-semibold mb-2">
                      Account Name
                    </label>
                    <input
                      type="text"
                      value={newDebt.accountName}
                      onChange={(e) => setNewDebt({...newDebt, accountName: e.target.value})}
                      placeholder="e.g., Sapphire Preferred"
                      className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#F8FAFC] text-sm font-semibold mb-2">
                      Amount
                    </label>
                    <input
                      type="number"
                      value={newDebt.amount}
                      onChange={(e) => setNewDebt({...newDebt, amount: e.target.value})}
                      placeholder="0.00"
                      className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#F8FAFC] text-sm font-semibold mb-2">
                      Interest Rate
                    </label>
                    <input
                      type="text"
                      value={newDebt.interestRate}
                      onChange={(e) => setNewDebt({...newDebt, interestRate: e.target.value})}
                      placeholder="e.g., 18.5%"
                      className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      Add Debt
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
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">Debt Summary</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-[#F8FAFC]/60 text-sm">Total Debt</div>
                    <div className="text-2xl font-bold text-[#F8FAFC]">${totalDebt.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[#F8FAFC]/60 text-sm">Monthly Payments</div>
                    <div className="text-lg font-semibold text-[#F8FAFC]">
                      ${debts.reduce((sum, debt) => sum + debt.minimumPayment, 0).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#F8FAFC]/60 text-sm">Highest Debt</div>
                    <div className="text-lg font-semibold text-[#F8FAFC]">
                      ${Math.max(...debts.map(d => d.amount)).toLocaleString()}
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
                  Debt Payoff Plan
                </button>
                <button className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-left">
                  Export Debt Report
                </button>
                <button className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-left">
                  Payment Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debts;