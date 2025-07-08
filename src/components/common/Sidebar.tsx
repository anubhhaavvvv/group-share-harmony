
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Plus, User, LogOut, Users, Terminal, Activity } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

export const Sidebar: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Session terminated successfully', {
      style: {
        background: '#000',
        border: '1px solid #22c55e',
        color: '#22c55e',
      },
    });
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard', cmd: 'ls -la' },
    { to: '/create-group', icon: Plus, label: 'Create Group', cmd: 'mkdir' },
    { to: '/profile', icon: User, label: 'Profile', cmd: 'whoami' },
  ];

  return (
    <div className="w-72 bg-black/95 backdrop-blur-xl border-r border-primary/30 min-h-screen relative">
      <div className="p-6">
        <div className="terminal-glow mb-8 relative">
          <div className="flex items-center space-x-3 p-4 rounded-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <Terminal className="w-7 h-7 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary glow-text">SplitGroup</h1>
              <p className="text-sm text-accent font-mono">
                user@{user?.name?.toLowerCase().replace(' ', '-') || 'guest'}:~$
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-accent font-mono text-sm mb-2">
            <span className="text-primary">➜</span> system status
          </div>
          <div className="terminal-card">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-primary font-mono text-sm">online</span>
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              uptime: 24h 12m
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          <div className="text-accent font-mono text-sm mb-3">
            <span className="text-primary">➜</span> navigation
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-nav group ${isActive ? 'sidebar-nav-active' : ''}`
              }
            >
              <item.icon className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <div className="font-mono text-sm">{item.label}</div>
                <div className="text-xs text-muted-foreground font-mono">
                  {item.cmd}
                </div>
              </div>
              <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="terminal-card">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full text-left p-3 rounded-lg hover:bg-red-500/10 hover:border-red-500/30 border border-transparent transition-all duration-200"
            >
              <LogOut className="w-5 h-5 text-red-400" />
              <div>
                <div className="font-mono text-sm text-red-400">exit</div>
                <div className="text-xs text-red-400/60 font-mono">ctrl+d</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
