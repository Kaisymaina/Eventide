"use client";

import React from "react";
import { EventItem } from "@/types";
import { useApp } from "@/context/AppContext";
import { Calendar, MapPin, Store, Ticket, Clock, AlertCircle } from "lucide-react";

interface EventCardProps {
  event: EventItem;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { setSelectedEvent, setTicketModalEvent, setActiveTab } = useApp();

  const isPassed = event.isPassed;

  return (
    <div
      className={`group relative flex flex-col h-full rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl ${
        isPassed
          ? "border-zinc-300 dark:border-zinc-800 bg-zinc-100/90 dark:bg-zinc-900/60 grayscale opacity-80"
          : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:-translate-y-1"
      }`}
    >
      {/* Banner Image Header */}
      <div
        onClick={() => setSelectedEvent(event)}
        className="relative h-48 w-full overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-900"
      >
        <img
          src={event.bannerImage}
          alt={event.title}
          className={`h-full w-full object-cover transition-transform duration-500 ${
            isPassed ? "grayscale contrast-75" : "group-hover:scale-105"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {isPassed ? (
            <span className="flex items-center gap-1 rounded-full bg-zinc-700/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-200 shadow-md">
              <Clock className="h-3 w-3 text-zinc-400" />
              Event Ended
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-full bg-orange-600/95 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow-md">
              {event.category}
            </span>
          )}

          {event.vendorOpening && !isPassed && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab("vending");
              }}
              className="flex items-center gap-1 rounded-full bg-emerald-600/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white hover:bg-emerald-700 shadow-md transition-colors"
            >
              <Store className="h-3 w-3" />
              Vendors Needed
            </button>
          )}
        </div>

        {/* Date Stamp Overlay on Banner */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10 font-medium">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
            <Calendar className="h-3.5 w-3.5 text-orange-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 max-w-[50%] truncate">
            <MapPin className="h-3.5 w-3.5 text-orange-400 shrink-0" />
            <span className="truncate">{event.city}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3
            onClick={() => setSelectedEvent(event)}
            className={`text-base font-bold tracking-tight cursor-pointer line-clamp-1 transition-colors ${
              isPassed
                ? "text-zinc-600 dark:text-zinc-400"
                : "text-zinc-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400"
            }`}
          >
            {event.title}
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {event.tagline || event.description}
          </p>
        </div>

        {/* Card Footer: Price & Ticket Action */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-semibold text-zinc-400 block">
              {isPassed ? "Pass Status" : "Tickets From"}
            </span>
            <span
              className={`text-base font-extrabold ${
                isPassed
                  ? "text-zinc-400 dark:text-zinc-500 line-through"
                  : "text-zinc-900 dark:text-white"
              }`}
            >
              {isPassed ? `KES ${event.priceFrom.toLocaleString()}` : `KES ${event.priceFrom.toLocaleString()}`}
            </span>
          </div>

          {isPassed ? (
            <button
              disabled
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-400 text-xs font-semibold cursor-not-allowed"
            >
              <AlertCircle className="h-3.5 w-3.5" />
              Passed
            </button>
          ) : (
            <button
              onClick={() => setTicketModalEvent(event)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md shadow-orange-600/20 transition-all hover:scale-105 active:scale-95"
            >
              <Ticket className="h-3.5 w-3.5" />
              Get Tickets
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
