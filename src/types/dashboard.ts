export type DashboardOverview = {
  orders: { value: number; changePercent: number };
  revenue: { value: number; currency: string; changePercent: number };
  restaurants: { value: number; active: number };
  customers: { value: number; changePercent: number };
  orderVolume: Array<{ label: string; value: number }>;
  recentActivity: Array<{
    id: string;
    type: string;
    message: string;
    createdAt: string;
  }>;
};
