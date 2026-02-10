"use client";

import React, { useState } from 'react';

export default function ReportsPage() {
    const [revenuePeriod, setRevenuePeriod] = useState<'daily' | 'monthly'>('monthly');

    return (
        <div className="flex flex-col h-full bg-[#f8f8f5] dark:bg-[#221e10] font-sans text-[#181611] dark:text-gray-100 overflow-hidden transition-colors duration-200">
            {/* Custom Header for Reports Hub */}
            <header className="w-full bg-white dark:bg-[#1e1b15] border-b border-[#e6e3db] dark:border-gray-800 px-6 py-5 flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0 z-10">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <h1 className="text-[#181611] dark:text-white text-2xl md:text-3xl font-extrabold tracking-tight">Reports Hub</h1>
                    </div>
                    <p className="text-[#8a8060] dark:text-gray-400 text-sm md:text-base">Centralized analytics and business intelligence.</p>
                </div>
                <div className="flex items-center gap-3">
                    <label className="relative block min-w-[200px]">
                        <span className="sr-only">Date Range</span>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-400 text-lg">calendar_month</span>
                        </div>
                        <select className="block w-full pl-10 pr-10 py-2.5 text-sm border border-[#e6e3db] dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-[#f4c025]/50 focus:border-[#f4c025] appearance-none cursor-pointer">
                            <option>Last 7 Days</option>
                            <option defaultValue="selected">Last 30 Days</option>
                            <option>This Quarter</option>
                            <option>This Year</option>
                            <option>Custom Range</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-400 text-lg">expand_more</span>
                        </div>
                    </label>
                    <button className="bg-[#181611] dark:bg-[#f4c025] text-white dark:text-[#181611] hover:bg-[#181611]/80 dark:hover:bg-[#f4c025]/90 px-4 py-2.5 rounded-lg text-sm font-semibold transition flex items-center gap-2 shadow-sm">
                        <span className="material-symbols-outlined text-lg">download</span>
                        Export All
                    </button>
                </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-8">
                {/* Quick Stats Ribbon */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
                    {/* Stat 1: Total Revenue (Switchable) */}
                    <div className="bg-white dark:bg-[#1e1b15] rounded-xl p-5 border border-[#e6e3db] dark:border-gray-800 shadow-sm flex flex-col justify-between relative overflow-hidden group lg:col-span-1">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-4xl text-[#f4c025]">payments</span>
                        </div>
                        <div className="flex flex-col gap-1 z-10">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Revenue</p>
                                <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded p-0.5">
                                    <button
                                        onClick={() => setRevenuePeriod('daily')}
                                        className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${revenuePeriod === 'daily' ? 'bg-white dark:bg-gray-700 shadow-sm text-[#181611] dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                    >
                                        D
                                    </button>
                                    <button
                                        onClick={() => setRevenuePeriod('monthly')}
                                        className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${revenuePeriod === 'monthly' ? 'bg-white dark:bg-gray-700 shadow-sm text-[#181611] dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                    >
                                        M
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-[#181611] dark:text-white text-2xl font-bold tracking-tight">
                                    {revenuePeriod === 'daily' ? '₹ 42,450' : '₹ 12,45,000'}
                                </h3>
                                <span className="text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded text-xs font-bold">+12%</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{revenuePeriod === 'daily' ? "Today's earning" : "This Month's earning"}</p>
                        </div>
                    </div>

                    {/* Stat 2: Total Stitching Revenue */}
                    <div className="bg-white dark:bg-[#1e1b15] rounded-xl p-5 border border-[#e6e3db] dark:border-gray-800 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-4xl text-blue-500">straighten</span>
                        </div>
                        <div className="flex flex-col gap-1 z-10">
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Stitching Revenue</p>
                            <div className="flex flex-col">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-xs text-gray-400">Daily</span>
                                    <span className="text-[#181611] dark:text-white font-bold">₹ 15,200</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-xs text-gray-400">Monthly</span>
                                    <span className="text-[#181611] dark:text-white font-bold">₹ 4,50,000</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stat 3: Total Boutique Product Revenue */}
                    <div className="bg-white dark:bg-[#1e1b15] rounded-xl p-5 border border-[#e6e3db] dark:border-gray-800 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-4xl text-orange-500">checkroom</span>
                        </div>
                        <div className="flex flex-col gap-1 z-10">
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Boutique Revenue</p>
                            <div className="flex flex-col">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-xs text-gray-400">Daily</span>
                                    <span className="text-[#181611] dark:text-white font-bold">₹ 27,250</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-xs text-gray-400">Monthly</span>
                                    <span className="text-[#181611] dark:text-white font-bold">₹ 7,95,000</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stat 4: Pending Stitching */}
                    <div className="bg-white dark:bg-[#1e1b15] rounded-xl p-5 border border-[#e6e3db] dark:border-gray-800 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-4xl text-purple-500">pending_actions</span>
                        </div>
                        <div className="flex flex-col gap-1 z-10">
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pending Stitching</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-[#181611] dark:text-white text-2xl font-bold tracking-tight">34</h3>
                                <span className="text-xs text-gray-500">Orders</span>
                            </div>
                            <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">Needs Attention</span>
                        </div>
                    </div>

                    {/* Stat 5: Pending Product Orders */}
                    <div className="bg-white dark:bg-[#1e1b15] rounded-xl p-5 border border-[#e6e3db] dark:border-gray-800 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-4xl text-red-500">shopping_bag</span>
                        </div>
                        <div className="flex flex-col gap-1 z-10">
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pending Products</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-[#181611] dark:text-white text-2xl font-bold tracking-tight">12</h3>
                                <span className="text-xs text-gray-500">Orders</span>
                            </div>
                            <span className="text-red-600 dark:text-red-400 text-xs font-bold">Dispatch Now</span>
                        </div>
                    </div>
                </section>

                {/* Section: Sales & Revenue */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-1 h-6 bg-[#f4c025] rounded-full"></span>
                        <h2 className="text-[#181611] dark:text-white text-xl font-bold">Sales &amp; Revenue Details</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white dark:bg-[#1e1b15] rounded-xl border border-[#e6e3db] dark:border-gray-800 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
                            <div className="flex justify-between items-start">
                                <div className="bg-[#f4c025]/10 p-3 rounded-lg text-[#f4c025] dark:text-[#f4c025]">
                                    <span className="material-symbols-outlined text-2xl">bar_chart</span>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                    <span className="material-symbols-outlined text-xl">more_horiz</span>
                                </button>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-[#181611] dark:text-white font-bold text-lg mb-1">Daily Sales Breakdown</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Detailed breakdown of transactions, split by stitching vs retail, and payment modes.</p>
                            </div>
                            <div className="flex items-center gap-3 mt-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <button className="flex-1 bg-[#181611] dark:bg-[#f4c025] text-white dark:text-[#181611] hover:bg-[#181611]/80 dark:hover:bg-[#f4c025]/90 px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm hover:shadow">Generate</button>
                                <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition" title="Download PDF">
                                    <span className="material-symbols-outlined">picture_as_pdf</span>
                                </button>
                                <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition" title="Export CSV">
                                    <span className="material-symbols-outlined">table_view</span>
                                </button>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white dark:bg-[#1e1b15] rounded-xl border border-[#e6e3db] dark:border-gray-800 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
                            <div className="flex justify-between items-start">
                                <div className="bg-[#f4c025]/10 p-3 rounded-lg text-[#f4c025] dark:text-[#f4c025]">
                                    <span className="material-symbols-outlined text-2xl">receipt_long</span>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                    <span className="material-symbols-outlined text-xl">more_horiz</span>
                                </button>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-[#181611] dark:text-white font-bold text-lg mb-1">GST Reports</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Tax liability summaries, collected GST from services and products, and input tax credit details.</p>
                            </div>
                            <div className="flex items-center gap-3 mt-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <button className="flex-1 bg-[#181611] dark:bg-[#f4c025] text-white dark:text-[#181611] hover:bg-[#181611]/80 dark:hover:bg-[#f4c025]/90 px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm hover:shadow">Generate</button>
                                <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition" title="Download PDF">
                                    <span className="material-symbols-outlined">picture_as_pdf</span>
                                </button>
                                <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition" title="Export CSV">
                                    <span className="material-symbols-outlined">table_view</span>
                                </button>
                            </div>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white dark:bg-[#1e1b15] rounded-xl border border-[#e6e3db] dark:border-gray-800 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
                            <div className="flex justify-between items-start">
                                <div className="bg-[#f4c025]/10 p-3 rounded-lg text-[#f4c025] dark:text-[#f4c025]">
                                    <span className="material-symbols-outlined text-2xl">credit_card</span>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                    <span className="material-symbols-outlined text-xl">more_horiz</span>
                                </button>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-[#181611] dark:text-white font-bold text-lg mb-1">Payment Modes</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Analysis of revenue share across Cash, UPI, Credit Cards, and Store Credit.</p>
                            </div>
                            <div className="flex items-center gap-3 mt-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <button className="flex-1 bg-[#181611] dark:bg-[#f4c025] text-white dark:text-[#181611] hover:bg-[#181611]/80 dark:hover:bg-[#f4c025]/90 px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm hover:shadow">Generate</button>
                                <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition" title="Download PDF">
                                    <span className="material-symbols-outlined">picture_as_pdf</span>
                                </button>
                                <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition" title="Export CSV">
                                    <span className="material-symbols-outlined">table_view</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Stitching & Production */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-1 h-6 bg-[#f4c025] rounded-full"></span>
                        <h2 className="text-[#181611] dark:text-white text-xl font-bold">Stitching &amp; Production</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white dark:bg-[#1e1b15] rounded-xl border border-[#e6e3db] dark:border-gray-800 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
                            <div className="flex justify-between items-start">
                                <div className="bg-[#f4c025]/10 p-3 rounded-lg text-[#f4c025] dark:text-[#f4c025]">
                                    <span className="material-symbols-outlined text-2xl">straighten</span>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                    <span className="material-symbols-outlined text-xl">more_horiz</span>
                                </button>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-[#181611] dark:text-white font-bold text-lg mb-1">Tailor Efficiency</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Performance metrics showing jobs completed per tailor, rework rates, and average stitching time.</p>
                            </div>
                            <div className="flex items-center gap-3 mt-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <button className="flex-1 bg-[#181611] dark:bg-[#f4c025] text-white dark:text-[#181611] hover:bg-[#181611]/80 dark:hover:bg-[#f4c025]/90 px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm hover:shadow">Generate</button>
                                <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition" title="Download PDF">
                                    <span className="material-symbols-outlined">picture_as_pdf</span>
                                </button>
                                <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition" title="Export CSV">
                                    <span className="material-symbols-outlined">table_view</span>
                                </button>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white dark:bg-[#1e1b15] rounded-xl border border-[#e6e3db] dark:border-gray-800 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
                            <div className="flex justify-between items-start">
                                <div className="bg-[#f4c025]/10 p-3 rounded-lg text-[#f4c025] dark:text-[#f4c025]">
                                    <span className="material-symbols-outlined text-2xl">timelapse</span>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                    <span className="material-symbols-outlined text-xl">more_horiz</span>
                                </button>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-[#181611] dark:text-white font-bold text-lg mb-1">Order Turnaround</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Average days from measurement to delivery. Identifies bottlenecks in production stages.</p>
                            </div>
                            <div className="flex items-center gap-3 mt-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <button className="flex-1 bg-[#181611] dark:bg-[#f4c025] text-white dark:text-[#181611] hover:bg-[#181611]/80 dark:hover:bg-[#f4c025]/90 px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm hover:shadow">Generate</button>
                                <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition" title="Download PDF">
                                    <span className="material-symbols-outlined">picture_as_pdf</span>
                                </button>
                                <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition" title="Export CSV">
                                    <span className="material-symbols-outlined">table_view</span>
                                </button>
                            </div>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white dark:bg-[#1e1b15] rounded-xl border border-[#e6e3db] dark:border-gray-800 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
                            <div className="flex justify-between items-start">
                                <div className="bg-[#f4c025]/10 p-3 rounded-lg text-[#f4c025] dark:text-[#f4c025]">
                                    <span className="material-symbols-outlined text-2xl">checkroom</span>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                    <span className="material-symbols-outlined text-xl">more_horiz</span>
                                </button>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-[#181611] dark:text-white font-bold text-lg mb-1">Category Analysis</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Insights into most stitched items (Blouse, Lehenga, Suit) by volume and revenue contribution.</p>
                            </div>
                            <div className="flex items-center gap-3 mt-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <button className="flex-1 bg-[#181611] dark:bg-[#f4c025] text-white dark:text-[#181611] hover:bg-[#181611]/80 dark:hover:bg-[#f4c025]/90 px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm hover:shadow">Generate</button>
                                <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition" title="Download PDF">
                                    <span className="material-symbols-outlined">picture_as_pdf</span>
                                </button>
                                <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition" title="Export CSV">
                                    <span className="material-symbols-outlined">table_view</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
