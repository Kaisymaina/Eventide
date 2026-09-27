"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import {
  Sparkles,
  Sun,
  Moon,
  Ticket,
  Store,
  PlusCircle,
  Compass,
  User,
  Flame,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const {
    theme,
    toggleTheme,
    user,
    isRegistered,
    setShowRegistrationModal,
    activeTab,
    setActiveTab,
    purchasedTickets,
  } = useApp();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-500/20 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-xl transition-all shadow-sm">
      {/* Top Animated Gradient Accent Bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-orange-500 via-rose-500 via-amber-400 to-purple-600 animate-shimmer" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Dashing Animated Brand Logo */}
        <div
          onClick={() => setActiveTab("home")}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-600 via-orange-500 to-amber-400 p-0.5 shadow-lg shadow-orange-500/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 animate-pulse-glow">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-zinc-950/30 backdrop-blur-md text-white">
              <Sparkles className="h-5 w-5 text-amber-200 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500" />
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-artistic flex items-baseline tracking-tight group-hover:opacity-95 transition-opacity">
                <span className="text-4xl sm:text-5xl font-black bg-gradient-to-tr from-orange-600 via-rose-500 to-amber-400 bg-clip-text text-transparent drop-shadow-sm group-hover:scale-110 transition-transform inline-block">
                  E
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-orange-500 via-rose-500 via-amber-500 to-purple-600 bg-clip-text text-transparent -ml-0.5 animate-shimmer">
                  ventide
                </span>
              </span>
              <span className="hidden sm:flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/60 border border-orange-300/60 dark:border-orange-800/60 rounded-full px-2 py-0.5 shadow-xs animate-float-subtle">
                <Flame className="h-3 w-3 text-orange-500 animate-bounce" />
                Live &amp; Vending
              </span>
            </div>
            <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide -mt-0.5 hidden xs:block">
              East Africa&apos;s Live Event &amp; Stall Hub
            </span>
          </div>
        </div>

        {/* Center Animated Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1.5 rounded-full bg-zinc-100/90 dark:bg-zinc-900/90 p-1.5 border border-zinc-200/80 dark:border-zinc-800/80 shadow-md shadow-orange-500/5">
          {/* Home Tab Button */}
          <button
            onClick={() => setActiveTab("home")}
            className={`group relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-300 ${
              activeTab === "home"
                ? "bg-white dark:bg-zinc-800 text-orange-600 dark:text-orange-400 shadow-md scale-105 border border-orange-500/20"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60"
            }`}
          >
            <Compass className={`h-4 w-4 text-orange-500 transition-transform duration-300 group-hover:rotate-45 ${activeTab === "home" ? "animate-spin-slow" : ""}`} />
            <span>Home</span>
            {activeTab === "home" && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-5 rounded-full bg-orange-500 animate-pulse" />
            )}
          </button>

          {/* All Events Tab Button */}
          <button
            onClick={() => setActiveTab("all-events")}
            className={`group relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-300 ${
              activeTab === "all-events" || activeTab === "event-details"
                ? "bg-white dark:bg-zinc-800 text-rose-600 dark:text-rose-400 shadow-md scale-105 border border-rose-500/20"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60"
            }`}
          >
            <Sparkles className={`h-4 w-4 text-rose-500 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 ${activeTab === "all-events" ? "animate-pulse" : ""}`} />
            <span>All Events</span>
            {(activeTab === "all-events" || activeTab === "event-details") && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-5 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>

          {/* Vending Hub Tab Button */}
          <button
            onClick={() => setActiveTab("vending")}
            className={`group relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-300 ${
              activeTab === "vending"
                ? "bg-white dark:bg-zinc-800 text-amber-600 dark:text-amber-400 shadow-md scale-105 border border-amber-500/20"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60"
            }`}
          >
            <Store className="h-4 w-4 text-amber-500 transition-transform duration-300 group-hover:scale-125" />
            <span>Vending Hub</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
            </span>
            {activeTab === "vending" && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-5 rounded-full bg-amber-500 animate-pulse" />
            )}
          </button>

          {/* My Tickets Tab Button */}
          <button
            onClick={() => setActiveTab("tickets")}
            className={`group relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-300 ${
              activeTab === "tickets"
                ? "bg-white dark:bg-zinc-800 text-rose-600 dark:text-rose-400 shadow-md scale-105 border border-rose-500/20"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60"
            }`}
          >
            <Ticket className="h-4 w-4 text-rose-500 transition-transform duration-300 group-hover:rotate-12" />
            <span>My Tickets</span>
            {purchasedTickets.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[10px] font-black text-white shadow-sm animate-bounce">
                {purchasedTickets.length}
              </span>
            )}
            {activeTab === "tickets" && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-5 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>

          {/* Create Event CTA Button */}
          <button
            onClick={() => setActiveTab("create-event")}
            className={`group relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-300 ${
              activeTab === "create-event"
                ? "bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 text-white shadow-lg shadow-orange-500/30 scale-105"
                : "bg-gradient-to-r from-orange-500/15 via-rose-500/15 to-amber-500/15 text-orange-600 dark:text-orange-400 hover:from-orange-500 hover:to-rose-500 hover:text-white shadow-sm"
            }`}
          >
            <PlusCircle className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            <span>Create Event</span>
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all text-xs font-bold hover:scale-105 active:scale-95 shadow-xs"
          >
            {theme === "light" ? (
              <>
                <Moon className="h-4 w-4 text-zinc-700 transition-transform duration-300 hover:rotate-45" />
                <span className="hidden sm:inline">Dark</span>
              </>
            ) : (
              <>
                <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 hover:rotate-90" />
                <span className="hidden sm:inline">Light</span>
              </>
            )}
          </button>

          {/* User Account / Registration CTA */}
          {isRegistered && user ? (
            <button
              onClick={() => setActiveTab("tickets")}
              className="group flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1.5 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-orange-500/20 transition-all hover:scale-105 shadow-xs"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[10px] font-black group-hover:rotate-12 transition-transform">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline max-w-[100px] truncate">{user.name}</span>
            </button>
          ) : (
            <button
              onClick={() => setShowRegistrationModal(true)}
              className="flex items-center gap-1.5 rounded-xl border border-orange-500 bg-orange-50 dark:bg-orange-950/40 px-3.5 py-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 hover:bg-orange-500 hover:text-white transition-all shadow-md hover:scale-105 active:scale-95"
            >
              <User className="h-3.5 w-3.5" />
              Register / Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Animated Nav Bar */}
      <div className="md:hidden flex justify-around border-t border-zinc-200/60 dark:border-zinc-800/60 py-2.5 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-all ${
            activeTab === "home" ? "text-orange-600 dark:text-orange-400 scale-110 -translate-y-0.5" : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Compass className={`h-4 w-4 ${activeTab === "home" ? "animate-spin-slow" : ""}`} />
          <span>Home</span>
          {activeTab === "home" && <span className="h-1 w-4 rounded-full bg-orange-500 animate-pulse" />}
        </button>

        <button
          onClick={() => setActiveTab("all-events")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-all ${
            activeTab === "all-events" || activeTab === "event-details" ? "text-rose-600 dark:text-rose-400 scale-110 -translate-y-0.5" : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Sparkles className={`h-4 w-4 ${activeTab === "all-events" ? "animate-pulse" : ""}`} />
          <span>All Events</span>
          {(activeTab === "all-events" || activeTab === "event-details") && (
            <span className="h-1 w-4 rounded-full bg-rose-500 animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("vending")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-all ${
            activeTab === "vending" ? "text-amber-600 dark:text-amber-400 scale-110 -translate-y-0.5" : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Store className="h-4 w-4" />
          <span>Vending</span>
          {activeTab === "vending" && <span className="h-1 w-4 rounded-full bg-amber-500 animate-pulse" />}
        </button>

        <button
          onClick={() => setActiveTab("tickets")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-all ${
            activeTab === "tickets" ? "text-rose-600 dark:text-rose-400 scale-110 -translate-y-0.5" : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Ticket className="h-4 w-4" />
          <span>Tickets</span>
          {activeTab === "tickets" && <span className="h-1 w-4 rounded-full bg-rose-500 animate-pulse" />}
        </button>

        <button
          onClick={() => setActiveTab("create-event")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-all ${
            activeTab === "create-event" ? "text-orange-600 dark:text-orange-400 scale-110 -translate-y-0.5" : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <PlusCircle className="h-4 w-4" />
          <span>Create</span>
          {activeTab === "create-event" && <span className="h-1 w-4 rounded-full bg-orange-500 animate-pulse" />}
        </button>
      </div>
    </header>
  );
};
