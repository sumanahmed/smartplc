"use client";

import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  Users,
  Package,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { getAdminDashboardList } from "@/lib/dashboardApi";

/* ---------- Types ---------- */

interface OrderStatusCounts {
  pending: number;
  processing: number;
  completed: number;
  cancelled: number;
}

interface RecentOrder {
  id: number;
  order_number: string;
  customer_name: string;
  total_amount: number;
  status: string;
  created_at: string;
}

interface TopProduct {
  id: number;
  name: string;
  total_sold: number;
  revenue: number;
}

interface DashboardStats {
  total_sales: number;
  total_orders: number;
  total_customers: number;
  total_products: number;
  today_sales: number;
  today_orders: number;
  orders_status_counts: OrderStatusCounts;
  recent_orders: RecentOrder[];
  top_products: TopProduct[];
}

type Trend = "up" | "down";
type CardColor = "blue" | "green" | "purple" | "orange";
type StatusColor = "yellow" | "blue" | "green" | "red";

interface DashboardCardProps {
  title: string;
  value: string | number;
  Icon: React.ComponentType<{ className?: string }>;
  color: CardColor;
  trend: Trend;
  trendText: string;
}

interface TodayCardProps {
  label: string;
  value: string | number;
  small?: boolean;
}

interface OrderStatusProps {
  label: string;
  count: number;
  color: StatusColor;
}

interface RecentOrdersTableProps {
  recent_orders: RecentOrder[];
}

interface TopProductsListProps {
  top_products: TopProduct[];
}

/* ---------- Main Component ---------- */

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getAdminDashboardList();
        setStats(data as DashboardStats);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-6 animate-pulse">
        <div className="h-6 w-40 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-4 w-20 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 w-24 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-16 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-lg">
          {error || "No data available."}
        </div>
      </div>
    );
  }

  const {
    total_sales,
    total_orders,
    total_customers,
    total_products,
    today_sales,
    today_orders,
    orders_status_counts,
    recent_orders,
    top_products,
  } = stats;

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        {/* Optional subtitle */}
        {/* <p className="text-gray-600 text-sm mt-1">
          A quick snapshot of your eCommerce performance.
        </p> */}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Sales"
          value={`৳${total_sales.toLocaleString()}`}
          Icon={CreditCard}
          color="blue"
          trend="up"
          trendText="Live revenue"
        />

        <DashboardCard
          title="Total Orders"
          value={total_orders}
          Icon={ShoppingBag}
          color="green"
          trend="up"
          trendText="Total orders"
        />

        <DashboardCard
          title="Customers"
          value={total_customers}
          Icon={Users}
          color="purple"
          trend="up"
          trendText="Registered users"
        />

        <DashboardCard
          title="Products"
          value={total_products}
          Icon={Package}
          color="orange"
          trend="down"
          trendText="Active products"
        />
      </div>

      {/* Today Overview + Order Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today Overview */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase">
              Today’s Performance
            </h2>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Today
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <TodayCard
              label="Today’s Sales"
              value={`৳${today_sales.toLocaleString()}`}
            />
            <TodayCard label="Today’s Orders" value={today_orders} />
            <TodayCard
              label="Performance"
              value="Tracking live performance"
              small
            />
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 uppercase mb-4">
            Orders by Status
          </h2>

          <OrderStatus
            label="Pending"
            count={orders_status_counts.pending}
            color="yellow"
          />
          <OrderStatus
            label="Processing"
            count={orders_status_counts.processing}
            color="blue"
          />
          <OrderStatus
            label="Completed"
            count={orders_status_counts.completed}
            color="green"
          />
          <OrderStatus
            label="Cancelled"
            count={orders_status_counts.cancelled}
            color="red"
          />
        </div>
      </div>

      {/* Recent Orders + Top Products */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RecentOrdersTable recent_orders={recent_orders} />
        <TopProductsList top_products={top_products} />
      </div>
    </div>
  );
}

/* ============================
   COMPONENTS BELOW
=============================== */

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  Icon,
  color,
  trend,
  trendText,
}) => {
  const colorMap: Record<CardColor, string> = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    purple: "text-purple-600 bg-purple-50",
    orange: "text-orange-600 bg-orange-50",
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between">
        <p className="text-xs text-gray-500 uppercase">{title}</p>
        <span className={`p-2 rounded-full ${colorMap[color]}`}>
          <Icon className="w-4 h-4" />
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mt-3">{value}</h3>
      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
        {trend === "up" ? (
          <ArrowUpRight className="w-3 h-3" />
        ) : (
          <ArrowDownRight className="w-3 h-3" />
        )}
        {trendText}
      </p>
    </div>
  );
};

const TodayCard: React.FC<TodayCardProps> = ({ label, value, small = false }) => (
  <div className="border border-gray-100 p-4 rounded-lg">
    <p className="text-xs text-gray-500">{label}</p>
    <p
      className={`font-semibold ${
        small ? "text-sm text-gray-600" : "text-xl text-gray-900"
      }`}
    >
      {value}
    </p>
  </div>
);

const OrderStatus: React.FC<OrderStatusProps> = ({ label, count, color }) => {
  const colorMap: Record<StatusColor, string> = {
    yellow: "bg-yellow-400",
    blue: "bg-blue-400",
    green: "bg-green-500",
    red: "bg-red-500",
  };

  return (
    <div className="flex justify-between py-2">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${colorMap[color]}`}></span>
        <span className="text-sm">{label}</span>
      </div>
      <span className="font-semibold text-gray-900">{count}</span>
    </div>
  );
};

const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({
  recent_orders,
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
    <h2 className="text-sm font-semibold text-gray-700 uppercase mb-4">
      Recent Orders
    </h2>

    <table className="min-w-full text-sm">
      <thead>
        <tr className="border-b border-gray-100 text-xs text-gray-500">
          <th className="py-2 text-left">Order #</th>
          <th className="py-2 text-left">Customer</th>
          <th className="py-2 text-right">Total</th>
          <th className="py-2 text-center">Status</th>
          <th className="py-2 text-right">Date</th>
        </tr>
      </thead>

      <tbody>
        {recent_orders.length === 0 ? (
          <tr>
            <td colSpan={5} className="py-4 text-center text-gray-400">
              No recent orders
            </td>
          </tr>
        ) : (
          recent_orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-50">
              <td className="py-2">{order.order_number}</td>
              <td className="py-2">{order.customer_name}</td>
              <td className="py-2 text-right">
                ৳{order.total_amount.toLocaleString()}
              </td>
              <td className="py-2 text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === "completed"
                      ? "bg-green-50 text-green-700"
                      : order.status === "processing"
                      ? "bg-blue-50 text-blue-700"
                      : order.status === "pending"
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="py-2 text-right text-gray-500 text-xs">
                {new Date(order.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

const TopProductsList: React.FC<TopProductsListProps> = ({ top_products }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-sm font-semibold text-gray-700 uppercase mb-4">
      Top Selling Products
    </h2>

    <div className="space-y-3">
      {top_products.length === 0 ? (
        <p className="text-sm text-gray-400">No product performance yet.</p>
      ) : (
        top_products.map((product) => (
          <div
            key={product.id}
            className="flex justify-between border p-3 rounded-lg"
          >
            <div>
              <p className="font-semibold text-gray-900">{product.name}</p>
              <p className="text-xs text-gray-500">
                Sold: {product.total_sold}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                ৳{product.revenue.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">Revenue</p>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);
