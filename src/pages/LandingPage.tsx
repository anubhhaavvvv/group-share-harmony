
import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Users, DollarSign, Receipt, Smartphone, ArrowRight, Code, Zap, Shield } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Group Management',
      description: 'Create and manage expense groups with intuitive terminal-style commands',
      cmd: 'splitgroup create --name "Weekend Trip"'
    },
    {
      icon: DollarSign,
      title: 'Smart Splitting',
      description: 'Automatically calculate splits with precision and transparency',
      cmd: 'splitgroup split --amount 85.50 --users 4'
    },
    {
      icon: Receipt,
      title: 'Expense Tracking',
      description: 'Track all expenses with detailed logs and audit trails',
      cmd: 'splitgroup log --filter "last_month"'
    },
    {
      icon: Smartphone,
      title: 'Cross Platform',
      description: 'Access your data anywhere with our responsive terminal interface',
      cmd: 'splitgroup sync --device mobile'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      <div className="scanline pointer-events-none" />
      
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-gray-800/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Terminal className="w-7 h-7 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary glow-text">SplitGroup</h1>
                <p className="text-xs text-accent font-mono">v2.1.0</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="px-6 py-2.5 text-primary hover:text-accent font-mono text-sm transition-colors border border-gray-700/50 rounded-lg hover:border-primary/40 backdrop-blur-sm"
              >
                ./login
              </Link>
              <Link
                to="/register"
                className="terminal-button flex items-center space-x-2"
              >
                <span>./register</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="terminal-window max-w-4xl mx-auto">
            <div className="terminal-header">
              <div className="terminal-controls">
                <div className="terminal-dot terminal-dot-red"></div>
                <div className="terminal-dot terminal-dot-yellow"></div>
                <div className="terminal-dot terminal-dot-green"></div>
              </div>
              <div className="terminal-text">
                splitgroup@terminal:~
              </div>
              <div className="w-16"></div>
            </div>
            
            <div className="p-8 lg:p-12">
              <div className="font-mono text-sm text-accent mb-4">
                <span className="text-primary">➜</span> splitgroup --version
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold text-primary glow-text mb-6 leading-tight">
                Split expenses like a
                <span className="block text-accent">terminal pro</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl font-mono leading-relaxed">
                Command-line inspired expense splitting for groups. 
                Track, split, and settle with precision and style.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/register"
                  className="terminal-button text-lg px-8 py-4 flex items-center justify-center space-x-2"
                >
                  <span>./start --now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-gray-800/40 border border-gray-600/40 text-primary hover:bg-gray-700/40 rounded-lg font-mono text-lg transition-all duration-200 flex items-center justify-center space-x-2 backdrop-blur-sm"
                >
                  <span>./demo</span>
                  <Code className="w-5 h-5" />
                </Link>
              </div>

              <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-600/30 backdrop-blur-sm">
                <div className="font-mono text-sm">
                  <div className="text-accent mb-1">$ splitgroup create "Weekend Trip"</div>
                  <div className="text-green-400 mb-1">✓ Group created successfully</div>
                  <div className="text-accent mb-1">$ splitgroup add-expense --amount 120.00 --description "Dinner"</div>
                  <div className="text-green-400 mb-1">✓ Expense added and split among 4 members</div>
                  <div className="text-primary">
                    <span className="text-accent">user@splitgroup:~$</span>
                    <span className="animate-pulse ml-1">_</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-primary glow-text mb-4">
              Terminal-Grade Features
            </h3>
            <p className="text-xl text-muted-foreground font-mono max-w-2xl mx-auto">
              Built for efficiency, designed for developers, loved by everyone
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="terminal-card group">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-800/60 rounded-lg flex items-center justify-center border border-gray-600/40">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Zap className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3 font-mono">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-700/40">
                  <code className="text-xs text-accent font-mono">
                    $ {feature.cmd}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-6 lg:px-8 border-t border-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="terminal-card">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary glow-text mb-2">99.9%</div>
                <div className="text-muted-foreground font-mono">Uptime</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">< 50ms</div>
                <div className="text-muted-foreground font-mono">Response Time</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary glow-text mb-2">256-bit</div>
                <div className="text-muted-foreground font-mono">Encryption</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="terminal-card hero-gradient">
            <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
            <h3 className="text-3xl lg:text-4xl font-bold text-primary glow-text mb-4">
              Ready to execute?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 font-mono max-w-2xl mx-auto">
              Join the terminal revolution. Split expenses with precision, track with transparency.
            </p>
            <Link
              to="/register"
              className="terminal-button text-lg px-8 py-4 inline-flex items-center space-x-2"
            >
              <span>./initialize --user</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 py-8">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Terminal className="w-5 h-5 text-black" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-primary">SplitGroup</h4>
                <p className="text-xs text-muted-foreground font-mono">Terminal Edition</p>
              </div>
            </div>
            <p className="text-muted-foreground font-mono text-sm">
              © 2024 • Built with precision
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
