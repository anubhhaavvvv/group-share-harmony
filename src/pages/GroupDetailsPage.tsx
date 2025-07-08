
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, DollarSign, Users, Calendar, Receipt } from 'lucide-react';
import { Layout } from '../components/common/Layout';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { AddExpenseModal } from '../components/modals/AddExpenseModal';
import { api } from '../services/api';
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
  createdAt: string;
}

interface Expense {
  _id: string;
  title: string;
  amount: number;
  paidBy: Member;
  splitAmong: Member[];
  groupId: string;
  createdAt: string;
}

export const GroupDetailsPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [group, setGroup] = useState<Group | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddExpense, setShowAddExpense] = useState(false);

  useEffect(() => {
    if (groupId) {
      fetchGroupDetails();
      fetchExpenses();
    }
  }, [groupId]);

  const fetchGroupDetails = async () => {
    try {
      const response = await api.get(`/groups/${groupId}`);
      setGroup(response.data);
    } catch (error) {
      toast.error('Failed to fetch group details');
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await api.get(`/expenses?groupId=${groupId}`);
      setExpenses(response.data);
    } catch (error) {
      toast.error('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleExpenseAdded = () => {
    fetchExpenses();
    setShowAddExpense(false);
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const calculateUserTotal = (memberId: string) => {
    return expenses
      .filter(expense => expense.paidBy._id === memberId)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (!group) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-warm-800">Group not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-warm-800 mb-2">{group.name}</h1>
              <div className="flex items-center text-warm-600">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Created {new Date(group.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            <button
              onClick={() => setShowAddExpense(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-warm-500 text-white rounded-lg hover:bg-warm-600 transition-all duration-200 shadow-mac hover:shadow-mac-hover"
            >
              <Plus className="w-4 h-4" />
              <span>Add Expense</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-mac">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warm-800">
                  ${calculateTotalExpenses().toFixed(2)}
                </p>
                <p className="text-warm-600">Total Expenses</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-mac">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Receipt className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warm-800">{expenses.length}</p>
                <p className="text-warm-600">Total Expenses</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-mac">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-warm-100 rounded-lg flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-warm-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warm-800">{group.members.length}</p>
                <p className="text-warm-600">Members</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Members */}
          <div className="bg-white rounded-xl shadow-mac p-6">
            <h2 className="text-xl font-bold text-warm-800 mb-4">Members</h2>
            <div className="space-y-3">
              {group.members.map((member) => (
                <div key={member._id} className="flex items-center justify-between p-3 bg-beige-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-warm-500 rounded-full flex items-center justify-center text-white font-medium">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-warm-800">{member.name}</p>
                      <p className="text-sm text-warm-600">{member.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-warm-800">
                      ${calculateUserTotal(member._id).toFixed(2)}
                    </p>
                    <p className="text-sm text-warm-600">paid</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Expenses */}
          <div className="bg-white rounded-xl shadow-mac p-6">
            <h2 className="text-xl font-bold text-warm-800 mb-4">Recent Expenses</h2>
            
            {expenses.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-beige-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Receipt className="w-6 h-6 text-beige-400" />
                </div>
                <p className="text-warm-600 mb-4">No expenses yet</p>
                <button
                  onClick={() => setShowAddExpense(true)}
                  className="text-warm-500 hover:text-warm-600 font-medium"
                >
                  Add the first expense
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {expenses.map((expense) => (
                  <div key={expense._id} className="p-4 border border-beige-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-warm-800">{expense.title}</h3>
                      <span className="font-bold text-warm-800">
                        ${expense.amount.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-warm-600">
                      <span>Paid by {expense.paidBy.name}</span>
                      <span>{new Date(expense.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-sm text-warm-600">
                        Split among: {expense.splitAmong.map(m => m.name).join(', ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add Expense Modal */}
        {showAddExpense && group && (
          <AddExpenseModal
            group={group}
            onClose={() => setShowAddExpense(false)}
            onExpenseAdded={handleExpenseAdded}
          />
        )}
      </div>
    </Layout>
  );
};
