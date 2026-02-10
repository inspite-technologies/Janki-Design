import React from 'react';

export default function BroadcastPage() {
    return (
        <div className="flex flex-col h-full bg-[#FDFBF7] dark:bg-[#1a050a] font-sans text-gray-800 dark:text-gray-100 overflow-hidden">
            {/* Custom Header for Broadcast Module */}
            <nav className="bg-[#6B0F2A] h-16 flex items-center justify-between px-6 shadow-lg z-40 shrink-0">
                <div className="flex items-center gap-4">
                    <button className="text-[#FFD700] hover:text-white transition-colors lg:hidden">
                        <span className="material-symbols-outlined text-3xl">menu</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="text-[#FFD700]">
                            <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C13.5 4.5 15 7.5 15 10C15 13 13.5 15 12 16C10.5 15 9 13 9 10C9 7.5 10.5 4.5 12 2Z"></path>
                                <path d="M16 8C17.5 9 20 11 20 13C20 15 18 17 16 17C14 17 13 15 14 12C14.5 10 15.5 8.5 16 8Z"></path>
                                <path d="M8 8C6.5 9 4 11 4 13C4 15 6 17 8 17C10 17 11 15 10 12C9.5 10 8.5 8.5 8 8Z"></path>
                            </svg>
                        </div>
                        <h1 className="text-[#FFD700] font-serif font-bold text-2xl tracking-wide">Janki <span className="text-white text-sm font-sans font-light tracking-widest uppercase ml-1">Design</span></h1>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center bg-[#8a1c3b] rounded-full px-4 py-1.5 border border-white/10">
                        <span className="material-symbols-outlined text-[#FFD700] text-sm mr-2">whatsapp</span>
                        <span className="text-xs text-white">Status: Connected (+91 98765-XXXXX)</span>
                    </div>
                    <button className="text-white/80 hover:text-[#FFD700] transition relative">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-0 right-0 w-2 h-2 bg-[#FFD700] rounded-full"></span>
                    </button>
                    <div className="w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center text-[#6B0F2A] font-bold shadow-md">
                        JD
                    </div>
                </div>
            </nav>

            <div className="flex flex-1 overflow-hidden">
                {/* Inner Sidebar */}
                <aside className="w-64 bg-white dark:bg-[#2d0814] border-r border-gray-200 dark:border-[#8a1c3b]/30 hidden lg:flex flex-col py-6 shadow-sm overflow-y-auto">
                    <div className="px-6 mb-8">
                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Communication</p>
                        <ul className="space-y-1">
                            <li>
                                <a className="flex items-center gap-3 px-4 py-3 bg-[#6B0F2A]/10 dark:bg-[#6B0F2A]/30 text-[#6B0F2A] dark:text-[#FFD700] rounded-lg font-medium border-l-4 border-[#6B0F2A] dark:border-[#FFD700]" href="#">
                                    <span className="material-symbols-outlined">chat</span>
                                    WhatsApp Center
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#6B0F2A]/20 rounded-lg transition-colors" href="#">
                                    <span className="material-symbols-outlined">mail</span>
                                    Email Campaigns
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#6B0F2A]/20 rounded-lg transition-colors" href="#">
                                    <span className="material-symbols-outlined">sms</span>
                                    SMS Broadcast
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="px-6">
                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">History &amp; Analytics</p>
                        <ul className="space-y-1">
                            <li>
                                <a className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#6B0F2A]/20 rounded-lg transition-colors" href="#">
                                    <span className="material-symbols-outlined">history</span>
                                    Message History
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#6B0F2A]/20 rounded-lg transition-colors" href="#">
                                    <span className="material-symbols-outlined">analytics</span>
                                    Delivery Reports
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 dark:bg-[#1a050a]/50">
                    <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-[#6B0F2A] dark:text-[#FFD700] mb-1">WhatsApp Automation</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Manage automated triggers and broadcast templates.</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="bg-white dark:bg-[#2d0814] text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-[#6B0F2A]/40 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#6B0F2A]/20 transition shadow-sm flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">history</span>
                                View History
                            </button>
                            <button className="bg-[#6B0F2A] hover:bg-[#8a1c3b] text-[#FFD700] px-4 py-2 rounded-lg text-sm font-medium transition shadow-md flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">add</span>
                                New Broadcast
                            </button>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full pb-20">
                        {/* Triggers Column */}
                        <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-4">
                            <div className="bg-white dark:bg-[#2d0814] rounded-xl shadow-sm border border-gray-200 dark:border-[#6B0F2A]/20 overflow-hidden flex flex-col h-[calc(100vh-240px)] min-h-[500px]">
                                <div className="p-4 border-b border-gray-100 dark:border-[#6B0F2A]/20 bg-gray-50/50 dark:bg-[#6B0F2A]/5">
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Automation Triggers</h3>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-lg">search</span>
                                        <input className="w-full pl-9 pr-4 py-2 text-sm border-gray-200 dark:border-[#6B0F2A]/30 rounded-lg bg-white dark:bg-[#1a050a] text-gray-700 dark:text-gray-300 focus:ring-[#6B0F2A] focus:border-[#6B0F2A]" placeholder="Search triggers..." type="text" />
                                    </div>
                                </div>
                                <div className="overflow-y-auto flex-1 p-2 space-y-1">
                                    <div className="p-3 rounded-lg bg-[#6B0F2A]/5 border border-[#6B0F2A]/20 dark:bg-[#6B0F2A]/20 dark:border-[#6B0F2A]/40 cursor-pointer transition-all">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-semibold text-[#6B0F2A] dark:text-[#FFD700] text-sm">Order Placed</h4>
                                            <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] rounded-full uppercase font-bold tracking-wider">Active</span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">Hi {'{{name}}'}, thanks for your order...</p>
                                        <div className="mt-2 flex items-center gap-2 text-[10px] text-gray-400 dark:text-gray-500">
                                            <span className="material-symbols-outlined text-[12px]">schedule</span> Instant
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#6B0F2A]/10 border border-transparent cursor-pointer transition-all">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-medium text-gray-700 dark:text-gray-300 text-sm">Ready for Delivery</h4>
                                            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[10px] rounded-full uppercase font-bold tracking-wider">Draft</span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">Your order # {'{{order_id}}'} is packed...</p>
                                    </div>
                                    <div className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#6B0F2A]/10 border border-transparent cursor-pointer transition-all">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-medium text-gray-700 dark:text-gray-300 text-sm">Payment Reminder</h4>
                                            <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] rounded-full uppercase font-bold tracking-wider">Active</span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">Gentle reminder about the pending...</p>
                                    </div>
                                    <div className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#6B0F2A]/10 border border-transparent cursor-pointer transition-all">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-medium text-gray-700 dark:text-gray-300 text-sm">Review Request</h4>
                                            <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-[10px] rounded-full uppercase font-bold tracking-wider">Paused</span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">We'd love to hear your feedback...</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Template Editor Column */}
                        <div className="lg:col-span-5 xl:col-span-6 flex flex-col gap-4">
                            <div className="bg-white dark:bg-[#2d0814] rounded-xl shadow-sm border border-gray-200 dark:border-[#6B0F2A]/20 p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-serif font-semibold text-lg text-[#6B0F2A] dark:text-[#FFD700]">Edit Template: Order Placed</h3>
                                    <div className="flex gap-2">
                                        <button className="text-gray-400 hover:text-[#6B0F2A] dark:hover:text-[#FFD700] transition">
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                        <button className="text-gray-400 hover:text-[#6B0F2A] dark:hover:text-[#FFD700] transition">
                                            <span className="material-symbols-outlined">content_copy</span>
                                        </button>
                                    </div>
                                </div>
                                <form className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Header (Optional)</label>
                                        <div className="flex items-center gap-4">
                                            <select className="block w-full rounded-md border-gray-300 dark:border-[#6B0F2A]/30 shadow-sm focus:border-[#6B0F2A] focus:ring focus:ring-[#6B0F2A] focus:ring-opacity-50 text-sm bg-white dark:bg-[#1a050a] dark:text-gray-200 p-2.5">
                                                <option>Image</option>
                                                <option>Text</option>
                                                <option>Video</option>
                                                <option>Document</option>
                                                <option>None</option>
                                            </select>
                                            <button className="text-[#6B0F2A] dark:text-[#FFD700] hover:underline text-sm font-medium whitespace-nowrap" type="button">Upload Media</button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Message Body</label>
                                        <textarea className="block w-full rounded-md border-gray-300 dark:border-[#6B0F2A]/30 shadow-sm focus:border-[#6B0F2A] focus:ring focus:ring-[#6B0F2A] focus:ring-opacity-50 text-sm bg-white dark:bg-[#1a050a] dark:text-gray-200 font-mono p-3" placeholder="Enter your message here..." rows={6} defaultValue={`Hello {{name}}! 
Thank you for choosing Janki Design. We have successfully received your order #{{order_id}}.
We will notify you once your items are ready for dispatch.
Thank you,
Team Janki Design 🌸`} />
                                        <div className="mt-2 flex gap-2 flex-wrap">
                                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">{'{{name}}'}</span>
                                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">{'{{order_id}}'}</span>
                                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">{'{{date}}'}</span>
                                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">{'{{amount}}'}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Footer (Optional)</label>
                                        <input className="block w-full rounded-md border-gray-300 dark:border-[#6B0F2A]/30 shadow-sm focus:border-[#6B0F2A] focus:ring focus:ring-[#6B0F2A] focus:ring-opacity-50 text-sm bg-white dark:bg-[#1a050a] dark:text-gray-200 p-2.5" placeholder="e.g. Reply STOP to unsubscribe" type="text" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Buttons (Optional)</label>
                                        <div className="space-y-2">
                                            <div className="flex gap-2">
                                                <input className="block w-full rounded-md border-gray-300 dark:border-[#6B0F2A]/30 shadow-sm focus:border-[#6B0F2A] focus:ring focus:ring-[#6B0F2A] focus:ring-opacity-50 text-sm bg-white dark:bg-[#1a050a] dark:text-gray-200 p-2.5" type="text" defaultValue="Visit Website" />
                                                <select className="w-32 rounded-md border-gray-300 dark:border-[#6B0F2A]/30 text-sm bg-white dark:bg-[#1a050a] dark:text-gray-200 p-2.5">
                                                    <option>URL</option>
                                                    <option>Call</option>
                                                    <option>Quick Reply</option>
                                                </select>
                                            </div>
                                            <button className="flex items-center gap-1 text-sm text-[#6B0F2A] dark:text-[#FFD700] font-medium hover:underline" type="button">
                                                <span className="material-symbols-outlined text-sm">add_circle</span> Add Button
                                            </button>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-gray-100 dark:border-[#6B0F2A]/20 flex justify-end gap-3">
                                        <button className="px-4 py-2 bg-white dark:bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#6B0F2A]/10 transition" type="button">Discard</button>
                                        <button className="px-6 py-2 bg-[#6B0F2A] text-[#FFD700] rounded-lg text-sm font-bold shadow-md hover:bg-[#8a1c3b] transition flex items-center gap-2" type="button">
                                            <span className="material-symbols-outlined text-sm">save</span>
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Live Preview Column */}
                        <div className="lg:col-span-3 xl:col-span-3 flex justify-center items-start pt-4">
                            <div className="relative w-[300px] h-[600px] bg-gray-900 rounded-[2.5rem] shadow-2xl border-4 border-gray-800 overflow-hidden">
                                <div className="absolute top-0 w-full h-8 bg-black/20 z-20 flex items-center justify-between px-6 pt-2">
                                    <span className="text-[10px] text-white font-medium">9:41</span>
                                    <div className="flex gap-1">
                                        <span className="w-3 h-3 text-white material-symbols-outlined text-[10px]">signal_cellular_alt</span>
                                        <span className="w-3 h-3 text-white material-symbols-outlined text-[10px]">wifi</span>
                                        <span className="w-3 h-3 text-white material-symbols-outlined text-[10px]">battery_full</span>
                                    </div>
                                </div>
                                <div className="absolute top-0 w-full h-20 bg-[#075E54] z-10 pt-8 px-4 flex items-center gap-2 shadow-md">
                                    <span className="material-symbols-outlined text-white text-lg">arrow_back</span>
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
                                        <div className="text-[#6B0F2A] w-full h-full flex items-center justify-center font-bold text-xs bg-[#FFD700]">JD</div>
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="text-white text-sm font-medium leading-tight">Janki Design</h5>
                                        <p className="text-white/70 text-[10px]">Business Account</p>
                                    </div>
                                    <span className="material-symbols-outlined text-white text-lg">videocam</span>
                                    <span className="material-symbols-outlined text-white text-lg ml-2">call</span>
                                    <span className="material-symbols-outlined text-white text-lg ml-2">more_vert</span>
                                </div>
                                <div className="w-full h-full bg-[#E5DDD5] pt-24 px-3 overflow-y-auto pb-4 relative">
                                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'100\\' height=\\'100\\' viewBox=\\'0 0 100 100\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\\' fill=\\'%239C92AC\\' fill-opacity=\\'0.4\\' fill-rule=\\'evenodd\\'/%3E%3C/svg%3E')" }}></div>
                                    <div className="flex justify-center mb-4">
                                        <span className="bg-[#E1F3FB] text-[#556976] text-[10px] px-2 py-1 rounded shadow-sm">Today</span>
                                    </div>
                                    <div className="bg-white rounded-lg p-2 max-w-[90%] shadow-sm relative mb-2">
                                        <div className="w-full h-32 bg-gray-200 rounded mb-2 overflow-hidden relative">
                                            <img alt="New collection showcase abstract" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtYx9OrWmb5LZxxuMo5Uslk_nhCwkHQaUuOTLQWfjFYDlKxCH8QoAI1hFidrzy1SDHMMhOsdmvCcke1atqA56MVqRRptAecfQPLwnZYWwDEJMuyehDJEhFzZSvO9zBph84MbU4-snUlWzz4vmLni7jsZ6F2L-HWdwIZF6Asf68G1F0a1yHowPzb6nt81AW5UfQyWZWtSz5V5ZUsYWPCAkCJe70b1Ccsi3Go9yKrWxuGVWCUfkz0NarBERyD-FhH5uit9uwQYq6AIQ" />
                                            <div className="absolute inset-0 bg-[#6B0F2A]/20"></div>
                                        </div>
                                        <p className="text-[11px] text-gray-800 leading-relaxed font-sans">
                                            Hello <strong>Priya</strong>! <br /><br />
                                            Thank you for choosing Janki Design. We have successfully received your order #<strong>ORD-2023-889</strong>.<br /><br />
                                            We will notify you once your items are ready for dispatch.<br /><br />
                                            Thank you,<br />
                                            Team Janki Design 🌸
                                        </p>
                                        <div className="flex justify-end items-center gap-1 mt-1">
                                            <span className="text-[9px] text-gray-400">10:45 AM</span>
                                            <span className="material-symbols-outlined text-[10px] text-[#53bdeb]">done_all</span>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg py-2 px-4 shadow-sm text-center cursor-pointer active:bg-gray-50">
                                        <span className="text-[#00A5F4] text-xs font-medium flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined text-sm">open_in_new</span> Visit Website
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-8 text-xs text-gray-400 font-medium">Live Preview</div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
