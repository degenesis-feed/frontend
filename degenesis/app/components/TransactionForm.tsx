"use client";

import { useState } from 'react';

export default function TransactionForm() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    tokenAddress: '',
    network: '',
    memo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      setIsFormVisible(false);
      setFormData({
        recipient: '',
        amount: '',
        tokenAddress: '',
        network: '',
        memo: ''
      });
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        {isFormVisible ? 'Hide Form' : 'New Transaction'}
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
          <div className="space-y-4">
            <div>
              <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Recipient Address</label>
              <input
                type="text"
                id="recipient"
                name="recipient"
                value={formData.recipient}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="tokenAddress" className="block text-sm font-medium text-gray-700">Token Address</label>
              <input
                type="text"
                id="tokenAddress"
                name="tokenAddress"
                value={formData.tokenAddress}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="network" className="block text-sm font-medium text-gray-700">Network</label>
              <input
                type="text"
                id="network"
                name="network"
                value={formData.network}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="memo" className="block text-sm font-medium text-gray-700">Memo</label>
              <textarea
                id="memo"
                name="memo"
                value={formData.memo}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Submit Transaction
            </button>
          </div>
        </form>
      )}

      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Transaction submitted
        </div>
      )}
    </div>
  );
}