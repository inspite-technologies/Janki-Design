"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProductsAPI } from "@/lib/api";
import { Product } from "@/types";
import { Category, loadCategories } from "@/components/CategoryManager";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const unwrappedParams = use(params);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        setCategories(loadCategories());
    }, []);

    const [editForm, setEditForm] = useState({
        name: '',
        sku: '',
        price: 0,
        category: '',
        subcategory: '',
        stock_status: 'In Stock' as 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Made to Order',
        description: '',
        is_stitch_to_order: false,
        image_url: '',
        images: [] as string[],
        videos: [] as string[],
        image_360: ''
    });

    useEffect(() => {
        fetchProduct();
    }, [unwrappedParams.id]);

    // Helper function to compress images
    const compressImage = (file: File, maxWidth: number = 800, quality: number = 0.7): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    if (!ctx) {
                        reject(new Error('Failed to get canvas context'));
                        return;
                    }

                    ctx.drawImage(img, 0, 0, width, height);
                    const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                    resolve(compressedBase64);
                };
                img.onerror = reject;
                img.src = e.target?.result as string;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const result = await ProductsAPI.get(decodeURIComponent(unwrappedParams.id));
            const productData = (result as any).data || result;
            setProduct(productData);
            setEditForm({
                name: productData.name,
                sku: productData.sku,
                price: productData.price || 0,
                category: productData.category,
                subcategory: productData.subcategory || '',
                stock_status: productData.stock_status,
                description: productData.description || '',
                is_stitch_to_order: productData.is_stitch_to_order || false,
                image_url: productData.image_url || '',
                images: productData.images || [],
                videos: productData.videos || [],
                image_360: productData.image_360 || ''
            });
        } catch (error) {
            console.error("Failed to fetch product:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        try {
            for (const file of Array.from(files)) {
                const compressedBase64 = await compressImage(file, 800, 0.7);
                setEditForm(prev => ({
                    ...prev,
                    images: [...prev.images, compressedBase64],
                    image_url: prev.image_url || compressedBase64
                }));
            }
        } catch (error) {
            console.error('Failed to compress image:', error);
            alert('Failed to process image. Please try a different image.');
        }
    };

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const maxSize = 5 * 1024 * 1024; // 5MB

        for (const file of Array.from(files)) {
            if (file.size > maxSize) {
                alert(`Video "${file.name}" is too large. Maximum size is 5MB.`);
                continue;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setEditForm(prev => ({
                    ...prev,
                    videos: [...prev.videos, base64]
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handle360ImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const compressedBase64 = await compressImage(file, 1200, 0.8);
            setEditForm(prev => ({
                ...prev,
                image_360: compressedBase64
            }));
        } catch (error) {
            console.error('Failed to compress 360 image:', error);
            alert('Failed to process 360° image. Please try a different image.');
        }
    };

    const removeImage = (index: number) => {
        setEditForm(prev => {
            const newImages = prev.images.filter((_, i) => i !== index);
            return {
                ...prev,
                images: newImages,
                image_url: newImages[0] || prev.image_url
            };
        });
    };

    const removeVideo = (index: number) => {
        setEditForm(prev => ({
            ...prev,
            videos: prev.videos.filter((_, i) => i !== index)
        }));
    };

    const remove360Image = () => {
        setEditForm(prev => ({
            ...prev,
            image_360: ''
        }));
    };

    const handleUpdate = async () => {
        if (!product) return;

        try {
            const result = await ProductsAPI.update(product.id, editForm);
            const updatedProduct = (result as any).data || result;
            setProduct(updatedProduct);
            setIsEditing(false);
            alert('Product updated successfully!');
        } catch (error) {
            console.error('Failed to update product:', error);
            alert('Failed to update product');
        }
    };

    const handleDelete = async () => {
        if (!product) return;

        try {
            await ProductsAPI.delete(product.id);
            alert('Product deleted successfully!');
            router.push('/dashboard/catalogue');
        } catch (error) {
            console.error('Failed to delete product:', error);
            alert('Failed to delete product');
        }
    };

    const getStockBadgeClass = (status: string) => {
        switch (status) {
            case 'Low Stock':
                return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';
            case 'Made to Order':
                return 'bg-primary text-white';
            case 'In Stock':
                return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300';
            case 'Out of Stock':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-800/80 dark:text-gray-200';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-background-light dark:bg-background-dark">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-background-light dark:bg-background-dark">
                <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">inventory_2</span>
                <p className="text-gray-500 dark:text-gray-400 mt-4">Product not found</p>
                <Link href="/dashboard/catalogue" className="mt-4 text-primary hover:underline">
                    Back to Catalogue
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
            {/* Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e5e5e5] dark:border-[#3a2a2e] bg-white/90 dark:bg-[#1a0f12]/90 backdrop-blur-md px-6 py-4 lg:px-10 shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/catalogue" className="text-gray-500 hover:text-primary dark:text-gray-400 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <div className="size-8 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[32px]">spa</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Janki Design
                        <span className="text-[#D4AF37] font-medium text-sm ml-1 uppercase tracking-widest hidden sm:inline-block">Admin</span>
                    </h1>
                </div>
                <div className="flex items-center gap-6">
                    <button className="text-gray-500 hover:text-primary dark:text-gray-400 transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <div className="h-8 w-8 rounded-full bg-cover bg-center ring-2 ring-[#D4AF37]/30 cursor-pointer" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAujj-GjCKoLOlbBEHwAK345XlNuwe4-gNDjOG-PB6Euqh6yj9L3KGD00H-UgrBZWEPHvhnumTgesZOBL83eUAtsEhOrRIN3nUViTndLbW1ZdFVLZwOaOq9uxl8Y95gJwT4uzkZuL6l6L3I3FXxDIWRhMl4g-ZZR2IkrQoNDnyd2pH7vGfOfYbL7ZwH1sPjRqxqBQUboOItc3OIYa1VT7vjDCBDvwd_4MM-zEqU4SYnRQlQSfmb0wWOYSKg8_I2_CCDNhnORTpGrXQ')" }}></div>
                </div>
            </header>

            <main className="flex-grow w-full max-w-[1440px] mx-auto p-6 lg:p-10 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url('${product.image_url || 'https://via.placeholder.com/600x800'}')` }}
                        ></div>
                        <div className="absolute top-4 left-4">
                            <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold backdrop-blur-sm shadow-md ${getStockBadgeClass(product.stock_status)}`}>
                                {product.stock_status}
                            </span>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-sm font-medium text-[#D4AF37] uppercase tracking-wider mb-2">{product.category}</p>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        className="text-3xl font-black text-gray-900 dark:text-white mb-2 w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20]"
                                    />
                                ) : (
                                    <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">{product.name}</h1>
                                )}
                                <p className="text-sm text-gray-500 dark:text-gray-400">SKU: {product.sku}</p>
                            </div>
                            <div className="flex gap-2">
                                {!isEditing ? (
                                    <>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                            title="Edit Product"
                                        >
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                        <button
                                            onClick={() => setIsDeleteModalOpen(true)}
                                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            title="Delete Product"
                                        >
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleUpdate}
                                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#a61237] transition-colors text-sm font-bold"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setEditForm({
                                                    name: product.name,
                                                    sku: product.sku,
                                                    price: product.price || 0,
                                                    category: product.category,
                                                    subcategory: product.subcategory || '',
                                                    stock_status: product.stock_status,
                                                    description: product.description || '',
                                                    is_stitch_to_order: product.is_stitch_to_order || false,
                                                    image_url: product.image_url || '',
                                                    images: product.images || [],
                                                    videos: product.videos || [],
                                                    image_360: product.image_360 || ''
                                                });
                                            }}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="mb-8">
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editForm.price}
                                    onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) || 0 })}
                                    className="text-4xl font-black text-primary px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20]"
                                />
                            ) : (
                                <p className="text-4xl font-black text-primary">₹{(product.price || 0).toLocaleString()}</p>
                            )}
                        </div>

                        <div className="space-y-6 mb-8">
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">Description</h3>
                                {isEditing ? (
                                    <textarea
                                        value={editForm.description}
                                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20] text-gray-700 dark:text-gray-300"
                                        rows={4}
                                    />
                                ) : (
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {product.description || 'No description available'}
                                    </p>
                                )}
                            </div>

                            {/* Media Management - Only show in edit mode */}
                            {isEditing && (
                                <div className="space-y-4">
                                    {/* Images Section */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">Product Images</h3>
                                        <div className="grid grid-cols-3 gap-3 mb-3">
                                            {editForm.images.map((img, index) => (
                                                <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-[#e5dcde] dark:border-[#3a2a2e]">
                                                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${img}')` }}></div>
                                                    <button
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                        title="Remove"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-[#e5dcde] dark:border-[#3a2a2e] rounded-lg cursor-pointer hover:border-primary transition-colors">
                                            <span className="material-symbols-outlined text-primary">add_photo_alternate</span>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Add Images</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>

                                    {/* Videos Section */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">Product Videos</h3>
                                        <div className="grid grid-cols-3 gap-3 mb-3">
                                            {editForm.videos.map((vid, index) => (
                                                <div key={index} className="relative group aspect-video rounded-lg overflow-hidden border border-[#e5dcde] dark:border-[#3a2a2e]">
                                                    <video src={vid} className="w-full h-full object-cover" muted />
                                                    <button
                                                        onClick={() => removeVideo(index)}
                                                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                        title="Remove"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-[#e5dcde] dark:border-[#3a2a2e] rounded-lg cursor-pointer hover:border-primary transition-colors">
                                            <span className="material-symbols-outlined text-primary">videocam</span>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Add Videos (Max 5MB)</span>
                                            <input
                                                type="file"
                                                accept="video/*"
                                                multiple
                                                onChange={handleVideoUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>

                                    {/* 360° Image Section */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">360° View</h3>
                                        {editForm.image_360 ? (
                                            <div className="relative group aspect-square rounded-lg overflow-hidden border border-[#e5dcde] dark:border-[#3a2a2e] max-w-xs">
                                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${editForm.image_360}')` }}></div>
                                                <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded text-xs font-bold">360°</div>
                                                <button
                                                    onClick={remove360Image}
                                                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Remove"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-[#e5dcde] dark:border-[#3a2a2e] rounded-lg cursor-pointer hover:border-primary transition-colors max-w-xs">
                                                <span className="material-symbols-outlined text-primary">360</span>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Add 360° Image</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handle360ImageUpload}
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            )}

                            {isEditing && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                                        <select
                                            value={editForm.category}
                                            onChange={(e) => {
                                                setEditForm({ ...editForm, category: e.target.value, subcategory: '' });
                                            }}
                                            className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20] text-gray-900 dark:text-white"
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subcategory</label>
                                        <select
                                            value={editForm.subcategory}
                                            onChange={(e) => setEditForm({ ...editForm, subcategory: e.target.value })}
                                            className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20] text-gray-900 dark:text-white"
                                            disabled={!editForm.category}
                                        >
                                            <option value="">Select Subcategory</option>
                                            {categories
                                                .find(cat => cat.name === editForm.category)
                                                ?.subcategories.map((sub, index) => (
                                                    <option key={index} value={sub}>{sub}</option>
                                                ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stock Status</label>
                                        <select
                                            value={editForm.stock_status}
                                            onChange={(e) => setEditForm({ ...editForm, stock_status: e.target.value as any })}
                                            className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20] text-gray-900 dark:text-white"
                                        >
                                            <option value="In Stock">In Stock</option>
                                            <option value="Low Stock">Low Stock</option>
                                            <option value="Out of Stock">Out of Stock</option>
                                            <option value="Made to Order">Made to Order</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-[#2a1d20] rounded-lg">
                                {isEditing ? (
                                    <>
                                        <input
                                            type="checkbox"
                                            id="stitch-edit"
                                            checked={editForm.is_stitch_to_order}
                                            onChange={(e) => setEditForm({ ...editForm, is_stitch_to_order: e.target.checked })}
                                            className="w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                                        />
                                        <label htmlFor="stitch-edit" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Enable Stitch-to-Order
                                        </label>
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[#D4AF37]">
                                            {product.is_stitch_to_order ? 'check_circle' : 'cancel'}
                                        </span>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Stitch-to-Order: {product.is_stitch_to_order ? 'Enabled' : 'Disabled'}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#1a0f12] rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-[#e5dcde] dark:border-[#3a2a2e]">
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                                    <span className="material-symbols-outlined text-red-600 text-[32px]">warning</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Delete Product</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">This action cannot be undone</p>
                                </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                Are you sure you want to delete <span className="font-bold">{product.name}</span>?
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-6 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
