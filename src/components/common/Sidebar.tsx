
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Plus, User, LogOut, Users, Terminal, Activity, Cpu, Wifi } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

export const Sidebar: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Session terminated • Connection closed', {
      style: {
        background: 'rgba(17, 24, 39, 0.95)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        color: '#22c55e',
        backdropFilter: 'blur(12px)',
      },
    });
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard', cmd: 'ls -la ~/', desc: 'system overview' },
    { to: '/create-group', icon: Plus, label: 'Create Group', cmd: 'mkdir group/', desc: 'initialize new group' },
    { to: '/profile', icon: User, label: 'Profile', cmd: 'whoami', desc: 'user information' },
  ];

  return (
    <div className="w-80 bg-gray-950/95 backdrop-blur-2xl border-r border-gray-800/50 min-h-screen relative">
      {/* Sidebar header */}
      <div className="p-6 border-b border-gray-800/50">
        <div className="glass-effect p-4 rounded-xl">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Terminal className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary glow-text">SplitGroup</h1>
              <p className="text-sm text-accent font-mono">Terminal Edition</p>
            </div>
          </div>
          
          <div className="text-xs font-mono text-muted-foreground">
            <div className="flex items-center justify-between mb-1">
              <span>user@splitgroup:~$</span>
              <div className="flex items-center space-x-1">
                <Wifi className="w-3 h-3 text-primary" />
                <span className="text-primary">online</span>
              </div>
            </div>
            <div className="text-accent">
              {user?.name?.toLowerCase().replace(' ', '-') || 'guest'}
            </div>
          </div>
        </div>
      </div>

      {/* System status */}
      <div className="p-6 border-b border-gray-800/50">
        <div className="text-accent font-mono text-sm mb-3">
          <span className="text-primary">➜</span> system status
        </div>
        <div className="terminal-card py-4">
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <Activity className="w-3 h-3 text-primary" />
              <span className="text-primary">active</span>
            </div>
            <div className="flex items-center space-x-2">
              <Cpu className="w-3 h-3 text-accent" />
              <span className="text-muted-foreground">2.1 GHz</span>
            </div>
            <div className="text-muted-foreground">
              uptime: 24h 12m
            </div>
            <div className="text-muted-foreground">
              load: 0.45
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 flex-1">
        <div className="text-accent font-mono text-sm mb-4">
          <span className="text-primary">➜</span> navigation
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-nav group ${isActive ? 'sidebar-nav-active' : ''}`
              }
            >
              <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-mono text-sm font-medium text-foreground">
                  {item.label}
                </div>
                <div className="text-xs text-muted-foreground font-mono truncate">
                  {item.desc}
                </div>
                <div className="text-xs text-accent font-mono opacity-70 truncate">
                  $ {item.cmd}
                </div>
              </div>
              <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                →
              </div>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* System info and logout */}
      <div className="p-6 border-t border-gray-800/50">
        <div className="terminal-card mb-4">
          <div className="text-xs font-mono text-muted-foreground mb-2">
            <span className="text-primary">➜</span> process info
          </div>
          <div className="text-xs font-mono space-y-1">
            <div className="text-accent">PID: 1337</div>
            <div className="text-muted-foreground">Memory: 42.3 MB</div>
            <div className="text-muted-foreground">CPU: 1.2%</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full text-left p-4 rounded-xl hover:bg-red-500/10 hover:border-red-500/30 border border-transparent transition-all duration-200 backdrop-blur-sm"
        >
          <LogOut className="w-5 h-5 text-red-400 flex-shrink-0" />
          <div className="flex-1">
            <div className="font-mono text-sm text-red-400 font-medium">Terminate Session</div>
            <div className="text-xs text-red-400/60 font-mono">$ exit</div>
          </div>
        </button>
      </div>
    </div>
  );
};
