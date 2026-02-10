"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CustomersAPI } from "@/lib/api";
import { Customer } from "@/types";

export default function CustomerProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    // Unwrap params using React.use() or await in useEffect. 
    // Since this is a client component, we receive params as a promise in Next.js 15+ 
    // but the type signature usually reflects it. However, to be safe and compatible:
    const [id, setId] = useState<string | null>(null);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editForm, setEditForm] = useState<Partial<Customer>>({});
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        // Unwrap params
        const unwrapParams = async () => {
            try {
                const resolvedParams = await params;
                if (resolvedParams?.id) {
                    setId(resolvedParams.id);
                }
            } catch (e) {
                console.error("Failed to unwrap params:", e);
                setError("Invalid URL parameters.");
                setLoading(false);
            }
        };
        unwrapParams();
    }, [params]);

    useEffect(() => {
        const fetchCustomer = async () => {
            if (!id) return;
            setLoading(true);
            try {
                // Decode ID if needed
                const customerId = decodeURIComponent(id);
                console.log("Fetching customer:", customerId);
                const data = await CustomersAPI.get(customerId);
                setCustomer(data);
                setEditForm(data); // Initialize edit form
                setError(null);
            } catch (err) {
                console.error("Failed to fetch customer:", err);
                setError("Failed to load customer profile.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCustomer();
        }
    }, [id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (!customer) return;
            const updated = await CustomersAPI.update(customer.id, editForm);
            setCustomer(updated);
            setIsEditModalOpen(false);
            alert("Customer updated successfully!");
        } catch (err) {
            console.error("Failed to update customer:", err);
            alert("Failed to update customer.");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        setDeleting(true);
        try {
            if (!customer) return;
            await CustomersAPI.delete(customer.id);
            setIsDeleteModalOpen(false);
            router.refresh(); // Refresh route to update list cache
            router.push("/dashboard/customers");
        } catch (err) {
            console.error("Failed to delete customer:", err);
            alert("Failed to delete customer.");
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="text-[#88636c]">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error || !customer) {
        return (
            <div className="flex h-full items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="text-center">
                    <h3 className="text-xl font-bold text-red-500 mb-2">Error</h3>
                    <p className="text-[#88636c] mb-4">{error || "Customer not found."}</p>
                    <Link href="/dashboard/customers" className="text-primary hover:underline">
                        &larr; Back to Directory
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-y-auto">
            {/* Header / Breadcrumb */}
            <header className="px-8 py-6 shrink-0">
                <div className="max-w-5xl mx-auto">
                    <Link href="/dashboard/customers" className="flex items-center gap-1 text-[#88636c] hover:text-primary mb-4 transition-colors">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        <span className="text-sm font-medium">Back to Directory</span>
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-gray-200 border-2 border-[#D4AF37] flex items-center justify-center overflow-hidden">
                                {customer.avatar_url ? (
                                    <img src={customer.avatar_url} alt={customer.name} className="h-full w-full object-cover" />
                                ) : (
                                    <span className="text-xl font-bold text-[#88636c]">{customer.name.charAt(0)}</span>
                                )}
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-[#181113] dark:text-white">{customer.name}</h1>
                                <div className="flex items-center gap-2 text-sm text-[#88636c]">
                                    <span className="bg-[#fff5f7] dark:bg-[#3d2b30] px-2 py-0.5 rounded border border-[#e5dcde] dark:border-[#3d2b30] text-primary font-medium">
                                        {customer.id}
                                    </span>
                                    <span>•</span>
                                    <span>{customer.type} Member</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#2a1d21] border border-[#D4AF37] text-[#181113] dark:text-white rounded-lg hover:bg-[#fffdf5] transition-colors shadow-sm font-medium"
                            >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                <span>Edit Profile</span>
                            </button>
                            <button
                                onClick={handleDeleteClick}
                                className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                            >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Body */}
            <main className="flex-1 px-8 pb-12">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Contact Info */}
                    <div className="md:col-span-1 flex flex-col gap-6">
                        <div className="bg-white dark:bg-[#2a1d21] rounded-xl p-6 shadow-sm border border-[#e5dcde] dark:border-[#3d2b30]">
                            <h3 className="text-lg font-bold text-[#181113] dark:text-white mb-4 border-b border-[#e5dcde] dark:border-[#3d2b30] pb-2">Contact Details</h3>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="text-xs font-bold text-[#88636c] uppercase tracking-wider">Email</label>
                                    <p className="text-[#5e4e53] dark:text-[#ccb8bd] break-all">{customer.email}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-[#88636c] uppercase tracking-wider">Phone</label>
                                    <p className="text-[#5e4e53] dark:text-[#ccb8bd]">{customer.phone}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-[#88636c] uppercase tracking-wider">Location</label>
                                    <p className="text-[#5e4e53] dark:text-[#ccb8bd]">{customer.location || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#181113] rounded-xl p-6 text-white shadow-md relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold mb-1">Lifetime Value</h3>
                                <div className="text-3xl font-extrabold text-[#D4AF37] mb-2">₹{customer.total_spent ? customer.total_spent.toLocaleString() : '0'}</div>
                                <p className="text-white/60 text-sm">Total revenue from {customer.total_orders || 0} orders</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order History (Placeholder for now) */}
                    <div className="md:col-span-2 flex flex-col gap-6">
                        <div className="bg-white dark:bg-[#2a1d21] rounded-xl shadow-sm border border-[#e5dcde] dark:border-[#3d2b30] flex-1 min-h-[400px]">
                            <div className="px-6 py-4 border-b border-[#e5dcde] dark:border-[#3d2b30] flex justify-between items-center">
                                <h3 className="text-lg font-bold text-[#181113] dark:text-white">Recent Orders</h3>
                                <button className="text-primary text-sm font-bold hover:underline">View All</button>
                            </div>
                            <div className="p-8 text-center flex flex-col items-center justify-center h-full text-[#88636c]">
                                <span className="material-symbols-outlined text-4xl mb-2 opacity-30">shopping_bag</span>
                                <p>No recent orders found for this customer.</p>
                                <Link href="/dashboard/orders" className="mt-4 px-4 py-2 bg-[#fcfbfb] border border-[#e5dcde] rounded-lg text-sm hover:bg-white transition-colors">
                                    Create New Order
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#2a1d21] rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-[#D4AF37] animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-[#e5dcde] dark:border-[#3d2b30] flex justify-between items-center bg-[#fcfbfb] dark:bg-[#36262b]">
                            <h3 className="text-lg font-bold text-[#181113] dark:text-white">Edit Customer Profile</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-[#88636c] hover:text-[#181113] dark:hover:text-white transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleUpdate} className="p-6 flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#88636c] mb-1">Full Name</label>
                                <input
                                    className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d21] text-[#181113] dark:text-white"
                                    value={editForm.name || ''}
                                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#88636c] mb-1">Phone</label>
                                    <input
                                        className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d21] text-[#181113] dark:text-white"
                                        value={editForm.phone || ''}
                                        onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#88636c] mb-1">Location</label>
                                    <input
                                        className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d21] text-[#181113] dark:text-white"
                                        value={editForm.location || ''}
                                        onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#88636c] mb-1">Email</label>
                                <input
                                    className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d21] text-[#181113] dark:text-white"
                                    value={editForm.email || ''}
                                    onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#88636c] mb-1">Membership Type</label>
                                <select
                                    className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d21] text-[#181113] dark:text-white"
                                    value={editForm.type || 'Regular'}
                                    onChange={e => setEditForm({ ...editForm, type: e.target.value as any })}
                                >
                                    <option value="Regular">Regular</option>
                                    <option value="VIP">VIP</option>
                                    <option value="New">New</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-[#e5dcde] dark:border-[#3d2b30]">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-[#5e4e53] hover:text-[#181113] bg-transparent"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-[#a61237] rounded-lg shadow-md transition-colors disabled:opacity-50"
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#2a1d21] rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden border border-red-200 animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 flex items-center gap-3">
                            <span className="material-symbols-outlined text-red-600">warning</span>
                            <h3 className="text-lg font-bold text-red-700 dark:text-red-400">Confirm Deletion</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-[#5e4e53] dark:text-[#ccb8bd] mb-6">
                                Are you sure you want to delete <span className="font-bold text-[#181113] dark:text-white">{customer?.name}</span>?
                                This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-[#5e4e53] hover:text-[#181113] bg-transparent border border-transparent hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    disabled={deleting}
                                    className="px-6 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {deleting ? 'Deleting...' : 'Delete Customer'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
