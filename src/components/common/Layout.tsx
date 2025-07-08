
import React from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative">
      <div className="scanline pointer-events-none" />
      <Sidebar />
      <main className="flex-1 overflow-auto relative">
        <div className="terminal-window m-4 min-h-[calc(100vh-2rem)]">
          <div className="terminal-header">
            <div className="terminal-controls">
              <div className="terminal-dot terminal-dot-red"></div>
              <div className="terminal-dot terminal-dot-yellow"></div>
              <div className="terminal-dot terminal-dot-green"></div>
            </div>
            <div className="terminal-text text-sm">
              SplitGroup Terminal v2.0.1
            </div>
            <div className="w-16"></div>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
