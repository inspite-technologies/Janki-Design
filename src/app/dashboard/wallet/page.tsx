"use client";

import React from 'react';

export default function WalletPage() {
    return (
        <div className="flex flex-col h-full bg-[#F9FAFB] dark:bg-[#1F2937] font-sans text-[#1F2937] dark:text-[#F3F4F6] overflow-hidden">
            {/* Custom Header */}
            <header className="h-16 bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8 shadow-sm z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <button className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <h2 className="text-xl font-serif font-semibold text-[#701A31] dark:text-[#FDE047]">Wallet &amp; Rewards Management</h2>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <span className="material-symbols-outlined text-gray-400 absolute left-3 top-2.5">search</span>
                        <input
                            className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#701A31] dark:focus:ring-[#FDE047] text-sm w-64 text-gray-800 dark:text-gray-200"
                            placeholder="Search users..."
                            type="text"
                        />
                    </div>
                    <button className="p-2 text-gray-500 hover:text-[#701A31] dark:hover:text-[#FDE047] transition-colors relative">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-8 relative">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Credits */}
                    <div className="bg-white dark:bg-[#111827] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-start justify-between relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <span className="material-symbols-outlined text-9xl text-[#701A31] dark:text-[#FDE047] transform rotate-12">account_balance_wallet</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Credits Outstanding</p>
                            <h3 className="text-3xl font-serif font-bold text-[#701A31] dark:text-white mt-2">$124,592.00</h3>
                            <p className="text-sm text-green-600 mt-2 flex items-center">
                                <span className="material-symbols-outlined text-sm mr-1">trending_up</span> +12% from last month
                            </p>
                        </div>
                        <div className="p-3 bg-[#701A31]/10 dark:bg-[#FDE047]/20 rounded-lg">
                            <span className="material-symbols-outlined text-[#701A31] dark:text-[#FDE047] text-2xl">payments</span>
                        </div>
                    </div>

                    {/* Active Referrers */}
                    <div className="bg-white dark:bg-[#111827] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Active Referrers</p>
                                <h3 className="text-3xl font-serif font-bold text-[#701A31] dark:text-white mt-2">1,842</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Users with &gt;1 referral</p>
                            </div>
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl">people_outline</span>
                            </div>
                        </div>
                    </div>

                    {/* Reward Rate */}
                    <div className="bg-gradient-to-br from-[#701A31] to-[#501222] rounded-xl p-6 shadow-lg text-white relative overflow-hidden">
                        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#FDE047]/20 rounded-full blur-2xl"></div>
                        <div className="relative z-10">
                            <p className="text-sm font-medium text-white/80 uppercase tracking-wide">Current Reward Rate</p>
                            <div className="mt-2 flex items-baseline gap-2">
                                <h3 className="text-3xl font-serif font-bold text-[#FDE047]">10 pts</h3>
                                <span className="text-white/80">per $100 spent</span>
                            </div>
                            <button className="mt-4 px-4 py-2 bg-[#FDE047] text-[#701A31] text-sm font-semibold rounded-lg hover:bg-white transition-colors shadow-md">
                                Configure Rules
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
                    {/* Left Column: Manual Adjust & Activity */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Manual Adjustment */}
                        <div className="bg-white dark:bg-[#111827] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <h3 className="font-serif font-bold text-lg text-gray-800 dark:text-white">Manual Adjustment</h3>
                            </div>
                            <div className="p-6">
                                <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customer Email</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-sm">email</span>
                                            <input
                                                className="pl-9 w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:ring-[#701A31] dark:focus:ring-[#FDE047] focus:border-[#701A31] dark:focus:border-[#FDE047] h-10"
                                                placeholder="search@customer.com"
                                                type="email"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount ($)</label>
                                        <input
                                            className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:ring-[#701A31] dark:focus:ring-[#FDE047] focus:border-[#701A31] dark:focus:border-[#FDE047] h-10"
                                            placeholder="0.00"
                                            type="number"
                                        />
                                    </div>
                                    <div className="flex gap-2 h-10">
                                        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 rounded-lg text-sm font-medium transition-colors shadow-sm" type="button">Credit</button>
                                        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 rounded-lg text-sm font-medium transition-colors shadow-sm" type="button">Debit</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white dark:bg-[#111827] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                                <h3 className="font-serif font-bold text-lg text-gray-800 dark:text-white">Recent Wallet Activity</h3>
                                <button className="text-sm text-[#701A31] dark:text-[#FDE047] font-medium hover:underline">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                                            <th className="px-6 py-4">Customer</th>
                                            <th className="px-6 py-4">Type</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4 text-right">Amount</th>
                                            <th className="px-6 py-4 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {/* Activity Rows */}
                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-[#701A31]/10 dark:bg-[#FDE047]/20 text-[#701A31] dark:text-[#FDE047] flex items-center justify-center text-xs font-bold mr-3">JD</div>
                                                    <div>
                                                        <p className="font-medium text-sm text-gray-900 dark:text-gray-100">Jane Doe</p>
                                                        <p className="text-xs text-gray-500">jane@example.com</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                                                    Referral Bonus
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Oct 24, 2023</td>
                                            <td className="px-6 py-4 text-right font-medium text-green-600 dark:text-green-400">+$50.00</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="material-symbols-outlined text-green-500 text-sm" title="Completed">check_circle</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3">MS</div>
                                                    <div>
                                                        <p className="font-medium text-sm text-gray-900 dark:text-gray-100">Michael Smith</p>
                                                        <p className="text-xs text-gray-500">mike.s@example.com</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                                                    Purchase Reward
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Oct 23, 2023</td>
                                            <td className="px-6 py-4 text-right font-medium text-green-600 dark:text-green-400">+$12.50</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="material-symbols-outlined text-green-500 text-sm" title="Completed">check_circle</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold mr-3">RJ</div>
                                                    <div>
                                                        <p className="font-medium text-sm text-gray-900 dark:text-gray-100">Robert Johnson</p>
                                                        <p className="text-xs text-gray-500">rob.j@example.com</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                    Wallet Usage
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Oct 22, 2023</td>
                                            <td className="px-6 py-4 text-right font-medium text-red-600 dark:text-red-400">-$85.00</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="material-symbols-outlined text-green-500 text-sm" title="Completed">check_circle</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold mr-3">AL</div>
                                                    <div>
                                                        <p className="font-medium text-sm text-gray-900 dark:text-gray-100">Alice Lee</p>
                                                        <p className="text-xs text-gray-500">alice@example.com</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                    Manual Credit
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Oct 22, 2023</td>
                                            <td className="px-6 py-4 text-right font-medium text-green-600 dark:text-green-400">+$200.00</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="material-symbols-outlined text-gray-400 text-sm" title="Pending">access_time</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Top Referrers & Config */}
                    <div className="space-y-8">
                        {/* Top Referrers */}
                        <div className="bg-white dark:bg-[#111827] rounded-xl shadow-lg border border-[#D4AF37]/20 dark:border-[#D4AF37]/10 overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FDE047] to-transparent"></div>
                            <div className="p-6">
                                <h3 className="font-serif font-bold text-lg text-[#701A31] dark:text-[#FDE047] mb-1">Top Referrers</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Highest performing advocates this month</p>
                                <div className="space-y-5">
                                    {/* User 1 */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img alt="User" className="w-12 h-12 rounded-full border-2 border-[#FDE047]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA6O73xdvLXa6pdnNZMQIp81s67HfvtHNEBSIB7rt0ecLQ_TJvsjiwYMRiB4PXHfcO98zVkN0jFKvdB8a7bdsKxW7ZLu7aW1h1d3LnLmizJeHYj149nRWJBWwRJAXmJcumwYL-Y_oRT8lhItP0_IqwH0q4lQQzXSwUVkFLbkdYPOIsB6LGOQ1MJO-1rNrDSQxCoOqSQV02jw6TR7m0gxwsI_b1Dfvuo26zjpgCrDrpJ_0CY6f0nM4aKNldzvpcXRjtJRMgWHKI5MQ" />
                                            <div className="absolute -top-2 -right-1 bg-[#FDE047] text-[#701A31] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">1</div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 dark:text-white">Sarah Wilson</h4>
                                            <p className="text-xs text-gray-500">42 referrals</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="block font-bold text-[#701A31] dark:text-[#FDE047]">2,100 pts</span>
                                        </div>
                                    </div>
                                    {/* User 2 */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img alt="User" className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqwXsV9Z54blQMyjPzpaKrY6mD0sMevYPdzL9nwcPwLdCVXvlmTG2Zxrdj-8zKfFJV7Kh9er2dH84qRbeVP61OV7QeIYfKGq9BvebEEC38ss9qTGoH02LyQXReDsziBj-oUYo8YWI0qJ_Eu2HPFkTRdNRoansS91MwJ_rhh9xZnusM10Rer5eJt63nx7Gj7YYKSIqzU_W7AfVKBYaqZzhvViMEKb5rZq8e58dPK8wwhcGb-ZMNUqeCT7VIOkxvQZ4ynoxinrlVCL4" />
                                            <div className="absolute -top-2 -right-1 bg-gray-300 text-gray-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">2</div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 dark:text-white">David Kim</h4>
                                            <p className="text-xs text-gray-500">38 referrals</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="block font-bold text-gray-700 dark:text-gray-300">1,900 pts</span>
                                        </div>
                                    </div>
                                    {/* User 3 */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img alt="User" className="w-12 h-12 rounded-full border-2 border-amber-700 dark:border-amber-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKgUTa-KijTz2IbOTapMIVq3pokKSl2nzg0Kj-ldthjg0iRhcDiCgOlf7NGHXa6qmQEV7pbRdrcQJ2P_UOtb7TtHB2zYuXynLrcM9FclLrRv4xNlSDWtEohjKEXD4Dsmjz8Qy0Xl3bN6UNHDmIXW2lkGgQSEdzJ18mV-85wXLLbXL5LXQmzjiQ1H8sRi3ygSj5OMOJCt6c1XVl9QbHALambTv239yESnWdtnnBizSkqqLijeHZaXJSPylUxy1jyAOEGfir3X79yh4" />
                                            <div className="absolute -top-2 -right-1 bg-amber-700 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">3</div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 dark:text-white">Elena Rodriguez</h4>
                                            <p className="text-xs text-gray-500">25 referrals</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="block font-bold text-gray-700 dark:text-gray-300">1,250 pts</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full mt-6 py-2 text-sm text-[#701A31] dark:text-[#FDE047] border border-[#701A31]/20 dark:border-[#FDE047]/20 rounded-lg hover:bg-[#701A31] hover:text-white dark:hover:bg-[#FDE047] dark:hover:text-[#701A31] transition-colors">
                                    View Full Leaderboard
                                </button>
                            </div>
                        </div>

                        {/* Quick Configuration */}
                        <div className="bg-white dark:bg-[#111827] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                            <h3 className="font-serif font-bold text-lg text-gray-800 dark:text-white mb-4">Quick Configuration</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Points per $100</label>
                                        <span className="text-sm font-bold text-[#701A31] dark:text-[#FDE047]">10 pts</span>
                                    </div>
                                    <input className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#701A31] dark:accent-[#FDE047]" max="50" min="1" type="range" defaultValue="10" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Referral Bonus</label>
                                        <span className="text-sm font-bold text-[#701A31] dark:text-[#FDE047]">$25.00</span>
                                    </div>
                                    <input className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#701A31] dark:accent-[#FDE047]" max="100" min="5" type="range" defaultValue="25" />
                                </div>
                                <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                                    <label className="flex items-center cursor-pointer">
                                        <input defaultChecked className="form-checkbox text-[#701A31] dark:text-[#FDE047] rounded" type="checkbox" />
                                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Enable Birthday Rewards</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
