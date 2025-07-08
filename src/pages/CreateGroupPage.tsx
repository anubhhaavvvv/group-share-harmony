
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Users, Mail } from 'lucide-react';
import { Layout } from '../components/common/Layout';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { api } from '../services/api';
import { toast } from 'sonner';

export const CreateGroupPage: React.FC = () => {
  const [groupName, setGroupName] = useState('');
  const [memberEmails, setMemberEmails] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addEmailField = () => {
    setMemberEmails([...memberEmails, '']);
  };

  const removeEmailField = (index: number) => {
    if (memberEmails.length > 1) {
      setMemberEmails(memberEmails.filter((_, i) => i !== index));
    }
  };

  const updateEmail = (index: number, value: string) => {
    const updated = [...memberEmails];
    updated[index] = value;
    setMemberEmails(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!groupName.trim()) {
      toast.error('Please enter a group name');
      return;
    }

    // Filter out empty emails
    const validEmails = memberEmails.filter(email => email.trim() !== '');
    
    if (validEmails.length === 0) {
      toast.error('Please add at least one member email');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = validEmails.filter(email => !emailRegex.test(email));
    
    if (invalidEmails.length > 0) {
      toast.error('Please enter valid email addresses');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/groups', {
        name: groupName.trim(),
        memberEmails: validEmails
      });
      
      toast.success('Group created successfully!');
      navigate(`/groups/${response.data._id}`);
    } catch (error) {
      console.error('Failed to create group:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-warm-800 mb-2">Create New Group</h1>
          <p className="text-warm-600">
            Start a new group to share expenses with friends
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-mac p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Group Name */}
            <div>
              <label htmlFor="groupName" className="block text-sm font-medium text-warm-700 mb-2">
                Group Name
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Users className="w-5 h-5 text-warm-400" />
                </div>
                <input
                  type="text"
                  id="groupName"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 mac-input rounded-lg focus:outline-none"
                  placeholder="e.g., Weekend Trip, Roommates, Office Lunch"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Member Emails */}
            <div>
              <label className="block text-sm font-medium text-warm-700 mb-2">
                Member Emails
              </label>
              <p className="text-sm text-warm-600 mb-4">
                Add the email addresses of people you want to include in this group
              </p>
              
              <div className="space-y-3">
                {memberEmails.map((email, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-1 relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Mail className="w-5 h-5 text-warm-400" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => updateEmail(index, e.target.value)}
                        className="w-full pl-12 pr-4 py-3 mac-input rounded-lg focus:outline-none"
                        placeholder="friend@example.com"
                        disabled={loading}
                      />
                    </div>
                    
                    {memberEmails.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEmailField(index)}
                        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        disabled={loading}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addEmailField}
                className="mt-3 flex items-center space-x-2 px-4 py-2 text-warm-600 hover:text-warm-700 hover:bg-beige-50 rounded-lg transition-colors"
                disabled={loading}
              >
                <Plus className="w-4 h-4" />
                <span>Add another email</span>
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
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
                    Creating...
                  </>
                ) : (
                  'Create Group'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
