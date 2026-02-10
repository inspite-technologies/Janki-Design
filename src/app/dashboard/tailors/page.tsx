"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TailorsAPI, OrdersAPI } from "@/lib/api";
import { Tailor, Order } from "@/types";

export default function TailorsPage() {
    const router = useRouter();
    const [tailors, setTailors] = useState<Tailor[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Stats
    const [activeOrders, setActiveOrders] = useState(0);
    const [completedToday, setCompletedToday] = useState(0);

    // Filters
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [stageFilter, setStageFilter] = useState("All");

    // Modals
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
    const [isOrdersViewOpen, setIsOrdersViewOpen] = useState(false);
    const [ordersViewType, setOrdersViewType] = useState<'active' | 'completed'>('active');
    const [selectedTailor, setSelectedTailor] = useState<string | null>(null);

    // Add Staff Form
    const [newStaff, setNewStaff] = useState({
        name: '',
        specialization: 'General' as 'Suits' | 'Dresses' | 'Alterations' | 'General' | 'Embroidery',
        phone: '',
        email: '',
        status: 'Active' as 'Active' | 'On Leave' | 'Inactive'
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [tailorsRes, ordersRes] = await Promise.all([
                TailorsAPI.list(),
                OrdersAPI.list()
            ]);

            const tailorsData = Array.isArray(tailorsRes) ? tailorsRes : (tailorsRes as any).data || [];
            const ordersData = Array.isArray(ordersRes) ? ordersRes : (ordersRes as any).data || [];

            setTailors(tailorsData);
            setOrders(ordersData);

            // Calculate stats
            const active = ordersData.filter((o: Order) =>
                o.status === 'Processing' || o.status === 'Pending'
            ).length;

            const today = new Date().toISOString().split('T')[0];
            const completed = ordersData.filter((o: Order) =>
                o.status === 'Completed' && o.date?.startsWith(today)
            ).length;

            setActiveOrders(active);
            setCompletedToday(completed);
        } catch (error) {
            console.error("Failed to fetch tailors data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddStaff = async () => {
        if (!newStaff.name || !newStaff.phone) {
            alert('Please fill in required fields (Name and Phone)');
            return;
        }

        try {
            const result = await TailorsAPI.create(newStaff);
            const createdTailor = (result as any).data || result;

            // Add to local state
            setTailors(prev => [createdTailor, ...prev]);

            // Reset form
            setNewStaff({
                name: '',
                specialization: 'General',
                phone: '',
                email: '',
                status: 'Active'
            });

            setIsAddStaffModalOpen(false);
            alert('Staff member added successfully!');
        } catch (error) {
            console.error('Failed to add staff:', error);
            alert('Failed to add staff member');
        }
    };

    const filteredTailors = tailors.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.specialization.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    const handleTailorClick = (tailorId: string) => {
        router.push(`/dashboard/tailors/${encodeURIComponent(tailorId)}`);
    };

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
            {/* Header */}
            <header className="flex h-20 items-center justify-between border-b border-[#e5dcde] dark:border-[#3a2e32] bg-white dark:bg-[#1a1012] px-8 shrink-0">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm text-[#88636c] dark:text-white/60 mb-1">
                        <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-[#181113] dark:text-white font-medium">Tailors</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-primary text-[28px]">content_cut</span>
                        <h2 className="text-xl font-bold text-[#181113] dark:text-white">Tailor Task Management</h2>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden md:block relative w-80">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#88636c]">search</span>
                        <input
                            className="h-10 w-full rounded-lg border-none bg-[#f4f0f1] dark:bg-[#2a1d20] pl-10 text-sm text-[#181113] dark:text-white placeholder-[#88636c] focus:ring-2 focus:ring-primary/50"
                            placeholder="Search tailors..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setIsAddStaffModalOpen(true)}
                        className="flex items-center gap-2 rounded-lg bg-[#f4f0f1] dark:bg-[#2a1d20] px-4 py-2 text-sm font-bold text-[#181113] dark:text-white hover:bg-[#e6e1e3] transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">person_add</span>
                        Add Staff
                    </button>
                </div>
            </header>

            {/* Dashboard Content */}
            <main className="flex flex-1 flex-col overflow-y-auto p-8 gap-8">
                {/* Stats & Actions Row */}
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div className="flex gap-4">
                        <div
                            onClick={() => {
                                setOrdersViewType('active');
                                setIsOrdersViewOpen(true);
                            }}
                            className="flex min-w-[180px] flex-col rounded-xl bg-white dark:bg-[#1a1012] p-5 shadow-sm border border-[#e5dcde] dark:border-[#3a2e32] cursor-pointer hover:shadow-lg transition-shadow"
                        >
                            <p className="text-sm font-medium text-[#88636c]">Active Orders</p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-3xl font-bold text-[#181113] dark:text-white">{activeOrders}</span>
                                <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">Live</span>
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                setOrdersViewType('completed');
                                setIsOrdersViewOpen(true);
                            }}
                            className="flex min-w-[180px] flex-col rounded-xl bg-white dark:bg-[#1a1012] p-5 shadow-sm border border-[#e5dcde] dark:border-[#3a2e32] cursor-pointer hover:shadow-lg transition-shadow"
                        >
                            <p className="text-sm font-medium text-[#88636c]">Completed Today</p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-3xl font-bold text-[#181113] dark:text-white">{completedToday}</span>
                                <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">+{completedToday}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 rounded-lg bg-white dark:bg-[#1a1012] border border-[#e5dcde] dark:border-[#3a2e32] p-1 shadow-sm">
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="flex items-center gap-1 rounded px-3 py-1.5 text-sm font-medium hover:bg-[#f4f0f1] dark:hover:bg-[#2a1d20] transition-colors text-[#181113] dark:text-white bg-transparent border-none cursor-pointer"
                            >
                                <option value="All">Priority: All</option>
                                <option value="High">Priority: High</option>
                                <option value="Medium">Priority: Medium</option>
                                <option value="Low">Priority: Low</option>
                            </select>
                            <div className="h-4 w-px bg-[#e5dcde] dark:bg-[#3a2e32]"></div>
                            <select
                                value={stageFilter}
                                onChange={(e) => setStageFilter(e.target.value)}
                                className="flex items-center gap-1 rounded px-3 py-1.5 text-sm font-medium hover:bg-[#f4f0f1] dark:hover:bg-[#2a1d20] transition-colors text-[#181113] dark:text-white bg-transparent border-none cursor-pointer"
                            >
                                <option value="All">Stage: All</option>
                                <option value="Cutting">Stage: Cutting</option>
                                <option value="Stitching">Stage: Stitching</option>
                                <option value="Finishing">Stage: Finishing</option>
                            </select>
                        </div>
                        <button
                            onClick={() => setIsAssignModalOpen(true)}
                            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#b0133a] transition-colors"
                        >
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            Assign New Task
                        </button>
                    </div>
                </div>

                {/* Tailors Grid */}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredTailors.map((tailor) => (
                            <div
                                key={tailor.id}
                                onClick={() => handleTailorClick(tailor.id)}
                                className="flex flex-col gap-4 rounded-xl bg-[#f0eff0] dark:bg-[#150d0f] p-4 cursor-pointer hover:shadow-lg transition-shadow"
                            >
                                {/* Column Header */}
                                <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-red-700 flex items-center justify-center text-white font-bold border-2 border-white dark:border-[#2a1d20]">
                                            {tailor.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-[#181113] dark:text-white">{tailor.name}</h3>
                                            <p className="text-xs text-[#88636c]">{tailor.specialization}</p>
                                        </div>
                                    </div>
                                    <span className={`flex h-6 min-w-[24px] items-center justify-center rounded-full px-2 text-xs font-bold shadow-sm ${tailor.status === 'Active' ? 'bg-green-100 text-green-700' :
                                            tailor.status === 'On Leave' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-gray-100 text-gray-700'
                                        }`}>
                                        {tailor.status}
                                    </span>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-[#88636c]">Current Load:</span>
                                    <span className="font-bold text-[#181113] dark:text-white">{tailor.current_load || 0} tasks</span>
                                </div>

                                {tailor.rating && (
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-yellow-500 text-[16px]">star</span>
                                        <span className="text-sm font-bold text-[#181113] dark:text-white">{tailor.rating.toFixed(1)}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Orders View Modal */}
            {isOrdersViewOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#1a1012] rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden border border-[#e5dcde] dark:border-[#3a2e32]">
                        <div className="px-6 py-4 border-b border-[#e5dcde] dark:border-[#3a2e32] flex justify-between items-center">
                            <h3 className="text-lg font-bold text-[#181113] dark:text-white">
                                {ordersViewType === 'active' ? 'Active Orders' : 'Completed Today'}
                            </h3>
                            <button
                                onClick={() => setIsOrdersViewOpen(false)}
                                className="text-[#88636c] hover:text-[#181113] dark:hover:text-white"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 max-h-[60vh] overflow-y-auto">
                            {(() => {
                                const today = new Date().toISOString().split('T')[0];
                                const filteredOrders = ordersViewType === 'active'
                                    ? orders.filter(o => o.status === 'Processing' || o.status === 'Pending')
                                    : orders.filter(o => o.status === 'Completed' && o.date?.startsWith(today));

                                if (filteredOrders.length === 0) {
                                    return (
                                        <div className="text-center py-12">
                                            <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">
                                                {ordersViewType === 'active' ? 'pending_actions' : 'check_circle'}
                                            </span>
                                            <p className="text-[#88636c] mt-4">
                                                {ordersViewType === 'active' ? 'No active orders' : 'No orders completed today'}
                                            </p>
                                        </div>
                                    );
                                }

                                return (
                                    <div className="space-y-3">
                                        {filteredOrders.map((order) => (
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
                                                        {order.date && (
                                                            <p className="text-xs text-[#88636c] mt-1">
                                                                {new Date(order.date).toLocaleDateString()}
                                                            </p>
                                                        )}
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
                                );
                            })()}
                        </div>
                    </div>
                </div>
            )}

            {/* Add Staff Modal */}
            {isAddStaffModalOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#1a1012] rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-[#e5dcde] dark:border-[#3a2e32]">
                        <div className="px-6 py-4 border-b border-[#e5dcde] dark:border-[#3a2e32] flex justify-between items-center">
                            <h3 className="text-lg font-bold text-[#181113] dark:text-white">Add New Staff Member</h3>
                            <button
                                onClick={() => setIsAddStaffModalOpen(false)}
                                className="text-[#88636c] hover:text-[#181113] dark:hover:text-white"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
                            <div>
                                <label className="block text-sm font-medium text-[#88636c] mb-1">
                                    Full Name <span className="text-primary">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={newStaff.name}
                                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20] text-[#181113] dark:text-white"
                                    placeholder="Enter full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#88636c] mb-1">
                                    Specialization <span className="text-primary">*</span>
                                </label>
                                <select
                                    value={newStaff.specialization}
                                    onChange={(e) => setNewStaff({ ...newStaff, specialization: e.target.value as any })}
                                    className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20] text-[#181113] dark:text-white"
                                >
                                    <option value="General">General</option>
                                    <option value="Suits">Suits</option>
                                    <option value="Dresses">Dresses</option>
                                    <option value="Alterations">Alterations</option>
                                    <option value="Embroidery">Embroidery</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#88636c] mb-1">
                                    Phone Number <span className="text-primary">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={newStaff.phone}
                                    onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                                    className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20] text-[#181113] dark:text-white"
                                    placeholder="+91 98765 43210"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#88636c] mb-1">
                                    Email (Optional)
                                </label>
                                <input
                                    type="email"
                                    value={newStaff.email}
                                    onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                                    className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20] text-[#181113] dark:text-white"
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#88636c] mb-1">
                                    Status <span className="text-primary">*</span>
                                </label>
                                <select
                                    value={newStaff.status}
                                    onChange={(e) => setNewStaff({ ...newStaff, status: e.target.value as any })}
                                    className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20] text-[#181113] dark:text-white"
                                >
                                    <option value="Active">Active</option>
                                    <option value="On Leave">On Leave</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    onClick={() => setIsAddStaffModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-[#5e4e53] hover:text-[#181113] bg-transparent"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddStaff}
                                    className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-[#a61237] rounded-lg shadow-md transition-colors"
                                >
                                    Add Staff Member
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Assign Task Modal */}
            {isAssignModalOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#1a1012] rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-[#e5dcde] dark:border-[#3a2e32]">
                        <div className="px-6 py-4 border-b border-[#e5dcde] dark:border-[#3a2e32] flex justify-between items-center">
                            <h3 className="text-lg font-bold text-[#181113] dark:text-white">Assign New Task</h3>
                            <button
                                onClick={() => setIsAssignModalOpen(false)}
                                className="text-[#88636c] hover:text-[#181113] dark:hover:text-white"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#88636c] mb-1">Select Tailor</label>
                                <select
                                    value={selectedTailor || ''}
                                    onChange={(e) => setSelectedTailor(e.target.value)}
                                    className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20] text-[#181113] dark:text-white"
                                >
                                    <option value="">Choose a tailor...</option>
                                    {tailors.filter(t => t.status === 'Active').map(t => (
                                        <option key={t.id} value={t.id}>{t.name} - {t.specialization}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#88636c] mb-1">Order ID</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20] text-[#181113] dark:text-white"
                                    placeholder="#ORD-1234"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#88636c] mb-1">Task Stage</label>
                                <select className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20] text-[#181113] dark:text-white">
                                    <option>Cutting</option>
                                    <option>Stitching</option>
                                    <option>Finishing</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    onClick={() => setIsAssignModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-[#5e4e53] hover:text-[#181113] bg-transparent"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        // TODO: Implement task assignment
                                        setIsAssignModalOpen(false);
                                    }}
                                    className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-[#a61237] rounded-lg shadow-md transition-colors"
                                >
                                    Assign Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
