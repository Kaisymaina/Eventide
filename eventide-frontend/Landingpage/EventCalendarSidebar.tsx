"use client";

import React, { useState } from "react";
import { EventItem } from "@/types";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  Clock,
  CheckCircle,
} from "lucide-react";

interface EventCalendarSidebarProps {
  events: EventItem[];
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
}

export const EventCalendarSidebar: React.FC<EventCalendarSidebarProps> = ({
  events,
  selectedDate,
  onSelectDate,
}) => {
  // Current displayed month state (Defaulting to Nov 2026 based on mock dataset)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 10, 1)); // Nov 2026

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Navigation handlers
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Compute days in month
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Map events to YYYY-MM-DD
  const eventsByDate = React.useMemo(() => {
    const map: Record<string, EventItem[]> = {};
    events.forEach((evt) => {
      const dateKey = evt.date; // e.g. "2026-11-12"
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(evt);
    });
    return map;
  }, [events]);

  // Construct calendar grid days
  const calendarCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const formattedMonth = String(month + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    calendarCells.push({ day, dateStr, eventsOnDay: eventsByDate[dateStr] || [] });
  }

  // Quick Preset Filters
  const handleSelectThisMonth = () => {
    onSelectDate(null);
  };

  return (
    <div className="space-y-6">
      {/* Calendar Card Container */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xl space-y-4">
        {/* Header: Title & Month Nav */}
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <CalendarIcon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white">
                Event Calendar
              </h3>
              <p className="text-[10px] text-zinc-400 font-semibold">Click a date to filter</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              aria-label="Previous Month"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200 px-1 min-w-[90px] text-center">
              {monthNames[month]} {year}
            </span>

            <button
              onClick={nextMonth}
              aria-label="Next Month"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {daysOfWeek.map((day) => (
            <span key={day} className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 py-1">
              {day}
            </span>
          ))}
        </div>

        {/* Calendar Grid Days */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {calendarCells.map((cell, idx) => {
            if (!cell) {
              return <div key={`empty-${idx}`} className="h-9 w-full" />;
            }

            const isSelected = selectedDate === cell.dateStr;
            const hasEvents = cell.eventsOnDay.length > 0;
            const liveEventCount = cell.eventsOnDay.filter((e) => !e.isPassed).length;

            return (
              <button
                key={cell.dateStr}
                onClick={() => {
                  if (isSelected) {
                    onSelectDate(null);
                  } else {
                    onSelectDate(cell.dateStr);
                  }
                }}
                className={`group relative h-9 w-full rounded-xl text-xs font-extrabold transition-all duration-200 flex flex-col items-center justify-center ${
                  isSelected
                    ? "bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-md shadow-orange-600/30 scale-105 z-10"
                    : hasEvents
                    ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 border border-orange-500/30"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                <span>{cell.day}</span>

                {/* Event Count Indicator Dot */}
                {hasEvents && !isSelected && (
                  <span className="absolute bottom-1 flex h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                )}

                {/* Popover Hover Badge */}
                {hasEvents && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex flex-col items-center pointer-events-none z-30">
                    <div className="bg-zinc-950 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-xl whitespace-nowrap border border-zinc-800">
                      {liveEventCount} Event{liveEventCount === 1 ? "" : "s"} on {cell.dateStr}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Date Filter Active Bar */}
        {selectedDate && (
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
            <span className="text-orange-600 dark:text-orange-400 font-extrabold flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" />
              Date: {selectedDate}
            </span>
            <button
              onClick={() => onSelectDate(null)}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 font-bold flex items-center gap-1 text-[11px]"
            >
              <X className="h-3.5 w-3.5" />
              Clear Date
            </button>
          </div>
        )}
      </div>

      {/* Quick Date Presets */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm space-y-3">
        <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400 block">
          Quick Date Ranges
        </span>
        <div className="space-y-2 text-xs font-bold">
          <button
            onClick={() => onSelectDate(null)}
            className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all ${
              !selectedDate
                ? "border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400"
                : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
          >
            <span>All Dates Catalogue</span>
            <span className="text-[10px] bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded-full">
              {events.length}
            </span>
          </button>

          <button
            onClick={() => onSelectDate("2026-11-12")}
            className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all ${
              selectedDate === "2026-11-12"
                ? "border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400"
                : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Safari Tech Summit (Nov 12)
            </span>
            <span className="text-[10px] bg-orange-500/20 text-orange-600 px-2 py-0.5 rounded-full font-black">
              Featured
            </span>
          </button>

          <button
            onClick={() => onSelectDate("2026-12-19")}
            className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all ${
              selectedDate === "2026-12-19"
                ? "border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400"
                : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-rose-500" />
              Sun &amp; Stars Fest (Dec 19)
            </span>
            <span className="text-[10px] bg-orange-500/20 text-orange-600 px-2 py-0.5 rounded-full font-black">
              Concert
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
