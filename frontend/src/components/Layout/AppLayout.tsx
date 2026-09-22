import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { MobileNavbar } from './MobileNavbar';
import { CharacterSelector } from '../AICharacter/CharacterSelector';

export const AppLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col antialiased selection:bg-cyan-500/20 selection:text-cyan-600 dark:selection:text-cyan-300 transition-colors duration-300">
      <div className="flex-1 flex w-full overflow-hidden">
        {/* Desktop Collapsible Sidebar */}
        <div className="hidden md:block shrink-0">
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </div>

        {/* Mobile Navigation Drawer */}
        <MobileNavbar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          {/* Top Navbar */}
          <Navbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

          {/* Page Viewport */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50/60 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 transition-colors duration-300">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Global AI Character Selection Modal */}
      <CharacterSelector />
    </div>
  );
};
