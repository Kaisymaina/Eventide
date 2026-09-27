"use client";

import React, { useState } from "react";
import { TicketTier } from "@/types";
import { useApp } from "@/context/AppContext";
import { X, Ticket, ShieldCheck, CreditCard, Smartphone } from "lucide-react";

export const TicketModal: React.FC = () => {
  const { ticketModalEvent, setTicketModalEvent, buyTicket } = useApp();
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">("mpesa");
  const [phoneNumber, setPhoneNumber] = useState<string>("+254 712 345 678");

  if (!ticketModalEvent) return null;

  const event = ticketModalEvent;
  const activeTier = selectedTier || event.ticketTiers[0] || {
    id: "def",
    name: "Standard",
    price: event.priceFrom,
    description: "General Entry",
    availableQuantity: 50,
  };

  const totalPrice = activeTier.price * quantity;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    buyTicket(event, activeTier.name, activeTier.price, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600 text-white">
              <Ticket className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
                Secure Ticket Checkout
              </span>
              <h3 className="text-lg font-black text-zinc-900 dark:text-white line-clamp-1">
                {event.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setTicketModalEvent(null)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleCheckout} className="space-y-5">
          {/* Select Ticket Tier */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              Choose Ticket Category
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {event.ticketTiers.map((tier) => {
                const isSelected = activeTier.id === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? "border-orange-500 bg-orange-500/10 ring-2 ring-orange-500/20"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-zinc-900 dark:text-white">
                          {tier.name}
                        </span>
                        {tier.isPopular && (
                          <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-orange-600 text-white">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {tier.description}
                      </p>
                    </div>
                    <span className="font-black text-sm text-orange-600 dark:text-orange-400">
                      KES {tier.price.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ticket Quantity Selector */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
            <div>
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Ticket Quantity</span>
              <p className="text-[11px] text-zinc-500">Max 10 passes per checkout</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="h-8 w-8 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 font-bold text-sm shadow-sm"
              >
                -
              </button>
              <span className="w-6 text-center font-black text-base">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                className="h-8 w-8 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 font-bold text-sm shadow-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              Payment Gateway
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("mpesa")}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                  paymentMethod === "mpesa"
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                <Smartphone className="h-4 w-4" />
                M-PESA Express
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                  paymentMethod === "card"
                    ? "border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                <CreditCard className="h-4 w-4" />
                Credit / Debit Card
              </button>
            </div>
          </div>

          {paymentMethod === "mpesa" && (
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                M-PESA Phone Number
              </label>
              <input
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3.5 py-2 text-sm text-zinc-900 dark:text-white"
              />
            </div>
          )}

          {/* Price Summary & Submit */}
          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-zinc-500">Total Due</span>
              <span className="text-xl text-orange-600 dark:text-orange-400 font-black">
                KES {totalPrice.toLocaleString()}
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm shadow-xl shadow-orange-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <ShieldCheck className="h-4 w-4" />
              Pay & Issue Instant Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
