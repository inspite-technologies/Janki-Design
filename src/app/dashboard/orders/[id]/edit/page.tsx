"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { OrdersAPI } from '@/lib/api';
import { Order, OrderType, OrderStatus } from '@/types';

export default function EditOrderPage() {
    const params = useParams();
    const router = useRouter();
    const id = decodeURIComponent(params.id as string);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        customer_name: '',
        order_type: 'Stitching' as OrderType,
        status: 'Pending' as OrderStatus,
        amount: 0,
        date: '',
        items: 1,
        delivery_date: ''
    });

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await OrdersAPI.get(id);
                // Handle response unwrapping
                const data = (response as any).data || response;
                if (data) {
                    setFormData({
                        customer_name: data.customer_name,
                        order_type: data.order_type,
                        status: data.status,
                        amount: data.amount,
                        date: data.date.split('T')[0],
                        items: data.items || 1,
                        delivery_date: data.delivery_date ? data.delivery_date.split('T')[0] : ''
                    });
                }
            } catch (err) {
                console.error("Failed to fetch order:", err);
                alert("Failed to load order data.");
                router.push('/dashboard/orders');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrder();
        }
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await OrdersAPI.update(id, {
                ...formData,
                items: Number(formData.items),
                amount: Number(formData.amount)
            });
            router.push(`/dashboard/orders/${encodeURIComponent(id)}`);
        } catch (error) {
            console.error('Failed to update order:', error);
            alert('Failed to update order. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
            <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark px-6 py-4 flex items-center gap-4 shrink-0">
                <Link href={`/dashboard/orders/${encodeURIComponent(id)}`} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <div>
                    <h1 className="text-xl font-bold text-text-primary dark:text-text-primary-dark">Edit Order {id}</h1>
                    <p className="text-xs text-text-secondary dark:text-text-secondary-dark">Update order details</p>
                </div>
            </header>

            <div className="p-6 max-w-2xl mx-auto w-full overflow-y-auto">
                <form onSubmit={handleSubmit} className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-border-light dark:border-border-dark space-y-6">

                    {/* Customer Info */}
                    <div className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary dark:text-text-secondary-dark border-b border-border-light dark:border-border-dark pb-2">Customer Information</h2>

                        <div>
                            <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-1">Customer Name</label>
                            <input
                                type="text"
                                required
                                value={formData.customer_name}
                                onChange={e => setFormData({ ...formData, customer_name: e.target.value })}
                                placeholder="Enter customer name"
                                className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary dark:text-text-secondary-dark border-b border-border-light dark:border-border-dark pb-2">Order Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-1">Order Type</label>
                                <select
                                    value={formData.order_type}
                                    onChange={e => setFormData({ ...formData, order_type: e.target.value as OrderType })}
                                    className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all cursor-pointer"
                                >
                                    <option value="Stitching">Stitching</option>
                                    <option value="Boutique">Boutique</option>
                                    <option value="Alteration">Alteration</option>
                                    <option value="Custom">Custom</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-1">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={e => setFormData({ ...formData, status: e.target.value as OrderStatus })}
                                    className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all cursor-pointer"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-1">Order Date</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-1">Delivery Due Date</label>
                                <input
                                    type="date"
                                    value={formData.delivery_date}
                                    onChange={e => setFormData({ ...formData, delivery_date: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-1">Total Amount (₹)</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    value={formData.amount}
                                    onChange={e => setFormData({ ...formData, amount: Number(e.target.value) })}
                                    className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-1">Number of Items</label>
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    value={formData.items}
                                    onChange={e => setFormData({ ...formData, items: Number(e.target.value) })}
                                    className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-border-light dark:border-border-dark">
                        <Link
                            href={`/dashboard/orders/${encodeURIComponent(id)}`}
                            className="px-4 py-2 rounded-lg border border-border-light dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold shadow-md shadow-primary/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {submitting && <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>}
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
