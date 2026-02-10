"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TailorsAPI, OrdersAPI } from "@/lib/api";
import { Tailor, Order } from "@/types";

export default function TailorProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const unwrappedParams = use(params);
    const [tailor, setTailor] = useState<Tailor | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

    useEffect(() => {
        fetchTailorData();
    }, [unwrappedParams.id]);

    const fetchTailorData = async () => {
        setLoading(true);
        try {
            const [tailorRes, ordersRes] = await Promise.all([
                TailorsAPI.get(decodeURIComponent(unwrappedParams.id)),
                OrdersAPI.list()
            ]);

            const tailorData = (tailorRes as any).data || tailorRes;
            const ordersData = Array.isArray(ordersRes) ? ordersRes : (ordersRes as any).data || [];

            setTailor(tailorData);
            setOrders(ordersData);
        } catch (error) {
            console.error("Failed to fetch tailor data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-background-light dark:bg-background-dark">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!tailor) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-background-light dark:bg-background-dark gap-4">
                <span className="material-symbols-outlined text-6xl text-gray-400">person_off</span>
                <p className="text-xl text-gray-600 dark:text-gray-400">Tailor not found</p>
                <Link href="/dashboard/tailors" className="text-primary hover:underline">
                    Back to Tailors
                </Link>
            </div>
        );
    }

    const activeOrders = orders.filter(o => o.status === 'Processing' || o.status === 'Pending');
    const completedOrders = orders.filter(o => o.status === 'Completed');
    const displayOrders = activeTab === 'active' ? activeOrders : completedOrders;

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
            {/* Header */}
            <header className="flex h-20 items-center justify-between border-b border-[#e5dcde] dark:border-[#3a2e32] bg-white dark:bg-[#1a1012] px-8 shrink-0">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm text-[#88636c] dark:text-white/60 mb-1">
                        <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <Link href="/dashboard/tailors" className="hover:text-primary transition-colors">Tailors</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-[#181113] dark:text-white font-medium">{tailor.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-[#181113] dark:text-white">{tailor.name}'s Profile</h2>
                    </div>
                </div>
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 rounded-lg bg-[#f4f0f1] dark:bg-[#2a1d20] px-4 py-2 text-sm font-bold text-[#181113] dark:text-white hover:bg-[#e6e1e3] transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    Back
                </button>
            </header>

            {/* Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Profile Card */}
                    <div className="bg-white dark:bg-[#1a1012] rounded-xl shadow-sm border border-[#e5dcde] dark:border-[#3a2e32] p-6">
                        <div className="flex items-start gap-6">
                            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-red-700 flex items-center justify-center text-white text-4xl font-bold border-4 border-white dark:border-[#2a1d20] shadow-lg">
                                {tailor?.name?.charAt(0) || 'T'}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h1 className="text-2xl font-bold text-[#181113] dark:text-white">{tailor.name}</h1>
                                        <p className="text-[#88636c] mt-1">{tailor.specialization} Specialist</p>
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${tailor.status === 'Active' ? 'bg-green-100 text-green-700' :
                                        tailor.status === 'On Leave' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                        {tailor.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                    <div>
                                        <p className="text-xs text-[#88636c] mb-1">Phone</p>
                                        <p className="text-sm font-medium text-[#181113] dark:text-white">{tailor.phone}</p>
                                    </div>
                                    {tailor.email && (
                                        <div>
                                            <p className="text-xs text-[#88636c] mb-1">Email</p>
                                            <p className="text-sm font-medium text-[#181113] dark:text-white">{tailor.email}</p>
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-xs text-[#88636c] mb-1">Joined</p>
                                        <p className="text-sm font-medium text-[#181113] dark:text-white">
                                            {tailor.joined_date ? new Date(tailor.joined_date).toLocaleDateString() : 'N/A'}
                                        </p>
                                    </div>
                                    {tailor.rating && (
                                        <div>
                                            <p className="text-xs text-[#88636c] mb-1">Rating</p>
                                            <div className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-yellow-500 text-[18px]">star</span>
                                                <span className="text-sm font-bold text-[#181113] dark:text-white">{tailor.rating.toFixed(1)}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-[#1a1012] rounded-xl shadow-sm border border-[#e5dcde] dark:border-[#3a2e32] p-5">
                            <p className="text-sm font-medium text-[#88636c]">Current Load</p>
                            <p className="text-3xl font-bold text-[#181113] dark:text-white mt-1">{tailor.current_load || 0}</p>
                            <p className="text-xs text-[#88636c] mt-1">Active tasks</p>
                        </div>
                        <div className="bg-white dark:bg-[#1a1012] rounded-xl shadow-sm border border-[#e5dcde] dark:border-[#3a2e32] p-5">
                            <p className="text-sm font-medium text-[#88636c]">Completed Orders</p>
                            <p className="text-3xl font-bold text-[#181113] dark:text-white mt-1">{completedOrders.length}</p>
                            <p className="text-xs text-[#88636c] mt-1">All time</p>
                        </div>
                        <div className="bg-white dark:bg-[#1a1012] rounded-xl shadow-sm border border-[#e5dcde] dark:border-[#3a2e32] p-5">
                            <p className="text-sm font-medium text-[#88636c]">Specialization</p>
                            <p className="text-xl font-bold text-[#181113] dark:text-white mt-1">{tailor.specialization}</p>
                            <p className="text-xs text-[#88636c] mt-1">Primary skill</p>
                        </div>
                    </div>

                    {/* Tasks Section */}
                    <div className="bg-white dark:bg-[#1a1012] rounded-xl shadow-sm border border-[#e5dcde] dark:border-[#3a2e32]">
                        <div className="border-b border-[#e5dcde] dark:border-[#3a2e32] p-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-[#181113] dark:text-white">Tasks & Orders</h2>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setActiveTab('active')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'active'
                                            ? 'bg-primary text-white'
                                            : 'bg-[#f4f0f1] dark:bg-[#2a1d20] text-[#181113] dark:text-white'
                                            }`}
                                    >
                                        Active ({activeOrders.length})
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('completed')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'completed'
                                            ? 'bg-primary text-white'
                                            : 'bg-[#f4f0f1] dark:bg-[#2a1d20] text-[#181113] dark:text-white'
                                            }`}
                                    >
                                        Completed ({completedOrders.length})
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            {displayOrders.length === 0 ? (
                                <div className="text-center py-12">
                                    <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">
                                        {activeTab === 'active' ? 'task_alt' : 'check_circle'}
                                    </span>
                                    <p className="text-[#88636c] mt-4">
                                        {activeTab === 'active' ? 'No active tasks' : 'No completed tasks yet'}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {displayOrders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="flex items-center justify-between p-4 rounded-lg border border-[#e5dcde] dark:border-[#3a2e32] hover:bg-[#f4f0f1] dark:hover:bg-[#2a1d20] transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-2 h-12 rounded-full ${order.status === 'Completed' ? 'bg-green-500' :
                                                    order.status === 'Processing' ? 'bg-blue-500' :
                                                        'bg-yellow-500'
                                                    }`}></div>
                                                <div>
                                                    <p className="font-bold text-[#181113] dark:text-white">{order.id}</p>
                                                    <p className="text-sm text-[#88636c]">{order.customer_name}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                                <p className="text-sm font-bold text-[#181113] dark:text-white">
                                                    ₹{order.amount.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
