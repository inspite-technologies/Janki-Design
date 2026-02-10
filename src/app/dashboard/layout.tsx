import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full">
            <Sidebar className="hidden md:flex fixed top-0 left-0 h-screen w-64 z-20" />
            <div className="flex flex-col md:ml-64 transition-all duration-300 ease-in-out">
                <Header />
                <main className="flex flex-1 flex-col h-full bg-background-light dark:bg-background-dark">
                    {children}
                </main>
            </div>
        </div>
    );
}
