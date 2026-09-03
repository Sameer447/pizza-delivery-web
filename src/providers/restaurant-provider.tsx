"use client";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { RestaurantMembership } from "@/types/auth";
import { useAuth } from "@/providers/auth-provider";
type RestaurantContextValue = {
  selectedRestaurantId: string | null;
  availableRestaurants: RestaurantMembership[];
  setSelectedRestaurant: (id: string) => void;
};
const RestaurantContext = createContext<RestaurantContextValue | null>(null);
export function RestaurantProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [selectedRestaurantId, setSelected] = useState<string | null>(null);
  const availableRestaurants = useMemo(
    () => user?.memberships ?? [],
    [user?.memberships],
  );
  const setSelectedRestaurant = useCallback(
    (id: string) => {
      if (
        availableRestaurants.some(
          (restaurant) => restaurant.restaurantId === id,
        )
      ) {
        setSelected(id);
      }
    },
    [availableRestaurants],
  );
  const value = useMemo(
    () => ({
      selectedRestaurantId:
        selectedRestaurantId ?? availableRestaurants[0]?.restaurantId ?? null,
      availableRestaurants,
      setSelectedRestaurant,
    }),
    [availableRestaurants, selectedRestaurantId, setSelectedRestaurant],
  );
  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
}
export const useRestaurant = () => {
  const value = useContext(RestaurantContext);
  if (!value)
    throw new Error("useRestaurant must be used within RestaurantProvider");
  return value;
};
