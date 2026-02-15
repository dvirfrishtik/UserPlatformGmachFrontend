'use client';

import { useState } from 'react';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { Menu, X } from 'lucide-react';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex bg-page-section overflow-x-hidden" dir="rtl">
      {/* Desktop Sidebar - Hidden on Mobile */}
      <div className="hidden md:block">
        <AppSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-[237px] z-[61]">
            <AppSidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0 md:mr-[237px]">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-card border-b border-border shadow-[var(--elevation-sm)]">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-lg"
            style={{ border: "1px solid var(--border)" }}
            aria-label="תפריט"
          >
            <Menu size={22} style={{ color: "var(--foreground)" }} />
          </button>
          <div className="flex-1 text-center">
            <p style={{ fontSize: "14px", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)" }}>הגמ&quot;ח המרכזי</p>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block">
          <AppHeader />
        </div>

        {/* Content Area */}
        <div className="flex-1 px-3 py-4 pt-4 sm:px-4 sm:py-6 md:px-6 md:py-8 md:pt-[120px] overflow-x-hidden">
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
