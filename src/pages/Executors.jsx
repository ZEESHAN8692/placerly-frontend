import React, { useState } from 'react';

const Executors = () => {
  const [executors, setExecutors] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      relationship: "Spouse",
      access: "Full Access",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1 (555) 987-6543",
      relationship: "Sibling",
      access: "Limited Access",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      name: "Peter Jones",
      email: "peter.jones@email.com",
      phone: "+1 (555) 555-5555",
      relationship: "Friend",
      access: "Read-Only",
      status: "pending",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newExecutor, setNewExecutor] = useState({
    name: '',
    email: '',
    phone: '',
    relationship: '',
    access: 'Read-Only'
  });

  const handleAddExecutor = (e) => {
    e.preventDefault();
    const executor = {
      id: executors.length + 1,
      ...newExecutor,
      status: 'pending',
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    };
    setExecutors([...executors, executor]);
    setNewExecutor({
      name: '',
      email: '',
      phone: '',
      relationship: '',
      access: 'Read-Only'
    });
    setShowAddForm(false);
  };

  const removeExecutor = (id) => {
    setExecutors(executors.filter(executor => executor.id !== id));
  };

  const getAccessColor = (access) => {
    switch (access) {
      case 'Full Access':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Limited Access':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Read-Only':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-400' 
      : 'bg-yellow-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-[#F9C74F] text-sm font-semibold mb-4">
            <div className="w-2 h-2 bg-[#F9C74F] rounded-full"></div>
            ESTATE PLANNING
          </div>
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-4">
            Manage Your <span className="text-[#F9C74F]">Executors</span>
          </h1>
          <p className="text-[#F8FAFC]/70 text-lg max-w-2xl">
            Manage individuals who will handle your financial affairs and ensure your wishes are carried out according to your estate plan.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#F8FAFC] mb-2">{executors.length}</div>
            <div className="text-[#F8FAFC]/60 text-sm">Total Executors</div>
          </div>
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#F8FAFC] mb-2">
              {executors.filter(e => e.status === 'active').length}
            </div>
            <div className="text-[#F8FAFC]/60 text-sm">Active</div>
          </div>
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#F8FAFC] mb-2">
              {executors.filter(e => e.access === 'Full Access').length}
            </div>
            <div className="text-[#F8FAFC]/60 text-sm">Full Access</div>
          </div>
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#F8FAFC] mb-2">
              {executors.filter(e => e.status === 'pending').length}
            </div>
            <div className="text-[#F8FAFC]/60 text-sm">Pending</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Executors List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC]">
                Your Executors
              </h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:shadow-lg hover:shadow-[#F9C74F]/30 transition-all duration-300 hover:scale-105"
              >
                Add Executor
              </button>
            </div>

            <div className="space-y-4">
              {executors.map((executor) => (
                <div
                  key={executor.id}
                  className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6 hover:border-[#F9C74F]/30 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={executor.avatar}
                          alt={executor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0B1F3A] ${getStatusColor(executor.status)}`}></div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-[#F8FAFC]">{executor.name}</h3>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getAccessColor(executor.access)}`}>
                            {executor.access}
                          </span>
                        </div>
                        
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-[#F8FAFC]/70">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {executor.email}
                          </div>
                          <div className="flex items-center gap-2 text-[#F8FAFC]/70">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {executor.phone}
                          </div>
                          <div className="flex items-center gap-2 text-[#F9C74F] font-semibold">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Relationship: {executor.relationship}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-2 text-[#F8FAFC]/40 hover:text-[#F9C74F] transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => removeExecutor(executor.id)}
                        className="p-2 text-[#F8FAFC]/40 hover:text-red-400 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Executor Form / Info Panel */}
          <div className="space-y-6">
            {showAddForm ? (
              <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
                <h3 className="text-xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-4">
                  Add New Executor
                </h3>
                <form onSubmit={handleAddExecutor} className="space-y-4">
                  <div>
                    <label className="block text-[#F8FAFC] text-sm font-semibold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={newExecutor.name}
                      onChange={(e) => setNewExecutor({...newExecutor, name: e.target.value})}
                      placeholder="Enter full name"
                      className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#F8FAFC] text-sm font-semibold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={newExecutor.email}
                      onChange={(e) => setNewExecutor({...newExecutor, email: e.target.value})}
                      placeholder="Enter email address"
                      className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#F8FAFC] text-sm font-semibold mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={newExecutor.phone}
                      onChange={(e) => setNewExecutor({...newExecutor, phone: e.target.value})}
                      placeholder="Enter phone number"
                      className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#F8FAFC] text-sm font-semibold mb-2">
                      Relationship
                    </label>
                    <select
                      value={newExecutor.relationship}
                      onChange={(e) => setNewExecutor({...newExecutor, relationship: e.target.value})}
                      className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] focus:outline-none focus:border-[#F9C74F] transition-colors"
                      required
                    >
                      <option value="">Select relationship</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Child">Child</option>
                      <option value="Parent">Parent</option>
                      <option value="Friend">Friend</option>
                      <option value="Attorney">Attorney</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-[#F8FAFC] text-sm font-semibold mb-2">
                      Access Level
                    </label>
                    <select
                      value={newExecutor.access}
                      onChange={(e) => setNewExecutor({...newExecutor, access: e.target.value})}
                      className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] focus:outline-none focus:border-[#F9C74F] transition-colors"
                    >
                      <option value="Read-Only">Read-Only</option>
                      <option value="Limited Access">Limited Access</option>
                      <option value="Full Access">Full Access</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      Add Executor
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
              <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
                <h3 className="text-xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-4">
                  About Executors
                </h3>
                <div className="space-y-4 text-[#F8FAFC]/70 text-sm">
                  <p>
                    Executors are individuals you appoint to manage your financial affairs and ensure your wishes are carried out according to your estate plan.
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="text-[#F9C74F] font-semibold">Access Levels:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span><strong>Full Access:</strong> Complete management capabilities</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span><strong>Limited Access:</strong> Specific, restricted permissions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span><strong>Read-Only:</strong> View-only access to information</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-[#F9C74F]/10 to-[#F9844A]/10 border border-[#F9C74F]/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-left">
                  Download Executor Documents
                </button>
                <button className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-left">
                  Share Access Instructions
                </button>
                <button className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/10 rounded-lg text-[#F8FAFC] hover:border-[#F9C74F] transition-colors text-left">
                  View Activity Log
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Executors;