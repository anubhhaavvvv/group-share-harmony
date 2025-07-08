
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Users, DollarSign, Activity, TrendingUp, Terminal } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'active groups', value: '3', cmd: 'ps aux | grep group', icon: Users, color: 'text-primary' },
    { label: 'total expenses', value: '$1,247.50', cmd: 'sum expenses.log', icon: DollarSign, color: 'text-accent' },
    { label: 'pending splits', value: '7', cmd: 'wc -l pending.txt', icon: Activity, color: 'text-yellow-400' },
    { label: 'saved this month', value: '$234.80', cmd: 'grep -c "saved" month.log', icon: TrendingUp, color: 'text-green-400' },
  ];

  const recentActivity = [
    { action: 'Created group "Weekend Trip"', time: '2 hours ago', cmd: 'mkdir weekend_trip' },
    { action: 'Added expense: Dinner $85.00', time: '1 day ago', cmd: 'echo "dinner: 85.00" >> expenses.log' },
    { action: 'Split payment with John', time: '2 days ago', cmd: 'split -u john payment.txt' },
    { action: 'Joined group "Office Lunch"', time: '3 days ago', cmd: 'join office_lunch' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary glow-text mb-2">
            Dashboard
          </h1>
          <p className="text-accent font-mono">
            <span className="text-primary">➜</span> welcome back, {user?.name}
          </p>
        </div>
        <button className="terminal-button flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>new group</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="terminal-card">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
              <Terminal className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-mono">
                {stat.label}
              </div>
              <div className="text-xs text-accent font-mono">
                $ {stat.cmd}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="terminal-card">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-primary">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="text-sm text-foreground mb-1">
                    {activity.action}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {activity.time}
                  </div>
                  <div className="text-xs text-accent font-mono">
                    $ {activity.cmd}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="terminal-card">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-primary">Active Groups</h2>
          </div>
          <div className="space-y-3">
            {['Weekend Trip', 'Office Lunch', 'Roommate Expenses'].map((group, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-primary/5 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-mono font-bold">
                      {group.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {group}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {3 + index} members
                    </div>
                  </div>
                </div>
                <button className="text-primary hover:text-accent transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="terminal-card">
        <div className="flex items-center space-x-2 mb-4">
          <Terminal className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-primary">System Log</h2>
        </div>
        <div className="bg-black/60 rounded-lg p-4 font-mono text-sm">
          <div className="text-primary mb-1">[INFO] User authenticated successfully</div>
          <div className="text-accent mb-1">[DEBUG] Loading dashboard components...</div>
          <div className="text-green-400 mb-1">[SUCCESS] Dashboard loaded in 0.045s</div>
          <div className="text-yellow-400 mb-1">[WARN] 2 pending notifications</div>
          <div className="text-primary">
            <span className="text-accent">user@splitgroup:~$</span>
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
