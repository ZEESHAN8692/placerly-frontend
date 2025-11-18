import React, { useState } from 'react';

import DataTable from 'react-data-table-component';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createDebt, deleteDebt, getDebts, updateDebt } from '../queryFunction/queryFunction';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import DashboardLayout from '../layout/Sidebar';

const Debts = () => {
  const queryClient = useQueryClient();

  // Fetch Debts
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['debts'],
    queryFn: getDebts,
    staleTime: 1000 * 60,
  });
  console.log(data);

  const debts = Array.isArray(data) ? data : data?.data ?? [];

  // Mutations
  const { mutate: createMutate, isLoading: isCreating } = useMutation({
    mutationFn: (payload) => createDebt(payload),
    onSuccess: () => {
      toast.success('Debt Created Successfully');
      queryClient.invalidateQueries(['debts']);
      closeModal();
    },
    onError: () => toast.error('Debt Creation Failed'),
  });

  const { mutate: updateMutate, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, payload }) => updateDebt(id, payload),
    onSuccess: () => {
      toast.success('Debt Updated Successfully');
      queryClient.invalidateQueries(['debts']);
      closeModal();
    },
    onError: () => toast.error('Debt Update Failed'),
  });


  
    const { mutate: deleteMutate, isLoading: isDeleting } = useMutation({
      mutationFn: (id) => deleteDebt(id),
      onSuccess: () => {
        toast.success('Asset Deleted Successfully');
        queryClient.invalidateQueries(['assets']);
      },
      onError: () => toast.error('Failed to delete asset'),
    });



  // Local state
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    amount: '',
    accountName: '',
    accountNumber: '',
  });

  // Modal open/close
  const openModal = (debt = null) => {
    if (debt) {
      setEditMode(true);
      setFormData(debt);
    } else {
      setEditMode(false);
      setFormData({
        name: '',
        type: '',
        amount: '',
        accountName: '',
        accountNumber: '',
        dueDate: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setFormData({
      name: '',
      type: '',
      amount: '',
      accountName: '',
      accountNumber: '',
      dueDate: '',
    });
  };


  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      deleteMutate(id);
    }
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.type || formData.amount === '') {
      toast.error('Please fill all fields');
      return;
    }

    const payload = {
      name: formData.name,
      type: formData.type,
      amount: parseFloat(formData.amount),
      accountName: formData.accountName,
      accountNumber: formData.accountNumber,
      dueDate: formData.dueDate
    };

    if (editMode) {
      updateMutate({ id: formData._id ?? formData.id, payload });
    } else {
      createMutate(payload);
    }
  };

  // Columns
  const columns = [
    { name: 'Name', selector: (row) => row.name, sortable: true },
    { name: 'Type', selector: (row) => row.type, sortable: true },
    {
      name: 'Amount',
      selector: (row) => `$${parseFloat(row.amount || 0).toLocaleString()}`,
      sortable: true,
    },
    { name: 'Account Name', selector: (row) => row.accountName ?? '—', sortable: true },
    { name: 'Account Number', selector: (row) => row.accountNumber ?? '—', sortable: true },
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex gap-3">
          <button onClick={() => openModal(row)}>
            <FiEdit className="text-yellow-400 hover:text-yellow-300 cursor-pointer" />
          </button>
          <button onClick={() => handleDelete(row.id ?? row._id)}>
            <FiTrash2 className="text-red-400 hover:text-red-300 cursor-pointer" />
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
          Loading debts...
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center text-red-400">
          Error loading debts: {error?.message ?? 'Something went wrong'}
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
              ${data?.debtsValue[0]?.total}
            </div>
            <div className="text-[#F8FAFC]/60 text-sm">Total Debts</div>
          </div>
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#F8FAFC] mb-2">{data?.count ?? debts.length}</div>
            <div className="text-[#F8FAFC]/60 text-sm">Accounts</div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#F9C74F]">Debts</h1>
              <p className="text-[#F8FAFC]/70">Manage all your debts easily</p>
            </div>
            <button
              onClick={() => openModal()}
              className="cursor-pointer px-6 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:scale-105 transition-all"
            >
              + Add Debt
            </button>
          </div>

          {/* Table */}
          <DataTable
            columns={columns}
            data={debts}
            pagination
            highlightOnHover
            dense
            customStyles={{
              table: { style: { backgroundColor: '#0B192D' } },
              headRow: { style: { backgroundColor: '#10233F', height: '60px' } },
              headCells: {
                style: {
                  color: '#F9C74F',
                  fontWeight: 'bold',
                  fontSize: '15px',
                },
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
                  '&:disabled': { opacity: 0.4 },
                },
              },
            }}
          />
        </div>

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
                {editMode ? 'Edit Debt' : 'Add New Debt'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter Debt Name"
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  placeholder="Enter Debt Type (e.g. Credit Card)"
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="Enter Amount"
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />
                <input
                  type="text"
                  value={formData.accountName}
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                  placeholder="Enter Account Name"
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />
                <input
                  type="number"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  placeholder="Enter Account Number"
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />

                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  placeholder="Enter Due Date"
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isCreating || isUpdating}
                    className="cursor-pointer flex-1 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg"
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
                    className="px-4 py-2 border border-[#F8FAFC]/30 text-[#F8FAFC] rounded-lg cursor-pointer"
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

export default Debts;
