export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "BAKING"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED"
  | "REJECTED";
export type PaymentStatus =
  "PENDING" | "AUTHORIZED" | "PAID" | "FAILED" | "REFUNDED";
export type FulfillmentType = "DELIVERY" | "PICKUP";
export type OrderSummary = {
  id: string;
  orderNumber: string;
  restaurantId: string;
  customer: { id: string; name: string; phone: string | null };
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  fulfillmentType: FulfillmentType;
  subtotalMinor: number;
  deliveryFeeMinor: number;
  discountMinor: number;
  taxMinor: number;
  totalMinor: number;
  currency: string;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
};
export type OrderDetail = OrderSummary & {
  items: Array<Record<string, unknown>>;
  statusHistory: Array<{
    id: string;
    status: OrderStatus;
    note: string | null;
    createdAt: string;
  }>;
};
