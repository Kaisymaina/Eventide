"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Ticket,
  Store,
  PlusCircle,
  ShieldCheck,
  Zap,
  Users,
  Award,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Flame,
  Globe,
  Clock,
} from "lucide-react";

export const WebsiteSummarySection: React.FC = () => {
  const { setActiveTab } = useApp();
  const [activePersonaTab, setActivePersonaTab] = useState<"attendee" | "vendor" | "organizer">("attendee");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const personaContent = {
    attendee: {
      title: "Discover & Experience Unforgettable Live Events",
      subtitle: "Instant booking, transparent pricing, and instant digital QR passes on your mobile device.",
      points: [
        "Browse verified concerts, tech summits, food expos, fashion runways & fine art exhibitions",
        "Sort live tickets by price (High to Low or Low to High) & filter by upcoming vs passed events",
        "Instant digital QR passes stored in 'My Tickets' wallet — no printouts required",
        "Bookmark & save your favorite events to track date changes & venue updates",
      ],
      ctaText: "Discover Live Events Now",
      action: () => setActiveTab("home"),
      badge: "For Event Enthusiasts",
      color: "from-orange-500 to-amber-500",
    },
    vendor: {
      title: "Monetize Your Business at Top Live Festivals & Summits",
      subtitle: "Direct access to open vendor stall calls for food caterers, tech demos, fashion pop-ups & art stalls.",
      points: [
        "Browse open stall opportunities filtered by service (Food, Tech, Art, Retail, Sound)",
        "Inspect booth amenities in advance (power supply, size, water access, complimentary vendor passes)",
        "Submit quick 1-minute digital applications to event organizers with your brand portfolio",
        "Receive real-time notifications on application approvals",
      ],
      ctaText: "Browse Vending Opportunities",
      action: () => setActiveTab("vending"),
      badge: "For Vendors & Vendors Hub",
      color: "from-emerald-500 to-teal-600",
    },
    organizer: {
      title: "Host, Price & Manage Events with World-Class Tools",
      subtitle: "All-in-one wizard for event creation, multi-tier ticketing, and vendor recruitment.",
      points: [
        "Create rich event listings with custom date, time, venue, and high-resolution banner images",
        "Configure custom ticket tiers (Early Bird, Regular, VIP Passes, Group Discounts)",
        "Open vendor calls for food trucks, tech sponsors & stall holders directly from your dashboard",
        "Track sales, monitor check-in status, and manage attendance effortlessly",
      ],
      ctaText: "Create Your Event Now",
      action: () => setActiveTab("create-event"),
      badge: "For Event Organizers & Creators",
      color: "from-rose-500 to-purple-600",
    },
  };

  const faqs = [
    {
      q: "What is Eventide?",
      a: "Eventide is East Africa's premier live event marketplace and vending hub. It empowers attendees to discover and book event tickets, vendors to find stall opportunities at top festivals, and organizers to create and manage full-scale events with ease.",
    },
    {
      q: "How does ticket booking and digital check-in work?",
      a: "When you purchase a ticket for any event, Eventide generates an instant secure digital pass with a unique QR code. You can view all your active passes anytime in the 'My Tickets' section. At the event venue, simply show your digital pass for fast verification.",
    },
    {
      q: "How do vendors apply for stall slots?",
      a: "Event organizers post open vendor slots on the Vending Hub for specific events (e.g. food stalls, tech demo booths, art stands). Vendors can browse available slots, inspect included amenities, and submit a digital application in seconds.",
    },
    {
      q: "Can I sort events by price or filter by past events?",
      a: "Yes! Eventide features interactive filtering controls. You can sort events by Price (High to Low, Low to High) or Date (Soonest First), and switch between Live/Upcoming events and Passed events.",
    },
    {
      q: "How do I create and host my own event on Eventide?",
      a: "Click on 'Create Event' in the navigation bar to launch our step-by-step wizard. You can set up your event details, create multiple ticket tiers, and even publish open vendor stall positions.",
    },
  ];

  return (
    <div className="space-y-16 py-6 border-t border-b border-zinc-200/80 dark:border-zinc-800">
      {/* 1. Header Title & Value Proposition */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-black uppercase tracking-widest border border-orange-500/20">
          <Sparkles className="h-4 w-4 text-orange-500 animate-bounce" />
          Everything About Eventide
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
          East Africa&apos;s Ultimate Live Event &amp; Vending Platform
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
          Whether you want to attend thrilling concerts, pitch at tech summits, showcase fashion collections, sell gourmet food, or organize massive festivals — Eventide connects you to the entire ecosystem.
        </p>
      </div>

      {/* 2. Interactive Persona Switch Tabs */}
      <div className="space-y-8">
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-inner">
            <button
              onClick={() => setActivePersonaTab("attendee")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activePersonaTab === "attendee"
                  ? "bg-white dark:bg-zinc-800 text-orange-600 dark:text-orange-400 shadow-md scale-105"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <Ticket className="h-4 w-4 text-orange-500" />
              For Attendees
            </button>

            <button
              onClick={() => setActivePersonaTab("vendor")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activePersonaTab === "vendor"
                  ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-md scale-105"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <Store className="h-4 w-4 text-emerald-500" />
              For Vendors &amp; Stalls
            </button>

            <button
              onClick={() => setActivePersonaTab("organizer")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activePersonaTab === "organizer"
                  ? "bg-white dark:bg-zinc-800 text-purple-600 dark:text-purple-400 shadow-md scale-105"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <PlusCircle className="h-4 w-4 text-purple-500" />
              For Event Organizers
            </button>
          </div>
        </div>

        {/* Persona Active Content Box with Animation */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 via-white to-orange-50/30 dark:from-zinc-900/90 dark:via-zinc-900 dark:to-zinc-950 p-8 sm:p-12 shadow-xl animate-in fade-in zoom-in-95 duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r ${personaContent[activePersonaTab].color}`}>
                <Flame className="h-3.5 w-3.5" />
                {personaContent[activePersonaTab].badge}
              </span>

              <h3 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
                {personaContent[activePersonaTab].title}
              </h3>

              <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium">
                {personaContent[activePersonaTab].subtitle}
              </p>

              <div className="space-y-3 pt-2">
                {personaContent[activePersonaTab].points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                      {pt}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={personaContent[activePersonaTab].action}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-sm shadow-xl shadow-orange-600/20 hover:scale-105 transition-all"
                >
                  <span>{personaContent[activePersonaTab].ctaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Feature Illustration Card */}
            <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-zinc-950 p-6 space-y-6 text-white">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500" />
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono text-zinc-400">Eventide Ecosystem Dashboard v2.0</span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Ticket className="h-6 w-6 text-orange-400" />
                    <div>
                      <p className="text-xs font-bold">Instant Ticket Verification</p>
                      <p className="text-[10px] text-zinc-400">Encrypted QR pass system</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
                    Live Active
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Store className="h-6 w-6 text-amber-400" />
                    <div>
                      <p className="text-xs font-bold">Vending Stall Allocation</p>
                      <p className="text-[10px] text-zinc-400">Food, tech, fashion &amp; retail booths</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-400 bg-amber-950 px-2.5 py-1 rounded-lg border border-amber-800">
                    4 Open Slots
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-purple-400" />
                    <div>
                      <p className="text-xs font-bold">Price Sorting &amp; Filtering</p>
                      <p className="text-[10px] text-zinc-400">High-to-Low, Category pills</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-purple-400 bg-purple-950 px-2.5 py-1 rounded-lg border border-purple-800">
                    Real-time
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Live Platform Statistics Counter */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 text-center space-y-2 hover:scale-105 transition-transform">
          <div className="h-10 w-10 mx-auto flex items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold">
            <Ticket className="h-5 w-5" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">50,000+</p>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Tickets Issued</p>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 text-center space-y-2 hover:scale-105 transition-transform">
          <div className="h-10 w-10 mx-auto flex items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
            <Store className="h-5 w-5" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">500+</p>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Active Vendors</p>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 text-center space-y-2 hover:scale-105 transition-transform">
          <div className="h-10 w-10 mx-auto flex items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold">
            <Users className="h-5 w-5" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">1,200+</p>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Events Hosted</p>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 text-center space-y-2 hover:scale-105 transition-transform">
          <div className="h-10 w-10 mx-auto flex items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold">
            <Award className="h-5 w-5" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">99.4%</p>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Satisfaction Rate</p>
        </div>
      </div>

      {/* 4. Interactive FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
            Got Questions?
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-extrabold text-sm text-zinc-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform ${isOpen ? "rotate-180 text-orange-500" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
