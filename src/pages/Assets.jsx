import React from 'react';

const AssetsPage = () => {
  const assetsData = [
    {
      id: 1,
      name: 'Chase Sapphire Reserve',
      amount: '$12,543.21',
      type: 'CREDIT CARD',
      change: '+2.3%',
      changeType: 'positive',
      icon: '💳'
    },
    {
      id: 2,
      name: 'Bank of America Checking',
      amount: '$5,231.89',
      type: 'CHECKING',
      change: '+1.1%',
      changeType: 'positive',
      icon: '🏦'
    },
    {
      id: 3,
      name: 'Savings Account',
      amount: '$25,890.12',
      type: 'SAVINGS',
      change: '+3.7%',
      changeType: 'positive',
      icon: '💰'
    }
  ];

  const portfolioData = {
    value: '$18,450.50',
    type: 'INVESTMENT',
    change: '+5.2%',
    changeType: 'positive',
    chartData: [65, 59, 80, 81, 56, 55, 40]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
            Your Assets
          </h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2">
            <span>+</span>
            Add Asset
          </button>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {assetsData.map((asset) => (
            <AssetCard key={asset.id} {...asset} />
          ))}
        </div>

        {/* Portfolio Section */}
        <PortfolioSection {...portfolioData} />
      </div>
    </div>
  );
};

const AssetCard = ({ name, amount, type, change, changeType, icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {name}
            </h3>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
              type === 'CREDIT CARD' 
                ? 'bg-purple-50 text-purple-600'
                : type === 'CHECKING'
                ? 'bg-blue-50 text-blue-600'
                : 'bg-green-50 text-green-600'
            }`}>
              {type}
            </span>
          </div>
        </div>
      </div>
      
      <p className="text-2xl font-bold text-gray-900 mb-2">
        {amount}
      </p>
      
      {change && (
        <p className={`text-sm font-medium ${
          changeType === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change} from last month
        </p>
      )}
    </div>
  );
};

const PortfolioSection = ({ value, type, change, changeType, chartData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Portfolio Value
          </h2>
          <span className="bg-indigo-50 text-indigo-600 text-sm font-medium px-3 py-1 rounded-full">
            {type}
          </span>
        </div>
        
        {change && (
          <div className={`text-lg font-semibold ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            {change} from last month
          </div>
        )}
      </div>

      <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
        {value}
      </p>

      {/* Chart Placeholder */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
        <div className="text-gray-500 font-medium mb-2">
          Portfolio Performance
        </div>
        <div className="text-sm text-gray-400">
          Chart visualization would go here
        </div>
      </div>

      {/* Additional Portfolio Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Total Return</div>
          <div className="text-lg font-semibold text-green-600">+$2,450.50</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Today's Change</div>
          <div className="text-lg font-semibold text-green-600">+$125.30</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Allocation</div>
          <div className="text-lg font-semibold text-gray-800">65% Stocks</div>
        </div>
      </div>
    </div>
  );
};

export default AssetsPage;