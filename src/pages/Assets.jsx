import React, { useState, useEffect } from 'react';

import DataTable from 'react-data-table-component';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAsset, getAssets, updateAsset, deleteAsset } from '../queryFunction/queryFunction';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import DashboardLayout from '../layout/Sidebar';

const AssetsPage = () => {
  const queryClient = useQueryClient();

  // Fetch Assets
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['assets'],
    queryFn: getAssets,
    staleTime: 1000 * 60,
  });
  const assets = Array.isArray(data) ? data : data?.data ?? [];

  // ===== Mutations =====
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


  const { mutate: deleteMutate, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteAsset(id),
    onSuccess: () => {
      toast.success('Asset Deleted Successfully');
      queryClient.invalidateQueries(['assets']);
    },
    onError: () => toast.error('Failed to delete asset'),
  });

  // ===== Local State =====
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    balance: '',
    type: '',
    accountName: '',
    accountNumber: '',
  });

  // ===== Modal Handling =====
  const openModal = (asset = null) => {
    if (asset) {
      setEditMode(true);
      setFormData(asset);
    } else {
      setEditMode(false);
      setFormData({ name: '', balance: '', type: '', accountName: '', accountNumber: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setFormData({ name: '', balance: '', type: '', accountName: '', accountNumber: '' });
  };

 
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      deleteMutate(id);
    }
  };

  // ===== Submit Handler =====
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
      accountName: formData.accountName,
      accountNumber: formData.accountNumber,
    };

    if (editMode) {
      updateMutate({ id: formData.id ?? formData._id, payload });
    } else {
      createMutate(payload);
    }
  };

  // ===== Table Columns =====
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
            <FiEdit className="text-yellow-400 hover:text-yellow-300 cursor-pointer"  />
          </button>
          <button onClick={() => handleDelete(row.id ?? row._id)}>
            <FiTrash2 className="text-red-400 hover:text-red-300 cursor-pointer"  />
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#F8FAFC] mb-2">
              {data?.totalAssetsValue?.[0]?.total ?? 0}
            </div>
            <div className="text-[#F8FAFC]/60 text-sm">Total Assets</div>
          </div>
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#F8FAFC] mb-2">{data?.count ?? 0}</div>
            <div className="text-[#F8FAFC]/60 text-sm">Accounts</div>
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#F9C74F]">Assets</h1>
            <p className="text-[#F8FAFC]/70">Manage all your assets easily</p>
          </div>
          <button
            onClick={() => openModal()}
            className="cursor-pointer px-6 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:scale-105 transition-all"
          >
            + Add Asset
          </button>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={assets}
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
                className="absolute top-4 right-4 text-[#F8FAFC]/70 hover:text-white cursor-pointer"
              >
                <FiX size={20} />
              </button>
              <h3 className="text-xl font-bold text-[#F8FAFC] mb-4 ">
                {editMode ? 'Edit Asset' : 'Add New Asset'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter Name"
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  placeholder="Enter Type"
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />
                <input
                  type="number"
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                  placeholder="Enter Balance"
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

export default AssetsPage;
