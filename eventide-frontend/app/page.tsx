"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { Navbar } from "@/components/navigation/Navbar";
import { RegistrationGate } from "@/components/modals/RegistrationGate";
import { HeroSlideshow } from "@/components/sections/HeroSlideshow";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { WebsiteSummarySection } from "@/components/sections/WebsiteSummarySection";
import { AllEventsPage } from "@/components/pages/AllEventsPage";
import { EventCard } from "@/components/cards/EventCard";
import { EventCardSkeleton } from "@/components/cards/EventCardSkeleton";
import { EventDetailsModal } from "@/components/modals/EventDetailsModal";
import { VendingSection } from "@/components/sections/VendingSection";
import { TicketModal } from "@/components/modals/TicketModal";
import { UserDashboard } from "@/components/pages/UserDashboard";
import { CreateEventWizard } from "@/components/pages/CreateEventWizard";
import { EventDetailsPage } from "@/components/pages/EventDetailsPage";
import { Footer } from "@/components/navigation/Footer";

import {
  Sparkles,
  ArrowRight,
  PlusCircle,
  Bell,
  Flame,
} from "lucide-react";
import { CategoryType } from "@/types";

export default function Home() {
  const {
    activeTab,
    events,
    isSkeletonLoading,
    toastMessage,
    setActiveTab,
  } = useApp();

  // Curated 4 display events for the Landing Page
  const featuredEvents = events.filter((e) => !e.isPassed).slice(0, 4);

  const handleCategorySelectFromShowcase = (cat: CategoryType) => {
    setActiveTab("all-events");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Toast Notification Floating Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-2xl border border-orange-500/30 animate-in slide-in-from-top duration-300">
          <Bell className="h-4 w-4 text-orange-500 animate-bounce" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar />

      {/* Registration Gate */}
      <RegistrationGate />

      {/* Dynamic Views based on Active Tab */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-16">
        {activeTab === "home" && (
          <>
            {/* 1. Hero Showcase Section */}
            <HeroSlideshow events={events} />

            {/* 2. Interactive Category Showcase (Fashion, Tech, Art, Food, Concerts) */}
            <CategoryShowcase
              selectedCategory="All"
              onSelectCategory={handleCategorySelectFromShowcase}
            />

            {/* 3. Curated Display Events (Only 4 Top Events for a Clean, Professional Landing Page) */}
            <div className="space-y-6 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-orange-600">
                    <Flame className="h-4 w-4 text-orange-500" />
                    Top Display Showcase
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white mt-1">
                    Featured &amp; Trending Events
                  </h2>
                </div>

                <button
                  onClick={() => setActiveTab("all-events")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs shadow-md shadow-orange-600/20 transition-all hover:scale-105 shrink-0"
                >
                  <span>View All Catalogue ({events.length} Events)</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {isSkeletonLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredEvents.map((evt) => (
                    <EventCard key={evt.id} event={evt} />
                  ))}
                </div>
              )}

              <div className="text-center pt-4">
                <button
                  onClick={() => setActiveTab("all-events")}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl border-2 border-orange-500/40 bg-orange-500/5 hover:bg-orange-500/15 text-orange-600 dark:text-orange-400 text-xs font-black transition-all hover:scale-105"
                >
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>Browse Full Marketplace with Filters &amp; High-to-Low Pricing →</span>
                </button>
              </div>
            </div>

            {/* 4. Comprehensive Website Summary Section ("Everything About Eventide") */}
            <WebsiteSummarySection />

            {/* 5. Host Your Own Event Callout Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 p-8 sm:p-12 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl text-center sm:text-left">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                  Event Organizer &amp; Vending Hub
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Host your own event with ease.
                </h3>
                <p className="text-xs sm:text-sm text-orange-100 leading-relaxed">
                  Join thousands of organizers across Kenya. From ticketing to vendor applications, Eventide provides the tools you need to make your event a success.
                </p>
              </div>

              <button
                onClick={() => setActiveTab("create-event")}
                className="shrink-0 flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-orange-600 font-extrabold text-sm shadow-xl hover:bg-orange-50 transition-all hover:scale-105"
              >
                <PlusCircle className="h-4 w-4" />
                Create Event Now
              </button>
            </div>
          </>
        )}

        {/* Dedicated All Events View */}
        {activeTab === "all-events" && <AllEventsPage />}

        {/* Vending Hub View */}
        {activeTab === "vending" && <VendingSection />}

        {/* My Tickets & User Dashboard View */}
        {activeTab === "tickets" && <UserDashboard />}

        {/* Create Event Wizard View */}
        {activeTab === "create-event" && <CreateEventWizard />}

        {/* Dedicated Event Details Page View */}
        {activeTab === "event-details" && <EventDetailsPage />}
      </main>

      {/* Modals */}
      <EventDetailsModal />
      <TicketModal />

      {/* Footer */}
      <Footer />
    </div>
  );
}
