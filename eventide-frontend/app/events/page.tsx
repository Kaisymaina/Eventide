"use client";

import React from "react";
import { Navbar } from "@/Landingpage/Navbar";
import { Footer } from "@/Landingpage/Footer";
import { AllEventsPage } from "@/Landingpage/AllEventsPage";
import { RegistrationGate } from "@/Landingpage/RegistrationGate";

export default function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <Navbar />
      <RegistrationGate />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AllEventsPage />
      </main>
      <Footer />
    </div>
  );
}
