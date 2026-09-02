"use client";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { RestaurantMembership } from "@/types/auth";
type RestaurantContextValue = { selectedRestaurantId: string | null; availableRestaurants: RestaurantMembership[]; setSelectedRestaurant: (id: string) => void };
const RestaurantContext = createContext<RestaurantContextValue | null>(null);
export function RestaurantProvider({ children }: { children: ReactNode }) { const [selectedRestaurantId, setSelected] = useState<string | null>(null); const value = useMemo(() => ({ selectedRestaurantId, availableRestaurants: [], setSelectedRestaurant: setSelected }), [selectedRestaurantId]); return <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>; }
export const useRestaurant = () => { const value = useContext(RestaurantContext); if (!value) throw new Error("useRestaurant must be used within RestaurantProvider"); return value; };
