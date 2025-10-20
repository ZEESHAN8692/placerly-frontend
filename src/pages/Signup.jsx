import React, { useState } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const PlacerlySignup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        terms: false
    });

    const [passwordStrength, setPasswordStrength] = useState('weak');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Password strength logic
        if (name === 'password') {
            let strength = 'weak';
            if (value.length > 8 && /[A-Z]/.test(value) && /[0-9]/.test(value)) {
                strength = 'strong';
            } else if (value.length > 5) {
                strength = 'medium';
            }
            setPasswordStrength(strength);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] to-[#08101D] flex items-center justify-center p-4">
            <div className="max-w-6xl w-full flex flex-col lg:flex-row bg-[#0B1F3A]/60 border border-[#F8FAFC]/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">

                {/* Left Side - Form */}
                <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16">
                    <div className="max-w-md mx-auto">

                        <div className="text-center lg:text-left mb-10">
                            <h1 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] font-serif mb-4">
                                Create Your Placerly Account
                            </h1>
                            <p className="text-[#F8FAFC]/70 text-lg">
                                Start your journey to organized wealth.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-[#F8FAFC]/80 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 border border-[#F8FAFC]/20 rounded-lg bg-[#08101D]/60 text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:ring-2 focus:ring-[#F9C74F] focus:border-transparent transition duration-200"
                                    required
                                />
                            </div>

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

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-semibold text-[#F8FAFC]/80 mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                    className="w-full px-4 py-3 border border-[#F8FAFC]/20 rounded-lg bg-[#08101D]/60 text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:ring-2 focus:ring-[#F9C74F] focus:border-transparent transition duration-200"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-[#F8FAFC]/80 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Create a password"
                                    className="w-full px-4 py-3 border border-[#F8FAFC]/20 rounded-lg bg-[#08101D]/60 text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:ring-2 focus:ring-[#F9C74F] focus:border-transparent transition duration-200"
                                    required
                                />
                                <div className="mt-2 flex h-2 rounded-full bg-[#F8FAFC]/10 overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-300 ${passwordStrength === 'weak' ? 'w-1/4 bg-red-500' :
                                            passwordStrength === 'medium' ? 'w-2/4 bg-yellow-500' :
                                                'w-full bg-green-500'
                                            }`}></div>
                                </div>
                            </div>


                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#F9C74F] to-[#F9844A] hover:from-[#F9844A] hover:to-[#F9C74F] text-[#0B1F3A] font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-[#F9C74F]/30 transform hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Create Account
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
                            Already have an account? <Link to="/login"><a className="text-[#F9C74F] hover:text-[#F9844A]">Log in</a></Link>
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

export default PlacerlySignup;
