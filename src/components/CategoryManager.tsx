import React, { useState, useEffect } from 'react';

export interface Category {
    id: string;
    name: string;
    subcategories: string[];
}

interface CategoryManagerProps {
    isOpen: boolean;
    onClose: () => void;
    onCategoriesUpdate: (categories: Category[]) => void;
}

const STORAGE_KEY = 'janki_product_categories';

const DEFAULT_CATEGORIES: Category[] = [
    { id: '1', name: 'Sarees', subcategories: ['Silk', 'Cotton', 'Designer', 'Party Wear'] },
    { id: '2', name: 'Bridal Wear', subcategories: ['Lehenga', 'Gown', 'Saree'] },
    { id: '3', name: 'Kurtis', subcategories: ['Casual', 'Formal', 'Party Wear'] },
    { id: '4', name: 'Maternity', subcategories: ['Tops', 'Dresses', 'Kurtis'] },
    { id: '5', name: 'Suits', subcategories: ['Salwar', 'Anarkali', 'Palazzo'] },
    { id: '6', name: 'Accessories', subcategories: ['Jewelry', 'Bags', 'Footwear'] }
];

export function loadCategories(): Category[] {
    if (typeof window === 'undefined') return DEFAULT_CATEGORIES;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Failed to parse categories:', e);
        }
    }
    return DEFAULT_CATEGORIES;
}

export function saveCategories(categories: Category[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
}

export default function CategoryManager({ isOpen, onClose, onCategoriesUpdate }: CategoryManagerProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newSubcategory, setNewSubcategory] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (isOpen) {
            setCategories(loadCategories());
        }
    }, [isOpen]);

    const handleAddCategory = () => {
        if (!newCategoryName.trim()) return;

        const newCategory: Category = {
            id: Date.now().toString(),
            name: newCategoryName.trim(),
            subcategories: []
        };

        const updated = [...categories, newCategory];
        setCategories(updated);
        saveCategories(updated);
        setNewCategoryName('');
    };

    const handleRemoveCategory = (categoryId: string) => {
        const updated = categories.filter(c => c.id !== categoryId);
        setCategories(updated);
        saveCategories(updated);
    };

    const handleAddSubcategory = (categoryId: string) => {
        const subcategoryName = newSubcategory[categoryId]?.trim();
        if (!subcategoryName) return;

        const updated = categories.map(cat => {
            if (cat.id === categoryId) {
                return {
                    ...cat,
                    subcategories: [...cat.subcategories, subcategoryName]
                };
            }
            return cat;
        });

        setCategories(updated);
        saveCategories(updated);
        setNewSubcategory({ ...newSubcategory, [categoryId]: '' });
    };

    const handleRemoveSubcategory = (categoryId: string, subcategoryIndex: number) => {
        const updated = categories.map(cat => {
            if (cat.id === categoryId) {
                return {
                    ...cat,
                    subcategories: cat.subcategories.filter((_, i) => i !== subcategoryIndex)
                };
            }
            return cat;
        });

        setCategories(updated);
        saveCategories(updated);
    };

    const handleSave = () => {
        onCategoriesUpdate(categories);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#1a0f12] rounded-2xl shadow-xl w-full max-w-3xl max-h-[80vh] overflow-hidden border border-[#e5dcde] dark:border-[#3a2a2e] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-[#e5dcde] dark:border-[#3a2a2e]">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Categories</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add or remove product categories and subcategories</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[28px]">close</span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Add New Category */}
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-[#2a1d20] rounded-lg">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">Add New Category</h3>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                                placeholder="Category name..."
                                className="flex-1 px-3 py-2 border border-[#e5dcde] dark:border-[#3a2a2e] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#1a0f12] text-gray-900 dark:text-white"
                            />
                            <button
                                onClick={handleAddCategory}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#a61237] transition-colors font-medium"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Categories List */}
                    <div className="space-y-4">
                        {categories.map((category) => (
                            <div key={category.id} className="border border-[#e5dcde] dark:border-[#3a2a2e] rounded-lg p-4">
                                {/* Category Header */}
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{category.name}</h4>
                                    <button
                                        onClick={() => handleRemoveCategory(category.id)}
                                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                        title="Remove Category"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                    </button>
                                </div>

                                {/* Subcategories */}
                                <div className="space-y-2">
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {category.subcategories.map((sub, index) => (
                                            <div
                                                key={index}
                                                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                                            >
                                                <span>{sub}</span>
                                                <button
                                                    onClick={() => handleRemoveSubcategory(category.id, index)}
                                                    className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Add Subcategory */}
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newSubcategory[category.id] || ''}
                                            onChange={(e) => setNewSubcategory({ ...newSubcategory, [category.id]: e.target.value })}
                                            onKeyPress={(e) => e.key === 'Enter' && handleAddSubcategory(category.id)}
                                            placeholder="Add subcategory..."
                                            className="flex-1 px-3 py-1.5 text-sm border border-[#e5dcde] dark:border-[#3a2a2e] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#1a0f12] text-gray-900 dark:text-white"
                                        />
                                        <button
                                            onClick={() => handleAddSubcategory(category.id)}
                                            className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[#e5dcde] dark:border-[#3a2a2e] flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-[#a61237] rounded-lg shadow-md transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
