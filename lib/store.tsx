"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  User,
  UserRole,
  Salon,
  SalonType,
  Service,
  Booking,
  BookingStatus,
  RewardConfig,
  Offer,
} from "./types";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  setSalons,
  setActiveSalonId as setActiveSalonIdRedux,
  addSalon,
  updateSalonInState,
  removeSalonFromState,
} from "./redux/slices/salonSlice";
import {
  setServices,
  addService,
  updateServiceInState,
  removeServiceFromState,
  removeServicesForSalon,
} from "./redux/slices/serviceSlice";
import {
  setBookings,
  addBooking,
  updateBookingStatusInState,
  removeBookingFromState,
} from "./redux/slices/bookingSlice";
import {
  setOffers,
  addOffer,
  toggleOfferActiveInState,
  removeOfferFromState,
} from "./redux/slices/offerSlice";
import {
  setRewardConfig,
  updateRewardsConfigInState,
} from "./redux/slices/rewardSlice";
import {
  setCurrentUser,
  setUsers,
  addUser,
  updateUserRoleInState,
  toggleUserStatusInState,
  updateUserPermissionsInState,
  updateUserRewardPointsInState,
  linkSalonToOwnerInState,
} from "./redux/slices/authSlice";
import { INITIAL_USERS } from "./mock-data";

/* ─────────────────────────────────────────────────────────────────────────────
   CONTEXT INTERFACE
   ───────────────────────────────────────────────────────────────────────────── */

export interface ShringarContextType {
  currentUser: User;
  users: User[];
  salons: Salon[];
  services: Service[];
  bookings: Booking[];
  offers: Offer[];
  rewardConfig: RewardConfig;
  activeSalonId: string;
  isDbConnected: boolean;
  syncWithDatabase: () => Promise<void>;
  setActiveSalonId: (id: string) => void;

  // Auth methods
  login: (email: string, role: UserRole) => boolean;
  signup: (data: {
    name: string;
    email: string;
    role: UserRole;
    phone?: string;
    salonName?: string;
    salonType?: SalonType;
  }) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;

  // Salon CRUD (Owner & Admin)
  createSalon: (
    salon: Omit<Salon, "id" | "ownerId" | "rating" | "reviewCount">
  ) => Salon;
  updateSalon: (id: string, updates: Partial<Salon>) => void;
  deleteSalon: (id: string) => void;

  // Service CRUD (Owner & Admin)
  createService: (service: Omit<Service, "id">) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // Booking CRUD (Customer, Owner, Admin)
  createBooking: (booking: Omit<Booking, "id">) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  deleteBooking: (id: string) => void;

  // Rewards & Offers (Owner & Admin)
  updateRewardsConfig: (config: Partial<RewardConfig>) => void;
  createOffer: (offer: Omit<Offer, "id">) => void;
  toggleOfferActive: (id: string) => void;
  deleteOffer: (id: string) => void;

  // User & Access Management (Admin)
  updateUserRole: (userId: string, role: UserRole) => void;
  toggleUserStatus: (userId: string) => void;
  updateUserPermissions: (userId: string, permissions: string[]) => void;
}

const ShringarContext = createContext<ShringarContextType | undefined>(undefined);

/* ─────────────────────────────────────────────────────────────────────────────
   SHRINGAR PROVIDER (Powered by Redux Toolkit + MongoDB Sync)
   ───────────────────────────────────────────────────────────────────────────── */

export function ShringarProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [isDbConnected, setIsDbConnected] = useState<boolean>(false);

  // Redux Selectors
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const users = useAppSelector((state) => state.auth.users);
  const salons = useAppSelector((state) => state.salon.salons);
  const activeSalonId = useAppSelector((state) => state.salon.activeSalonId);
  const services = useAppSelector((state) => state.service.services);
  const bookings = useAppSelector((state) => state.booking.bookings);
  const offers = useAppSelector((state) => state.offer.offers);
  const rewardConfig = useAppSelector((state) => state.reward.rewardConfig);

  // Function to sync with MongoDB
  const syncWithDatabase = useCallback(async () => {
    try {
      const res = await fetch("/api/sync");
      if (!res.ok) {
        setIsDbConnected(false);
        return;
      }
      const data = await res.json();
      if (data.success) {
        setIsDbConnected(true);
        if (data.salons && data.salons.length > 0) dispatch(setSalons(data.salons));
        if (data.services && data.services.length > 0) dispatch(setServices(data.services));
        if (data.bookings && data.bookings.length > 0) dispatch(setBookings(data.bookings));
        if (data.users && data.users.length > 0) dispatch(setUsers(data.users));
        if (data.offers && data.offers.length > 0) dispatch(setOffers(data.offers));
        if (data.rewardConfig) dispatch(setRewardConfig(data.rewardConfig));
      } else {
        setIsDbConnected(false);
      }
    } catch (err) {
      console.warn("MongoDB sync in progress or offline, using Redux client cache:", err);
      setIsDbConnected(false);
    }
  }, [dispatch]);

  // Load from localStorage on client mount, then trigger DB sync
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("shringar_user");
      const savedSalons = localStorage.getItem("shringar_salons");
      const savedServices = localStorage.getItem("shringar_services");
      const savedBookings = localStorage.getItem("shringar_bookings");
      const savedOffers = localStorage.getItem("shringar_offers");
      const savedUsers = localStorage.getItem("shringar_users");

      if (savedUser) dispatch(setCurrentUser(JSON.parse(savedUser)));
      if (savedSalons) dispatch(setSalons(JSON.parse(savedSalons)));
      if (savedServices) dispatch(setServices(JSON.parse(savedServices)));
      if (savedBookings) dispatch(setBookings(JSON.parse(savedBookings)));
      if (savedOffers) dispatch(setOffers(JSON.parse(savedOffers)));
      if (savedUsers) dispatch(setUsers(JSON.parse(savedUsers)));
    } catch {
      // Ignore parse errors
    }

    // Now fetch and sync from MongoDB
    syncWithDatabase();
  }, [dispatch, syncWithDatabase]);

  // Persist current state to localStorage as fast client fallback
  useEffect(() => {
    try {
      localStorage.setItem("shringar_user", JSON.stringify(currentUser));
      localStorage.setItem("shringar_salons", JSON.stringify(salons));
      localStorage.setItem("shringar_services", JSON.stringify(services));
      localStorage.setItem("shringar_bookings", JSON.stringify(bookings));
      localStorage.setItem("shringar_offers", JSON.stringify(offers));
      localStorage.setItem("shringar_users", JSON.stringify(users));
    } catch {
      // Ignore storage quota
    }
  }, [currentUser, salons, services, bookings, offers, users]);

  /* ── Active Salon Switcher ──────────────────────────────────────────────── */
  const setActiveSalonId = (id: string) => {
    dispatch(setActiveSalonIdRedux(id));
  };

  /* ── Auth Methods ───────────────────────────────────────────────────────── */
  const login = (email: string, role: UserRole): boolean => {
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      dispatch(setCurrentUser(existing));
      if (existing.salonIds && existing.salonIds.length > 0) {
        dispatch(setActiveSalonIdRedux(existing.salonIds[0]));
      }
      return true;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split("@")[0],
      email,
      role,
      status: "Active",
      rewardPoints: role === "customer" ? 200 : undefined,
    };
    dispatch(addUser(newUser));
    dispatch(setCurrentUser(newUser));

    // Async sync to MongoDB
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    }).catch(() => {});

    return true;
  };

  const signup = (data: {
    name: string;
    email: string;
    role: UserRole;
    phone?: string;
    salonName?: string;
    salonType?: SalonType;
  }) => {
    const newUserId = `user-${Date.now()}`;
    let newSalonId: string | undefined = undefined;

    if (data.role === "owner" && data.salonName) {
      newSalonId = `salon-${Date.now()}`;
      const newSalon: Salon = {
        id: newSalonId,
        ownerId: newUserId,
        name: data.salonName,
        type: data.salonType || "unisex",
        address: "Main High Street",
        city: "Mumbai",
        phone: data.phone || "+91 98200 00000",
        rating: 5.0,
        reviewCount: 1,
        image:
          "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
        establishedYear: 2026,
      };
      dispatch(addSalon(newSalon));
      dispatch(setActiveSalonIdRedux(newSalonId));

      // Async sync salon to MongoDB
      fetch("/api/salons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSalon),
      }).catch(() => {});
    }

    const newUser: User = {
      id: newUserId,
      name: data.name,
      email: data.email,
      role: data.role,
      status: "Active",
      phone: data.phone,
      salonIds: newSalonId ? [newSalonId] : undefined,
      rewardPoints: data.role === "customer" ? 150 : undefined,
    };

    dispatch(addUser(newUser));
    dispatch(setCurrentUser(newUser));

    // Async sync user to MongoDB
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    }).catch(() => {});
  };

  const logout = () => {
    // Reset to demo customer
    dispatch(setCurrentUser(INITIAL_USERS[1]));
  };

  const switchRole = (role: UserRole) => {
    const matchingUser = users.find((u) => u.role === role);
    if (matchingUser) {
      dispatch(setCurrentUser(matchingUser));
      if (matchingUser.salonIds && matchingUser.salonIds.length > 0) {
        dispatch(setActiveSalonIdRedux(matchingUser.salonIds[0]));
      }
    } else {
      const fallbackUser: User = {
        id: `user-${role}-demo`,
        name:
          role === "owner"
            ? "Salon Owner Demo"
            : role === "admin"
            ? "Platform Admin"
            : "Loyal Customer",
        email: `${role}@shringar.com`,
        role,
        status: "Active",
        rewardPoints: role === "customer" ? 400 : undefined,
      };
      dispatch(addUser(fallbackUser));
      dispatch(setCurrentUser(fallbackUser));
    }
  };

  /* ── Salon Methods ──────────────────────────────────────────────────────── */
  const createSalon = (
    salonData: Omit<Salon, "id" | "ownerId" | "rating" | "reviewCount">
  ): Salon => {
    const newSalon: Salon = {
      ...salonData,
      id: `salon-${Date.now()}`,
      ownerId: currentUser.id,
      rating: 5.0,
      reviewCount: 0,
    };
    dispatch(addSalon(newSalon));
    dispatch(linkSalonToOwnerInState({ ownerId: currentUser.id, salonId: newSalon.id }));

    // Async sync to MongoDB
    fetch("/api/salons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSalon),
    }).catch(() => {});

    return newSalon;
  };

  const updateSalon = (id: string, updates: Partial<Salon>) => {
    dispatch(updateSalonInState({ id, updates }));

    // Async sync to MongoDB
    fetch("/api/salons", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    }).catch(() => {});
  };

  const deleteSalon = (id: string) => {
    dispatch(removeSalonFromState(id));
    dispatch(removeServicesForSalon(id));

    // Async sync to MongoDB
    fetch(`/api/salons?id=${id}`, { method: "DELETE" }).catch(() => {});
  };

  /* ── Service Methods ────────────────────────────────────────────────────── */
  const createService = (serviceData: Omit<Service, "id">) => {
    const newService: Service = {
      ...serviceData,
      id: `srv-${Date.now()}`,
    };
    dispatch(addService(newService));

    // Async sync to MongoDB
    fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newService),
    }).catch(() => {});
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    dispatch(updateServiceInState({ id, updates }));

    // Async sync to MongoDB
    fetch("/api/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    }).catch(() => {});
  };

  const deleteService = (id: string) => {
    dispatch(removeServiceFromState(id));

    // Async sync to MongoDB
    fetch(`/api/services?id=${id}`, { method: "DELETE" }).catch(() => {});
  };

  /* ── Booking Methods ────────────────────────────────────────────────────── */
  const createBooking = (bookingData: Omit<Booking, "id">) => {
    const earned = Math.floor((bookingData.price / 100) * rewardConfig.earnRate);
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      pointsEarned: earned,
    };

    dispatch(addBooking(newBooking));

    // Credit reward points to customer in Redux
    if (bookingData.customerId) {
      dispatch(
        updateUserRewardPointsInState({
          userId: bookingData.customerId,
          pointsDelta: earned,
        })
      );
    }

    // Async sync to MongoDB
    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    }).catch(() => {});
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    dispatch(updateBookingStatusInState({ id, status }));

    // Async sync to MongoDB
    fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    }).catch(() => {});
  };

  const deleteBooking = (id: string) => {
    dispatch(removeBookingFromState(id));

    // Async sync to MongoDB
    fetch(`/api/bookings?id=${id}`, { method: "DELETE" }).catch(() => {});
  };

  /* ── Rewards & Offers Methods ───────────────────────────────────────────── */
  const updateRewardsConfig = (config: Partial<RewardConfig>) => {
    dispatch(updateRewardsConfigInState(config));

    // Async sync to MongoDB
    fetch("/api/rewards", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    }).catch(() => {});
  };

  const createOffer = (offerData: Omit<Offer, "id">) => {
    const newOffer: Offer = {
      ...offerData,
      id: `off-${Date.now()}`,
    };
    dispatch(addOffer(newOffer));

    // Async sync to MongoDB
    fetch("/api/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOffer),
    }).catch(() => {});
  };

  const toggleOfferActive = (id: string) => {
    dispatch(toggleOfferActiveInState(id));

    // Async sync to MongoDB
    fetch("/api/offers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).catch(() => {});
  };

  const deleteOffer = (id: string) => {
    dispatch(removeOfferFromState(id));

    // Async sync to MongoDB
    fetch(`/api/offers?id=${id}`, { method: "DELETE" }).catch(() => {});
  };

  /* ── Admin User Management Methods ──────────────────────────────────────── */
  const updateUserRole = (userId: string, role: UserRole) => {
    dispatch(updateUserRoleInState({ userId, role }));

    // Async sync to MongoDB
    fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    }).catch(() => {});
  };

  const toggleUserStatus = (userId: string) => {
    dispatch(toggleUserStatusInState(userId));

    const user = users.find((u) => u.id === userId);
    const newStatus = user?.status === "Active" ? "Suspended" : "Active";

    // Async sync to MongoDB
    fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, status: newStatus }),
    }).catch(() => {});
  };

  const updateUserPermissions = (userId: string, permissions: string[]) => {
    dispatch(updateUserPermissionsInState({ userId, permissions }));

    // Async sync to MongoDB
    fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, permissions }),
    }).catch(() => {});
  };

  return (
    <ShringarContext.Provider
      value={{
        currentUser,
        users,
        salons,
        services,
        bookings,
        offers,
        rewardConfig,
        activeSalonId,
        isDbConnected,
        syncWithDatabase,
        setActiveSalonId,
        login,
        signup,
        logout,
        switchRole,
        createSalon,
        updateSalon,
        deleteSalon,
        createService,
        updateService,
        deleteService,
        createBooking,
        updateBookingStatus,
        deleteBooking,
        updateRewardsConfig,
        createOffer,
        toggleOfferActive,
        deleteOffer,
        updateUserRole,
        toggleUserStatus,
        updateUserPermissions,
      }}
    >
      {children}
    </ShringarContext.Provider>
  );
}

export function useShringar() {
  const context = useContext(ShringarContext);
  if (!context) {
    throw new Error("useShringar must be used within a ShringarProvider");
  }
  return context;
}
