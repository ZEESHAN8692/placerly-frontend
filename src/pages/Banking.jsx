import React, { useState } from 'react';
import DashboardLayout from '../layout/sidebar';
import DataTable from 'react-data-table-component';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {  getBankings, createBanking, updateBanking, deleteBanking } from '../queryFunction/queryFunction';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiX } from 'react-icons/fi';

const BankingPage = () => {
  const queryClient = useQueryClient();

  // ===== Fetch Banking Data =====
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['banks'],
    queryFn: getBankings, 
    staleTime: 1000 * 60,
  });
  const banks = Array.isArray(data) ? data : data?.data ?? [];

  // ===== Mutations =====
  const { mutate: createMutate, isLoading: isCreating } = useMutation({
    mutationFn: (payload) => createBanking(payload),
    onSuccess: () => {
      toast.success('Bank Account Created Successfully');
      queryClient.invalidateQueries(['banks']);
      closeModal();
    },
    onError: () => toast.error('Failed to Create Bank Account'),
  });

  const { mutate: updateMutate, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, payload }) => updateBanking(id, payload), 
    onSuccess: () => {
      toast.success('Bank Account Updated Successfully');
      queryClient.invalidateQueries(['banks']);
      closeModal();
    },
    onError: () => toast.error('Failed to Update Bank Account'),
  });

  const { mutate: deleteMutate, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteBanking(id),
    onSuccess: () => {
      toast.success('Bank Account Deleted Successfully');
      queryClient.invalidateQueries(['banks']);
    },
    onError: () => toast.error('Failed to Delete Bank Account'),
  });

  // ===== Local State =====
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    type: 'savings',
    accountName: '',
    accountNumber: '',
    balance: '',
  });

  // ===== Modal Handling =====
  const openModal = (bank = null) => {
    if (bank) {
      setEditMode(true);
      setFormData(bank);
    } else {
      setEditMode(false);
      setFormData({
        type: 'savings',
        accountName: '',
        accountNumber: '',
        balance: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setFormData({
      type: 'savings',
      accountName: '',
      accountNumber: '',
      balance: '',
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this bank account?')) {
      deleteMutate(id);
    }
  };

  // ===== Submit Handler =====
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.accountName || !formData.type || formData.balance === '' || !formData.accountNumber) {
      toast.error('Please fill all fields');
      return;
    }

    const payload = {
      type: formData.type,
      accountName: formData.accountName,
      accountNumber: formData.accountNumber,
      balance: parseFloat(formData.balance),
    };

    if (editMode) {
      updateMutate({ id: formData.id ?? formData._id, payload });
    } else {
      createMutate(payload);
    }
  };

  // ===== Table Columns =====
  const columns = [
    { name: 'Account Name', selector: (row) => row.accountName, sortable: true },
    { name: 'Type', selector: (row) => row.type, sortable: true },
    { name: 'Account Number', selector: (row) => row.accountNumber, sortable: true },
    {
      name: 'Balance',
      selector: (row) => `$${parseFloat(row.balance || 0).toLocaleString()}`,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex gap-3">
          <button onClick={() => openModal(row)}>
            <FiEdit className="text-yellow-400 hover:text-yellow-300" />
          </button>
          <button onClick={() => handleDelete(row.id ?? row._id)}>
            <FiTrash2 className="text-red-400 hover:text-red-300" />
          </button>
        </div>
      ),
      center: true,
    },
  ];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center text-white">
          Loading bank accounts...
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center text-red-400">
          Error loading bank accounts: {error?.message ?? 'Something went wrong'}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] p-6 text-[#F8FAFC]">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#F8FAFC] mb-2">
              $ {data?.totalBalance}
            </div>
            <div className="text-[#F8FAFC]/60 text-sm">Total Balance</div>
          </div>
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#F8FAFC] mb-2">{data?.count ?? 0}</div>
            <div className="text-[#F8FAFC]/60 text-sm">Total Accounts</div>
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#F9C74F]">Banking</h1>
            <p className="text-[#F8FAFC]/70">Manage all your bank accounts easily</p>
          </div>
          <button
            onClick={() => openModal()}
            className="px-6 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:scale-105 transition-all"
          >
            + Add Bank Account
          </button>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={banks}
          pagination
          highlightOnHover
          dense
          progressPending={isDeleting}
          customStyles={{
            table: { style: { backgroundColor: '#0B192D' } },
            headRow: { style: { backgroundColor: '#10233F', height: '70px' } },
            headCells: {
              style: { color: '#F9C74F', fontWeight: 'bold', fontSize: '15px' },
            },
            rows: {
              style: {
                backgroundColor: '#0B192D',
                minHeight: '65px',
                borderBottomColor: '#1B2A45',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              },
              highlightOnHoverStyle: {
                backgroundColor: '#1A2F4C',
                color: '#F9C74F',
                transition: 'all 0.25s ease',
              },
            },
            cells: {
              style: {
                color: '#F8FAFC',
                fontSize: '14px',
                padding: '15px 20px',
              },
            },
            pagination: {
              style: {
                backgroundColor: '#0B192D',
                color: '#FFF',
                borderTop: '1px solid #1B2A45',
              },
              pageButtonsStyle: {
                color: '#FFF',
                fill: '#FFF',
                '&:hover:not(:disabled)': {
                  backgroundColor: '#1A2F4C',
                  color: '#F9C74F',
                },
                '&:disabled': {
                  opacity: 0.4,
                },
              },
            },
          }}
        />

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#0B1F3A] border border-[#F8FAFC]/20 rounded-2xl p-6 w-full max-w-md relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-[#F8FAFC]/70 hover:text-white"
              >
                <FiX size={20} />
              </button>
              <h3 className="text-xl font-bold text-[#F8FAFC] mb-4">
                {editMode ? 'Edit Bank Account' : 'Add New Bank Account'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={formData.accountName}
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                  placeholder="Enter Account Name"
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  placeholder="Enter Account Number"
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                >
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                  <option value="business">Business</option>
                </select>
                <input
                  type="number"
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                  placeholder="Enter Balance"
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isCreating || isUpdating}
                    className="flex-1 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg"
                  >
                    {editMode
                      ? isUpdating
                        ? 'Updating...'
                        : 'Update'
                      : isCreating
                      ? 'Adding...'
                      : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-[#F8FAFC]/30 text-[#F8FAFC] rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BankingPage;
