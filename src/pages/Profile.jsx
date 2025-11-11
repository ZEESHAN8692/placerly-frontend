import React, { useState, useEffect } from "react";
import DashboardLayout from "../layout/sidebar";
import { profile, updateProfile, resetPassword } from "../queryFunction/queryFunction";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Profile = () => {
  const queryClient = useQueryClient();

  // Fetch profile data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: profile,
  });

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    oldPassword: "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Populate fetched data into local state
  useEffect(() => {
    if (data) {
      setProfileData({
        name: data?.name || "",
        email: data?.email || "",
        phone: data?.phone || "",
        oldPassword: "",
        password: "",
      });
    }
  }, [data]);

  // Update Profile Mutation
  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      queryClient.invalidateQueries(["profile"]);
    },
    onError: () => {
      toast.error("Failed to update profile!");
    },
  });

  // Reset Password Mutation
  const resetMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password changed successfully!");
      setProfileData((prev) => ({
        ...prev,
        oldPassword: "",
        password: "",
      }));
    },
    onError: () => {
      toast.error("Failed to change password!");
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateMutation.mutate({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
    });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    resetMutation.mutate({
      email: profileData.email,
      oldPassword: profileData.oldPassword,
      password: profileData.password,
    });
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen text-white text-lg">
          Loading profile...
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen text-red-500 text-lg">
          Failed to load profile.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] to-[#08101D] py-10 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#F8FAFC] bg-gradient-to-r from-[#F9C74F] to-[#F9844A] bg-clip-text text-transparent">
              Profile Settings
            </h1>
            <p className="text-[#F8FAFC]/70 mt-2">
              Manage your account information and security
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#0B1F3A]/60 rounded-2xl border border-[#F8FAFC]/10 shadow-lg p-6 backdrop-blur-md">
                {/* Avatar */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#F9C74F] to-[#F9844A] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#F9C74F]/30">
                    <span className="text-2xl font-bold text-[#0B1F3A]">
                      {profileData.name
                        ? profileData.name.charAt(0).toUpperCase()
                        : "U"}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-[#F8FAFC]">
                    {profileData.name}
                  </h2>
                  <p className="text-[#F8FAFC]/70 mt-1">{profileData.email}</p>
                </div>

                {/* Sidebar Nav */}
                <nav className="space-y-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full flex items-center px-4 py-3 text-left text-[#F9C74F] bg-[#F9C74F]/10 rounded-lg hover:bg-[#F9C74F]/20 transition duration-200"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profile Information
                  </button>

                  <button className="w-full flex items-center px-4 py-3 text-left text-[#F8FAFC]/80 hover:text-[#F9C74F] rounded-lg hover:bg-[#F8FAFC]/5 transition duration-200">
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Security
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Profile Info Card */}
              <div className="bg-[#0B1F3A]/60 border border-[#F8FAFC]/10 rounded-2xl shadow-lg overflow-hidden backdrop-blur-md">
                <div className="px-6 py-4 border-b border-[#F8FAFC]/10 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[#F8FAFC]">
                    Profile Information
                  </h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center px-4 py-2 text-sm text-[#F9C74F] bg-[#F9C74F]/10 rounded-lg hover:bg-[#F9C74F]/20 transition duration-200"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </button>
                </div>

                <div className="p-6">
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-[#F8FAFC]/70 mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-[#F8FAFC]/20 rounded-lg focus:ring-2 focus:ring-[#F9C74F] bg-[#08101D]/50 text-[#F8FAFC]"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-[#08101D]/40 rounded-lg text-[#F8FAFC]">
                          {profileData.name}
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-[#F8FAFC]/70 mb-2">
                        Email Address
                      </label>
                      <div className="px-4 py-3 bg-[#08101D]/40 rounded-lg text-[#F8FAFC]">
                        {profileData.email}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-[#F8FAFC]/70 mb-2">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-[#F8FAFC]/20 rounded-lg focus:ring-2 focus:ring-[#F9C74F] bg-[#08101D]/50 text-[#F8FAFC]"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-[#08101D]/40 rounded-lg text-[#F8FAFC]">
                          {profileData.phone}
                        </div>
                      )}
                    </div>

                    {isEditing && (
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-[#F9C74F]/30 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Update Profile
                      </button>
                    )}
                  </form>
                </div>
              </div>

              {/* Security Card */}
              <div className="bg-[#0B1F3A]/60 border border-[#F8FAFC]/10 rounded-2xl shadow-lg overflow-hidden backdrop-blur-md">
                <div className="px-6 py-4 border-b border-[#F8FAFC]/10">
                  <h3 className="text-lg font-semibold text-[#F8FAFC]">
                    Security
                  </h3>
                  <p className="text-sm text-[#F8FAFC]/60 mt-1">
                    Manage your password and security settings
                  </p>
                </div>

                <div className="p-6">
                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[#F8FAFC]/70 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="oldPassword"
                        value={profileData.oldPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#F8FAFC]/20 rounded-lg bg-[#08101D]/50 text-[#F8FAFC] focus:ring-2 focus:ring-[#F9C74F]"
                        placeholder="Enter current password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#F8FAFC]/70 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={profileData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#F8FAFC]/20 rounded-lg bg-[#08101D]/50 text-[#F8FAFC] focus:ring-2 focus:ring-[#F9C74F]"
                        placeholder="Enter new password"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={resetMutation.isPending}
                      className="w-full bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-[#F9C74F]/30 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      {resetMutation.isPending
                        ? "Changing Password..."
                        : "Change Password"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
