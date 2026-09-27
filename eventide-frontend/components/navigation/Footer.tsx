"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 transition-colors mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-600 via-orange-500 to-amber-400 p-0.5 shadow-md shadow-orange-500/20 text-white">
                <Sparkles className="h-4 w-4 text-amber-200" />
              </div>
              <span className="font-artistic flex items-baseline tracking-tight">
                <span className="text-3xl font-black bg-gradient-to-tr from-orange-600 via-rose-500 to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
                  E
                </span>
                <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 bg-clip-text text-transparent -ml-0.5">
                  ventide
                </span>
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Connecting culture, concerts, tech summits, food expos & vendor markets across East Africa. Secure, simple, and unmistakably local.
            </p>
          </div>

          {/* Quick Explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-3">
              Explore Platform
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => setActiveTab("home")} className="hover:text-orange-600">
                  Discover Live Events
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("vending")} className="hover:text-orange-600">
                  Vending Opportunities Hub
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("tickets")} className="hover:text-orange-600">
                  My Purchased Tickets
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("create-event")} className="hover:text-orange-600">
                  Host & Create an Event
                </button>
              </li>
            </ul>
          </div>

          {/* Event Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>Concerts & Music Festivals</li>
              <li>Tech & Business Summits</li>
              <li>Arts & Culture Biennale</li>
              <li>Education & STEM Workshops</li>
              <li>Food & Wine Tastings</li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-3">
              Support & Legal
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>Help Center & FAQs</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Contact Support</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-zinc-400">
          <p>© 2026 Eventide Kenya. Securely Built for Live Experiences & Vendors.</p>
          <div className="flex items-center gap-1">
            <span>Made for event culture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
