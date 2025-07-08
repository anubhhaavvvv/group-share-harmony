
import React, { useState } from 'react';
import { X, DollarSign, Receipt, Users } from 'lucide-react';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { api } from '../../services/api';
import { toast } from 'sonner';

interface Member {
  _id: string;
  name: string;
  email: string;
}

interface Group {
  _id: string;
  name: string;
  members: Member[];
}

interface AddExpenseModalProps {
  group: Group;
  onClose: () => void;
  onExpenseAdded: () => void;
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  group,
  onClose,
  onExpenseAdded
}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [splitAmong, setSplitAmong] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSplitToggle = (memberId: string) => {
    setSplitAmong(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Please enter an expense title');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (!paidBy) {
      toast.error('Please select who paid for this expense');
      return;
    }
    
    if (splitAmong.length === 0) {
      toast.error('Please select at least one person to split the expense with');
      return;
    }

    setLoading(true);
    try {
      await api.post('/expenses', {
        title: title.trim(),
        amount: parseFloat(amount),
        paidBy,
        splitAmong,
        groupId: group._id
      });
      
      toast.success('Expense added successfully!');
      onExpenseAdded();
    } catch (error) {
      console.error('Failed to add expense:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-mac w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-beige-200">
          <h2 className="text-xl font-bold text-warm-800">Add Expense</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-beige-100 rounded-lg transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5 text-warm-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-warm-700 mb-2">
              Expense Title
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Receipt className="w-5 h-5 text-warm-400" />
              </div>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full pl-12 pr-4 py-3 mac-input rounded-lg focus:outline-none"
                placeholder="e.g., Dinner at restaurant"
                disabled={loading}
              />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-warm-700 mb-2">
              Amount
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <DollarSign className="w-5 h-5 text-warm-400" />
              </div>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-12 pr-4 py-3 mac-input rounded-lg focus:outline-none"
                placeholder="0.00"
                step="0.01"
                min="0"
                disabled={loading}
              />
            </div>
          </div>

          {/* Paid By */}
          <div>
            <label htmlFor="paidBy" className="block text-sm font-medium text-warm-700 mb-2">
              Paid By
            </label>
            <select
              id="paidBy"
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              className="w-full px-4 py-3 mac-input rounded-lg focus:outline-none"
              disabled={loading}
            >
              <option value="">Select who paid</option>
              {group.members.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          {/* Split Among */}
          <div>
            <label className="block text-sm font-medium text-warm-700 mb-2">
              Split Among
            </label>
            <p className="text-sm text-warm-600 mb-3">
              Select the people who should split this expense
            </p>
            
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {group.members.map((member) => (
                <label
                  key={member._id}
                  className="flex items-center p-3 bg-beige-50 rounded-lg cursor-pointer hover:bg-beige-100 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={splitAmong.includes(member._id)}
                    onChange={() => handleSplitToggle(member._id)}
                    className="mr-3 w-4 h-4 text-warm-500 border-warm-300 rounded focus:ring-warm-500"
                    disabled={loading}
                  />
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-warm-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-warm-800">{member.name}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-beige-200 text-warm-700 rounded-lg hover:bg-beige-50 font-medium transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-4 bg-warm-500 text-white rounded-lg hover:bg-warm-600 font-semibold transition-all duration-200 shadow-mac hover:shadow-mac-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Adding...
                </>
              ) : (
                'Add Expense'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
