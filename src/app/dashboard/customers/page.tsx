"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CustomersAPI } from "@/lib/api";
import { Customer } from "@/types";

export default function CustomersDirectoryPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Pagination State
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    // Modal State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        type: "Regular"
    });
    const [submitting, setSubmitting] = useState(false);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const response = await CustomersAPI.list({
                search: searchQuery,
                page: page,
                limit: itemsPerPage
            });

            const data = Array.isArray(response) ? response : (response as any).data || [];
            const meta = (response as any).meta;

            setCustomers(data);
            if (meta) {
                setTotalPages(meta.totalPages);
                setTotalItems(meta.total);
            }
            setError(null);
        } catch (err) {
            console.error("Failed to fetch customers:", err);
            setError("Failed to load customers.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchCustomers();
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [searchQuery, page]);

    const handleAddCustomerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await CustomersAPI.create(newCustomer as any); // Type assertion for now
            setIsAddModalOpen(false);
            setNewCustomer({ name: "", email: "", phone: "", location: "", type: "Regular" });
            fetchCustomers(); // Refresh list
        } catch (err) {
            console.error("Failed to create customer:", err);
            alert("Failed to create customer. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark relative">
            <header className="w-full px-8 py-8 bg-background-light dark:bg-background-dark shrink-0">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-7xl mx-auto">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[#181113] dark:text-white text-4xl font-extrabold tracking-tight">Customer Directory</h2>
                        <p className="text-[#88636c] dark:text-[#ccb8bd] text-base">Manage your exclusive clientele list.</p>
                    </div>
                    {/* Search & Action */}
                    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full md:w-auto">
                        {/* Search Bar */}
                        <div className="relative group min-w-[320px]">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-[#88636c]">search</span>
                            </div>
                            <input
                                className="block w-full pl-10 pr-3 py-2.5 border-2 border-[#D4AF37] rounded-lg leading-5 bg-white dark:bg-[#2a1d21] dark:text-white placeholder-[#88636c] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm transition-shadow shadow-sm"
                                placeholder="Search by name, ID, or email..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }} // Reset to page 1 on search
                            />
                        </div>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="flex items-center justify-center gap-2 bg-primary hover:bg-[#a61237] text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 text-sm font-bold tracking-wide"
                        >
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            <span>Add New Customer</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Table Container */}
            <div className="flex-1 overflow-y-auto px-8 pb-8">
                <div className="max-w-7xl mx-auto h-full flex flex-col">
                    <div className="bg-white dark:bg-[#2a1d21] rounded-xl shadow-sm border border-[#e5dcde] dark:border-[#3d2b30] overflow-hidden flex-1 flex flex-col">
                        {/* Table Wrapper for overflow */}
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#fcfbfb] dark:bg-[#36262b] sticky top-0 z-10 border-b border-[#e5dcde] dark:border-[#3d2b30]">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-[#88636c] uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-4 text-xs font-bold text-[#88636c] uppercase tracking-wider">Customer Name</th>
                                        <th className="px-6 py-4 text-xs font-bold text-[#88636c] uppercase tracking-wider">Location</th>
                                        <th className="px-6 py-4 text-xs font-bold text-[#88636c] uppercase tracking-wider">Contact Number</th>
                                        <th className="px-6 py-4 text-xs font-bold text-[#88636c] uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-4 text-xs font-bold text-[#88636c] text-right uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#e5dcde] dark:divide-[#3d2b30]">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                                    <p>Loading customers...</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : error ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-10 text-center text-red-500">
                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    <span className="material-symbols-outlined text-4xl">error</span>
                                                    <p>{error}</p>
                                                    <button onClick={() => window.location.reload()} className="mt-2 text-primary hover:underline text-sm">Retry</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : customers.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                                                No customers found.
                                            </td>
                                        </tr>
                                    ) : (
                                        customers.map((customer) => (
                                            <tr key={customer.id} className="group hover:bg-[#fff5f7] dark:hover:bg-[#3d2b30]/50 transition-colors cursor-pointer">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#88636c]">{customer.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-cover bg-center border border-[#e5dcde] bg-gray-200"
                                                            style={{ backgroundImage: customer.avatar_url ? `url('${customer.avatar_url}')` : undefined }}>
                                                            {!customer.avatar_url && (
                                                                <div className="w-full h-full flex items-center justify-center text-[#88636c] font-bold text-xs">
                                                                    {customer.name.charAt(0)}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-[#181113] dark:text-white group-hover:text-primary transition-colors">{customer.name}</span>
                                                            <span className="text-xs text-[#88636c]">{customer.type || 'Regular'} Member</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5e4e53] dark:text-[#ccb8bd]">{customer.location || 'N/A'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5e4e53] dark:text-[#ccb8bd]">{customer.phone}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5e4e53] dark:text-[#ccb8bd]">{customer.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link href={`/dashboard/customers/${encodeURIComponent(customer.id)}`} className="text-primary hover:text-[#a61237] font-bold flex items-center gap-1 justify-end ml-auto">
                                                        <span>View Profile</span>
                                                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )))}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="bg-[#fcfbfb] dark:bg-[#2a1d21] px-6 py-4 border-t border-[#e5dcde] dark:border-[#3d2b30] flex items-center justify-between">
                            <span className="text-sm text-[#88636c]">Showing <span className="font-bold text-primary">{(page - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-primary">{Math.min(page * itemsPerPage, totalItems)}</span> of {totalItems} results</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 1}
                                    className="px-3 py-1 rounded border border-[#e5dcde] dark:border-[#3d2b30] text-[#5e4e53] dark:text-[#ccb8bd] text-sm hover:bg-white dark:hover:bg-[#3d2b30] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page === totalPages}
                                    className="px-3 py-1 rounded border border-[#e5dcde] dark:border-[#3d2b30] text-[#5e4e53] dark:text-[#ccb8bd] text-sm hover:bg-white dark:hover:bg-[#3d2b30] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Customer Modal */}
            {isAddModalOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#2a1d21] rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden border border-[#D4AF37]">
                        <div className="px-6 py-4 border-b border-[#e5dcde] dark:border-[#3d2b30] flex justify-between items-center bg-[#fcfbfb] dark:bg-[#36262b]">
                            <h3 className="text-lg font-bold text-[#181113] dark:text-white">Add New Customer</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-[#88636c] hover:text-[#181113] dark:hover:text-white">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleAddCustomerSubmit} className="p-6 flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#88636c] mb-1">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d21] text-[#181113] dark:text-white"
                                    value={newCustomer.name}
                                    onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                    placeholder="e.g. Jane Doe"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#88636c] mb-1">Phone Number</label>
                                    <input
                                        required
                                        type="tel"
                                        className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d21] text-[#181113] dark:text-white"
                                        value={newCustomer.phone}
                                        onChange={e => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                                        placeholder="+91..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#88636c] mb-1">Location</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d21] text-[#181113] dark:text-white"
                                        value={newCustomer.location}
                                        onChange={e => setNewCustomer({ ...newCustomer, location: e.target.value })}
                                        placeholder="City, Area"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#88636c] mb-1">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d21] text-[#181113] dark:text-white"
                                    value={newCustomer.email}
                                    onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })}
                                    placeholder="jane@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#88636c] mb-1">Membership Type</label>
                                <select
                                    className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d21] text-[#181113] dark:text-white"
                                    value={newCustomer.type}
                                    onChange={e => setNewCustomer({ ...newCustomer, type: e.target.value })}
                                >
                                    <option value="Regular">Regular</option>
                                    <option value="VIP">VIP</option>
                                    <option value="New">New</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-[#5e4e53] hover:text-[#181113] bg-transparent"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-[#a61237] rounded-lg shadow-md transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {submitting ? 'Saving...' : 'Create Customer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
