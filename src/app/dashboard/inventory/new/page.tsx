"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InventoryAPI } from '@/lib/api';
import { InventoryItem } from '@/types';

export default function NewMaterialPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState<Omit<InventoryItem, 'id' | 'last_restocked' | 'stock_status'>>({
        name: '',
        sku: '',
        type: 'Fabric',
        quantity: 0,
        unit: 'yds',
        min_stock_level: 10,
        image_url: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await InventoryAPI.createMaterial({
                ...formData,
                stock_status: formData.quantity <= 0 ? 'Critical' : formData.quantity <= formData.min_stock_level ? 'Low' : 'Healthy',
                last_restocked: new Date().toISOString()
            });
            router.push('/dashboard/inventory');
        } catch (error) {
            console.error('Failed to create material:', error);
            alert('Failed to create material. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
            <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark px-6 py-4 flex items-center gap-4 shrink-0">
                <Link href="/dashboard/inventory" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <div>
                    <h1 className="text-xl font-bold text-text-primary dark:text-text-primary-dark">Add New Material</h1>
                    <p className="text-xs text-text-secondary dark:text-text-secondary-dark">Add a new item to inventory</p>
                </div>
            </header>

            <div className="p-6 max-w-2xl mx-auto w-full overflow-y-auto">
                <form onSubmit={handleSubmit} className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-border-light dark:border-border-dark space-y-6">

                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary dark:text-text-secondary-dark border-b border-border-light dark:border-border-dark pb-2">Basic Information</h2>

                        <div>
                            <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-1">Material Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Blue Silk Velvet"
                                className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-1">SKU / Code</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.sku}
                                    onChange={e => setFormData({ ...formData, sku: e.target.value })}
                                    placeholder="e.g. FAB-001"
                                    className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-1">Type</label>
                                <select
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                                    className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                                >
                                    <option value="Fabric">Fabric</option>
                                    <option value="Accessory">Accessory</option>
                                    <option value="Thread">Thread</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Stock Details */}
                    <div className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary dark:text-text-secondary-dark border-b border-border-light dark:border-border-dark pb-2">Stock Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-1">Quantity</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    value={formData.quantity}
                                    onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
                                    className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-1">Unit</label>
                                <select
                                    value={formData.unit}
                                    onChange={e => setFormData({ ...formData, unit: e.target.value as any })}
                                    className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                                >
                                    <option value="yds">Yards</option>
                                    <option value="meters">Meters</option>
                                    <option value="pieces">Pieces</option>
                                    <option value="rolls">Rolls</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-1">Min. Stock Level</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    value={formData.min_stock_level}
                                    onChange={e => setFormData({ ...formData, min_stock_level: Number(e.target.value) })}
                                    className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary dark:text-text-secondary-dark border-b border-border-light dark:border-border-dark pb-2">Image</h2>
                        <div>
                            <label className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-1">Image URL (Optional)</label>
                            <input
                                type="url"
                                value={formData.image_url}
                                onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                placeholder="https://..."
                                className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-primary dark:text-text-primary-dark focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                            />
                            <p className="text-xs text-text-muted dark:text-text-muted-dark mt-1">Leave empty for a placeholder icon.</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-border-light dark:border-border-dark">
                        <Link
                            href="/dashboard/inventory"
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
                            Add Material
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
