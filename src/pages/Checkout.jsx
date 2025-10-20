import React, { useState } from 'react';

const Checkout = () => {
  const [billingSameAsAccount, setBillingSameAsAccount] = useState(true);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    zipCode: ''
  });

  const orderSummary = {
    items: [
      {
        name: 'Placerly Premium Subscription - Annual',
        price: 120.00
      }
    ],
    subtotal: 120.00,
    taxes: 10.80,
    total: 130.80
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    }
    // Format expiry date
    else if (name === 'expiryDate') {
      const formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle checkout submission
    console.log('Checkout submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0A1526] to-[#08101D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-4">
            Checkout
          </h1>
          <p className="text-[#F8FAFC]/70 text-lg">
            Complete your purchase securely
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left Column - Order Summary */}
          <div className="space-y-8">
            {/* Order Summary */}
            <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
              <h2 className="text-2xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-6">
                Order Summary
              </h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {orderSummary.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-[#F8FAFC]/10">
                    <div>
                      <div className="text-[#F8FAFC] font-semibold">{item.name}</div>
                    </div>
                    <div className="text-[#F8FAFC] font-bold">${item.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-[#F8FAFC]/70">
                  <span>Subtotal</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#F8FAFC]/70">
                  <span>Taxes</span>
                  <span>${orderSummary.taxes.toFixed(2)}</span>
                </div>
                
                {/* Divider */}
                <div className="border-t border-[#F8FAFC]/10 my-4"></div>
                
                <div className="flex justify-between text-[#F8FAFC] text-lg font-bold">
                  <span>Total</span>
                  <span>${orderSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Features Included */}
            <div className="bg-gradient-to-br from-[#F9C74F]/10 to-[#F9844A]/10 border border-[#F9C74F]/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">Premium Plan Includes</h3>
              <div className="space-y-3">
                {[
                  'Personal Wealth Advisor',
                  '24/7 Premium Support',
                  'Advanced Investment Analytics',
                  'Tax Optimization Strategies',
                  'Estate Planning Tools',
                  'Family Office Services',
                  'Legal Document Review',
                  'Priority Customer Service'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#F9C74F] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#0B1F3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#F8FAFC] text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="space-y-8">
            {/* Payment Details */}
            <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
              <h2 className="text-2xl font-['Playfair_Display',serif] font-bold text-[#F8FAFC] mb-6">
                Payment Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Card Number */}
                <div>
                  <label className="block text-[#F8FAFC] font-semibold mb-3">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="**** **** **** ****"
                    maxLength={19}
                    className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Expiry Date */}
                  <div>
                    <label className="block text-[#F8FAFC] font-semibold mb-3">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
                      required
                    />
                  </div>

                  {/* CVV */}
                  <div>
                    <label className="block text-[#F8FAFC] font-semibold mb-3">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="***"
                      maxLength={4}
                      className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-[#F8FAFC] font-semibold mb-3">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleInputChange}
                    placeholder="Full name as it appears on card"
                    className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
                    required
                  />
                </div>

                {/* ZIP Code */}
                <div>
                  <label className="block text-[#F8FAFC] font-semibold mb-3">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="12345"
                    className="w-full px-4 py-3 bg-white/5 border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#F9C74F] transition-colors"
                    required
                  />
                </div>

                {/* Divider */}
                <div className="border-t border-[#F8FAFC]/10 my-6"></div>

                {/* Billing Address */}
                <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">Billing Address</h3>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="billingSame"
                      checked={billingSameAsAccount}
                      onChange={(e) => setBillingSameAsAccount(e.target.checked)}
                      className="w-4 h-4 text-[#F9C74F] bg-white/5 border-[#F8FAFC]/20 rounded focus:ring-[#F9C74F] focus:ring-2"
                    />
                    <label htmlFor="billingSame" className="text-[#F8FAFC] font-semibold">
                      Billing address is the same as my account address
                    </label>
                  </div>
                </div>

                {/* Complete Purchase Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-[#F9C74F]/40 hover:scale-105 transition-all duration-300 mt-6"
                >
                  Complete Purchase
                </button>

                <p className="text-center text-[#F8FAFC]/50 text-sm">
                  Your payment is secure and encrypted
                </p>
              </form>
            </div>

            {/* Security Features */}
            <div className="bg-white/5 border border-[#F8FAFC]/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[#F8FAFC] mb-4">Security Features</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'SSL Encryption', icon: '🔒' },
                  { name: 'PCI Compliant', icon: '🛡️' },
                  { name: '256-bit Security', icon: '⚡' },
                  { name: 'Fraud Protection', icon: '👁️' }
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl mb-2">{feature.icon}</div>
                    <div className="text-[#F8FAFC] text-sm font-semibold">{feature.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-center gap-6 pt-4">
              {['Visa', 'Mastercard', 'Amex', 'Discover'].map((card) => (
                <div key={card} className="text-center">
                  <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center mb-1">
                    <span className="text-white text-xs font-bold">{card.charAt(0)}</span>
                  </div>
                  <span className="text-[#F8FAFC]/50 text-xs">{card}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <div className="bg-gradient-to-br from-[#F9C74F]/10 to-[#F9844A]/10 border border-[#F9C74F]/20 rounded-2xl p-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-8 bg-[#F9C74F] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-[#0B1F3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#F8FAFC]">30-Day Money Back Guarantee</h3>
            </div>
            <p className="text-[#F8FAFC]/70 text-sm">
              If you're not completely satisfied with Placerly Premium, we'll refund your payment within 30 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;