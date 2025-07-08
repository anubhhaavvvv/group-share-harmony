
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, DollarSign, Calendar } from 'lucide-react';
import { Layout } from '../components/common/Layout';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { api } from '../services/api';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

interface Group {
  _id: string;
  name: string;
  members: Array<{
    _id: string;
    name: string;
    email: string;
  }>;
  createdAt: string;
}

export const DashboardPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await api.get('/groups');
      setGroups(response.data);
    } catch (error) {
      toast.error('Failed to fetch groups');
    } finally {
      setLoading(false);
    }
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

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-warm-800 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-warm-600">
            Manage your groups and track shared expenses
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-mac">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-warm-100 rounded-lg flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-warm-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warm-800">{groups.length}</p>
                <p className="text-warm-600">Active Groups</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-mac">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warm-800">$0.00</p>
                <p className="text-warm-600">You Owe</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-mac">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <DollarSign className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warm-800">$0.00</p>
                <p className="text-warm-600">You're Owed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Groups Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-warm-800">Your Groups</h2>
            <Link
              to="/create-group"
              className="flex items-center space-x-2 px-4 py-2 bg-warm-500 text-white rounded-lg hover:bg-warm-600 transition-all duration-200 shadow-mac hover:shadow-mac-hover"
            >
              <Plus className="w-4 h-4" />
              <span>Create Group</span>
            </Link>
          </div>

          {groups.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-beige-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-beige-400" />
              </div>
              <h3 className="text-xl font-semibold text-warm-800 mb-2">No groups yet</h3>
              <p className="text-warm-600 mb-6">
                Create your first group to start splitting expenses with friends
              </p>
              <Link
                to="/create-group"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-warm-500 text-white rounded-lg hover:bg-warm-600 transition-all duration-200 shadow-mac hover:shadow-mac-hover"
              >
                <Plus className="w-4 h-4" />
                <span>Create Your First Group</span>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <Link
                  key={group._id}
                  to={`/groups/${group._id}`}
                  className="bg-white rounded-xl p-6 shadow-mac hover:shadow-mac-hover transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-warm-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-warm-500" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-warm-600">
                        {group.members.length} member{group.members.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-warm-800 mb-2">
                    {group.name}
                  </h3>
                  
                  <div className="flex items-center text-sm text-warm-600 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Created {new Date(group.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex -space-x-2">
                    {group.members.slice(0, 4).map((member, index) => (
                      <div
                        key={member._id}
                        className="w-8 h-8 bg-warm-500 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white"
                        title={member.name}
                      >
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                    ))}
                    {group.members.length > 4 && (
                      <div className="w-8 h-8 bg-beige-200 rounded-full flex items-center justify-center text-warm-600 text-sm font-medium border-2 border-white">
                        +{group.members.length - 4}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
