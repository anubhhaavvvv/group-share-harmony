
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Terminal, Lock, User, ArrowRight } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestLogin = () => {
    setEmail('test@splitgroup.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black relative">
      <div className="scanline pointer-events-none" />
      
      <div className="terminal-window w-full max-w-md mx-4">
        <div className="terminal-header">
          <div className="terminal-controls">
            <div className="terminal-dot terminal-dot-red"></div>
            <div className="terminal-dot terminal-dot-yellow"></div>
            <div className="terminal-dot terminal-dot-green"></div>
          </div>
          <div className="terminal-text text-sm">
            auth.splitgroup.com
          </div>
          <div className="w-16"></div>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
              <Terminal className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-2xl font-bold text-primary glow-text mb-2">
              SplitGroup Terminal
            </h1>
            <p className="text-accent font-mono text-sm">
              Authentication required
            </p>
          </div>

          <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="text-primary font-mono text-sm mb-2">
              <span className="text-accent">➜</span> test credentials
            </div>
            <div className="text-xs text-muted-foreground font-mono mb-2">
              email: test@splitgroup.com
            </div>
            <div className="text-xs text-muted-foreground font-mono mb-3">
              password: password123
            </div>
            <button
              onClick={handleTestLogin}
              className="terminal-button text-xs w-full"
            >
              Load test credentials
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-primary font-mono text-sm mb-2">
                <User className="w-4 h-4 inline mr-2" />
                email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="terminal-input w-full"
                placeholder="user@domain.com"
                required
              />
            </div>

            <div>
              <label className="block text-primary font-mono text-sm mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="terminal-input w-full"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="terminal-button w-full h-12 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <span>authenticate</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <div className="text-muted-foreground font-mono text-sm mb-2">
              <span className="text-accent">➜</span> new user?
            </div>
            <Link
              to="/register"
              className="text-primary hover:text-accent transition-colors font-mono text-sm underline"
            >
              create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
