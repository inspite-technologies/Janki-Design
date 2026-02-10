"use client";

import { usePathname } from "next/navigation";

export function Header() {
    const pathname = usePathname();

    // Hide global header on specific pages that have their own custom headers
    if (pathname?.startsWith("/dashboard/orders") || pathname?.startsWith("/dashboard/customers") || pathname?.startsWith("/dashboard/inventory") || pathname?.startsWith("/dashboard/tailors") || pathname?.startsWith("/dashboard/catalogue") || pathname?.startsWith("/dashboard/invoices") || pathname?.startsWith("/dashboard/broadcast") || pathname?.startsWith("/dashboard/wallet") || pathname?.startsWith("/dashboard/reports") || pathname?.startsWith("/dashboard/settings")) {
        return null;
    }

    return (
        <header className="h-20 flex items-center justify-between px-8 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur sticky top-0 z-10 border-b border-gray-100 dark:border-gray-800">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Daily Snapshot
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Monday, 14 October 2023
                </p>
            </div>
            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-primary transition-colors relative">
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
                    <span className="material-icons-outlined">notifications</span>
                </button>
                <div className="h-8 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 shadow-sm text-xs font-medium text-gray-600 dark:text-gray-300">
                    <span className="material-icons-outlined text-sm">settings</span> Settings
                </button>
            </div>
        </header>
    );
}
