"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { PurchasedTicket } from "@/types";
import {
  Ticket,
  Download,
  Wallet,
} from "lucide-react";

export const UserDashboard: React.FC = () => {
  const {
    user,
    purchasedTickets,
    setActiveTab,
    triggerToast,
    logoutUser,
  } = useApp();

  const totalSpent = purchasedTickets.reduce((acc, t) => acc + t.totalPaid, 0);

  // Past events dataset (matching inspo4 "Past Events" list)
  const pastEventsHistory = [
    {
      id: "past-1",
      title: "Coast Film Festival 2026",
      date: "Aug 15, 2026 • Mombasa",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=300&auto=format&fit=crop",
      status: "ATTENDED",
    },
    {
      id: "past-2",
      title: "Savor Nairobi Food Expo",
      date: "July 2, 2026 • Sarit Expo",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=300&auto=format&fit=crop",
      status: "ATTENDED",
    },
  ];

  const handleDownloadPDF = (tkt: PurchasedTicket) => {
    triggerToast(`Downloading PDF Ticket for ${tkt.eventTitle}...`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-7xl mx-auto">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
              Account Overview • {user?.email || "Guest User"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white mt-1">
            Welcome, {user?.name || "Eventide Explorer"}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Manage your upcoming live experiences, QR passes, and past festival entries.
          </p>
        </div>

        <button
          onClick={logoutUser}
          className="self-start sm:self-center px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          Sign Out / Change Account
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Active Passes & Upcoming Experiences */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
              <Ticket className="h-5 w-5 text-orange-600" />
              Upcoming Experiences
            </h2>
            <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-extrabold">
              {purchasedTickets.length} Active Passes
            </span>
          </div>

          {purchasedTickets.length === 0 ? (
            <div className="text-center py-12 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 p-6 space-y-3">
              <Ticket className="h-10 w-10 text-zinc-400 mx-auto" />
              <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">No active tickets yet</p>
              <button
                onClick={() => setActiveTab("home")}
                className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold shadow-md shadow-orange-600/20"
              >
                Browse Live Events
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {purchasedTickets.map((tkt) => (
                <div
                  key={tkt.id}
                  className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full bg-zinc-900">
                    <img
                      src={tkt.bannerImage}
                      alt={tkt.eventTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-orange-600 text-white text-[10px] font-extrabold shadow-md">
                      Valid Pass
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-orange-600 tracking-wider">
                        {tkt.tierName} • ({tkt.quantity} Pass)
                      </span>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white line-clamp-1 mt-0.5">
                        {tkt.eventTitle}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        📅 {tkt.eventDate} • {tkt.eventVenue}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
                      <button
                        onClick={() => handleDownloadPDF(tkt)}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md shadow-orange-600/20 transition-all"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download Pass (PDF)
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Past Events Section (greyed out attended history matching inspo4) */}
          <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white flex items-center justify-between">
              <span>Past Events</span>
              <span className="text-xs font-bold text-zinc-400">View All</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pastEventsHistory.map((past) => (
                <div
                  key={past.id}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 grayscale opacity-75"
                >
                  <img
                    src={past.image}
                    alt={past.title}
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 truncate">
                      {past.title}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-0.5">{past.date}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-[10px] font-extrabold text-zinc-500 uppercase">
                    {past.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Wallet & Account Settings (matching inspo4) */}
        <div className="space-y-6">
          {/* Wallet Summary Card */}
          <div className="rounded-3xl bg-gradient-to-br from-orange-600 to-amber-600 p-6 sm:p-7 text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-100">
                Wallet Summary
              </span>
              <Wallet className="h-5 w-5 text-amber-200" />
            </div>

            <div>
              <p className="text-xs text-orange-100">Total spent this month on experiences</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-1">
                KSh {(totalSpent || 14500).toLocaleString()}
              </h2>
            </div>

            <button
              onClick={() => triggerToast("Payment History loaded: 3 transaction receipts")}
              className="w-full py-3 rounded-xl bg-white text-orange-600 font-bold text-xs shadow-md hover:bg-orange-50 transition-all"
            >
              Payment History & Receipts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
