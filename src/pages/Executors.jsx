import React, { useState } from 'react';

import { createExecuter, getExecuters, deleteExecuter } from '../queryFunction/queryFunction';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FiTrash2 } from 'react-icons/fi';
import DashboardLayout from '../layout/Sidebar';

const Executors = () => {

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['executers'],
    queryFn: getExecuters
  });
  
  const executors = data?.data || [];
  // console.log(executors);


  const { mutate: createExec, isLoading: isCreating } = useMutation({
    mutationFn: (payload) => createExecuter(payload),
    onSuccess: () => {
      toast.success('Executor Created Successfully');
      refetch();
      setShowAddForm(false);
      setNewExecutor({ name: '', email: '', contactNumber: '' });
    },
    onError: () => toast.error('Executor Creation Failed')
  });


  const { mutate: removeExec } = useMutation({
    mutationFn: (id) => deleteExecuter(id),
    onSuccess: () => {
      toast.success('Executor Deleted');
      refetch();
    },
    onError: () => toast.error('Delete Failed')
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newExecutor, setNewExecutor] = useState({
    name: '',
    email: '',
    contactNumber: ''
  });

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-400' : 'bg-yellow-400';
  };

  const handleAddExecutor = (e) => {
    e.preventDefault();
    createExec(newExecutor);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] py-8 px-6">

        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-6">
          Manage Your <span className="text-yellow-400">Executors</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          
          <div className="lg:col-span-2">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Your Executors</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-black font-bold rounded-lg cursor-pointer"
              >
                Add Executor
              </button>
            </div>

           
            {isLoading && <p className="text-white">Loading...</p>}

            <div className="space-y-4">
              {executors.map((executor) => (
                <div
                  key={executor._id}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">

                      {/* Avatar */}
                      <div className="relative">
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${executor.name}&backgroundColor=FACC15&backgroundType=solid`}
                          className="w-12 h-12 rounded-full"
                          alt={executor.name}
                        />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0B1F3A] ${getStatusColor("active")}`}></div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-white">{executor.name}</h3>

                        <div className="mt-2 space-y-1 text-sm text-gray-300">
                          <p>Email: {executor.email}</p>
                          <p>Phone: {executor.contactNumber}</p>
                          <p className={executor.status === 'approved' ? 'text-green-400' : 'text-yellow-400'}>Status: {executor.status}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeExec(executor._id)}
                      className="p-2 text-red-400 hover:text-red-500"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>


          <div className="space-y-6">

            {showAddForm ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Add New Executor</h3>

                <form onSubmit={handleAddExecutor} className="space-y-4">

                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newExecutor.name}
                    onChange={(e) => setNewExecutor({ ...newExecutor, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-white/10 text-white rounded"
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    value={newExecutor.email}
                    onChange={(e) => setNewExecutor({ ...newExecutor, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-white/10 text-white rounded"
                  />

                  <input
                    type="text"
                    placeholder="Contact Number"
                    value={newExecutor.contactNumber}
                    onChange={(e) => setNewExecutor({ ...newExecutor, contactNumber: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-white/10 text-white rounded"
                  />

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-black font-bold rounded cursor-pointer"
                    >
                      {isCreating ? "Adding..." : "Add Executor"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 border border-white/30 text-white rounded cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">About Executors</h3>
                <p className="text-gray-300 text-sm">
                  Executors manage your financial affairs and fulfill your estate planning duties.
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Executors;
