import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../queryFunction/queryFunction';
import { toast } from 'react-toastify';
import { HiEye, HiEyeOff } from "react-icons/hi";


const PlacerlyLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const { mutate, isLoading } = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            console.log("Login Success", data)
            toast.success('Login Successfull')
            navigate('/')
        },
        onError: (error) => {
            toast.error('Login Failed')
            console.log(error)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Form submitted:', formData);
        mutate(formData)
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] to-[#08101D] flex items-center justify-center p-4">
            <div className="max-w-6xl w-full flex flex-col lg:flex-row bg-[#0B1F3A]/60 border border-[#F8FAFC]/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">

                {/* Left Side - Form */}
                <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16">
                    <div className="max-w-md mx-auto">

                        <div className="text-center lg:text-left mb-10">
                            <h1 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] font-serif mb-4">
                                Log In to Placerly
                            </h1>
                            <p className="text-[#F8FAFC]/70 text-lg">
                                Welcome back, let's get you logged in.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-[#F8FAFC]/80 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email address"
                                    className="w-full px-4 py-3 border border-[#F8FAFC]/20 rounded-lg bg-[#08101D]/60 text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:ring-2 focus:ring-[#F9C74F] focus:border-transparent transition duration-200"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-[#F8FAFC]/80 mb-2">
                                    Password
                                </label>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 pr-12 border border-[#F8FAFC]/20 rounded-lg bg-[#08101D]/60 text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:ring-2 focus:ring-[#F9C74F] focus:border-transparent transition duration-200"
                                    required
                                />

                                {/* Eye Toggle Button */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-13 transform -translate-y-1/2 text-[#F8FAFC]/60 hover:text-[#F9C74F] transition"
                                >
                                    {showPassword ? (
                                        <HiEyeOff size={22} />
                                    ) : (
                                        <HiEye size={22} />
                                    )}
                                </button>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#F9C74F] to-[#F9844A] hover:from-[#F9844A] hover:to-[#F9C74F] text-[#0B1F3A] font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-[#F9C74F]/30 transform hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Log In
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center">
                            <div className="flex-1 border-t border-[#F8FAFC]/20"></div>
                            <div className="mx-4 text-[#F8FAFC]/60 text-sm">OR</div>
                            <div className="flex-1 border-t border-[#F8FAFC]/20"></div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center px-4 py-3 border border-[#F8FAFC]/20 rounded-lg hover:bg-[#F8FAFC]/10 text-[#F8FAFC] transition duration-200">
                                <FaGoogle className="w-5 h-5 mr-2" />
                                Google
                            </button>
                            <button className="flex items-center justify-center px-4 py-3 border border-[#F8FAFC]/20 rounded-lg hover:bg-[#F8FAFC]/10 text-[#F8FAFC] transition duration-200">
                                <FaFacebook className="w-5 h-5 mr-2" />
                                Facebook
                            </button>
                        </div>

                        <p className="mt-4 text-[#F8FAFC]/60 text-sm">
                            Don't have an account? <Link to="/signup"><a className="text-[#F9C74F] hover:text-[#F9844A]">Sign up</a></Link>
                        </p>
                    </div>
                </div>

                {/* Right Side - Image (Hidden on smaller screens) */}
                <div className="hidden lg:block w-1/2 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')" }}>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>

            </div>
        </div>
    );
};

export default PlacerlyLogin;

