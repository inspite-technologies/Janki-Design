"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardAPI } from '@/lib/api';
import { DashboardStats, RecentActivity, UrgentDelivery, SalesData } from '@/types';

export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [activities, setActivities] = useState<RecentActivity[]>([]);
    const [deliveries, setDeliveries] = useState<UrgentDelivery[]>([]);
    const [salesData, setSalesData] = useState<SalesData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const [statsRes, activityRes, urgentRes, salesRes] = await Promise.all([
                    DashboardAPI.getStats(),
                    DashboardAPI.getRecentActivity(),
                    DashboardAPI.getUrgentDeliveries(),
                    DashboardAPI.getSalesData()
                ]);

                if (statsRes.success) setStats(statsRes.data);
                if (activityRes.success) setActivities(activityRes.data);
                if (urgentRes.success) setDeliveries(urgentRes.data);
                if (salesRes.success) setSalesData(salesRes.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 space-y-8 max-w-7xl mx-auto custom-scrollbar">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <Link href="/dashboard/reports" className="block bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-24 w-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <span className="material-icons-outlined">payments</span>
                        </div>
                        <span className="text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full flex items-center gap-1">
                            <span className="material-icons-outlined text-[10px]">
                                trending_up
                            </span>{" "}
                            +{stats?.revenue_growth}%
                        </span>
                    </div>
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">
                        Today's Revenue
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        ₹ {stats?.todays_revenue.toLocaleString()}
                    </p>
                </Link>
                <Link href="/dashboard/orders" className="block bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-24 w-24 bg-gold-muted/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 bg-[#D4AF37]/10"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-2 bg-gold-muted/20 bg-[#D4AF37]/20 rounded-lg text-yellow-700 dark:text-yellow-500">
                            <span className="material-icons-outlined">dry_cleaning</span>
                        </div>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 px-2 py-1 rounded-full">
                            Last 24h
                        </span>
                    </div>
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">
                        New Stitching
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        {stats?.new_stitching_orders}{" "}
                        <span className="text-lg text-gray-400 font-normal">New</span>
                    </p>
                </Link>
                <Link href="/dashboard/orders" className="block bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-24 w-24 bg-purple-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                            <span className="material-icons-outlined">storefront</span>
                        </div>
                    </div>
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">
                        Boutique Orders
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        {stats?.total_boutique_orders}{" "}
                        <span className="text-lg text-gray-400 font-normal">Orders</span>
                    </p>
                </Link>
                <Link href="/dashboard/orders" className="block bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-24 w-24 bg-blue-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                            <span className="material-icons-outlined">local_shipping</span>
                        </div>
                        <span className="text-xs font-medium text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-1 rounded-full">
                            Urgent
                        </span>
                    </div>
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">
                        Pending Deliveries
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        {stats?.pending_deliveries}{" "}
                        <span className="text-lg text-gray-400 font-normal">Due Today</span>
                    </p>
                </Link>
                <Link href="/dashboard/inventory" className="block bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-24 w-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-primary">
                            <span className="material-icons-outlined">warning</span>
                        </div>
                    </div>
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">
                        Low Stock Alerts
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        {stats?.low_stock_alerts}{" "}
                        <span className="text-lg text-gray-400 font-normal">Items</span>
                    </p>
                </Link>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
                <div className="lg:col-span-2 space-y-8">
                    {/* Sales Performance Chart */}
                    <Link href="/dashboard/reports" className="block bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Sales Performance
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                    <span className="w-3 h-3 rounded-full bg-primary"></span>{" "}
                                    Stitching
                                </span>
                                <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 ml-3">
                                    <span className="w-3 h-3 rounded-full bg-[#D4AF37]"></span>{" "}
                                    Products
                                </span>
                                <select
                                    className="ml-4 text-xs bg-gray-50 dark:bg-gray-800 border-none rounded p-1 text-gray-600 dark:text-gray-300 focus:ring-0 cursor-pointer"
                                    onClick={(e) => e.stopPropagation()} // Prevent navigation when changing filter
                                >
                                    <option>Last 7 Days</option>
                                    <option>Last 30 Days</option>
                                </select>
                            </div>
                        </div>
                        <div className="h-64 w-full flex items-end justify-between gap-2 px-2 pb-4 border-b border-gray-100 dark:border-gray-700 relative">
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 pr-4">
                                <div className="w-full h-px bg-gray-100 dark:bg-gray-800 border-t border-dashed border-gray-200 dark:border-gray-700"></div>
                                <div className="w-full h-px bg-gray-100 dark:bg-gray-800 border-t border-dashed border-gray-200 dark:border-gray-700"></div>
                                <div className="w-full h-px bg-gray-100 dark:bg-gray-800 border-t border-dashed border-gray-200 dark:border-gray-700"></div>
                                <div className="w-full h-px bg-gray-100 dark:bg-gray-800 border-t border-dashed border-gray-200 dark:border-gray-700"></div>
                                <div className="w-full h-px bg-gray-100 dark:bg-gray-800 border-t border-dashed border-gray-200 dark:border-gray-700"></div>
                            </div>
                            {salesData.map((data, i) => (
                                <div
                                    key={data.day}
                                    className="group relative flex flex-col justify-end items-center h-full w-full gap-1 z-10"
                                >
                                    <div
                                        className="w-full max-w-[12px] bg-[#D4AF37] rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity"
                                        style={{ height: `${data.products}%` }}
                                        title={`Products: ${data.products}`}
                                    ></div>
                                    <div
                                        className="w-full max-w-[12px] bg-primary rounded-t-sm group-hover:opacity-90 transition-opacity"
                                        style={{ height: `${data.stitching}%` }}
                                        title={`Stitching: ${data.stitching}`}
                                    ></div>
                                    <span className="text-[10px] text-gray-400 mt-2 font-medium">
                                        {data.day}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Link>

                    {/* Quick Actions */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <Link href="/dashboard/orders" className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors shadow-md shadow-primary/20">
                                <span className="material-icons-outlined text-xl">
                                    add_circle
                                </span>
                                Create New Order
                            </Link>
                            <Link href="/dashboard/customers" className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 py-3 px-4 rounded-lg font-medium transition-colors">
                                <span className="material-icons-outlined text-xl">
                                    straighten
                                </span>
                                Add Measurement
                            </Link>
                            <Link href="/dashboard/tailors" className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 py-3 px-4 rounded-lg font-medium transition-colors">
                                <span className="material-icons-outlined text-xl">
                                    assignment_ind
                                </span>
                                Assign Tailor
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Recent Activity */}
                    <Link href="/dashboard/orders" className="block bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Recent Activity
                            </h3>
                            <span className="text-sm text-primary font-medium hover:underline">
                                View All
                            </span>
                        </div>
                        <div className="space-y-6">
                            {activities.map((activity) => (
                                <div key={activity.id} className="flex gap-4 items-start">
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${activity.icon_bg} flex items-center justify-center ${activity.icon_color}`}>
                                        <span className="material-icons-outlined text-sm">
                                            {activity.icon}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {activity.action}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                            {activity.description}
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-400 whitespace-nowrap">
                                        {activity.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Link>

                    {/* Urgent Deliveries */}
                    <Link href="/dashboard/orders" className="block bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            Urgent Deliveries
                        </h3>
                        <ul className="space-y-4">
                            {deliveries.map((delivery) => (
                                <li key={delivery.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                                    <img
                                        src={delivery.image_url}
                                        alt="Fabric Texture"
                                        className="w-12 h-12 rounded object-cover"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold truncate text-gray-900 dark:text-white">
                                            {delivery.customer_name}
                                        </p>
                                        <p className={`text-xs font-medium truncate ${delivery.urgent_level === 'High' ? 'text-red-500' : 'text-orange-500'}`}>
                                            {delivery.due_time}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Link>

                    {/* Promo Card */}
                    <div className="relative rounded-xl overflow-hidden h-48 group">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBulSIZp298li42a8vmfIHjuh7naYOWMwTKdfY5PqAk2Cs6o-fH77fERNc5HvCSmP2aSmDkGzf-0bjc7YMJjZ9z6ty6j758WLmdNQaH27-mvGS676PfkCGWmJaR9AmugbqITSDh9PZnG9YE1JQs682zQ0DsmRuLk3FRp9gPfBAQyk9dHqPSnfxxTGFmFL9MO1-1ExnThJgPsco5PfxSWpPZocdHSsUPDqhd4ddydp5mj6BNoXQ6z4pLaAgy-VBJWwtbwGoANyS7uzc"
                            alt="Luxury Store Interior"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                            <h4 className="text-white font-bold text-lg mb-1">
                                New Collection Arriving
                            </h4>
                            <p className="text-gray-200 text-xs mb-3">
                                Update inventory with the new Winter Silk range.
                            </p>
                            <Link href="/dashboard/inventory" className="text-xs bg-white text-black px-3 py-1.5 rounded font-bold hover:bg-gray-200 transition-colors">
                                Manage Inventory
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
