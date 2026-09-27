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
  Filter,
} from "lucide-react";

interface EventCalendarTopProps {
  events: EventItem[];
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
}

export const EventCalendarTop: React.FC<EventCalendarTopProps> = ({
  events,
  selectedDate,
  onSelectDate,
}) => {
  // Current displayed month state (Defaulting to Nov 2026 based on dataset)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 10, 1)); // Nov 2026
  const [isCollapsed, setIsCollapsed] = useState(true);

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

  return (
    <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-xl space-y-4 transition-all">
      {/* Top Control Bar: Title, Month Nav & Quick Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
        {/* Left Title & Status */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-md shadow-orange-500/20 shrink-0">
            <CalendarIcon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-white">
                Event Calendar
              </h3>
              {selectedDate && (
                <span className="flex items-center gap-1 text-[11px] font-black text-orange-600 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/30">
                  <CheckCircle className="h-3 w-3" />
                  Selected: {selectedDate}
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-500 font-medium mt-0.5">
              Select any date on the grid below to view live events scheduled for that day
            </p>
          </div>
        </div>

        {/* Right Controls: Month Selector & Collapse Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Month Switcher */}
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/80">
            <button
              onClick={prevMonth}
              aria-label="Previous Month"
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:text-orange-600 shadow-xs transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="text-xs font-extrabold text-zinc-900 dark:text-white px-3 min-w-[110px] text-center">
              {monthNames[month]} {year}
            </span>

            <button
              onClick={nextMonth}
              aria-label="Next Month"
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:text-orange-600 shadow-xs transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Date Presets */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelectDate(null)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                !selectedDate
                  ? "bg-orange-600 text-white shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
              }`}
            >
              All Dates
            </button>
            <button
              onClick={() => onSelectDate("2026-11-12")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDate === "2026-11-12"
                  ? "bg-orange-600 text-white shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
              }`}
            >
              Nov 12
            </button>
            <button
              onClick={() => onSelectDate("2026-12-19")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDate === "2026-12-19"
                  ? "bg-orange-600 text-white shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
              }`}
            >
              Dec 19
            </button>
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 px-2 py-1"
          >
            {isCollapsed ? "Expand Grid ▼" : "Collapse Grid ▲"}
          </button>
        </div>
      </div>

      {/* Grid View (Visible unless collapsed) */}
      {!isCollapsed && (
        <div className="space-y-2 animate-in fade-in duration-200">
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {daysOfWeek.map((day) => (
              <span key={day} className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 py-1">
                {day}
              </span>
            ))}
          </div>

          {/* Calendar Grid Days */}
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {calendarCells.map((cell, idx) => {
              if (!cell) {
                return <div key={`empty-${idx}`} className="h-10 sm:h-12 w-full" />;
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
                  className={`group relative h-10 sm:h-12 w-full rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex flex-col items-center justify-center ${
                    isSelected
                      ? "bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-600/30 scale-105 z-10 border-2 border-white/40"
                      : hasEvents
                      ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 border border-orange-500/40"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 border border-transparent"
                  }`}
                >
                  <span>{cell.day}</span>

                  {/* Indicator Dot / Badge */}
                  {hasEvents && !isSelected && (
                    <span className="flex items-center gap-1 mt-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                      <span className="text-[9px] font-black text-orange-600 dark:text-orange-400 hidden sm:inline">
                        {liveEventCount}
                      </span>
                    </span>
                  )}

                  {/* Hover Tooltip Popover */}
                  {hasEvents && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-40">
                      <div className="bg-zinc-950 text-white text-[11px] font-bold p-3 rounded-2xl shadow-2xl whitespace-nowrap border border-zinc-800 space-y-1 max-w-xs">
                        <div className="text-orange-400 font-extrabold border-b border-zinc-800 pb-1">
                          {cell.eventsOnDay.length} Event{cell.eventsOnDay.length === 1 ? "" : "s"} on {cell.dateStr}:
                        </div>
                        {cell.eventsOnDay.map((e) => (
                          <div key={e.id} className="truncate text-left text-[10px] text-zinc-300">
                            • {e.title} ({e.category})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
