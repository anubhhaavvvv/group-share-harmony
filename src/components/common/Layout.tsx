
import React from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      <div className="scanline pointer-events-none" />
      
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <Sidebar />
      
      <main className="flex-1 overflow-auto relative z-10">
        <div className="terminal-window m-6 min-h-[calc(100vh-3rem)] max-w-7xl mx-auto">
          <div className="terminal-header">
            <div className="terminal-controls">
              <div className="terminal-dot terminal-dot-red"></div>
              <div className="terminal-dot terminal-dot-yellow"></div>
              <div className="terminal-dot terminal-dot-green"></div>
            </div>
            <div className="terminal-text">
              SplitGroup Terminal v2.1.0 • Connected
            </div>
            <div className="w-16"></div>
          </div>
          <div className="p-8 lg:p-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
