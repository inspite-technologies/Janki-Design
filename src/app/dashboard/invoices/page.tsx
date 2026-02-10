export default function InvoicesPage() {
    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
            {/* Mobile Header placeholder (visible only on small screens) */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark border-b border-[#e5dcde] dark:border-[#4a3b40]">
                <h1 className="text-lg font-bold text-[#181113] dark:text-white">Janki Design</h1>
                <button className="text-[#181113] dark:text-white">
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-3xl md:text-4xl font-black text-[#181113] dark:text-white tracking-tight">Invoices &amp; Payments</h2>
                        <p className="text-[#88636c] dark:text-[#b08d96] text-base font-medium">Financial Overview &amp; Status Tracking</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center justify-center gap-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-[#e5dcde] dark:border-[#4a3b40] h-11 px-5 text-[#181113] dark:text-white text-sm font-bold hover:bg-gray-50 dark:hover:bg-[#3d292e] transition-colors shadow-sm">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>download</span>
                            <span className="hidden sm:inline">Export Report</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-[#a81238] h-11 px-5 text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
                            <span>New Invoice</span>
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Invoiced */}
                    <div className="flex flex-col gap-2 rounded-xl p-5 bg-surface-light dark:bg-surface-dark border border-[#e5dcde] dark:border-[#4a3b40] shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-[#181113] dark:text-white" style={{ fontSize: '64px' }}>payments</span>
                        </div>
                        <p className="text-[#88636c] dark:text-[#b08d96] text-sm font-bold uppercase tracking-wider">Total Invoiced</p>
                        <p className="text-[#181113] dark:text-white text-2xl font-bold tracking-tight">₹1,25,000</p>
                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-bold mt-1">
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>trending_up</span>
                            <span>+12% this month</span>
                        </div>
                    </div>
                    {/* Total Received */}
                    <div className="flex flex-col gap-2 rounded-xl p-5 bg-surface-light dark:bg-surface-dark border border-[#e5dcde] dark:border-[#4a3b40] shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-green-600" style={{ fontSize: '64px' }}>check_circle</span>
                        </div>
                        <p className="text-[#88636c] dark:text-[#b08d96] text-sm font-bold uppercase tracking-wider">Total Received</p>
                        <p className="text-[#181113] dark:text-white text-2xl font-bold tracking-tight">₹80,000</p>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '64%' }}></div>
                        </div>
                    </div>
                    {/* Pending Payments */}
                    <div className="flex flex-col gap-2 rounded-xl p-5 bg-surface-light dark:bg-surface-dark border border-primary/20 dark:border-primary/40 shadow-sm relative overflow-hidden group ring-1 ring-primary/5">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-primary" style={{ fontSize: '64px' }}>pending</span>
                        </div>
                        <p className="text-primary dark:text-primary-400 text-sm font-bold uppercase tracking-wider">Pending Payments</p>
                        <p className="text-primary dark:text-primary-400 text-2xl font-bold tracking-tight">₹45,000</p>
                        <p className="text-[#88636c] dark:text-[#b08d96] text-xs font-medium mt-1">12 Invoices pending</p>
                    </div>
                    {/* Overdue */}
                    <div className="flex flex-col gap-2 rounded-xl p-5 bg-surface-light dark:bg-surface-dark border border-[#e5dcde] dark:border-[#4a3b40] shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-orange-500" style={{ fontSize: '64px' }}>warning</span>
                        </div>
                        <p className="text-[#88636c] dark:text-[#b08d96] text-sm font-bold uppercase tracking-wider">Overdue</p>
                        <p className="text-[#181113] dark:text-white text-2xl font-bold tracking-tight">₹5,000</p>
                        <p className="text-orange-600 dark:text-orange-400 text-xs font-bold mt-1">Needs attention</p>
                    </div>
                </div>

                {/* Filters & Toolbar */}
                <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-[#e5dcde] dark:border-[#4a3b40] shadow-sm">
                    <div className="relative w-full lg:max-w-md">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#88636c]">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>search</span>
                        </div>
                        <input className="block w-full rounded-lg border-none bg-[#f4f0f1] dark:bg-[#3d292e] py-2.5 pl-10 pr-4 text-[#181113] dark:text-white placeholder-[#88636c] dark:placeholder-[#88636c] focus:ring-2 focus:ring-primary text-sm font-medium" placeholder="Search by Client Name or Invoice ID..." type="text" />
                    </div>
                    <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                        <div className="relative">
                            <select className="appearance-none h-10 pl-4 pr-10 rounded-lg bg-[#f4f0f1] dark:bg-[#3d292e] text-[#181113] dark:text-white text-sm font-medium border-none focus:ring-2 focus:ring-primary cursor-pointer">
                                <option>Status: All</option>
                                <option>Paid</option>
                                <option>Pending</option>
                                <option>Overdue</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#181113] dark:text-white">
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>expand_more</span>
                            </div>
                        </div>
                        <div className="relative">
                            <select className="appearance-none h-10 pl-4 pr-10 rounded-lg bg-[#f4f0f1] dark:bg-[#3d292e] text-[#181113] dark:text-white text-sm font-medium border-none focus:ring-2 focus:ring-primary cursor-pointer">
                                <option>This Month</option>
                                <option>Last Month</option>
                                <option>Last 3 Months</option>
                                <option>Custom Range</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#181113] dark:text-white">
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>calendar_today</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="rounded-xl border border-[#e5dcde] dark:border-[#4a3b40] bg-surface-light dark:bg-surface-dark shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#f4f0f1] dark:bg-[#2d1b20] border-b border-[#e5dcde] dark:border-[#4a3b40]">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-[#181113] dark:text-white whitespace-nowrap">Invoice ID</th>
                                    <th className="px-6 py-4 font-bold text-[#181113] dark:text-white whitespace-nowrap">Date</th>
                                    <th className="px-6 py-4 font-bold text-[#181113] dark:text-white whitespace-nowrap">Client Name</th>
                                    <th className="px-6 py-4 font-bold text-[#181113] dark:text-white whitespace-nowrap text-right">Amount</th>
                                    <th className="px-6 py-4 font-bold text-[#181113] dark:text-white whitespace-nowrap text-center">Status</th>
                                    <th className="px-6 py-4 font-bold text-[#181113] dark:text-white whitespace-nowrap text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e5dcde] dark:divide-[#4a3b40]">
                                {/* Row 1 */}
                                <tr className="group hover:bg-[#fcfafa] dark:hover:bg-[#362227] transition-colors">
                                    <td className="px-6 py-4 font-medium text-[#181113] dark:text-gray-200">#INV-2023-089</td>
                                    <td className="px-6 py-4 text-[#88636c] dark:text-[#b08d96]">Oct 24, 2023</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-200 to-rose-300 dark:from-pink-900 dark:to-rose-800 flex items-center justify-center text-primary dark:text-pink-200 font-bold text-xs" data-alt="Avatar placeholder with initials">
                                                AS
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#181113] dark:text-white">Anjali Sharma</span>
                                                <span className="text-xs text-[#88636c] dark:text-[#b08d96]">Bridal Lehenga</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="font-bold text-[#181113] dark:text-white">₹45,000</p>
                                        <p className="text-xs text-[#88636c] dark:text-[#b08d96]">+ GST (12%)</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary dark:bg-primary/20 dark:text-primary-400">
                                            <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                                            Pending
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-[#88636c] hover:text-[#181113] dark:text-[#b08d96] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#4a3b40] rounded-lg transition-colors" title="Download PDF">
                                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>description</span>
                                            </button>
                                            <button className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Share via WhatsApp">
                                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chat</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {/* Row 2 */}
                                <tr className="group hover:bg-[#fcfafa] dark:hover:bg-[#362227] transition-colors">
                                    <td className="px-6 py-4 font-medium text-[#181113] dark:text-gray-200">#INV-2023-088</td>
                                    <td className="px-6 py-4 text-[#88636c] dark:text-[#b08d96]">Oct 22, 2023</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-900 dark:to-indigo-800 flex items-center justify-center text-blue-700 dark:text-blue-200 font-bold text-xs" data-alt="Avatar placeholder with initials">
                                                MK
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#181113] dark:text-white">Meera Kapoor</span>
                                                <span className="text-xs text-[#88636c] dark:text-[#b08d96]">Silk Saree Blouse</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="font-bold text-[#181113] dark:text-white">₹8,500</p>
                                        <p className="text-xs text-[#88636c] dark:text-[#b08d96]">Incl. GST</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                            <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                            Paid
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-[#88636c] hover:text-[#181113] dark:text-[#b08d96] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#4a3b40] rounded-lg transition-colors" title="Download PDF">
                                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>description</span>
                                            </button>
                                            <button className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Share via WhatsApp">
                                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chat</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {/* Row 3 */}
                                <tr className="group hover:bg-[#fcfafa] dark:hover:bg-[#362227] transition-colors">
                                    <td className="px-6 py-4 font-medium text-[#181113] dark:text-gray-200">#INV-2023-087</td>
                                    <td className="px-6 py-4 text-[#88636c] dark:text-[#b08d96]">Oct 20, 2023</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-900 dark:to-orange-800 flex items-center justify-center text-amber-800 dark:text-amber-200 font-bold text-xs" data-alt="Avatar placeholder with initials">
                                                PV
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#181113] dark:text-white">Priya Verma</span>
                                                <span className="text-xs text-[#88636c] dark:text-[#b08d96]">Anarkali Suit</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="font-bold text-[#181113] dark:text-white">₹12,000</p>
                                        <p className="text-xs text-[#88636c] dark:text-[#b08d96]">+ GST (5%)</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                                            <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                                            Partial
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-[#88636c] hover:text-[#181113] dark:text-[#b08d96] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#4a3b40] rounded-lg transition-colors" title="Download PDF">
                                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>description</span>
                                            </button>
                                            <button className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Share via WhatsApp">
                                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chat</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {/* Row 4 */}
                                <tr className="group hover:bg-[#fcfafa] dark:hover:bg-[#362227] transition-colors">
                                    <td className="px-6 py-4 font-medium text-[#181113] dark:text-gray-200">#INV-2023-086</td>
                                    <td className="px-6 py-4 text-[#88636c] dark:text-[#b08d96]">Oct 18, 2023</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-200 to-fuchsia-300 dark:from-purple-900 dark:to-fuchsia-800 flex items-center justify-center text-purple-800 dark:text-purple-200 font-bold text-xs" data-alt="Avatar placeholder with initials">
                                                RR
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#181113] dark:text-white">Riya Roy</span>
                                                <span className="text-xs text-[#88636c] dark:text-[#b08d96]">Designer Gown</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="font-bold text-[#181113] dark:text-white">₹32,500</p>
                                        <p className="text-xs text-[#88636c] dark:text-[#b08d96]">+ GST (12%)</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                            <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                            Paid
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-[#88636c] hover:text-[#181113] dark:text-[#b08d96] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#4a3b40] rounded-lg transition-colors" title="Download PDF">
                                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>description</span>
                                            </button>
                                            <button className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Share via WhatsApp">
                                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chat</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {/* Row 5 */}
                                <tr className="group hover:bg-[#fcfafa] dark:hover:bg-[#362227] transition-colors">
                                    <td className="px-6 py-4 font-medium text-[#181113] dark:text-gray-200">#INV-2023-085</td>
                                    <td className="px-6 py-4 text-[#88636c] dark:text-[#b08d96]">Oct 15, 2023</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-200 to-emerald-300 dark:from-teal-900 dark:to-emerald-800 flex items-center justify-center text-teal-800 dark:text-teal-200 font-bold text-xs" data-alt="Avatar placeholder with initials">
                                                SM
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#181113] dark:text-white">Sonia Mehta</span>
                                                <span className="text-xs text-[#88636c] dark:text-[#b08d96]">Alterations</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="font-bold text-[#181113] dark:text-white">₹2,500</p>
                                        <p className="text-xs text-[#88636c] dark:text-[#b08d96]">Incl. GST</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                            <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                                            Overdue
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-[#88636c] hover:text-[#181113] dark:text-[#b08d96] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#4a3b40] rounded-lg transition-colors" title="Download PDF">
                                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>description</span>
                                            </button>
                                            <button className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Share via WhatsApp">
                                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chat</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between border-t border-[#e5dcde] dark:border-[#4a3b40] bg-[#f4f0f1] dark:bg-[#2d1b20] px-6 py-4 rounded-xl">
                    <p className="text-sm text-[#88636c] dark:text-[#b08d96]">Showing <span className="font-bold text-[#181113] dark:text-white">1-5</span> of <span className="font-bold text-[#181113] dark:text-white">45</span> results</p>
                    <div className="flex gap-2">
                        <button className="rounded-lg border border-[#e5dcde] dark:border-[#4a3b40] bg-surface-light dark:bg-surface-dark px-3 py-1 text-sm font-medium text-[#181113] dark:text-white hover:bg-gray-50 dark:hover:bg-[#3d292e]">Previous</button>
                        <button className="rounded-lg border border-[#e5dcde] dark:border-[#4a3b40] bg-surface-light dark:bg-surface-dark px-3 py-1 text-sm font-medium text-[#181113] dark:text-white hover:bg-gray-50 dark:hover:bg-[#3d292e]">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
