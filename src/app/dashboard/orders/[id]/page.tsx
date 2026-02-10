"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { OrdersAPI } from '@/lib/api';
import { Order } from '@/types';

export default function OrderDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = decodeURIComponent(params.id as string);

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await OrdersAPI.get(id);
                // Handle response unwrapping if needed
                const data = (response as any).data || response;
                setOrder(data);
            } catch (err) {
                console.error("Failed to fetch order:", err);
                setError("Failed to load order details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrder();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="flex flex-col h-full items-center justify-center gap-4">
                <p className="text-red-500 font-medium">{error || "Order not found"}</p>
                <Link href="/dashboard/orders" className="text-primary hover:underline">
                    Back to Orders
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
            <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark px-6 py-4 flex items-center justify-between gap-4 shrink-0 transition-colors">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/orders" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-text-primary dark:text-text-primary-dark">Order {order.id}</h1>
                        <p className="text-xs text-text-secondary dark:text-text-secondary-dark">{order.order_type} Order for {order.customer_name}</p>
                    </div>
                </div>
                <Link href={`/dashboard/orders/${encodeURIComponent(id)}/edit`} className="bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-700 text-text-primary dark:text-text-primary-dark text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">edit</span> Edit Order
                </Link>
            </header>

            <div className="p-6 max-w-4xl mx-auto w-full space-y-6 overflow-y-auto">
                {/* Status Card */}
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-border-light dark:border-border-dark flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <p className="text-sm text-text-secondary dark:text-text-secondary-dark mb-1">Current Status</p>
                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full bg-opacity-10 ${order.status === 'Completed' || order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                    order.status === 'Pending' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                }`}>
                                {order.status}
                            </span>
                            <span className="text-xs text-text-muted dark:text-text-muted-dark">
                                Updated on {new Date(order.date).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-text-secondary dark:text-text-secondary-dark mb-1">Total Amount</p>
                        <p className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">₹{(order.amount || 0).toLocaleString()}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Customer Details */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-border-light dark:border-border-dark h-full">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary dark:text-text-secondary-dark border-b border-border-light dark:border-border-dark pb-2 mb-4">Customer Details</h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-text-muted dark:text-text-muted-dark uppercase">Name</p>
                                <p className="text-base font-medium text-text-primary dark:text-text-primary-dark">{order.customer_name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-text-muted dark:text-text-muted-dark uppercase">Customer ID</p>
                                <p className="text-base font-medium text-text-primary dark:text-text-primary-dark">{order.customer_id || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Information */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-border-light dark:border-border-dark h-full">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary dark:text-text-secondary-dark border-b border-border-light dark:border-border-dark pb-2 mb-4">Order Info</h2>
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-text-muted dark:text-text-muted-dark uppercase">Order Date</p>
                                    <p className="text-base font-medium text-text-primary dark:text-text-primary-dark">{new Date(order.date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted dark:text-text-muted-dark uppercase">Delivery Date</p>
                                    <p className="text-base font-medium text-text-primary dark:text-text-primary-dark">{order.delivery_date ? new Date(order.delivery_date).toLocaleDateString() : 'Not set'}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-text-muted dark:text-text-muted-dark uppercase">Items</p>
                                <p className="text-base font-medium text-text-primary dark:text-text-primary-dark">{order.items || 1} Item(s)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
