
import React, { useState } from 'react';
import { User, Mail, Calendar, Edit2 } from 'lucide-react';
import { Layout } from '../components/common/Layout';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = () => {
    // This would typically make an API call to update user info
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  if (!user) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-warm-800">User not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-warm-800 mb-2">Profile</h1>
          <p className="text-warm-600">
            Manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-mac p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-warm-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-warm-800">{user.name}</h2>
                <p className="text-warm-600">{user.email}</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-4 py-2 text-warm-600 hover:text-warm-700 hover:bg-beige-50 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              <span>{isEditing ? 'Cancel' : 'Edit'}</span>
            </button>
          </div>

          {isEditing ? (
            /* Edit Form */
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-warm-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <User className="w-5 h-5 text-warm-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 mac-input rounded-lg focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-warm-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Mail className="w-5 h-5 text-warm-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 mac-input rounded-lg focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 px-4 border border-beige-200 text-warm-700 rounded-lg hover:bg-beige-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 px-4 bg-warm-500 text-white rounded-lg hover:bg-warm-600 font-semibold transition-all duration-200 shadow-mac hover:shadow-mac-hover"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            /* Profile Info */
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-beige-50 rounded-lg">
                <div className="w-10 h-10 bg-warm-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-warm-500" />
                </div>
                <div>
                  <p className="text-sm text-warm-600">Full Name</p>
                  <p className="font-medium text-warm-800">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-beige-50 rounded-lg">
                <div className="w-10 h-10 bg-warm-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-warm-500" />
                </div>
                <div>
                  <p className="text-sm text-warm-600">Email Address</p>
                  <p className="font-medium text-warm-800">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-beige-50 rounded-lg">
                <div className="w-10 h-10 bg-warm-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-warm-500" />
                </div>
                <div>
                  <p className="text-sm text-warm-600">Member Since</p>
                  <p className="font-medium text-warm-800">December 2024</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Account Actions */}
        <div className="mt-8 bg-white rounded-2xl shadow-mac p-6">
          <h3 className="text-lg font-semibold text-warm-800 mb-4">Account Actions</h3>
          
          <div className="space-y-3">
            <button className="w-full text-left p-4 hover:bg-beige-50 rounded-lg transition-colors">
              <p className="font-medium text-warm-800">Change Password</p>
              <p className="text-sm text-warm-600">Update your account password</p>
            </button>
            
            <button className="w-full text-left p-4 hover:bg-red-50 rounded-lg transition-colors text-red-600">
              <p className="font-medium">Delete Account</p>
              <p className="text-sm">Permanently delete your account and all data</p>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
