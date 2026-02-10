import React, { useState } from 'react';
import { Product } from '@/types';

interface ProductCardProps {
    product: Product;
    onProductClick: (id: string) => void;
    getStockBadgeClass: (status: string) => string;
}

export default function ProductCard({ product, onProductClick, getStockBadgeClass }: ProductCardProps) {
    // Collect all media items for this product
    const allMedia: Array<{ type: 'image' | 'video' | '360', url: string }> = [];

    // Add all images
    if (product.images && product.images.length > 0) {
        product.images.forEach(img => allMedia.push({ type: 'image', url: img }));
    } else if (product.image_url) {
        allMedia.push({ type: 'image', url: product.image_url });
    }

    // Add videos
    if (product.videos && product.videos.length > 0) {
        product.videos.forEach(vid => allMedia.push({ type: 'video', url: vid }));
    }

    // Add 360 image
    if (product.image_360) {
        allMedia.push({ type: '360', url: product.image_360 });
    }

    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const currentMedia = allMedia[currentMediaIndex] || { type: 'image' as const, url: 'https://via.placeholder.com/400x600' };

    const nextMedia = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentMediaIndex((prev) => (prev + 1) % allMedia.length);
    };

    const prevMedia = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentMediaIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
    };

    return (
        <div
            onClick={() => onProductClick(product.id)}
            className="group relative bg-white dark:bg-[#2a1a1e] rounded-xl overflow-hidden border border-transparent hover:border-[#D4AF37]/30 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                {/* Media Display */}
                {currentMedia.type === 'video' ? (
                    <video
                        src={currentMedia.url}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                    />
                ) : (
                    <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url('${currentMedia.url}')` }}
                    ></div>
                )}

                {/* Navigation Arrows - Only show if multiple media items */}
                {allMedia.length > 1 && (
                    <>
                        <button
                            onClick={prevMedia}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            title="Previous"
                        >
                            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                        </button>
                        <button
                            onClick={nextMedia}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            title="Next"
                        >
                            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                            {allMedia.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentMediaIndex
                                        ? 'bg-white w-4'
                                        : 'bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold backdrop-blur-sm ${getStockBadgeClass(product.stock_status)}`}>
                        {product.stock_status}
                    </span>
                    {allMedia.length > 1 && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 backdrop-blur-sm">
                            <span className="material-symbols-outlined text-[14px] mr-1">
                                {currentMedia.type === 'video' ? 'videocam' : currentMedia.type === '360' ? '360' : 'collections'}
                            </span>
                            {currentMediaIndex + 1}/{allMedia.length}
                        </span>
                    )}
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onProductClick(product.id);
                        }}
                        className="bg-white text-gray-900 p-2 rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300"
                        title="View Details"
                    >
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                </div>
            </div>

            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-medium text-[#D4AF37] uppercase tracking-wider">{product.category}</p>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1 truncate" title={product.name}>{product.name}</h3>
                <p className="text-xs text-gray-500 mb-3">SKU: {product.sku}</p>
                <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">₹{(product.price || 0).toLocaleString()}</span>
                    {product.is_stitch_to_order && (
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase text-[#D4AF37] tracking-tight">Stitch</span>
                            <span className="material-symbols-outlined text-[#D4AF37] text-[16px]">check_circle</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
