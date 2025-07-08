
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Users, DollarSign, Receipt, Smartphone, ArrowRight, Code, Zap, Shield, Activity, Monitor, Cpu } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);

  const terminalLines = [
    '$ splitgroup --version',
    'SplitGroup Terminal v2.1.0 • MacOS Edition',
    '$ splitgroup status',
    '✓ System online • 4 active groups • $1,247.50 tracked',
    '$ splitgroup init --welcome',
    'Welcome to the future of expense splitting...',
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const timer = setTimeout(() => {
        setTerminalText(prev => prev + terminalLines[currentLine] + '\n');
        setCurrentLine(prev => prev + 1);
      }, currentLine === 0 ? 500 : 1500);
      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  const features = [
    {
      icon: Users,
      title: 'Group Management',
      description: 'Create and manage expense groups with intuitive terminal-style commands',
      cmd: 'splitgroup create --name "Weekend Trip"',
      color: 'from-primary/20 to-accent/20'
    },
    {
      icon: DollarSign,
      title: 'Smart Splitting',
      description: 'Automatically calculate splits with precision and transparency',
      cmd: 'splitgroup split --amount 85.50 --users 4',
      color: 'from-accent/20 to-primary/20'
    },
    {
      icon: Receipt,
      title: 'Expense Tracking',
      description: 'Track all expenses with detailed logs and audit trails',
      cmd: 'splitgroup log --filter "last_month"',
      color: 'from-green-500/20 to-blue-500/20'
    },
    {
      icon: Smartphone,
      title: 'Cross Platform',
      description: 'Access your data anywhere with our responsive terminal interface',
      cmd: 'splitgroup sync --device mobile',
      color: 'from-blue-500/20 to-purple-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Custom cursor trail */}
      <div 
        className="fixed w-6 h-6 border-2 border-primary/50 rounded-full pointer-events-none z-50 transition-all duration-100"
        style={{ 
          left: mousePosition.x - 12, 
          top: mousePosition.y - 12,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          background: isHovering ? 'rgba(34, 197, 94, 0.1)' : 'transparent'
        }}
      />
      
      <div className="scanline pointer-events-none" />
      
      {/* Enhanced ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Navigation - macOS style */}
      <nav className="relative z-10 macos-titlebar backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="macos-traffic-lights">
              <div className="traffic-light traffic-light-red"></div>
              <div className="traffic-light traffic-light-yellow"></div>
              <div className="traffic-light traffic-light-green"></div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                <Terminal className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary glow-text font-mono">SplitGroup Terminal</h1>
                <p className="text-xs text-accent font-mono">macOS Edition v2.1.0</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 text-primary hover:text-accent font-mono text-sm transition-all duration-200 border border-gray-600/40 rounded-lg hover:border-primary/40 backdrop-blur-sm hover:bg-gray-800/20"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                ./login
              </Link>
              <Link
                to="/register"
                className="terminal-button flex items-center space-x-2"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <span>./register</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Terminal Window */}
      <section className="relative z-10 py-12 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="terminal-window max-w-5xl mx-auto">
            <div className="terminal-header">
              <div className="terminal-controls">
                <div className="terminal-dot terminal-dot-red"></div>
                <div className="terminal-dot terminal-dot-yellow"></div>
                <div className="terminal-dot terminal-dot-green"></div>
              </div>
              <div className="terminal-text">
                splitgroup@macbook-pro:~
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-primary" />
                <Monitor className="w-4 h-4 text-accent" />
              </div>
            </div>
            
            <div className="p-8 lg:p-12">
              {/* Animated Terminal */}
              <div className="bg-gray-950/90 rounded-lg p-6 mb-8 border border-gray-700/40 backdrop-blur-sm">
                <pre className="font-mono text-sm text-primary leading-relaxed whitespace-pre-wrap">
                  {terminalText}
                </pre>
                <div className="flex items-center mt-2">
                  <span className="text-accent">user@splitgroup:~$</span>
                  <span className="animate-pulse ml-2 text-primary">_</span>
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-5xl lg:text-7xl font-bold text-primary glow-text mb-6 leading-tight font-mono">
                  Split expenses like a
                  <span className="block text-accent">terminal master</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto font-mono leading-relaxed">
                  Professional-grade expense splitting with the power and elegance of macOS Terminal. 
                  Track, split, and settle with military precision.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  to="/register"
                  className="terminal-button text-lg px-8 py-4 flex items-center justify-center space-x-3 hover:scale-105 transition-all duration-200"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <Zap className="w-5 h-5" />
                  <span>./initialize --user</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-gray-800/60 border border-gray-600/40 text-primary hover:bg-gray-700/60 rounded-lg font-mono text-lg transition-all duration-200 flex items-center justify-center space-x-3 backdrop-blur-sm hover:scale-105"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <Code className="w-5 h-5" />
                  <span>./demo --interactive</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 mb-4">
              <Cpu className="w-8 h-8 text-primary" />
              <h3 className="text-4xl lg:text-5xl font-bold text-primary glow-text font-mono">
                System Features
              </h3>
            </div>
            <p className="text-xl text-muted-foreground font-mono max-w-2xl mx-auto">
              Built for professionals, designed for efficiency, loved by developers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="terminal-card group hover:scale-105 transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-800/80 rounded-lg flex items-center justify-center border border-gray-600/40 group-hover:border-primary/40 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <Zap className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-12" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-3 font-mono">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                  <div className="bg-gray-950/80 rounded-lg p-3 border border-gray-700/40 group-hover:border-primary/20 transition-colors">
                    <code className="text-xs text-accent font-mono">
                      $ {feature.cmd}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Status Section */}
      <section className="relative z-10 py-16 px-6 lg:px-8 border-t border-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="terminal-card">
            <div className="flex items-center space-x-3 mb-6">
              <Activity className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-primary font-mono">System Status</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="text-5xl font-bold text-primary glow-text mb-2 font-mono group-hover:scale-110 transition-transform">99.9%</div>
                <div className="text-muted-foreground font-mono">Uptime</div>
                <div className="text-xs text-accent font-mono mt-1">enterprise grade</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl font-bold text-accent mb-2 font-mono group-hover:scale-110 transition-transform">&lt; 50ms</div>
                <div className="text-muted-foreground font-mono">Response Time</div>
                <div className="text-xs text-accent font-mono mt-1">lightning fast</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl font-bold text-primary glow-text mb-2 font-mono group-hover:scale-110 transition-transform">256-bit</div>
                <div className="text-muted-foreground font-mono">Encryption</div>
                <div className="text-xs text-accent font-mono mt-1">military grade</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="terminal-card hero-gradient">
            <Shield className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
            <h3 className="text-4xl lg:text-5xl font-bold text-primary glow-text mb-4 font-mono">
              Ready to execute?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 font-mono max-w-2xl mx-auto leading-relaxed">
              Join the terminal revolution. Split expenses with precision, track with transparency, settle with confidence.
            </p>
            <Link
              to="/register"
              className="terminal-button text-lg px-8 py-4 inline-flex items-center space-x-3 hover:scale-105 transition-all duration-200"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Terminal className="w-5 h-5" />
              <span>./start --production</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 py-8 bg-gray-950/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Terminal className="w-5 h-5 text-black" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-primary font-mono">SplitGroup</h4>
                <p className="text-xs text-muted-foreground font-mono">Terminal Edition • macOS</p>
              </div>
            </div>
            <p className="text-muted-foreground font-mono text-sm">
              © 2024 • Built with precision • Powered by Terminal
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
