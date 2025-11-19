import React from "react";
import DashboardLayout from "../layout/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../queryFunction/queryFunction";

import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis
} from "recharts";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Dashboard = () => {

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard(),
  });

  if (isLoading) return <div className="p-10 text-white">Loading...</div>;

  const stats = data?.data;

  // Charts Data
  const assetPieData = [
    { name: "Assets", value: stats?.totalAssetValue },
    { name: "Investments", value: stats?.totalInvestmentValue },
    { name: "Banking", value: stats?.totalBankingValue },
    { name: "Insurance", value: stats?.totalInsuranceValue },
  ];

  const barData = [
    { name: "Debt", value: stats?.totalDebtValue },
    { name: "Utility", value: stats?.totalUtilityValue },
    { name: "Banking", value: stats?.totalBankingValue },
    { name: "Invest", value: stats?.totalInvestmentValue },
  ];

  const COLORS = ["#F9C74F", "#90BE6D", "#577590", "#F9844A"];

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto text-white">

          {/* NET WORTH CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="lg:col-span-3 bg-white/5 p-6 rounded-2xl border border-white/10 shadow-xl shadow-black/10"
            >
              <h3 className="text-2xl font-bold mb-2">Net Worth</h3>

              <motion.p
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl font-bold text-[#F9C74F]"
              >
                ${stats?.netWorth.toLocaleString()}
              </motion.p>

              <p className="text-[#F8FAFC]/60 mt-2">
                Total Worth = Assets - Debts
              </p>
            </motion.div>
          </motion.div>

          {/* SMALL CARDS WITH STAGGER ANIMATIONS */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <DashboardCard title="Total Asset Value" value={stats?.totalAssetValue} />
            <DashboardCard title="Total Debt Value" value={stats?.totalDebtValue} />
            <DashboardCard title="Total Insurance Value" value={stats?.totalInsuranceValue} />
            <DashboardCard title="Total Utility Value" value={stats?.totalUtilityValue} />
            <DashboardCard title="Total Banking Value" value={stats?.totalBankingValue} />
            <DashboardCard title="Total Investment Value" value={stats?.totalInvestmentValue} />
          </motion.div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

            {/* PIE CHART */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="show"
              whileHover={{ scale: 1.01 }}
              className="bg-white/5 p-6 rounded-2xl border border-white/10"
            >
              <h3 className="text-xl font-bold mb-4">Assets Distribution</h3>
              <div className="w-full h-72">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={assetPieData}
                      dataKey="value"
                      outerRadius={110}
                      label
                    >
                      {assetPieData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* BAR CHART */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="show"
              whileHover={{ scale: 1.01 }}
              className="bg-white/5 p-6 rounded-2xl border border-white/10"
            >
              <h3 className="text-xl font-bold mb-4">Category Comparison</h3>
              <div className="w-full h-72">
                <ResponsiveContainer>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#F9C74F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;


// CARD COMPONENT WITH ANIMATION
const DashboardCard = ({ title, value }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20, scale: 0.9 },
      show: { opacity: 1, y: 0, scale: 1 }
    }}
    whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 200 } }}
    className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-md shadow-black/10 cursor-pointer"
  >
    <p className="text-sm text-[#F8FAFC]/60">{title}</p>
    <p className="mt-2 text-3xl font-bold text-[#F9C74F]">
      ${value.toLocaleString()}
    </p>
  </motion.div>
);
