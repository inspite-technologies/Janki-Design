"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function GlobalSettingsPage() {
    return (
        <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark font-serif">
            <div className="max-w-6xl mx-auto px-6 py-8 md:px-12 md:py-10">
                {/* Page Header */}
                <div className="mb-10">
                    <h1 className="text-[#181112] dark:text-white text-4xl font-black leading-tight tracking-[-0.02em] mb-2 font-serif">Global Settings</h1>
                    <p className="text-[#896168] text-lg font-normal font-serif">Manage your boutique's brand profile, operations, and configurations.</p>
                </div>

                {/* Settings Content Wrapper */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left Sub-Navigation (Sticky) */}
                    <div className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-6">
                        <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-1 pb-2 lg:pb-0 border-b lg:border-b-0 border-[#e6dbdd] lg:border-r lg:border-[#e6dbdd] dark:border-[#3a1d21] pr-0 lg:pr-4">
                            <button className="flex items-center justify-start gap-3 px-4 py-3 rounded-lg w-full text-left bg-white dark:bg-[#2a1619] shadow-sm ring-1 ring-[#e6dbdd] dark:ring-[#3a1d21] text-primary font-bold border-l-4 border-primary transition-all font-serif">
                                <span className="material-symbols-outlined text-[20px]">storefront</span>
                                <span className="whitespace-nowrap">Brand Profile</span>
                            </button>
                            <button className="flex items-center justify-start gap-3 px-4 py-3 rounded-lg w-full text-left text-[#5d4044] dark:text-[#a88a8e] hover:bg-white/50 dark:hover:bg-[#2a1619]/50 transition-all font-serif">
                                <span className="material-symbols-outlined text-[20px]">business_center</span>
                                <span className="whitespace-nowrap">Business Info</span>
                            </button>
                            <button className="flex items-center justify-start gap-3 px-4 py-3 rounded-lg w-full text-left text-[#5d4044] dark:text-[#a88a8e] hover:bg-white/50 dark:hover:bg-[#2a1619]/50 transition-all font-serif">
                                <span className="material-symbols-outlined text-[20px]">content_cut</span>
                                <span className="whitespace-nowrap">Order & Stitching</span>
                            </button>
                            <button className="flex items-center justify-start gap-3 px-4 py-3 rounded-lg w-full text-left text-[#5d4044] dark:text-[#a88a8e] hover:bg-white/50 dark:hover:bg-[#2a1619]/50 transition-all font-serif">
                                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                                <span className="whitespace-nowrap">Shipping & Pickup</span>
                            </button>
                        </nav>
                    </div>

                    {/* Right Content Area */}
                    <div className="flex-1 w-full flex flex-col gap-8 pb-20">
                        {/* Card 1: Brand Identity */}
                        <section className="bg-white dark:bg-[#1a0c0e] rounded-xl shadow-sm border border-[#e6dbdd] dark:border-[#3a1d21] p-6 md:p-8">
                            <div className="flex justify-between items-center mb-6 border-b border-[#f4f0f1] dark:border-[#3a1d21] pb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#181112] dark:text-white font-serif">Brand Identity</h2>
                                    <p className="text-[#896168] text-sm mt-1 font-serif">Logo, colors, and social presence.</p>
                                </div>
                                <span className="material-symbols-outlined text-[#e6dbdd] text-4xl">palette</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="col-span-1">
                                    <label className="block text-sm font-bold text-[#181112] dark:text-[#e0e0e0] mb-2 font-serif">Brand Logo</label>
                                    <div className="border-2 border-dashed border-[#e6dbdd] dark:border-[#3a1d21] rounded-lg p-6 flex flex-col items-center justify-center text-center bg-[#fcfafa] dark:bg-[#150a0b] hover:bg-[#f8f6f6] dark:hover:bg-[#1f1012] transition-colors cursor-pointer group h-48">
                                        <div className="bg-white dark:bg-[#2a1619] p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-[#896168] text-2xl">cloud_upload</span>
                                        </div>
                                        <p className="text-sm font-medium text-[#181112] dark:text-white font-serif">Click to upload or drag and drop</p>
                                        <p className="text-xs text-[#896168] mt-1 font-serif">SVG, PNG, JPG (max. 800x400px)</p>
                                    </div>
                                </div>
                                <div className="col-span-1 flex flex-col gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-[#181112] dark:text-[#e0e0e0] mb-2 font-serif">Primary Color</label>
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full border border-[#e6dbdd] shadow-sm bg-[#bd0f2c]"></div>
                                            <input className="flex-1 bg-background-light dark:bg-[#2a1619] border border-[#e6dbdd] dark:border-[#3a1d21] rounded-lg px-4 py-2.5 text-[#181112] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm" type="text" defaultValue="#bd0f2c" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#181112] dark:text-[#e0e0e0] mb-2 font-serif">Accent Color (Gold)</label>
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full border border-[#e6dbdd] shadow-sm bg-[#D4AF37]"></div>
                                            <input className="flex-1 bg-background-light dark:bg-[#2a1619] border border-[#e6dbdd] dark:border-[#3a1d21] rounded-lg px-4 py-2.5 text-[#181112] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm" type="text" defaultValue="#D4AF37" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-[#f4f0f1] dark:border-[#3a1d21]">
                                <h3 className="text-lg font-bold text-[#181112] dark:text-white mb-4 font-serif">Social Media Links</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-[#896168] font-bold text-xs font-serif">IG</span>
                                        </div>
                                        <input className="w-full pl-10 pr-4 py-2.5 bg-background-light dark:bg-[#2a1619] border border-[#e6dbdd] dark:border-[#3a1d21] rounded-lg text-[#181112] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder-[#bcaaa8] text-sm font-serif" placeholder="instagram.com/jankidesign" type="text" />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-[#896168] font-bold text-xs font-serif">FB</span>
                                        </div>
                                        <input className="w-full pl-10 pr-4 py-2.5 bg-background-light dark:bg-[#2a1619] border border-[#e6dbdd] dark:border-[#3a1d21] rounded-lg text-[#181112] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder-[#bcaaa8] text-sm font-serif" placeholder="facebook.com/jankidesign" type="text" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Card 2: Business Operation Settings */}
                        <section className="bg-white dark:bg-[#1a0c0e] rounded-xl shadow-sm border border-[#e6dbdd] dark:border-[#3a1d21] p-6 md:p-8">
                            <div className="flex justify-between items-center mb-6 border-b border-[#f4f0f1] dark:border-[#3a1d21] pb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#181112] dark:text-white font-serif">Business Settings</h2>
                                    <p className="text-[#896168] text-sm mt-1 font-serif">GST, locations, and operational hours.</p>
                                </div>
                                <span className="material-symbols-outlined text-[#e6dbdd] text-4xl">store</span>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-[#181112] dark:text-[#e0e0e0] mb-2 font-serif">Registered Business Name</label>
                                        <input className="w-full px-4 py-2.5 bg-background-light dark:bg-[#2a1619] border border-[#e6dbdd] dark:border-[#3a1d21] rounded-lg text-[#181112] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-serif" type="text" defaultValue="Janki Design Pvt Ltd." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#181112] dark:text-[#e0e0e0] mb-2 font-serif">GSTIN Number</label>
                                        <input className="w-full px-4 py-2.5 bg-background-light dark:bg-[#2a1619] border border-[#e6dbdd] dark:border-[#3a1d21] rounded-lg text-[#181112] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-mono" type="text" defaultValue="22AAAAA0000A1Z5" />
                                    </div>
                                </div>
                                <div className="p-4 bg-background-light dark:bg-[#2a1619] rounded-lg border border-[#e6dbdd] dark:border-[#3a1d21] flex items-center justify-between">
                                    <div className="flex gap-4 items-center">
                                        <div className="bg-white dark:bg-[#1a0c0e] p-2 rounded-md shadow-sm">
                                            <span className="material-symbols-outlined text-primary">add_location_alt</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#181112] dark:text-white font-serif">Multi-Location Management</p>
                                            <p className="text-xs text-[#896168] font-serif">Enable if you have multiple boutique outlets.</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-[#181112] dark:text-[#e0e0e0] mb-2 font-serif">Contact Email</label>
                                        <input className="w-full px-4 py-2.5 bg-background-light dark:bg-[#2a1619] border border-[#e6dbdd] dark:border-[#3a1d21] rounded-lg text-[#181112] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-serif" type="email" defaultValue="hello@jankidesign.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#181112] dark:text-[#e0e0e0] mb-2 font-serif">Support Phone</label>
                                        <input className="w-full px-4 py-2.5 bg-background-light dark:bg-[#2a1619] border border-[#e6dbdd] dark:border-[#3a1d21] rounded-lg text-[#181112] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-serif" type="tel" defaultValue="+91 98765 43210" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Card 3: Order & Stitching Config (Lead Times) */}
                        <section className="bg-white dark:bg-[#1a0c0e] rounded-xl shadow-sm border border-[#e6dbdd] dark:border-[#3a1d21] p-6 md:p-8">
                            <div className="flex justify-between items-center mb-6 border-b border-[#f4f0f1] dark:border-[#3a1d21] pb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#181112] dark:text-white font-serif">Order & Stitching Config</h2>
                                    <p className="text-[#896168] text-sm mt-1 font-serif">Lead times and process stages.</p>
                                </div>
                                <span className="material-symbols-outlined text-[#e6dbdd] text-4xl">inventory</span>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">
                                    <h3 className="text-lg font-bold text-[#181112] dark:text-white mb-4 flex items-center gap-2 font-serif">
                                        <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                                        Default Lead Times
                                    </h3>
                                    <div className="overflow-hidden rounded-lg border border-[#e6dbdd] dark:border-[#3a1d21]">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-[#fcfafa] dark:bg-[#2a1619] text-[#181112] dark:text-white border-b border-[#e6dbdd] dark:border-[#3a1d21]">
                                                <tr>
                                                    <th className="px-6 py-3 font-bold font-serif" scope="col">Category</th>
                                                    <th className="px-6 py-3 font-bold text-right font-serif" scope="col">Standard Days</th>
                                                    <th className="px-6 py-3 font-bold text-right font-serif" scope="col">Express Days</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#f4f0f1] dark:divide-[#3a1d21]">
                                                <tr className="bg-white dark:bg-[#1a0c0e] hover:bg-[#fcfafa] dark:hover:bg-[#1f1012]">
                                                    <td className="px-6 py-3 font-medium text-[#181112] dark:text-white font-serif">Bridal Lehenga</td>
                                                    <td className="px-6 py-3 text-right">
                                                        <input className="w-16 text-right p-1 rounded bg-transparent border border-[#e6dbdd] dark:border-[#3a1d21] focus:border-primary focus:ring-0 font-serif" type="number" defaultValue="15" />
                                                    </td>
                                                    <td className="px-6 py-3 text-right">
                                                        <input className="w-16 text-right p-1 rounded bg-transparent border border-[#e6dbdd] dark:border-[#3a1d21] focus:border-primary focus:ring-0 text-primary font-bold font-serif" type="number" defaultValue="7" />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white dark:bg-[#1a0c0e] hover:bg-[#fcfafa] dark:hover:bg-[#1f1012]">
                                                    <td className="px-6 py-3 font-medium text-[#181112] dark:text-white font-serif">Designer Saree Blouse</td>
                                                    <td className="px-6 py-3 text-right">
                                                        <input className="w-16 text-right p-1 rounded bg-transparent border border-[#e6dbdd] dark:border-[#3a1d21] focus:border-primary focus:ring-0 font-serif" type="number" defaultValue="5" />
                                                    </td>
                                                    <td className="px-6 py-3 text-right">
                                                        <input className="w-16 text-right p-1 rounded bg-transparent border border-[#e6dbdd] dark:border-[#3a1d21] focus:border-primary focus:ring-0 text-primary font-bold font-serif" type="number" defaultValue="2" />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white dark:bg-[#1a0c0e] hover:bg-[#fcfafa] dark:hover:bg-[#1f1012]">
                                                    <td className="px-6 py-3 font-medium text-[#181112] dark:text-white font-serif">Anarkali Suit</td>
                                                    <td className="px-6 py-3 text-right">
                                                        <input className="w-16 text-right p-1 rounded bg-transparent border border-[#e6dbdd] dark:border-[#3a1d21] focus:border-primary focus:ring-0 font-serif" type="number" defaultValue="7" />
                                                    </td>
                                                    <td className="px-6 py-3 text-right">
                                                        <input className="w-16 text-right p-1 rounded bg-transparent border border-[#e6dbdd] dark:border-[#3a1d21] focus:border-primary focus:ring-0 text-primary font-bold font-serif" type="number" defaultValue="3" />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white dark:bg-[#1a0c0e] hover:bg-[#fcfafa] dark:hover:bg-[#1f1012]">
                                                    <td className="px-6 py-3 font-medium text-[#181112] dark:text-white font-serif">Standard Kurti</td>
                                                    <td className="px-6 py-3 text-right">
                                                        <input className="w-16 text-right p-1 rounded bg-transparent border border-[#e6dbdd] dark:border-[#3a1d21] focus:border-primary focus:ring-0 font-serif" type="number" defaultValue="3" />
                                                    </td>
                                                    <td className="px-6 py-3 text-right">
                                                        <input className="w-16 text-right p-1 rounded bg-transparent border border-[#e6dbdd] dark:border-[#3a1d21] focus:border-primary focus:ring-0 text-primary font-bold font-serif" type="number" defaultValue="1" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="lg:col-span-1">
                                    <h3 className="text-lg font-bold text-[#181112] dark:text-white mb-4 flex items-center gap-2 font-serif">
                                        <span className="material-symbols-outlined text-primary text-xl">linear_scale</span>
                                        Order Stages
                                    </h3>
                                    <div className="flex flex-col gap-2">
                                        <div className="p-3 bg-background-light dark:bg-[#2a1619] rounded-lg border border-[#e6dbdd] dark:border-[#3a1d21] flex items-center gap-3 cursor-move group">
                                            <span className="material-symbols-outlined text-[#bcaaa8] cursor-grab">drag_indicator</span>
                                            <span className="text-sm font-medium text-[#181112] dark:text-white font-serif">Measurements Taken</span>
                                            <span className="ml-auto material-symbols-outlined text-lg text-[#896168] group-hover:text-primary cursor-pointer">edit</span>
                                        </div>
                                        <div className="p-3 bg-background-light dark:bg-[#2a1619] rounded-lg border border-[#e6dbdd] dark:border-[#3a1d21] flex items-center gap-3 cursor-move group">
                                            <span className="material-symbols-outlined text-[#bcaaa8] cursor-grab">drag_indicator</span>
                                            <span className="text-sm font-medium text-[#181112] dark:text-white font-serif">Fabric Cutting</span>
                                            <span className="ml-auto material-symbols-outlined text-lg text-[#896168] group-hover:text-primary cursor-pointer">edit</span>
                                        </div>
                                        <div className="p-3 bg-background-light dark:bg-[#2a1619] rounded-lg border border-[#e6dbdd] dark:border-[#3a1d21] flex items-center gap-3 cursor-move group">
                                            <span className="material-symbols-outlined text-[#bcaaa8] cursor-grab">drag_indicator</span>
                                            <span className="text-sm font-medium text-[#181112] dark:text-white font-serif">Stitching</span>
                                            <span className="ml-auto material-symbols-outlined text-lg text-[#896168] group-hover:text-primary cursor-pointer">edit</span>
                                        </div>
                                        <div className="p-3 bg-background-light dark:bg-[#2a1619] rounded-lg border border-[#e6dbdd] dark:border-[#3a1d21] flex items-center gap-3 cursor-move group">
                                            <span className="material-symbols-outlined text-[#bcaaa8] cursor-grab">drag_indicator</span>
                                            <span className="text-sm font-medium text-[#181112] dark:text-white font-serif">Quality Check (QC)</span>
                                            <span className="ml-auto material-symbols-outlined text-lg text-[#896168] group-hover:text-primary cursor-pointer">edit</span>
                                        </div>
                                        <div className="p-3 bg-background-light dark:bg-[#2a1619] rounded-lg border border-[#e6dbdd] dark:border-[#3a1d21] flex items-center gap-3 cursor-move group">
                                            <span className="material-symbols-outlined text-[#bcaaa8] cursor-grab">drag_indicator</span>
                                            <span className="text-sm font-medium text-[#181112] dark:text-white font-serif">Ready for Pickup</span>
                                            <span className="ml-auto material-symbols-outlined text-lg text-[#896168] group-hover:text-primary cursor-pointer">edit</span>
                                        </div>
                                        <button className="mt-2 text-sm text-primary font-bold flex items-center gap-2 px-3 py-2 hover:bg-primary/5 rounded-lg w-max transition-colors font-serif">
                                            <span className="material-symbols-outlined text-lg">add</span>
                                            Add New Stage
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Card 4: Shipping & Pickup */}
                        <section className="bg-white dark:bg-[#1a0c0e] rounded-xl shadow-sm border border-[#e6dbdd] dark:border-[#3a1d21] p-6 md:p-8">
                            <div className="flex justify-between items-center mb-6 border-b border-[#f4f0f1] dark:border-[#3a1d21] pb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#181112] dark:text-white font-serif">Shipping & Pickup</h2>
                                    <p className="text-[#896168] text-sm mt-1 font-serif">Delivery zones and charges.</p>
                                </div>
                                <span className="material-symbols-outlined text-[#e6dbdd] text-4xl">local_shipping</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-background-light dark:bg-[#2a1619] p-5 rounded-lg border border-[#e6dbdd] dark:border-[#3a1d21]">
                                    <h3 className="font-bold text-[#181112] dark:text-white mb-3 font-serif">Local Pickup</h3>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm text-[#5d4044] dark:text-[#a88a8e] font-serif">Enable 'Pick up at Boutique' option</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                    <label className="block text-xs font-bold text-[#181112] dark:text-[#e0e0e0] mb-1 font-serif">Pickup Instructions</label>
                                    <textarea className="w-full px-3 py-2 bg-white dark:bg-[#1a0c0e] border border-[#e6dbdd] dark:border-[#3a1d21] rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary resize-none font-serif" placeholder="e.g. Bring your receipt..." rows={3}></textarea>
                                </div>
                                <div className="bg-background-light dark:bg-[#2a1619] p-5 rounded-lg border border-[#e6dbdd] dark:border-[#3a1d21]">
                                    <h3 className="font-bold text-[#181112] dark:text-white mb-3 font-serif">Delivery Zones</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between bg-white dark:bg-[#1a0c0e] p-3 rounded-lg shadow-sm">
                                            <div>
                                                <p className="text-sm font-bold text-[#181112] dark:text-white font-serif">Zone A (Local)</p>
                                                <p className="text-xs text-[#896168] font-serif">0-10km Radius</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-[#181112] dark:text-white font-serif">₹100</span>
                                                <span className="material-symbols-outlined text-xs text-[#bcaaa8] cursor-pointer hover:text-primary">edit</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between bg-white dark:bg-[#1a0c0e] p-3 rounded-lg shadow-sm">
                                            <div>
                                                <p className="text-sm font-bold text-[#181112] dark:text-white font-serif">Zone B (Metro)</p>
                                                <p className="text-xs text-[#896168] font-serif">10-50km Radius</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-[#181112] dark:text-white font-serif">₹250</span>
                                                <span className="material-symbols-outlined text-xs text-[#bcaaa8] cursor-pointer hover:text-primary">edit</span>
                                            </div>
                                        </div>
                                        <button className="w-full py-2 border border-dashed border-[#bcaaa8] rounded-lg text-sm text-[#5d4044] hover:bg-white hover:border-primary hover:text-primary transition-all font-serif">
                                            + Add New Zone
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Sticky Footer Actions */}
                <div className="sticky bottom-0 z-40 bg-white dark:bg-[#1a0c0e] border-t border-[#e6dbdd] dark:border-[#3a1d21] px-6 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] mt-auto -mx-6 -mb-8 md:-mx-12 md:-mb-10">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <span className="text-sm text-[#896168] hidden sm:block font-serif">Last saved: Today at 10:42 AM</span>
                        <div className="flex gap-4 w-full sm:w-auto justify-end">
                            <button className="px-6 py-2.5 rounded-lg border border-[#e6dbdd] text-[#181112] dark:text-white hover:bg-gray-50 dark:hover:bg-[#2a1619] font-bold text-sm transition-colors font-serif">
                                Discard Changes
                            </button>
                            <button className="px-6 py-2.5 rounded-lg bg-primary text-white hover:bg-[#a00c25] font-bold text-sm shadow-md transition-colors flex items-center gap-2 font-serif">
                                <span className="material-symbols-outlined text-lg">save</span>
                                Save Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
