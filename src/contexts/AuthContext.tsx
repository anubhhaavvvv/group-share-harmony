import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { api } from '../services/api';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Check for test user first
        const testUser = localStorage.getItem('testUser');
        if (testUser) {
          setUser(JSON.parse(testUser));
          setLoading(false);
          return;
        }

        const response = await api.get('/users/me');
        setUser(response.data);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('testUser');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Check for test credentials
      if (email === 'test@splitgroup.com' && password === 'password123') {
        const testUser = {
          _id: 'test-user-id',
          name: 'Test User',
          email: 'test@splitgroup.com'
        };
        
        localStorage.setItem('token', 'test-jwt-token');
        localStorage.setItem('testUser', JSON.stringify(testUser));
        setUser(testUser);
        return;
      }

      const response = await api.post('/users/login', { email, password });
      const { token, user: userData } = response.data;

      localStorage.setItem('token', token);
      localStorage.removeItem('testUser');
      setUser(userData);
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response?.status === 401) {
        toast.error('Invalid email or password');
      } else if (error.response?.status >= 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error('Login failed. Please try again.');
      }
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/users/register', { name, email, password });
      const { token, user: userData } = response.data;

      localStorage.setItem('token', token);
      localStorage.removeItem('testUser');
      setUser(userData);
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.response?.status === 400) {
        toast.error('User already exists or invalid data');
      } else if (error.response?.status >= 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error('Registration failed. Please try again.');
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('testUser');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
