"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { EventItem, PurchasedTicket, UserProfile, VendorApplication } from "@/types";
import { INITIAL_EVENTS } from "@/mockdata/eventsData";

interface AppContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  isRegistered: boolean;
  user: UserProfile | null;
  registerUser: (profile: Omit<UserProfile, "registeredAt">) => void;
  logoutUser: () => void;
  showRegistrationModal: boolean;
  setShowRegistrationModal: (show: boolean) => void;
  isSkeletonLoading: boolean;
  setIsSkeletonLoading: (loading: boolean) => void;
  toggleSkeleton: () => void;
  activeTab: "home" | "all-events" | "vending" | "tickets" | "create-event" | "event-details";
  setActiveTab: (tab: "home" | "all-events" | "vending" | "tickets" | "create-event" | "event-details") => void;
  events: EventItem[];
  addEvent: (event: EventItem) => void;
  purchasedTickets: PurchasedTicket[];
  buyTicket: (event: EventItem, tierName: string, price: number, quantity: number) => void;
  vendorApplications: VendorApplication[];
  submitVendorApplication: (app: Omit<VendorApplication, "id" | "status" | "submittedAt">) => void;
  selectedEvent: EventItem | null;
  setSelectedEvent: (event: EventItem | null) => void;
  ticketModalEvent: EventItem | null;
  setTicketModalEvent: (event: EventItem | null) => void;
  toastMessage: string | null;
  triggerToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState<boolean>(false);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState<boolean>(false);
  type TabType = "home" | "all-events" | "vending" | "tickets" | "create-event" | "event-details";
  const [activeTab, setActiveTabState] = useState<TabType>("home");
  const [previousTab, setPreviousTab] = useState<TabType>("home");
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [purchasedTickets, setPurchasedTickets] = useState<PurchasedTicket[]>([]);
  const [vendorApplications, setVendorApplications] = useState<VendorApplication[]>([]);
  const [selectedEvent, setSelectedEventState] = useState<EventItem | null>(null);

  const setActiveTab = (tab: TabType) => {
    if (tab === "home" || tab === "all-events" || tab === "vending" || tab === "tickets") {
      setPreviousTab(tab);
    }
    setActiveTabState(tab);
  };

  const setSelectedEvent = (evt: EventItem | null) => {
    setSelectedEventState(evt);
    if (evt) {
      setActiveTabState("event-details");
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      setActiveTabState(previousTab);
    }
  };
  const [ticketModalEvent, setTicketModalEvent] = useState<EventItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize theme and user session from localStorage
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("eventide_theme", "light");

    const savedUser = localStorage.getItem("eventide_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setIsRegistered(true);
      } catch (e) {
        console.error("Failed to parse user state", e);
      }
    } else {
      // Requirement: Registration page first before anything
      setShowRegistrationModal(true);
    }

    // Default mock purchased tickets for demo experience
    const initialTickets: PurchasedTicket[] = [
      {
        id: "tkt-101",
        eventId: "evt-7",
        eventTitle: "Afro-House Sunset Session: Vibes on the Deck",
        eventDate: "2026-10-05",
        eventVenue: "Alchemist Bar, Westlands",
        bannerImage: "/Concert2.jpeg",
        tierName: "Standard Entry",
        quantity: 2,
        totalPaid: 3000,
        purchaseDate: "2026-09-20",
        qrCodeUrl: "",
        status: "Valid",
      },
      {
        id: "tkt-102",
        eventId: "evt-2",
        eventTitle: "Safari Tech Summit 2026",
        eventDate: "2026-11-12",
        eventVenue: "Sarit Expo Centre, Westlands",
        bannerImage: "/Tech1.jpeg",
        tierName: "VIP Founder & Executive Pass",
        quantity: 1,
        totalPaid: 12000,
        purchaseDate: "2026-09-22",
        qrCodeUrl: "",
        status: "Valid",
      },
    ];
    setPurchasedTickets(initialTickets);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("eventide_theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  const registerUser = (profileData: Omit<UserProfile, "registeredAt">) => {
    const fullUser: UserProfile = {
      ...profileData,
      registeredAt: new Date().toISOString(),
    };
    setUser(fullUser);
    setIsRegistered(true);
    localStorage.setItem("eventide_user", JSON.stringify(fullUser));
    setShowRegistrationModal(false);
    triggerToast(`Welcome to Eventide, ${fullUser.name}!`);
  };

  const logoutUser = () => {
    setUser(null);
    setIsRegistered(false);
    localStorage.removeItem("eventide_user");
    setShowRegistrationModal(true);
    triggerToast("Logged out successfully");
  };

  const toggleSkeleton = () => {
    setIsSkeletonLoading((prev) => !prev);
    triggerToast(`Skeleton mode ${!isSkeletonLoading ? "Enabled" : "Disabled"}`);
  };

  const addEvent = (newEvent: EventItem) => {
    setEvents((prev) => [newEvent, ...prev]);
    triggerToast("Event created and published!");
  };

  const buyTicket = (event: EventItem, tierName: string, price: number, quantity: number) => {
    const totalPaid = price * quantity;
    const ticketId = `tkt-${Math.random().toString(36).substring(2, 9)}`;
    const newTicket: PurchasedTicket = {
      id: ticketId,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventVenue: event.venue,
      bannerImage: event.bannerImage,
      tierName,
      quantity,
      totalPaid,
      purchaseDate: new Date().toISOString().split("T")[0],
      qrCodeUrl: "",
      status: "Valid",
    };
    setPurchasedTickets((prev) => [newTicket, ...prev]);
    setTicketModalEvent(null);
    triggerToast(`🎉 Booking Confirmed! ${quantity}x ${tierName} for ${event.title}`);
  };

  const submitVendorApplication = (appData: Omit<VendorApplication, "id" | "status" | "submittedAt">) => {
    const appId = `vapp-${Math.random().toString(36).substring(2, 9)}`;
    const newApp: VendorApplication = {
      ...appData,
      id: appId,
      status: "Pending",
      submittedAt: new Date().toISOString(),
    };
    setVendorApplications((prev) => [newApp, ...prev]);
    triggerToast(`Vendor Application Submitted for ${appData.businessName}!`);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isRegistered,
        user,
        registerUser,
        logoutUser,
        showRegistrationModal,
        setShowRegistrationModal,
        isSkeletonLoading,
        setIsSkeletonLoading,
        toggleSkeleton,
        activeTab,
        setActiveTab,
        events,
        addEvent,
        purchasedTickets,
        buyTicket,
        vendorApplications,
        submitVendorApplication,
        selectedEvent,
        setSelectedEvent,
        ticketModalEvent,
        setTicketModalEvent,
        toastMessage,
        triggerToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
