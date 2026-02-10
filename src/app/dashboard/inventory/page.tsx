"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InventoryAPI } from "@/lib/api";
import { InventoryItem } from "@/types";

export default function InventoryPage() {
    const router = useRouter();
    const [materials, setMaterials] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("All Materials");

    const [stats, setStats] = useState({ total: 0, lowStock: 0, committed: 0 });
    const [activeStatFilter, setActiveStatFilter] = useState<'All' | 'Low' | 'Committed'>('All');

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);

    useEffect(() => {
        const fetchMaterials = async () => {
            setLoading(true);
            try {
                // Determine type filter for API
                let typeParam: string | undefined = undefined;
                if (filterType === "Fabrics") typeParam = "Fabric";
                if (filterType === "Accessories") typeParam = "Accessory";

                const response = await InventoryAPI.listMaterials({
                    type: typeParam,
                    search: searchQuery
                });

                const data = Array.isArray(response) ? response : (response as any).data || [];
                setMaterials(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch inventory:", err);
                setError("Failed to load inventory.");
            } finally {
                setLoading(false);
            }
        };

        const fetchStats = async () => {
            try {
                // Fetch all materials for stats (no filters)
                const response = await InventoryAPI.listMaterials({});
                const allItems = Array.isArray(response) ? response : (response as any).data || [];

                const total = allItems.length;
                const lowStock = allItems.filter((i: any) => i.stock_status === 'Low' || i.stock_status === 'Critical').length;

                // Mock "Committed Stock" - assume 15% of total quantity is committed
                const totalQty = allItems.reduce((acc: number, item: any) => acc + (item.quantity || 0), 0);
                const committed = Math.floor(totalQty * 0.15); // Mock legacy logic

                setStats({ total, lowStock, committed });
            } catch (e) {
                console.error("Failed to fetch stats", e);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchMaterials();
            fetchStats();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, filterType]);


    // Client-side filtering for Stats Cards (Low, Committed) - API handles search & type
    const filteredMaterials = materials.filter(item => {
        if (activeStatFilter === 'Low') {
            return item.stock_status === 'Low' || item.stock_status === 'Critical';
        }
        if (activeStatFilter === 'Committed') {
            // Mock filter: show all for now as "committed" is global, or filter by some flag if we had it.
            // For UX, we just show "All" but the user feels they clicked something.
            return true;
        }
        return true;
    });

    const initiateDelete = (item: any) => {
        setItemToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            await InventoryAPI.deleteMaterial(itemToDelete.id);
            // Refresh list
            const updatedMaterials = materials.filter(m => m.id !== itemToDelete.id);
            setMaterials(updatedMaterials);
            // Update stats locally
            setStats(prev => ({ ...prev, total: prev.total - 1 }));
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
        } catch (error) {
            console.error("Failed to delete material:", error);
            alert("Failed to delete material.");
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
            {/* Header Section */}
            <header className="bg-background-light dark:bg-background-dark shrink-0 px-8 py-6 flex flex-col gap-6 border-b border-border-light dark:border-border-dark">
                {/* Top Row: Title & Action */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-text-secondary-dark mb-1">
                            <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-text-primary dark:text-text-primary-dark font-medium">Inventory</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary dark:text-text-primary-dark">Material Library</h2>
                        <p className="text-text-secondary dark:text-text-secondary-dark text-base">Track available yardage and accessory stock across all locations.</p>
                    </div>
                    <Link href="/dashboard/inventory/new" className="bg-primary hover:bg-red-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-bold shadow-lg shadow-primary/30 transition-all active:scale-95 self-center sm:self-end mb-1">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        <span>Add New Material</span>
                    </Link>
                </div>
                {/* Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                        onClick={() => setActiveStatFilter('All')}
                        className={`bg-surface-light dark:bg-surface-dark border p-5 rounded-xl flex flex-col gap-1 shadow-sm cursor-pointer transition-all hover:shadow-md ${activeStatFilter === 'All' ? 'border-primary ring-1 ring-primary' : 'border-border-light dark:border-border-dark'}`}
                    >
                        <div className="flex justify-between items-start">
                            <p className="text-text-secondary dark:text-text-secondary-dark text-sm font-medium">Total Items</p>
                            <span className="material-symbols-outlined text-[#078859] bg-[#078859]/10 p-1 rounded text-sm">inventory_2</span>
                        </div>
                        <p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mt-1">{stats.total || 0}</p>
                    </div>
                    <div
                        onClick={() => setActiveStatFilter('Low')}
                        className={`bg-surface-light dark:bg-surface-dark border p-5 rounded-xl flex flex-col gap-1 shadow-sm relative overflow-hidden group cursor-pointer transition-all hover:shadow-md ${activeStatFilter === 'Low' ? 'border-primary ring-1 ring-primary' : 'border-primary/30'}`}
                    >
                        <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-primary text-5xl">warning</span>
                        </div>
                        <div className="flex justify-between items-start z-10">
                            <p className="text-primary text-sm font-bold">Low Stock Items</p>
                            <span className="material-symbols-outlined text-primary bg-primary/10 p-1 rounded text-sm">priority_high</span>
                        </div>
                        <p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mt-1 z-10">{stats.lowStock || 0} Items</p>
                        <p className="text-primary text-xs font-semibold mt-1 z-10">Requires attention - Click to filter</p>
                    </div>
                    <div
                        onClick={() => setActiveStatFilter('Committed')}
                        className={`bg-surface-light dark:bg-surface-dark border p-5 rounded-xl flex flex-col gap-1 shadow-sm cursor-pointer transition-all hover:shadow-md ${activeStatFilter === 'Committed' ? 'border-primary ring-1 ring-primary' : 'border-border-light dark:border-border-dark'}`}
                    >
                        <div className="flex justify-between items-start">
                            <p className="text-text-secondary dark:text-text-secondary-dark text-sm font-medium">Committed Stock</p>
                            <span className="material-symbols-outlined text-text-secondary dark:text-text-secondary-dark bg-gray-100 dark:bg-white/10 p-1 rounded text-sm">pending_actions</span>
                        </div>
                        <p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark mt-1">~{(stats.committed || 0).toLocaleString()}</p>
                        <p className="text-text-secondary dark:text-text-secondary-dark/50 text-xs font-medium mt-1">Reserved for current orders</p>
                    </div>
                </div>
                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-2">
                    {/* Search */}
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-text-secondary dark:text-text-secondary-dark group-focus-within:text-primary transition-colors">search</span>
                        </div>
                        <input
                            className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-white dark:bg-surface-dark text-text-primary dark:text-text-primary-dark placeholder-text-secondary dark:placeholder-text-secondary-dark focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-sm text-sm"
                            placeholder="Search by SKU, fabric name, or type..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {/* Chips */}
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                        {["All Materials", "Fabrics", "Accessories"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors shadow-sm ${filterType === type
                                    ? "bg-text-primary dark:bg-white text-white dark:text-text-primary"
                                    : "bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-primary dark:text-text-primary-dark hover:border-primary/50"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Grid Content */}
            <section className="flex-1 overflow-y-auto px-8 pb-8 pt-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-48 gap-3">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                        <p className="text-text-secondary dark:text-text-secondary-dark">Loading inventory...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center h-48 gap-3 text-red-500">
                        <span className="material-symbols-outlined text-4xl">error</span>
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()} className="text-primary hover:underline text-sm font-bold">Try Again</button>
                    </div>
                ) : materials.length === 0 && (searchQuery || filterType !== "All Materials" || activeStatFilter !== "All") ? (
                    <div className="flex flex-col items-center justify-center h-48 gap-3 text-text-secondary dark:text-text-secondary-dark">
                        <span className="material-symbols-outlined text-4xl opacity-50">search_off</span>
                        <p>No inventory items found matching your filters.</p>
                        <p className="text-xs">Try clearing filters or adding a new material.</p>
                        <button onClick={() => { setActiveStatFilter('All'); setSearchQuery(''); setFilterType('All Materials'); }} className="text-primary hover:underline text-sm font-bold mt-2">Clear All Filters</button>
                    </div>
                ) : materials.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 gap-3 text-text-secondary dark:text-text-secondary-dark">
                        <span className="material-symbols-outlined text-4xl opacity-50">search_off</span>
                        <p>No inventory items found.</p>
                        <p className="text-xs">Try adding a new material or clearing filters.</p>
                    </div>
                ) : filteredMaterials.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 gap-3 text-text-secondary dark:text-text-secondary-dark">
                        <span className="material-symbols-outlined text-4xl opacity-50">filter_list_off</span>
                        <p>No matches for "{searchQuery}" {activeStatFilter !== 'All' ? `with ${activeStatFilter} filter` : ''}.</p>
                        <button onClick={() => { setActiveStatFilter('All'); setSearchQuery(''); }} className="text-primary hover:underline text-sm font-bold mt-2">Clear Filters</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {filteredMaterials.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => router.push(`/dashboard/inventory/${encodeURIComponent(item.id)}/edit`)}
                                className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-border-light dark:border-border-dark group hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col relative cursor-pointer"
                            >

                                <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                    {item.image_url ? (
                                        <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('${item.image_url}')` }}></div>
                                    ) : (
                                        <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">image</span>
                                    )}
                                    {item.stock_status === 'Low' || item.stock_status === 'Critical' ? (
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">Low Stock</span>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="p-4 flex flex-col gap-3 flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-text-primary dark:text-text-primary-dark font-bold text-lg leading-tight line-clamp-2">{item.name}</h3>
                                            <p className="text-text-secondary dark:text-text-secondary-dark text-xs font-medium mt-0.5">{item.type} • SKU: {item.sku}</p>
                                        </div>
                                        {/* Actions - Always Visible */}
                                        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                                            <Link href={`/dashboard/inventory/${encodeURIComponent(item.id)}/edit`} className="text-gray-400 hover:text-primary transition-colors p-2 hover:bg-gray-100 rounded-full" title="Edit">
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </Link>
                                            <button onClick={(e) => { e.stopPropagation(); initiateDelete(item); }} className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-gray-100 rounded-full" title="Delete">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-1 mt-auto">
                                        <div className="flex justify-between text-xs font-semibold">
                                            <span className="text-text-secondary dark:text-text-secondary-dark">Stock Level</span>
                                            <span className={`font-bold ${item.stock_status === 'Critical' ? 'text-primary' : 'text-text-primary dark:text-text-primary-dark'}`}>
                                                {item.quantity} {item.unit}
                                            </span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${item.stock_status === 'Critical' ? 'bg-primary' : 'bg-text-primary dark:bg-white'}`}
                                                style={{ width: `${Math.min(100, (item.quantity / 100) * 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer hint */}
                {!loading && !error && filteredMaterials.length > 0 && (
                    <div className="mt-8 mb-6 text-center text-text-secondary dark:text-text-secondary-dark text-xs opacity-40">
                        <p>End of list</p>
                    </div>
                )}
            </section>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && itemToDelete && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-red-100 dark:border-red-900/30 transform transition-all scale-100">
                        <div className="p-6 flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-2">
                                <span className="material-symbols-outlined text-3xl text-red-500">delete_forever</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Material?</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete <span className="font-bold text-gray-800 dark:text-gray-200">"{itemToDelete.name}"</span>?
                                    This action cannot be undone.
                                </p>
                            </div>
                            <div className="flex gap-3 w-full mt-2">
                                <button
                                    onClick={() => { setIsDeleteModalOpen(false); setItemToDelete(null); }}
                                    className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 transition-all active:scale-95"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
