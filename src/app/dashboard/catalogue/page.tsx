"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductsAPI } from "@/lib/api";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import CategoryManager, { Category, loadCategories } from "@/components/CategoryManager";

export default function CataloguePage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Items");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        setCategories(loadCategories());
    }, []);

    // File upload refs
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const image360InputRef = useRef<HTMLInputElement>(null);

    // New Product Form with media support
    const [newProduct, setNewProduct] = useState({
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

    // Preview states
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
    const [image360Preview, setImage360Preview] = useState<string>('');

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, searchQuery]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params: any = {};
            if (searchQuery) params.search = searchQuery;
            if (selectedCategory && selectedCategory !== 'All Items') params.category = selectedCategory;

            const result = await ProductsAPI.list(params);
            const productsData = Array.isArray(result) ? result : (result as any).data || [];
            setProducts(productsData);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

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

                    // Calculate new dimensions
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

                    // Convert to base64 with compression
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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        try {
            for (const file of Array.from(files)) {
                const compressedBase64 = await compressImage(file, 800, 0.7);

                setNewProduct(prev => ({
                    ...prev,
                    images: [...prev.images, compressedBase64],
                    image_url: prev.image_url || compressedBase64 // Set first image as primary
                }));
                setImagePreviews(prev => [...prev, compressedBase64]);
            }
        } catch (error) {
            console.error('Failed to compress image:', error);
            alert('Failed to process image. Please try a different image.');
        }
    };

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        // Limit video file size to 5MB
        const maxSize = 5 * 1024 * 1024; // 5MB

        for (const file of Array.from(files)) {
            if (file.size > maxSize) {
                alert(`Video "${file.name}" is too large. Maximum size is 5MB. Please use a smaller video or upload to a video hosting service.`);
                continue;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setNewProduct(prev => ({
                    ...prev,
                    videos: [...prev.videos, base64]
                }));
                setVideoPreviews(prev => [...prev, base64]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handle360ImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const compressedBase64 = await compressImage(file, 1200, 0.8);
            setNewProduct(prev => ({
                ...prev,
                image_360: compressedBase64
            }));
            setImage360Preview(compressedBase64);
        } catch (error) {
            console.error('Failed to compress 360 image:', error);
            alert('Failed to process 360° image. Please try a different image.');
        }
    };

    const removeImage = (index: number) => {
        setNewProduct(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
            image_url: index === 0 ? (prev.images[1] || '') : prev.image_url
        }));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const removeVideo = (index: number) => {
        setNewProduct(prev => ({
            ...prev,
            videos: prev.videos.filter((_, i) => i !== index)
        }));
        setVideoPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const remove360Image = () => {
        setNewProduct(prev => ({ ...prev, image_360: '' }));
        setImage360Preview('');
    };

    const handleAddProduct = async () => {
        if (!newProduct.name || !newProduct.sku) {
            alert('Please fill in required fields (Name and SKU)');
            return;
        }

        if (newProduct.images.length === 0 && !newProduct.image_url) {
            alert('Please add at least one product image');
            return;
        }

        try {
            // Create a clean product object to avoid circular references
            const productToCreate = {
                name: newProduct.name,
                sku: newProduct.sku,
                price: newProduct.price,
                category: newProduct.category,
                stock_status: newProduct.stock_status,
                description: newProduct.description,
                is_stitch_to_order: newProduct.is_stitch_to_order,
                image_url: newProduct.image_url,
                images: newProduct.images,
                videos: newProduct.videos,
                image_360: newProduct.image_360
            };

            await ProductsAPI.create(productToCreate);

            // Reset form
            resetForm();

            setIsAddModalOpen(false);

            // Refresh the product list to get the newly created product
            await fetchProducts();

            alert('Product added successfully!');
        } catch (error) {
            console.error('Failed to add product:', error);
            alert('Failed to add product. Images may be too large. Try using smaller images or fewer images.');
        }
    };

    const resetForm = () => {
        setNewProduct({
            name: '',
            sku: '',
            price: 0,
            category: '',
            subcategory: '',
            stock_status: 'In Stock',
            description: '',
            is_stitch_to_order: false,
            image_url: '',
            images: [],
            videos: [],
            image_360: ''
        });
        setImagePreviews([]);
        setVideoPreviews([]);
        setImage360Preview('');
    };

    const handleProductClick = (productId: string) => {
        router.push(`/dashboard/catalogue/${encodeURIComponent(productId)}`);
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

    const handleCategoriesUpdate = (updatedCategories: Category[]) => {
        setCategories(updatedCategories);
    };

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
            {/* Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e5e5e5] dark:border-[#3a2a2e] bg-white/90 dark:bg-[#1a0f12]/90 backdrop-blur-md px-6 py-4 lg:px-10 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="size-8 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[32px]">spa</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Janki Design
                        <span className="text-[#D4AF37] font-medium text-sm ml-1 uppercase tracking-widest hidden sm:inline-block">Admin</span>
                    </h1>
                </div>
                <nav className="hidden md:flex flex-1 justify-center gap-8">
                    <Link className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary text-sm font-semibold transition-colors" href="/dashboard">Dashboard</Link>
                    <Link className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary text-sm font-semibold transition-colors" href="/dashboard/orders">Orders</Link>
                    <Link className="text-primary font-bold text-sm relative after:content-[''] after:absolute after:-bottom-5 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-primary" href="/dashboard/catalogue">Catalog</Link>
                    <Link className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary text-sm font-semibold transition-colors" href="/dashboard/customers">Customers</Link>
                </nav>
                <div className="flex items-center gap-6">
                    <button className="text-gray-500 hover:text-primary dark:text-gray-400 transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <div className="h-8 w-8 rounded-full bg-cover bg-center ring-2 ring-[#D4AF37]/30 cursor-pointer" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAujj-GjCKoLOlbBEHwAK345XlNuwe4-gNDjOG-PB6Euqh6yj9L3KGD00H-UgrBZWEPHvhnumTgesZOBL83eUAtsEhOrRIN3nUViTndLbW1ZdFVLZwOaOq9uxl8Y95gJwT4uzkZuL6l6L3I3FXxDIWRhMl4g-ZZR2IkrQoNDnyd2pH7vGfOfYbL7ZwH1sPjRqxqBQUboOItc3OIYa1VT7vjDCBDvwd_4MM-zEqU4SYnRQlQSfmb0wWOYSKg8_I2_CCDNhnORTpGrXQ')" }}></div>
                </div>
            </header>

            <main className="flex-grow w-full max-w-[1440px] mx-auto p-6 lg:p-10 overflow-y-auto">
                {/* Page Header & Actions */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white">Product Catalog</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-lg">Manage your boutique inventory, track stock levels, and update custom tailoring options.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsCategoryManagerOpen(true)}
                            className="group flex items-center gap-2 bg-gray-100 dark:bg-[#2a1d20] hover:bg-gray-200 dark:hover:bg-[#3a2a2e] text-gray-700 dark:text-gray-300 px-5 py-3 rounded-lg font-semibold shadow-md transition-all active:scale-95 border border-gray-200 dark:border-[#3a2a2e]"
                        >
                            <span className="material-symbols-outlined text-[20px]">category</span>
                            <span>Manage Categories</span>
                        </button>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="group flex items-center gap-2 bg-primary hover:bg-[#a61237] text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-primary/30 transition-all active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[20px] group-hover:rotate-90 transition-transform duration-300">add</span>
                            <span>Add New Product</span>
                        </button>
                    </div>
                </div>

                {/* Toolbar: Search & Filters */}
                <div className="bg-white dark:bg-[#2a1a1e] rounded-xl p-4 shadow-sm border border-[#f0f0f0] dark:border-[#3a2a2e] mb-8 sticky top-[0px] z-30 transition-all">
                    <div className="flex flex-col lg:flex-row items-center gap-4 justify-between">
                        <div className="relative w-full lg:w-96 group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                <span className="material-symbols-outlined">search</span>
                            </div>
                            <input
                                className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-gray-50 dark:bg-[#1a0f12] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-all shadow-inner"
                                placeholder="Search by SKU, Name or Material..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide no-scrollbar">
                            <button
                                onClick={() => setSelectedCategory('All Items')}
                                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium shadow-md transition-transform hover:-translate-y-0.5 ${selectedCategory === 'All Items'
                                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                                    : 'bg-white dark:bg-[#1a0f12] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#3a2a2e] hover:border-[#D4AF37] hover:text-[#D4AF37] dark:hover:text-[#D4AF37]'
                                    }`}
                            >
                                All Items
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium shadow-md transition-transform hover:-translate-y-0.5 ${selectedCategory === category.name
                                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                                        : 'bg-white dark:bg-[#1a0f12] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#3a2a2e] hover:border-[#D4AF37] hover:text-[#D4AF37] dark:hover:text-[#D4AF37]'
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20">
                        <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">inventory_2</span>
                        <p className="text-gray-500 dark:text-gray-400 mt-4">No products found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onProductClick={handleProductClick}
                                getStockBadgeClass={getStockBadgeClass}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Add Product Modal with Enhanced Media Upload */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#1a0f12] rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden border border-[#e5dcde] dark:border-[#3a2a2e]">
                        <div className="px-6 py-4 border-b border-[#e5dcde] dark:border-[#3a2a2e] flex justify-between items-center">
                            <h3 className="text-lg font-bold text-[#181113] dark:text-white">Add New Product</h3>
                            <button
                                onClick={() => {
                                    setIsAddModalOpen(false);
                                    resetForm();
                                }}
                                className="text-[#88636c] hover:text-[#181113] dark:hover:text-white"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 flex flex-col gap-6 max-h-[75vh] overflow-y-auto">
                            {/* Basic Information */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#88636c] mb-1">
                                        Product Name <span className="text-primary">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20] text-[#181113] dark:text-white"
                                        placeholder="Enter product name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#88636c] mb-1">
                                        SKU <span className="text-primary">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={newProduct.sku}
                                        onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                                        className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20] text-[#181113] dark:text-white"
                                        placeholder="PRD-001"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#88636c] mb-1">
                                        Price (₹) <span className="text-primary">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20] text-[#181113] dark:text-white"
                                        placeholder="0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#88636c] mb-1">
                                        Category <span className="text-primary">*</span>
                                    </label>
                                    <select
                                        value={newProduct.category}
                                        onChange={(e) => {
                                            setNewProduct({ ...newProduct, category: e.target.value, subcategory: '' });
                                        }}
                                        className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20] text-[#181113] dark:text-white"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#88636c] mb-1">
                                        Subcategory
                                    </label>
                                    <select
                                        value={newProduct.subcategory}
                                        onChange={(e) => setNewProduct({ ...newProduct, subcategory: e.target.value })}
                                        className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20] text-[#181113] dark:text-white"
                                        disabled={!newProduct.category}
                                    >
                                        <option value="">Select Subcategory</option>
                                        {categories
                                            .find(cat => cat.name === newProduct.category)
                                            ?.subcategories.map((sub, index) => (
                                                <option key={index} value={sub}>{sub}</option>
                                            ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#88636c] mb-1">
                                    Stock Status <span className="text-primary">*</span>
                                </label>
                                <select
                                    value={newProduct.stock_status}
                                    onChange={(e) => setNewProduct({ ...newProduct, stock_status: e.target.value as any })}
                                    className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20] text-[#181113] dark:text-white"
                                >
                                    <option value="In Stock">In Stock</option>
                                    <option value="Low Stock">Low Stock</option>
                                    <option value="Out of Stock">Out of Stock</option>
                                    <option value="Made to Order">Made to Order</option>
                                </select>
                            </div>

                            {/* Media Upload Section */}
                            <div className="border-t border-[#e5dcde] dark:border-[#3a2a2e] pt-6">
                                <h4 className="text-md font-bold text-[#181113] dark:text-white mb-4">Product Media</h4>

                                {/* Product Images */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-[#88636c] mb-2">
                                        Product Images <span className="text-primary">*</span>
                                        <span className="text-xs text-gray-500 ml-2">(Multiple images supported)</span>
                                    </label>
                                    <input
                                        ref={imageInputRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => imageInputRef.current?.click()}
                                        className="w-full px-4 py-3 border-2 border-dashed border-[#e5dcde] dark:border-[#3a2a2e] rounded-lg hover:border-primary transition-colors flex items-center justify-center gap-2 text-[#88636c] hover:text-primary"
                                    >
                                        <span className="material-symbols-outlined">add_photo_alternate</span>
                                        <span className="text-sm font-medium">Upload Images from Device</span>
                                    </button>

                                    {/* Image Previews */}
                                    {imagePreviews.length > 0 && (
                                        <div className="grid grid-cols-4 gap-3 mt-3">
                                            {imagePreviews.map((preview, index) => (
                                                <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-[#e5dcde] dark:border-[#3a2a2e]">
                                                    <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                                                    {index === 0 && (
                                                        <div className="absolute top-1 left-1 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                                            Primary
                                                        </div>
                                                    )}
                                                    <button
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Product Videos */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-[#88636c] mb-2">
                                        Product Videos
                                        <span className="text-xs text-gray-500 ml-2">(Optional - Multiple videos supported)</span>
                                    </label>
                                    <input
                                        ref={videoInputRef}
                                        type="file"
                                        accept="video/*"
                                        multiple
                                        onChange={handleVideoUpload}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => videoInputRef.current?.click()}
                                        className="w-full px-4 py-3 border-2 border-dashed border-[#e5dcde] dark:border-[#3a2a2e] rounded-lg hover:border-purple-500 transition-colors flex items-center justify-center gap-2 text-[#88636c] hover:text-purple-500"
                                    >
                                        <span className="material-symbols-outlined">videocam</span>
                                        <span className="text-sm font-medium">Upload Videos from Device</span>
                                    </button>

                                    {/* Video Previews */}
                                    {videoPreviews.length > 0 && (
                                        <div className="grid grid-cols-3 gap-3 mt-3">
                                            {videoPreviews.map((preview, index) => (
                                                <div key={index} className="relative group aspect-video rounded-lg overflow-hidden border border-[#e5dcde] dark:border-[#3a2a2e]">
                                                    {preview && <video src={preview} className="w-full h-full object-cover" controls />}
                                                    <button
                                                        onClick={() => removeVideo(index)}
                                                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* 360 Degree Image */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-[#88636c] mb-2">
                                        360° Product View
                                        <span className="text-xs text-gray-500 ml-2">(Optional - Single 360° image)</span>
                                    </label>
                                    <input
                                        ref={image360InputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handle360ImageUpload}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => image360InputRef.current?.click()}
                                        className="w-full px-4 py-3 border-2 border-dashed border-[#e5dcde] dark:border-[#3a2a2e] rounded-lg hover:border-amber-500 transition-colors flex items-center justify-center gap-2 text-[#88636c] hover:text-amber-500"
                                    >
                                        <span className="material-symbols-outlined">360</span>
                                        <span className="text-sm font-medium">Upload 360° Image from Device</span>
                                    </button>

                                    {/* 360 Image Preview */}
                                    {image360Preview && (
                                        <div className="relative group aspect-square rounded-lg overflow-hidden border border-[#e5dcde] dark:border-[#3a2a2e] mt-3 max-w-xs">
                                            <img src={image360Preview} alt="360° Preview" className="w-full h-full object-cover" />
                                            <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">360</span>
                                                360° View
                                            </div>
                                            <button
                                                onClick={remove360Image}
                                                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">close</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#88636c] mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-[#e5dcde] rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-[#2a1d20] text-[#181113] dark:text-white"
                                    placeholder="Product description..."
                                    rows={3}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="stitch-to-order"
                                    checked={newProduct.is_stitch_to_order}
                                    onChange={(e) => setNewProduct({ ...newProduct, is_stitch_to_order: e.target.checked })}
                                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                                />
                                <label htmlFor="stitch-to-order" className="text-sm font-medium text-[#88636c]">
                                    Enable Stitch-to-Order
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-[#e5dcde] dark:border-[#3a2a2e]">
                                <button
                                    onClick={() => {
                                        setIsAddModalOpen(false);
                                        resetForm();
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-[#5e4e53] hover:text-[#181113] bg-transparent"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddProduct}
                                    className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-[#a61237] rounded-lg shadow-md transition-colors"
                                >
                                    Add Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Category Manager Modal */}
            <CategoryManager
                isOpen={isCategoryManagerOpen}
                onClose={() => setIsCategoryManagerOpen(false)}
                onCategoriesUpdate={handleCategoriesUpdate}
            />
        </div>
    );
}
