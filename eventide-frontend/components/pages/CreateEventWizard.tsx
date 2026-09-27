"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { CategoryType, EventItem, TicketTier } from "@/types";
import {
  Upload,
  Plus,
  Trash2,
  Save,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export const CreateEventWizard: React.FC = () => {
  const { addEvent, setActiveTab, triggerToast, setSelectedEvent } = useApp();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [category, setCategory] = useState<CategoryType>("Concerts");
  const [visibility, setVisibility] = useState<"Public" | "Private">("Public");
  const [date, setDate] = useState("2026-12-25");
  const [time, setTime] = useState("18:00");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("Nairobi");
  const [description, setDescription] = useState("");
  const [bannerUrl, setBannerUrl] = useState(
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop"
  );

  // Vendor Option State
  const [enableVendorCalls, setEnableVendorCalls] = useState(false);
  const [vendorCategory, setVendorCategory] = useState<"Food & Beverage" | "Tech Demos" | "Art & Craft">("Food & Beverage");
  const [vendorFee, setVendorFee] = useState(15000);
  const [vendorSpots, setVendorSpots] = useState(8);

  // Ticket Tiers State
  const [tiers, setTiers] = useState<TicketTier[]>([
    {
      id: "t-1",
      name: "Standard Pass",
      price: 1500,
      description: "General Admission entry",
      availableQuantity: 500,
    },
    {
      id: "t-2",
      name: "VIP Deck Pass",
      price: 4500,
      description: "Elevated view + welcome beverage",
      availableQuantity: 100,
      isPopular: true,
    },
  ]);

  const handleAddTier = () => {
    const newTier: TicketTier = {
      id: `t-${Date.now()}`,
      name: "New Tier",
      price: 2500,
      description: "Custom ticket perk description",
      availableQuantity: 200,
    };
    setTiers([...tiers, newTier]);
  };

  const handleRemoveTier = (id: string) => {
    if (tiers.length === 1) {
      triggerToast("You must have at least 1 ticket tier.");
      return;
    }
    setTiers(tiers.filter((t) => t.id !== id));
  };

  const handlePublish = () => {
    if (!title.trim() || !venue.trim() || !description.trim()) {
      triggerToast("Please fill in event title, venue, and description.");
      return;
    }

    const priceFrom = Math.min(...tiers.map((t) => t.price));

    const newEvent: EventItem = {
      id: `evt-${Date.now()}`,
      title,
      tagline: tagline || description.slice(0, 80),
      category,
      date,
      time,
      venue,
      city,
      priceFrom,
      bannerImage: bannerUrl,
      description,
      tags: [`#${category}`, `#${city}Events`, "#EventideLive"],
      ticketTiers: tiers,
      isPassed: false,
      isFeatured: true,
      ...(enableVendorCalls && {
        vendorOpening: {
          id: `v-${Date.now()}`,
          category: vendorCategory,
          title: `${category} Vendor & Exhibition Slots`,
          spotsNeeded: vendorSpots,
          spotsRemaining: vendorSpots,
          boothFee: vendorFee,
          boothSize: "3m x 3m Canopy Space",
          perks: ["Power Outlet Provided", "2 Vendor Passes", "Official Event Map Feature"],
          deadline: date,
        },
      }),
    };

    addEvent(newEvent);
    setSelectedEvent(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
              Event Management Studio
            </span>
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="text-[11px] font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 transition-colors"
            >
              Cancel &amp; Go Back
            </button>
          </div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white mt-1">
            Create New Event
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Bring your vision to life. Share the music, tech, and vibe on Eventide.
          </p>
        </div>

        {/* Wizard Steps Progress (1 Details -> 2 Tickets -> 3 Review matching inspo2) */}
        <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800/60 p-2 rounded-2xl border border-zinc-200 dark:border-zinc-700/60">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
              step === 1
                ? "bg-orange-600 text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            <span className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
            Details
          </button>
          <button
            onClick={() => setStep(2)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
              step === 2
                ? "bg-orange-600 text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            <span className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
            Tickets & Vendors
          </button>
          <button
            onClick={() => setStep(3)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
              step === 3
                ? "bg-orange-600 text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            <span className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
            Review
          </button>
        </div>
      </div>

      {/* STEP 1: EVENT DETAILS */}
      {step === 1 && (
        <div className="space-y-6">
          {/* Banner Upload Card */}
          <div className="relative h-56 rounded-3xl overflow-hidden border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center justify-center p-6 group cursor-pointer">
            <img
              src={bannerUrl}
              alt="Banner preview"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
            />
            <div className="relative z-10 text-center space-y-2 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white">
              <Upload className="h-6 w-6 mx-auto text-orange-400" />
              <p className="text-xs font-bold">Upload Event Banner (16:9 Aspect Ratio)</p>
              <p className="text-[10px] text-zinc-300">JPG, PNG up to 5MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-2.5 text-xs font-bold text-zinc-900 dark:text-white focus:border-orange-500"
              >
                <option value="Concerts">Concerts & Music</option>
                <option value="Tech">Tech & Innovation</option>
                <option value="Arts">Arts & Culture</option>
                <option value="Education">Education & STEM</option>
                <option value="Food">Food & Wine</option>
              </select>
            </div>

            {/* Visibility */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Visibility Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setVisibility("Public")}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    visibility === "Public"
                      ? "border-orange-500 bg-orange-600 text-white"
                      : "border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  Public (Discoverable)
                </button>
                <button
                  type="button"
                  onClick={() => setVisibility("Private")}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    visibility === "Private"
                      ? "border-orange-500 bg-orange-600 text-white"
                      : "border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  Private (Link Only)
                </button>
              </div>
            </div>
          </div>

          {/* Event Name */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Event Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sol Generation: The Sun & Stars Festival 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-sm text-zinc-900 dark:text-white font-bold focus:border-orange-500"
            />
          </div>

          {/* Tagline & Description */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Event Tagline
              </label>
              <input
                type="text"
                placeholder="e.g. Deep afro house grooves under the Nairobi stars"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 text-xs font-bold text-zinc-900 dark:text-white focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                City / Region
              </label>
              <input
                type="text"
                placeholder="e.g. Nairobi, Mombasa, Kisumu"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 text-xs font-bold text-zinc-900 dark:text-white focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Event Description & Vibe
            </label>
            <textarea
              rows={4}
              required
              placeholder="Tell us about the artists, speakers, food stalls, and experience..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-sm text-zinc-900 dark:text-white focus:border-orange-500"
            />
          </div>

          {/* Banner URL Input */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Banner Image URL
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 text-xs text-zinc-900 dark:text-white focus:border-orange-500"
            />
          </div>

          {/* Date, Time, Venue */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-2.5 text-xs font-bold text-zinc-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-2.5 text-xs font-bold text-zinc-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Venue Location
              </label>
              <input
                type="text"
                placeholder="e.g. Ngong Racecourse, Nairobi"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-2.5 text-xs font-bold text-zinc-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: TICKETS & VENDORS */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-zinc-900 dark:text-white">
                Ticket Configuration
              </h3>
              <p className="text-xs text-zinc-500">Configure ticket tiers, prices, and quantities.</p>
            </div>
            <button
              onClick={handleAddTier}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Another Tier
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tiers.map((t, idx) => (
              <div
                key={t.id}
                className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-3 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold uppercase text-orange-600">Tier #{idx + 1}</span>
                  <button
                    onClick={() => handleRemoveTier(t.id)}
                    className="text-zinc-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <input
                  type="text"
                  value={t.name}
                  onChange={(e) => {
                    const updated = [...tiers];
                    updated[idx].name = e.target.value;
                    setTiers(updated);
                  }}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 py-1.5 text-xs font-bold"
                />

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase">Price (KES)</label>
                    <input
                      type="number"
                      value={t.price}
                      onChange={(e) => {
                        const updated = [...tiers];
                        updated[idx].price = Number(e.target.value);
                        setTiers(updated);
                      }}
                      className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 py-1.5 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase">Quantity</label>
                    <input
                      type="number"
                      value={t.availableQuantity}
                      onChange={(e) => {
                        const updated = [...tiers];
                        updated[idx].availableQuantity = Number(e.target.value);
                        setTiers(updated);
                      }}
                      className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 py-1.5 text-xs font-bold"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Vendor Calls Option */}
          <div className="p-6 rounded-3xl border border-orange-500/30 bg-orange-500/5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-orange-500" />
                  Open Vendor Applications on Vending Hub?
                </h4>
                <p className="text-xs text-zinc-500">Allow food stalls, tech exhibitors or artists to apply for booth spots.</p>
              </div>
              <input
                type="checkbox"
                checked={enableVendorCalls}
                onChange={(e) => setEnableVendorCalls(e.target.checked)}
                className="h-5 w-5 accent-orange-600 rounded cursor-pointer"
              />
            </div>

            {enableVendorCalls && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-orange-500/20">
                <div>
                  <label className="text-[10px] font-bold uppercase text-zinc-500">Vendor Type Needed</label>
                  <select
                    value={vendorCategory}
                    onChange={(e) => setVendorCategory(e.target.value as "Food & Beverage" | "Tech Demos" | "Art & Craft")}
                    className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-2 text-xs font-bold"
                  >
                    <option value="Food & Beverage">Food & Beverage</option>
                    <option value="Tech Demos">Tech Demos</option>
                    <option value="Art & Craft">Art & Craft</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-zinc-500">Booth Reservation Fee (KES)</label>
                  <input
                    type="number"
                    value={vendorFee}
                    onChange={(e) => setVendorFee(Number(e.target.value))}
                    className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-2 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-zinc-500">Total Vendor Spots</label>
                  <input
                    type="number"
                    value={vendorSpots}
                    onChange={(e) => setVendorSpots(Number(e.target.value))}
                    className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-2 text-xs font-bold"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: REVIEW & PUBLISH */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white">
              Event Summary Preview
            </h3>

            <div className="flex gap-4">
              <img
                src={bannerUrl}
                alt="Banner"
                className="h-24 w-40 rounded-2xl object-cover"
              />
              <div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-orange-600 text-white">
                  {category}
                </span>
                <h4 className="text-base font-extrabold text-zinc-900 dark:text-white mt-1">
                  {title || "Untitled Event"}
                </h4>
                <p className="text-xs text-zinc-500">📅 {date} • {venue}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-bold text-zinc-400 block mb-2">Configured Ticket Passes:</span>
              <div className="flex flex-wrap gap-3">
                {tiers.map((t) => (
                  <div key={t.id} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-xs font-bold">
                    {t.name}: <span className="text-orange-600">KES {t.price.toLocaleString()}</span> ({t.availableQuantity} available)
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wizard Action Footer Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => triggerToast("Draft saved successfully")}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Save className="h-4 w-4" />
          Save Draft
        </button>

        <div className="flex gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md shadow-orange-600/20"
            >
              Next: Configure Tickets
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublish}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-extrabold shadow-xl shadow-orange-600/30 transition-all hover:scale-105"
            >
              <Sparkles className="h-4 w-4" />
              Publish Live on Eventide
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
