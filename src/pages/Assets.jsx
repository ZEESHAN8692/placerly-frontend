import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/sidebar';
import DataTable from 'react-data-table-component';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAsset, getAssets, updateAsset } from '../queryFunction/queryFunction';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiX } from 'react-icons/fi';

const AssetsPage = () => {
  const queryClient = useQueryClient();

  // Fetch Assets
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['assets'],
    queryFn: getAssets,
    staleTime: 1000 * 60,
  });

  const assets = Array.isArray(data) ? data : data?.data ?? [];

  // Mutations
  const { mutate: createMutate, isLoading: isCreating } = useMutation({
    mutationFn: (payload) => createAsset(payload),
    onSuccess: () => {
      toast.success('Asset Created Successfully');
      queryClient.invalidateQueries(['assets']);
      closeModal();
    },
    onError: () => toast.error('Asset Creation Failed'),
  });

  const { mutate: updateMutate, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, payload }) => updateAsset(id, payload),
    onSuccess: () => {
      toast.success('Asset Updated Successfully');
      queryClient.invalidateQueries(['assets']);
      closeModal();
    },
    onError: () => toast.error('Asset Update Failed'),
  });

  // Local state
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    balance: '',
    type: '',
  });

  // Modal open/close
  const openModal = (asset = null) => {
    if (asset) {
      setEditMode(true);
      setFormData(asset);
    } else {
      setEditMode(false);
      setFormData({ name: '', balance: '', type: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setFormData({ name: '', balance: '', type: '' });
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.type || formData.balance === '') {
      toast.error('Please fill all fields');
      return;
    }

    const payload = {
      name: formData.name,
      type: formData.type,
      balance: parseFloat(formData.balance),
    };

    if (editMode) {
      updateMutate({ id: formData.id ?? formData._id, payload });
    } else {
      createMutate(payload);
    }
  };

  // Columns
  const columns = [
    { name: 'Name', selector: (row) => row.name, sortable: true },
    { name: 'Type', selector: (row) => row.type, sortable: true },
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
          <button
            onClick={() => toast.info('Delete API not implemented yet.')}
          >
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
          Loading assets...
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center text-red-400">
          Error loading assets: {error?.message ?? 'Something went wrong'}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] p-6 text-[#F8FAFC]">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#F9C74F]">Assets</h1>
              <p className="text-[#F8FAFC]/70">Manage all your assets easily</p>
            </div>
            <button
              onClick={() => openModal()}
              className="px-6 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:scale-105 transition-all"
            >
              + Add Asset
            </button>
          </div>

          {/* Table */}
          {/* Table */}
          <div className="bg-[#0B192D] border border-[#F8FAFC]/10 rounded-xl overflow-hidden shadow-lg">
            <DataTable
              columns={columns}
              data={assets}
              pagination
              highlightOnHover
              dense
              customStyles={{
                table: {
                  style: {
                    backgroundColor: '#0B192D',
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: '#10233F',
                    minHeight: '60px',
                  },
                },
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
                    '&:hover': {
                      backgroundColor: '#112744',
                      color: '#F8FAFC',
                      cursor: 'pointer',
                    },
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
                },
              }}
            />
          </div>

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
                {editMode ? 'Edit Asset' : 'Add New Asset'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Name"
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  placeholder="Type"
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />
                <input
                  type="number"
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                  placeholder="Balance"
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

export default AssetsPage;
