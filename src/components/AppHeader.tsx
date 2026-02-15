'use client';

import svgPaths from "../imports/svg-fymzuqw3ph";
import { useState, useRef, useEffect } from "react";
import { NotificationsDropdown } from "./NotificationsDropdown";

interface HeaderProps {
  userName?: string;
  donorNumber?: string;
  lastLogin?: string;
  notificationCount?: number;
}

export function AppHeader({
  userName = "יצחק נאמן",
  donorNumber = "23029120",
  lastLogin = 'כ״ג תמוז התשפ״ג, 23.05.23',
  notificationCount = 2,
}: HeaderProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }

    if (isNotificationsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isNotificationsOpen]);

  return (
    <div className="bg-card border-b border-border shadow-[var(--elevation-sm)] fixed top-0 left-0 right-0 md:mr-[237px] z-40" dir="rtl">
      <div className="flex items-center justify-between px-4 md:px-[38px] py-3 md:py-4">
        {/* Right Side - User Greeting */}
        <div className="flex flex-col gap-1 md:gap-2">
          <div className="flex items-center gap-2">
            <p className="text-foreground font-bold text-sm md:text-base">
              צהריים טובים {userName}
            </p>
            <div className="bg-foreground h-3 md:h-4 w-[2px]" />
            <p className="text-foreground text-sm md:text-base">
              מספר תורם {donorNumber}
            </p>
          </div>
          <p className="text-muted-foreground text-xs md:text-sm">
            כניסתך האחרונה: {lastLogin}
          </p>
        </div>

        {/* Left Side - User Menu and Notifications */}
        <div className="flex items-center gap-4">
          {/* Notification Icon with Badge */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="focus:outline-none focus:ring-2 focus:ring-ring rounded-[var(--radius-button)] p-2 hover:bg-muted/50 transition-colors relative"
              aria-label="התראות"
            >
              <IconNotification />
              {notificationCount > 0 && (
                <div className="absolute -top-1 -left-1 min-w-[20px] h-[20px] px-1 bg-destructive rounded-full flex items-center justify-center">
                  <span className="text-destructive-foreground text-[11px] leading-none font-bold">{notificationCount}</span>
                </div>
              )}
            </button>
            {isNotificationsOpen && <NotificationsDropdown />}
          </div>

          {/* Divider */}
          <div className="bg-border h-6 w-px" />

          {/* User Profile */}
          <div className="flex items-center gap-2">
            <IconUserCircle />
            <p className="text-foreground font-semibold">{userName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconUserCircle() {
  return (
    <div className="w-6 h-6">
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
        <path d={svgPaths.p22e17a00} stroke="currentColor" className="text-muted-foreground" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function IconNotification() {
  return (
    <div className="w-6 h-6">
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
        <path d={svgPaths.p5631c00} stroke="currentColor" className="text-foreground" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d={svgPaths.p24333600} stroke="currentColor" className="text-foreground" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
