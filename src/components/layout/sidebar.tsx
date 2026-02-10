"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
    { href: "/dashboard/orders", label: "Orders", icon: "shopping_bag" },
    { href: "/dashboard/customers", label: "Customers", icon: "group" },
    { href: "/dashboard/inventory", label: "Inventory", icon: "inventory_2" },
    { href: "/dashboard/tailors", label: "Tailors", icon: "content_cut" },
    { href: "/dashboard/catalogue", label: "Catalogue", icon: "menu_book" },
    { href: "/dashboard/invoices", label: "Invoices", icon: "receipt_long" },
    { href: "/dashboard/broadcast", label: "Broadcast", icon: "campaign" },
    { href: "/dashboard/wallet", label: "Wallet & Referral", icon: "account_balance_wallet" },
    { href: "/dashboard/reports", label: "Reports", icon: "description" },
];

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "w-64 bg-surface-light dark:bg-surface-dark border-r border-[#e6e1e3] dark:border-[#3d2e32] flex flex-col hidden md:flex shrink-0 z-20 shadow-lg h-screen fixed top-0 left-0 transition-colors duration-200",
                className
            )}
        >
            {/* Brand */}
            <div className="p-6 pb-2 shrink-0">
                <div className="flex gap-3 items-center">
                    <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 shadow-sm border border-[#f4f0f1] dark:border-[#3d2e32]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBEkFrF4_NKQuHl4fpc_Wfr-ePZ59D0E1kmQ1KdpCF2E-cIq_dzB3pbsa-JIPp_w4mkOnyMKKiYiT_8IZrtovdO6I_IpNk0um7J86UWgsvVCNUCprmeK9UoetjxCM1nebvpXjnvjVDRmySMPaEUCFpift7Mahox3Di87azdjQmNH7bilqkbVxB1ja0_s9pQ5qgQc88-6m4f1j_ZYr0xHQA1WahSWUfrnb0FEMurW0N45p7OY8t50Bwc8UarElap1Q3bXGc7d0zIYds")' }}></div>
                    <div className="flex flex-col">
                        <h1 className="text-base font-bold leading-tight text-[#181113] dark:text-white">Janki Design</h1>
                        <p className="text-[#88636c] dark:text-[#b08d96] text-xs font-normal">Admin Panel</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
                <nav className="flex flex-col gap-2">
                    {menuItems.map((item) => {
                        const isActive = item.href === "/dashboard"
                            ? pathname === "/dashboard"
                            : pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                                    isActive
                                        ? "bg-primary/10 text-primary dark:text-white dark:bg-primary/20"
                                        : "text-[#5e4a4f] dark:text-[#d0c0c4] hover:bg-[#f4f0f1] dark:hover:bg-[#3d2e32]"
                                )}
                            >
                                <span className={cn(
                                    "material-symbols-outlined text-[22px] transition-colors",
                                    isActive
                                        ? "text-primary fill-1"
                                        : "text-[#88636c] group-hover:text-primary"
                                )}>
                                    {item.icon}
                                </span>
                                <span className={cn(
                                    "text-sm font-medium",
                                    isActive && "font-bold"
                                )}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                    <div className="my-2 h-px bg-[#e6e1e3] dark:bg-[#3d2e32] w-full"></div>
                    <Link
                        href="/dashboard/settings/global"
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                            pathname.startsWith("/dashboard/settings/global")
                                ? "bg-primary/10 text-primary dark:text-white dark:bg-primary/20"
                                : "text-[#5e4a4f] dark:text-[#d0c0c4] hover:bg-[#f4f0f1] dark:hover:bg-[#3d2e32]"
                        )}
                    >
                        <span className={cn(
                            "material-symbols-outlined text-[22px] transition-colors",
                            pathname.startsWith("/dashboard/settings/global")
                                ? "text-primary fill-1"
                                : "text-[#88636c] group-hover:text-primary"
                        )}>tune</span>
                        <span className={cn(
                            "text-sm font-medium",
                            pathname.startsWith("/dashboard/settings/global") && "font-bold"
                        )}>Global Settings</span>
                    </Link>
                </nav>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 border-t border-[#e6e1e3] dark:border-[#3d2e32] shrink-0">
                <Link
                    href="/dashboard/settings/technical"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                        pathname.startsWith("/dashboard/settings/technical")
                            ? "bg-primary/10 text-primary dark:text-white dark:bg-primary/20"
                            : "text-[#5e4a4f] dark:text-[#d0c0c4] hover:bg-[#f4f0f1] dark:hover:bg-[#3d2e32]"
                    )}
                >
                    <span className={cn(
                        "material-symbols-outlined text-[22px] transition-colors",
                        pathname.startsWith("/dashboard/settings/technical")
                            ? "text-primary fill-1"
                            : "text-[#88636c] group-hover:text-primary"
                    )}>settings</span>
                    <span className={cn(
                        "text-sm",
                        pathname.startsWith("/dashboard/settings/technical") ? "font-bold" : "font-medium"
                    )}>Settings</span>
                </Link>
                <div className="mt-4 flex items-center gap-3 px-3">
                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">JD</div>
                    <div className="flex flex-col">
                        <p className="text-xs font-bold text-[#181113] dark:text-white">Janki Admin</p>
                        <p className="text-[10px] text-[#88636c]">View Profile</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
