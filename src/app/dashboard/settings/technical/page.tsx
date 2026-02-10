"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function TechnicalSettingsPage() {
    // State for toggles
    const [notifications, setNotifications] = useState({
        orderConfirmation: true,
        shippingUpdates: true,
        promotionalOffers: false,
        inventoryAlerts: true
    });

    const handleToggle = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
            {/* Top Header */}
            <header className="h-16 flex items-center justify-between px-6 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark flex-shrink-0 z-10">
                <div className="flex items-center gap-4">
                    <button className="md:hidden p-2 text-text-muted hover:text-primary">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <nav className="hidden sm:flex text-sm font-medium text-gray-500 dark:text-gray-400">
                        <Link href="/dashboard" className="hover:text-primary transition-colors">Settings</Link>
                        <span className="mx-2">/</span>
                        <span className="text-[#181112] dark:text-white font-semibold">Technical & Access</span>
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">save</span>
                        Save Changes
                    </button>
                </div>
            </header>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
                {/* Page Title Section */}
                <div className="max-w-7xl mx-auto w-full">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#181112] dark:text-white tracking-tight mb-2">Technical & Access Settings</h1>
                    <p className="text-[#896168] dark:text-gray-400 max-w-3xl">Manage user roles, API keys for integrations, loyalty program rules, and automated notifications.</p>
                </div>

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* LEFT COLUMN (Role Management & Notifications) */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        {/* 1. User Role Management */}
                        <section className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-[#e6dbdd] dark:border-[#3d2b2e] overflow-hidden">
                            <div className="px-6 py-4 border-b border-[#e6dbdd] dark:border-[#3d2b2e] flex justify-between items-center bg-white dark:bg-surface-dark">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <span className="material-symbols-outlined">admin_panel_settings</span>
                                    </div>
                                    <h2 className="text-lg font-bold text-[#181112] dark:text-white">Role Management</h2>
                                </div>
                                <button className="text-primary text-sm font-semibold hover:underline">Add New Role</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-[#f8f6f6] dark:bg-background-dark/50 text-[#896168] dark:text-gray-400 font-medium">
                                        <tr>
                                            <th className="px-6 py-3">Role Name</th>
                                            <th className="px-6 py-3">Permissions</th>
                                            <th className="px-6 py-3">Status</th>
                                            <th className="px-6 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#e6dbdd] dark:divide-[#3d2b2e]">
                                        {[
                                            { name: "Super Admin", permissions: "Full Access", status: "Active", statusColor: "green" },
                                            { name: "Manager", permissions: "Read/Write", status: "Active", statusColor: "green" },
                                            { name: "Tailor", permissions: "View Queue Only", status: "Limited", statusColor: "yellow" },
                                            { name: "Inventory Staff", permissions: "Stock Mgmt", status: "Active", statusColor: "green" },
                                        ].map((role, idx) => (
                                            <tr key={idx} className="group hover:bg-[#f8f6f6] dark:hover:bg-background-dark/30 transition-colors">
                                                <td className="px-6 py-4 font-medium text-[#181112] dark:text-gray-200">{role.name}</td>
                                                <td className="px-6 py-4 text-[#896168] dark:text-gray-400">{role.permissions}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${role.statusColor === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                                        {role.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-[#896168] hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* 4. Notifications Configuration */}
                        <section className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-[#e6dbdd] dark:border-[#3d2b2e] overflow-hidden">
                            <div className="px-6 py-4 border-b border-[#e6dbdd] dark:border-[#3d2b2e] flex items-center gap-3 bg-white dark:bg-surface-dark">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <span className="material-symbols-outlined">notifications_active</span>
                                </div>
                                <h2 className="text-lg font-bold text-[#181112] dark:text-white">Notification Channels</h2>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {[
                                    { id: "orderConfirmation", label: "Order Confirmation", sub: "Email & SMS triggers" },
                                    { id: "shippingUpdates", label: "Shipping Updates", sub: "WhatsApp notifications" },
                                    { id: "promotionalOffers", label: "Promotional Offers", sub: "Marketing blasts" },
                                    { id: "inventoryAlerts", label: "Inventory Alerts", sub: "Low stock warnings to staff" },
                                ].map((item) => (
                                    <div key={item.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-[#181112] dark:text-gray-200">{item.label}</p>
                                            <p className="text-xs text-[#896168] dark:text-gray-400">{item.sub}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={notifications[item.id as keyof typeof notifications]}
                                                onChange={() => handleToggle(item.id as keyof typeof notifications)}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN (Integrations & Loyalty) */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {/* 2. Integration Config */}
                        <section className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-[#e6dbdd] dark:border-[#3d2b2e] overflow-hidden">
                            <div className="px-6 py-4 border-b border-[#e6dbdd] dark:border-[#3d2b2e] flex items-center gap-3 bg-white dark:bg-surface-dark">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <span className="material-symbols-outlined">integration_instructions</span>
                                </div>
                                <h2 className="text-lg font-bold text-[#181112] dark:text-white">API Integrations</h2>
                            </div>
                            <div className="p-6 space-y-6">
                                {/* Razorpay */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-semibold text-[#181112] dark:text-gray-200 flex items-center gap-2">
                                            Razorpay Keys
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 border border-green-200">ACTIVE</span>
                                        </label>
                                        <button className="text-xs text-primary hover:underline">Regenerate</button>
                                    </div>
                                    <div className="relative">
                                        <input className="w-full bg-[#f8f6f6] dark:bg-background-dark border border-[#e6dbdd] dark:border-[#3d2b2e] rounded-lg px-4 py-2.5 text-sm text-[#181112] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="password" value="rzp_test_5s8d7f6g5h4j3k" readOnly />
                                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#896168] hover:text-primary dark:text-gray-400">
                                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <input className="w-full bg-[#f8f6f6] dark:bg-background-dark border border-[#e6dbdd] dark:border-[#3d2b2e] rounded-lg px-4 py-2.5 text-sm text-[#181112] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="password" value="************************" readOnly />
                                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#896168] hover:text-primary dark:text-gray-400">
                                            <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="h-px bg-[#e6dbdd] dark:bg-[#3d2b2e] w-full"></div>
                                {/* WhatsApp */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-semibold text-[#181112] dark:text-gray-200 flex items-center gap-2">
                                            WhatsApp Business API
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input className="w-full bg-[#f8f6f6] dark:bg-background-dark border border-[#e6dbdd] dark:border-[#3d2b2e] rounded-lg px-4 py-2.5 text-sm text-[#181112] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="password" defaultValue="EAAG..." />
                                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#896168] hover:text-primary dark:text-gray-400">
                                            <span className="material-symbols-outlined text-[18px]">visibility_off</span>
                                        </button>
                                    </div>
                                    <p className="text-xs text-[#896168] dark:text-gray-400">Used for order updates and shipping notifications.</p>
                                </div>
                            </div>
                        </section>

                        {/* 3. Loyalty & Wallet */}
                        <section className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-[#e6dbdd] dark:border-[#3d2b2e] overflow-hidden">
                            <div className="px-6 py-4 border-b border-[#e6dbdd] dark:border-[#3d2b2e] flex items-center gap-3 bg-white dark:bg-surface-dark">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <span className="material-symbols-outlined">loyalty</span>
                                </div>
                                <h2 className="text-lg font-bold text-[#181112] dark:text-white">Loyalty & Wallet</h2>
                            </div>
                            <div className="p-6 space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-[#896168] dark:text-gray-400">Points per ₹1000</label>
                                        <input className="w-full bg-[#f8f6f6] dark:bg-background-dark border border-[#e6dbdd] dark:border-[#3d2b2e] rounded-lg px-3 py-2 text-sm font-medium text-[#181112] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="number" defaultValue="10" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-[#896168] dark:text-gray-400">Referral Bonus</label>
                                        <input className="w-full bg-[#f8f6f6] dark:bg-background-dark border border-[#e6dbdd] dark:border-[#3d2b2e] rounded-lg px-3 py-2 text-sm font-medium text-[#181112] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="number" defaultValue="50" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-[#896168] dark:text-gray-400">Wallet Expiration Rule</label>
                                    <div className="relative">
                                        <select className="w-full bg-[#f8f6f6] dark:bg-background-dark border border-[#e6dbdd] dark:border-[#3d2b2e] rounded-lg px-3 py-2 text-sm text-[#181112] dark:text-white appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer" defaultValue="6 Months from credit">
                                            <option>3 Months from credit</option>
                                            <option>6 Months from credit</option>
                                            <option>1 Year from credit</option>
                                            <option>Never Expire</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#896168] dark:text-gray-400">
                                            <span className="material-symbols-outlined text-[20px]">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-sm mt-0.5">info</span>
                                        <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">Changes to loyalty points will only affect future transactions. Existing wallet balances remain unchanged.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Footer / Meta */}
                <div className="max-w-7xl mx-auto w-full pt-6 pb-12 border-t border-[#e6dbdd] dark:border-[#3d2b2e] flex flex-col md:flex-row justify-between items-center text-sm text-[#896168] dark:text-gray-500">
                    <p>© 2024 Janki Design Admin Panel. All rights reserved.</p>
                    <div className="flex gap-4 mt-2 md:mt-0">
                        <Link href="#" className="hover:text-primary transition-colors">Documentation</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Support</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
