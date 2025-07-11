
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Users, DollarSign, Activity, TrendingUp, Terminal, ArrowRight, Zap, Clock, Database, Cpu, Monitor } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { 
      label: 'active groups', 
      value: '3', 
      cmd: 'ps aux | grep group', 
      icon: Users, 
      color: 'text-primary',
      change: '+12%',
      trend: 'up'
    },
    { 
      label: 'total expenses', 
      value: '$1,247.50', 
      cmd: 'sum expenses.log', 
      icon: DollarSign, 
      color: 'text-accent',
      change: '+$89.20',
      trend: 'up'
    },
    { 
      label: 'pending splits', 
      value: '7', 
      cmd: 'wc -l pending.txt', 
      icon: Activity, 
      color: 'text-yellow-400',
      change: '-2',
      trend: 'down'
    },
    { 
      label: 'saved this month', 
      value: '$234.80', 
      cmd: 'grep -c "saved" month.log', 
      icon: TrendingUp, 
      color: 'text-green-400',
      change: '+15%',
      trend: 'up'
    },
  ];

  const recentActivity = [
    { 
      action: 'Created group "Weekend Trip"', 
      time: '2 hours ago', 
      cmd: 'mkdir weekend_trip',
      status: 'success',
      user: 'john_doe'
    },
    { 
      action: 'Added expense: Dinner $85.00', 
      time: '1 day ago', 
      cmd: 'echo "dinner: 85.00" >> expenses.log',
      status: 'success',
      user: 'sarah_m'
    },
    { 
      action: 'Split payment with John', 
      time: '2 days ago', 
      cmd: 'split -u john payment.txt',
      status: 'pending',
      user: 'mike_r'
    },
    { 
      action: 'Joined group "Office Lunch"', 
      time: '3 days ago', 
      cmd: 'join office_lunch',
      status: 'success',
      user: 'alex_k'
    },
  ];

  const activeGroups = [
    { name: 'Weekend Trip', members: 4, activity: 'high', lastActive: '2h ago' },
    { name: 'Office Lunch', members: 8, activity: 'medium', lastActive: '1d ago' },
    { name: 'Roommate Expenses', members: 3, activity: 'low', lastActive: '3d ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Professional Header Section */}
      <div className="terminal-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center border border-gray-600/40">
              <Monitor className="w-8 h-8 text-primary" />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-4xl font-bold text-primary glow-text font-mono">
                  Dashboard
                </h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-mono">online</span>
                </div>
              </div>
              <div className="font-mono text-lg text-accent">
                <span className="text-primary">➜</span> 
                <span className="ml-2">welcome back, {user?.name}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground font-mono mt-1">
                <span>Last login: Today at 09:42 AM</span>
                <span>•</span>
                <span>Session: 2h 34m</span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Cpu className="w-3 h-3" />
                  <span>1.2% CPU</span>
                </span>
              </div>
            </div>
          </div>
          <button className="terminal-button flex items-center space-x-3 text-lg px-6 py-3 hover:scale-105 transition-all duration-200">
            <Plus className="w-5 h-5" />
            <span>./create-group</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="terminal-card group hover:scale-105 transition-transform duration-200 cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-800/80 rounded-lg flex items-center justify-center border border-gray-600/40 group-hover:border-primary/40 transition-colors">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className={`w-4 h-4 transition-transform group-hover:scale-110 ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`} />
                <span className={`text-xs font-mono ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary font-mono">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-mono">
                {stat.label}
              </div>
              <div className="text-xs text-accent font-mono bg-gray-950/60 rounded p-2 border border-gray-700/40">
                $ {stat.cmd}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="terminal-card">
          <div className="flex items-center space-x-3 mb-6">
            <Activity className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-primary font-mono">Process Log</h2>
            <div className="flex-1"></div>
            <Clock className="w-4 h-4 text-accent" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-800/40 transition-colors border border-gray-700/30 group">
                <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                  activity.status === 'success' ? 'bg-green-400 animate-pulse' : 
                  activity.status === 'pending' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-foreground mb-1 font-mono">
                    {activity.action}
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground font-mono mb-2">
                    <span>{activity.time}</span>
                    <span>•</span>
                    <span>@{activity.user}</span>
                  </div>
                  <div className="text-xs text-accent font-mono bg-gray-950/60 rounded p-2 border border-gray-700/40 group-hover:border-primary/20 transition-colors">
                    $ {activity.cmd}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Groups */}
        <div className="terminal-card">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-primary font-mono">Active Processes</h2>
            <div className="flex-1"></div>
            <Database className="w-4 h-4 text-accent" />
          </div>
          <div className="space-y-4">
            {activeGroups.map((group, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-800/40 transition-colors border border-gray-700/30 group cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center border border-gray-600/40 group-hover:border-primary/40 transition-colors">
                    <span className="text-primary font-mono font-bold text-lg">
                      {group.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground font-mono">
                      {group.name}
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground font-mono">
                      <span>{group.members} members</span>
                      <span>•</span>
                      <span className={`flex items-center space-x-1 ${
                        group.activity === 'high' ? 'text-green-400' :
                        group.activity === 'medium' ? 'text-yellow-400' : 'text-gray-400'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          group.activity === 'high' ? 'bg-green-400 animate-pulse' :
                          group.activity === 'medium' ? 'bg-yellow-400 animate-pulse' : 'bg-gray-400'
                        }`}></div>
                        <span>{group.activity} activity</span>
                      </span>
                      <span>•</span>
                      <span>{group.lastActive}</span>
                    </div>
                  </div>
                </div>
                <button className="text-primary hover:text-accent transition-colors opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Monitor */}
      <div className="terminal-card">
        <div className="flex items-center space-x-3 mb-6">
          <Terminal className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-primary font-mono">System Monitor</h2>
          <div className="flex-1"></div>
          <Zap className="w-4 h-4 text-accent animate-pulse" />
        </div>
        <div className="bg-gray-950/90 rounded-lg p-6 font-mono text-sm border border-gray-700/40 backdrop-blur-sm">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>[INFO]</span>
              <span>2024-01-08 14:32:15</span>
            </div>
            <div className="text-primary mb-2">User authenticated successfully • Session: {user?.name}</div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>[DEBUG]</span>
              <span>2024-01-08 14:32:16</span>
            </div>
            <div className="text-accent mb-2">Loading dashboard components... ✓</div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>[SUCCESS]</span>
              <span>2024-01-08 14:32:17</span>
            </div>
            <div className="text-green-400 mb-2">Dashboard loaded in 0.125s • Memory usage: 12.4MB</div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>[WARN]</span>
              <span>2024-01-08 14:32:18</span>
            </div>
            <div className="text-yellow-400 mb-4">2 pending notifications • 1 group requires attention</div>
            
            <div className="border-t border-gray-700/40 pt-4">
              <div className="text-primary flex items-center font-mono">
                <span className="text-accent">user@splitgroup:~$</span>
                <span className="animate-pulse ml-2">_</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
