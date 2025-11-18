import React, { useState } from "react";

import DataTable from "react-data-table-component";
import { FiEdit, FiTrash2, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getInsurances,
  createInsurance,
  updateInsurance,
  deleteInsurance,
} from "../queryFunction/queryFunction";
import DashboardLayout from "../layout/Sidebar";

const InsurancePage = () => {
  const queryClient = useQueryClient();

  // Fetch Insurance Data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["insurance"],
    queryFn: getInsurances,
    staleTime: 1000 * 60,
  });

  const insurances = Array.isArray(data) ? data : data?.data ?? [];

  // Create
  const { mutate: createMutate, isLoading: isCreating } = useMutation({
    mutationFn: (payload) => createInsurance(payload),
    onSuccess: () => {
      toast.success("Insurance Created Successfully");
      queryClient.invalidateQueries(["insurance"]);
      closeModal();
    },
    onError: () => toast.error("Failed to create insurance"),
  });

  // Update
  const { mutate: updateMutate, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, payload }) => updateInsurance(id, payload),
    onSuccess: () => {
      toast.success("Insurance Updated Successfully");
      queryClient.invalidateQueries(["insurance"]);
      closeModal();
    },
    onError: () => toast.error("Failed to update insurance"),
  });

  // Delete
  const { mutate: deleteMutate, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteInsurance(id),
    onSuccess: () => {
      toast.success("Insurance Deleted Successfully");
      queryClient.invalidateQueries(["insurance"]);
    },
    onError: () => toast.error("Failed to delete insurance"),
  });

  // Local State
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    provider: "",
    policyNumber: "",
    expiryDate: "",
    coverageAmount: "",
    premium: "",
  });

  // Modal controls
  const openModal = (insurance = null) => {
    if (insurance) {
      setEditMode(true);
      setFormData(insurance);
    } else {
      setEditMode(false);
      setFormData({
        type: "",
        provider: "",
        policyNumber: "",
        expiryDate: "",
        coverageAmount: "",
        premium: "",
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setFormData({
      type: "",
      provider: "",
      policyNumber: "",
      expiryDate: "",
      coverageAmount: "",
      premium: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this insurance?")) {
      deleteMutate(id);
    }
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.type ||
      !formData.provider ||
      !formData.policyNumber ||
      !formData.expiryDate ||
      !formData.coverageAmount ||
      !formData.premium
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const payload = {
      type: formData.type,
      provider: formData.provider,
      policyNumber: formData.policyNumber,
      expiryDate: formData.expiryDate,
      coverageAmount: parseFloat(formData.coverageAmount),
      premium: parseFloat(formData.premium),
    };

    if (editMode) {
      updateMutate({ id: formData.id ?? formData._id, payload });
    } else {
      createMutate(payload);
    }
  };

  // Columns
  const columns = [
    { name: "Type", selector: (row) => row.type, sortable: true },
    { name: "Provider", selector: (row) => row.provider, sortable: true },
    { name: "Policy #", selector: (row) => row.policyNumber, sortable: true },
    { name: "Expiry Date", selector: (row) => row.expiryDate, sortable: true },
    {
      name: "Coverage",
      selector: (row) => `$${parseFloat(row.coverageAmount || 0).toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Premium",
      selector: (row) => `$${parseFloat(row.premium || 0).toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Actions",
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
          Loading insurance data...
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center text-red-400">
          Error loading insurance: {error?.message ?? "Something went wrong"}
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
            <div className="text-[#F8FAFC]/60 text-sm">Total Insurance</div>
          </div>
          <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-6">
            <div className="text-2xl font-bold text-[#F8FAFC] mb-2">{data?.count ?? 0}</div>
            <div className="text-[#F8FAFC]/60 text-sm">Accounts</div>
          </div>
        </div>
       
       
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#F9C74F]">Insurance</h1>
            <p className="text-[#F8FAFC]/70">Manage all your insurance policies</p>
          </div>
          <button
            onClick={() => openModal()}
            className="cursor-pointer px-6 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg hover:scale-105 transition-all"
          >
            + Add Insurance
          </button>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={insurances}
          pagination
          highlightOnHover
          dense
          customStyles={{
            table: {
              style: { backgroundColor: "#0B192D" },
            },
            headRow: {
              style: { backgroundColor: "#10233F", height: "60px" },
            },
            headCells: {
              style: {
                color: "#F9C74F",
                fontWeight: "bold",
                fontSize: "15px",
              },
            },
            rows: {
              style: {
                backgroundColor: "#0B192D",
                minHeight: "65px",
                borderBottomColor: "#1B2A45",
                transition: "all 0.2s ease",
                cursor: "pointer",
              },
              highlightOnHoverStyle: {
                backgroundColor: "#1A2F4C",
                color: "#F9C74F",
                transition: "all 0.25s ease",
              },
            },
            cells: {
              style: {
                color: "#F8FAFC",
                fontSize: "14px",
                padding: "15px 20px",
              },
            },
            pagination: {
              style: {
                backgroundColor: "#0B192D",
                color: "#FFF",
                borderTop: "1px solid #1B2A45",
              },
            },
          }}
        />

        {/* Modal */}
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
                {editMode ? "Edit Insurance" : "Add New Insurance"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Type (e.g., Home, Car)"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Provider Name"
                  value={formData.provider}
                  onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Policy Number"
                  value={formData.policyNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, policyNumber: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Coverage Amount"
                  value={formData.coverageAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, coverageAmount: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Premium"
                  value={formData.premium}
                  onChange={(e) =>
                    setFormData({ ...formData, premium: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white/5 border border-[#F8FAFC]/20 rounded-lg"
                />

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isCreating || isUpdating}
                    className=" cursor-pointer flex-1 py-2 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold rounded-lg"
                  >
                    {editMode
                      ? isUpdating
                        ? "Updating..."
                        : "Update"
                      : isCreating
                      ? "Adding..."
                      : "Add"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="cursor-pointer px-4 py-2 border border-[#F8FAFC]/30 text-[#F8FAFC] rounded-lg"
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

export default InsurancePage;
