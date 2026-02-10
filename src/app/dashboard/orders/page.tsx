"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { OrdersAPI } from "@/lib/api";
import { Order } from "@/types";

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter states
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [typeFilter, setTypeFilter] = useState("All Orders");
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch orders on mount and when filters change
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                // In a real app, pass filters as params to the API
                // For now, we'll fetch all and client-side filter if the API doesn't support complex filtering yet
                const response = await OrdersAPI.list({
                    // status: statusFilter !== "All Status" ? statusFilter : undefined,
                    search: searchQuery
                });

                // Handle different response structures (array directly or wrapped in data object)
                const data = Array.isArray(response) ? response : (response as any).data || [];
                setOrders(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
                setError("Failed to load orders. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        // Debounce search
        const timeoutId = setTimeout(() => {
            fetchOrders();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [statusFilter, typeFilter, searchQuery]);


    // Client-side filtering for demo (if API doesn't fully support all filters yet)
    const filteredOrders = orders.filter(order => {
        const matchesStatus = statusFilter === "All Status" || order.status === statusFilter;
        const matchesType = typeFilter === "All Orders" ||
            (typeFilter === "Stitching Orders" && order.order_type === "Stitching") ||
            (typeFilter === "Online Orders" && order.order_type === "Boutique");
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer_name.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesStatus && matchesType && matchesSearch;
    });

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
            <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shrink-0 transition-colors">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark tracking-tight">Orders</h1>
                    <p className="text-sm text-text-secondary dark:text-text-secondary-dark">Manage and track all customer orders.</p>
                </div>
                <Link href="/dashboard/orders/new" className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-primary/20 active:scale-95 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">add</span> Create New Order
                </Link>
            </header>

            <div className="p-6 flex-1 overflow-hidden flex flex-col gap-6">
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-border-light dark:border-border-dark transition-colors">
                    <div className="relative flex-1">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted dark:text-text-muted-dark text-[20px]">search</span>
                        <input
                            type="text"
                            placeholder="Search Order ID, Customer Name..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-text-muted dark:placeholder:text-text-muted-dark"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            className="px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option>All Status</option>
                            <option>Pending</option>
                            <option>Processing</option>
                            <option>Delivered</option>
                            <option>Completed</option>
                            <option>Cancelled</option>
                        </select>
                        <select
                            className="px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <option>All Orders</option>
                            <option>Stitching Orders</option>
                            <option>Online Orders</option>
                        </select>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden flex-1 flex flex-col transition-colors">
                    <div className="overflow-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 dark:bg-gray-800/20 sticky top-0 z-10 backdrop-blur-sm">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#88636c] dark:text-[#b08d96] uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#88636c] dark:text-[#b08d96] uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#88636c] dark:text-[#b08d96] uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#88636c] dark:text-[#b08d96] uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-[#88636c] dark:text-[#b08d96] uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-[#88636c] dark:text-[#b08d96] uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-[#88636c] dark:text-[#b08d96] uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-light dark:divide-border-dark">
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                                <p>Loading orders...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-10 text-center text-red-500">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <span className="material-symbols-outlined text-4xl">error</span>
                                                <p>{error}</p>
                                                <button
                                                    onClick={() => window.location.reload()}
                                                    className="mt-2 text-primary hover:underline text-sm"
                                                >
                                                    Retry
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                                            No orders found matching your criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link href={`/dashboard/orders/${encodeURIComponent(order.id)}`} className="text-primary font-bold text-sm hover:underline">{order.id}</Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mr-3">
                                                        {order.customer_name.charAt(0)}
                                                    </div>
                                                    <div className="text-sm font-medium text-text-primary dark:text-text-primary-dark">
                                                        {order.customer_id ? (
                                                            <Link href={`/dashboard/customers/${encodeURIComponent(order.customer_id)}`} className="hover:text-primary hover:underline">
                                                                {order.customer_name}
                                                            </Link>
                                                        ) : (
                                                            order.customer_name
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-opacity-10 ${order.order_type === 'Stitching' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                                    }`}>
                                                    {order.order_type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-text-secondary-dark">
                                                {new Date(order.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-opacity-10 ${order.status === 'Completed' || order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                                        order.status === 'Pending' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                                                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary dark:text-text-primary-dark text-right">
                                                ₹{order.amount.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-center gap-2 text-gray-400">
                                                    <Link href={`/dashboard/orders/${encodeURIComponent(order.id)}`} className="text-gray-400 hover:text-primary transition-colors" title="View Details">
                                                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                    </Link>
                                                    <Link href={`/dashboard/orders/${encodeURIComponent(order.id)}/edit`} className="text-gray-400 hover:text-primary transition-colors" title="Edit Order">
                                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination - Static for now */}
                    <div className="bg-gray-50 dark:bg-surface-dark border-t border-border-light dark:border-border-dark px-6 py-3 flex items-center justify-between">
                        <div className="text-xs text-text-muted dark:text-text-muted-dark">
                            Showing <span className="font-medium text-text-primary dark:text-text-primary-dark">1</span> to <span className="font-medium text-text-primary dark:text-text-primary-dark">{filteredOrders.length}</span> of <span className="font-medium text-text-primary dark:text-text-primary-dark">{filteredOrders.length}</span> results
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark rounded text-xs font-medium text-text-secondary dark:text-text-secondary-dark hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50" disabled>Previous</button>
                            <button className="px-3 py-1 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark rounded text-xs font-medium text-text-secondary dark:text-text-secondary-dark hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50" disabled>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
