import React, { useState } from 'react';
import DashboardLayout from '../layout/sidebar';
import DataTable from 'react-data-table-component';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUtility, getUtilities, updateUtility, deleteUtility } from '../queryFunction/queryFunction';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiX } from 'react-icons/fi';

const UtilitiesPage = () => {
  const queryClient = useQueryClient();

  // ===== Fetch Utilities =====
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['utilities'],
    queryFn: getUtilities,
    staleTime: 1000 * 60,
  });

  const utilities = Array.isArray(data) ? data : data?.data ?? [];

  // ===== Mutations =====
  const { mutate: createMutate, isLoading: isCreating } = useMutation({
    mutationFn: (payload) => createUtility(payload),
    onSuccess: () => {
      toast.success('Utility Created Successfully');
      queryClient.invalidateQueries(['utilities']);
      closeModal();
    },
    onError: () => toast.error('Failed to create utility'),
  });

  const { mutate: updateMutate, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, payload }) => updateUtility(id, payload),
    onSuccess: () => {
      toast.success('Utility Updated Successfully');
      queryClient.invalidateQueries(['utilities']);
      closeModal();
    },
    onError: () => toast.error('Failed to update utility'),
  });

  const { mutate: deleteMutate, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteUtility(id),
    onSuccess: () => {
      toast.success('Utility Deleted Successfully');
      queryClient.invalidateQueries(['utilities']);
    },
    onError: () => toast.error('Failed to delete utility'),
  });

  // ===== Local State =====
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    accountNumber: '',
    billingCycle: '',
    outstandingBill: '',
  });

  // ===== Modal Handling =====
  const openModal = (utility = null) => {
    if (utility) {
      setEditMode(true);
      setFormData(utility);
    } else {
      setEditMode(false);
      setFormData({
        type: '',
        name: '',
        accountNumber: '',
        billingCycle: '',
        outstandingBill: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setFormData({
      type: '',
      name: '',
      accountNumber: '',
      billingCycle: '',
      outstandingBill: '',
    });
  };

  // ===== Delete Handler =====
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this utility?')) {
      deleteMutate(id);
    }
  };

  // ===== Submit Handler =====
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.type || !formData.name || !formData.accountNumber || !formData.billingCycle || formData.outstandingBill === '') {
      toast.error('Please fill all fields');
      return;
    }

    const payload = {
      type: formData.type,
      name: formData.name,
      accountNumber: formData.accountNumber,
      billingCycle: formData.billingCycle,
      outstandingBill: parseFloat(formData.outstandingBill),
    };

    if (editMode) {
      updateMutate({ id: formData.id ?? formData._id, payload });
    } else {
      createMutate(payload);
    }
  };

  // ===== Total Outstanding Bill =====
  const totalOutstanding =
    utilities.reduce((sum, item) => sum + (parseFloat(item.outstandingBill) || 0), 0) || 0;

  // ===== Table Columns =====
  const columns = [
    { name: 'Type', selector: (row) => row.type, sortable: true },
    { name: 'Name', selector: (row) => row.name, sortable: true },
    { name: 'Account Number', selector: (row) => row.accountNumber, sortable: true },
    { name: 'Billing Cycle', selector: (row) => row.billingCycle, sortable: true },
    {
      name: 'Outstanding Bill',
      selector: (row) => `$${parseFloat(row.outstandingBill || 0).toFixed(2)}`,
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
          Loading utilities...
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center text-red-400">
          Error loading utilities: {error?.message ?? 'Something went wrong'}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] p-6 text-[#F8FAFC]">
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#F8FAFC] mb-2">
              ${totalOutstanding.toFixed(2)}
            </div>
            <div className="text-[#F8FAFC]/60 text-sm">This Month’s Total</div>
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#F9C74F]">Utilities</h1>
            <p className="text-[#F8FAFC]/70">Manage all your utilities easily</p>
          </div>
          <button
            onClick={() => openModal()}
            className="px-6 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:scale-105 transition-all"
          >
            + Add Utility
          </button>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={utilities}
          pagination
          highlightOnHover
          dense
          progressPending={isDeleting}
          customStyles={{
            table: { style: { backgroundColor: '#0B192D' } },
            headRow: { style: { backgroundColor: '#10233F', height: '60px' } },
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
              style: { color: '#F8FAFC', fontSize: '14px', padding: '15px 20px' },
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
                {editMode ? 'Edit Utility' : 'Add New Utility'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  placeholder="Enter Type"
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter Name"
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  placeholder="Enter Account Number"
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />
                <input
                  type="text"
                  value={formData.billingCycle}
                  onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })}
                  placeholder="Enter Billing Cycle"
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />
                <input
                  type="number"
                  value={formData.outstandingBill}
                  onChange={(e) => setFormData({ ...formData, outstandingBill: e.target.value })}
                  placeholder="Enter Outstanding Bill"
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

export default UtilitiesPage;
