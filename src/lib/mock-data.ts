import { Order, Customer, InventoryItem, Product, Invoice, DashboardStats } from '@/types';

export const MOCK_ORDERS: Order[] = [
    { id: "#ORD-2459", customer_name: "Aria Sterling", order_type: "Stitching", status: "Processing", amount: 12500, date: "2023-10-24", items: 2 },
    { id: "#ORD-2458", customer_name: "Priya Sharma", order_type: "Boutique", status: "Pending", amount: 4200, date: "2023-10-24", items: 1 },
    { id: "#ORD-2457", customer_name: "Nia Patel", order_type: "Stitching", status: "Completed", amount: 28000, date: "2023-10-23", items: 3 },
    { id: "#ORD-2456", customer_name: "Anjali Gupta", order_type: "Boutique", status: "Cancelled", amount: 1500, date: "2023-10-23", items: 1 },
    { id: "#ORD-2455", customer_name: "Meera Reddy", order_type: "Stitching", status: "Delivered", amount: 8900, date: "2023-10-22", items: 1 },
    { id: "#ORD-2454", customer_name: "Sana Khan", order_type: "Stitching", status: "Processing", amount: 45000, date: "2023-10-22", items: 4 },
    { id: "#ORD-2453", customer_name: "Riya Singh", order_type: "Boutique", status: "Completed", amount: 3800, date: "2023-10-21", items: 2 },
    { id: "#ORD-2452", customer_name: "Kavita Das", order_type: "Stitching", status: "Pending", amount: 6500, date: "2023-10-21", items: 1 },
];

export const MOCK_CUSTOMERS: Customer[] = [
    {
        id: "#JD-001",
        name: "Jithesh",
        type: "VIP",
        location: "Kerala, India",
        phone: "+91 98765 43210",
        email: "jithesh@example.com",
        avatar_url: ""
    }
];

export const MOCK_INVENTORY: InventoryItem[] = [
    {
        id: "1",
        name: "Royal Crimson Velvet",
        sku: "VLV-402",
        type: "Fabric",
        quantity: 12.5,
        unit: "yds",
        min_stock_level: 20,
        image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVB_4T5IrTPdRiugkEjAERYEOBhrn6gSe5ZBmHAeRDLuzYapz-wnQpADqhVdB7ycUQ8U9KK87Cw7gcWPF-_7RozJ4Ya6Hp59rnqFuE4fzlV0X9Cuk22vYBdin1P-QtaHXmZ7BS-oDslJs9wjzM66aHBFCxqkApLwB1l70s0wLQR55GpQmWBnWQ6iOAKbN9siI7Ap7lTObHrep1imIyqy6xGjxwFZ-AzkmX-_Q9Sa41UkVHDRE_2DSS3p2wx03uP55vWTJ2bbcia7c",
        stock_status: "Low"
    },
    {
        id: "2",
        name: "Champagne Gold Silk",
        sku: "SLK-108",
        type: "Fabric",
        quantity: 85.0,
        unit: "yds",
        min_stock_level: 15,
        image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdyuHlA0eOEJDfXs88RujOQmaNPDOJNiRGCVa31MclMkyCnl8mUXqGnaExT-drFjfQXVQXFmWtGosml9jDYrxIyPE8AveKA15i388TNfDKPYfv2RVNV8sVN_dVbwGXQVH26lRKdcCRLcZxkFY2ZeHuI6GOw65WvVGgqWIlD9qtojPbwUbWtsxi-7GBY2VJSQNjQ9kb218BlBO_G9ec0StS81ZO8EGBKrIs_IqSmaDoYThpHVLufbmn5kAZoZYKbFkYAIvJOaId2ao",
        stock_status: "Healthy"
    },
    {
        id: "3",
        name: "Vintage Brass Button",
        sku: "BTN-005",
        type: "Accessory",
        quantity: 140,
        unit: "pieces",
        min_stock_level: 50,
        image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVBt3xfGOT4ZNS-R-tiZWv6Q7KjPMRVZgN2EyIKJCOd8i1EUpd-X3N6pg3u1kIgHW5urvSejY6BAgFEo_9qmn_Bc0U81HK-HkFQgveyIXi4N3dI05KSTpzGisJ5Mi55hcFgy7uHPfUE4Iww6XBKm6Dw_JPAyzzRtH_B8MoKg3-IQgIhNk3Betjtdq159YvI6DJllwjV-bBStx2BnFh2TRlgLGgq0JhVtLwwLG3bA9a42yFFn0B0NqTUiIWOHicNd-NObavmq041U8",
        stock_status: "Healthy"
    },
    {
        id: "4",
        name: "Organic White Linen",
        sku: "LIN-201",
        type: "Fabric",
        quantity: 210.0,
        unit: "yds",
        min_stock_level: 30,
        image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpGdO0S79l1qdf7Lr6suJeV-OuETZgNmCI4hW--MTqe4_CurjxMqQkvDwUH3gaew5fw2NFIIGqWLV1gI3a_OF0xxXWWH0egmSdPiv_rbgKU9tCMUrzZgH24_gdA_TolVdSya_5-EAdwQfADQY8ZU9aLUwzFW6X_ZkH6g4iTWqu7--ZHG6vlI9fcUQj7M4_4Mw-ZmTUvwEYbSrHjZ_Pvaw1YipG0JX7AZpPYHcBgkwZPMvsVX34jF2eQM7OipkrkfeEgUujxGIsZTA",
        stock_status: "Healthy"
    },
    {
        id: "5",
        name: "Midnight Floral Print",
        sku: "CTN-882",
        type: "Fabric",
        quantity: 45.0,
        unit: "yds",
        min_stock_level: 10,
        image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCj6OnH7eq973XfRIcLHqgQJ3NLg6ysV7gzFnEqxq8fbUpUgH3uNuIjBV-3nzVYcLpSVBygZpY3R38fdAndj32EK3HagsZc2A2fSSltaHNXA1IHT2FjuVx_iTXd6iD3mBw0eX1wwo8RPl06wvS3_viHuzW2XRacwHvPeyfSs_PfKTaHt_CEJuKQj0-csDG9yjFwNp-4r1QZ-I5G7BEaNUwkEpvJtlDZRL1YAsWzdJUjJ0Wr1ArjdRMltwmDyFLZXwrnPLCnTTYOWtE",
        stock_status: "Healthy"
    },
];

export const MOCK_DASHBOARD_STATS: DashboardStats = {
    todays_revenue: 45200,
    new_stitching_orders: 12,
    total_boutique_orders: 8,
    pending_deliveries: 4,
    low_stock_alerts: 14,
    revenue_growth: 12
};

export const MOCK_RECENT_ACTIVITY: import('@/types').RecentActivity[] = [
    {
        id: "1",
        action: "Order #402 Completed",
        description: "Tailor Rahul marked the suit as ready for trial.",
        time: "2m ago",
        icon: "check_circle",
        icon_bg: "bg-green-100 dark:bg-green-900/20",
        icon_color: "text-green-600 dark:text-green-400"
    },
    {
        id: "2",
        action: "New Order #405",
        description: "Received new stitching order for Mr. Mehta.",
        time: "15m ago",
        icon: "add_shopping_cart",
        icon_bg: "bg-blue-100 dark:bg-blue-900/20",
        icon_color: "text-blue-600 dark:text-blue-400"
    },
    {
        id: "3",
        action: "Payment Received",
        description: "Payment of ₹12,500 received via UPI.",
        time: "1h ago",
        icon: "payments",
        icon_bg: "bg-yellow-100 dark:bg-yellow-900/20",
        icon_color: "text-yellow-600 dark:text-yellow-400"
    },
    {
        id: "4",
        action: "Low Stock Alert",
        description: "Gold Silk fabric is running low (below 15yds).",
        time: "3h ago",
        icon: "warning",
        icon_bg: "bg-red-100 dark:bg-red-900/20",
        icon_color: "text-red-600 dark:text-red-400"
    }
];

export const MOCK_URGENT_DELIVERIES: import('@/types').UrgentDelivery[] = [
    {
        id: "1",
        customer_name: "Mr. Sharma (Suit)",
        order_type: "Stitching",
        due_time: "Due: 5:00 PM Today",
        urgent_level: "High",
        image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPnTKkFVqqlhKNxVE72ASHTI4WRDz-lhLIcZoNxvVaLCSpj80mpeePb4ySArwl2W6_UvltfR_uPWP--427ITFV_ut4KOpGtD2IMuRimA1I4OQMRngDSWieKBXKHNAKMK-c4V6xmRVFXLflAgeDV_infjIKKhur5A6hRMZIz9mx0Fk3KBzuk4RGNKRS928KRSpmTYvOlbzr1zblx9Gg02Vs7urKrW3vWE-6Qx_0alYnVmmuPdV-qbTnX8KglNzxokjxG7HHdPKvtlk"
    },
    {
        id: "2",
        customer_name: "Ms. Gupta (Lehenga)",
        order_type: "Boutique",
        due_time: "Due: Tomorrow Morning",
        urgent_level: "Medium",
        image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3GDlGyTg5-0kbYM0Ad9hHJ-5LEQbERJ53StLzadPkJSmngBl5_tGUJkP9XZ0CScyrgIfb2CdtLwfM9qdCAdBlHQ6GJp8Sc5xA6sCN5pNIqxcDj-feG0qiSWjqDoAEb3d68onVUiJxctACoMzEFUMlIYQrJ-cNUhOwj-Vny4LiENN78pzYKrDs84ZNpJW9pl6JHC_Quogv1fGI4LP3nQgT5Txy-VqRPe8Wik2LF8prWH3mvku7cMeWhtfsMDD_HK1jKAsAXONM32k"
    },
    {
        id: "3",
        customer_name: "Mrs. Verma (Blouse)",
        order_type: "Alteration",
        due_time: "Due: Tomorrow Evening",
        urgent_level: "Medium",
        image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBulSIZp298li42a8vmfIHjuh7naYOWMwTKdfY5PqAk2Cs6o-fH77fERNc5HvCSmP2aSmDkGzf-0bjc7YMJjZ9z6ty6j758WLmdNQaH27-mvGS676PfkCGWmJaR9AmugbqITSDh9PZnG9YE1JQs682zQ0DsmRuLk3FRp9gPfBAQyk9dHqPSnfxxTGFmFL9MO1-1ExnThJgPsco5PfxSWpPZocdHSsUPDqhd4ddydp5mj6BNoXQ6z4pLaAgy-VBJWwtbwGoANyS7uzc"
    }
];

export const MOCK_SALES_DATA: import('@/types').SalesData[] = [
    { day: "Mon", stitching: 10, products: 5 },
    { day: "Tue", stitching: 25, products: 15 },
    { day: "Wed", stitching: 18, products: 10 },
    { day: "Thu", stitching: 30, products: 20 },
    { day: "Fri", stitching: 45, products: 25 },
    { day: "Sat", stitching: 60, products: 40 },
    { day: "Sun", stitching: 50, products: 35 },
];

export const MOCK_TAILORS: import('@/types').Tailor[] = [
    {
        id: "#TLR-001",
        name: "Rahul Sharma",
        specialization: "Suits",
        phone: "+91 98765 00001",
        status: "Active",
        joined_date: "2022-01-15",
        current_load: 3,
        rating: 4.8,
        avatar_url: ""
    },
    {
        id: "#TLR-002",
        name: "Sita Devi",
        specialization: "Dresses",
        phone: "+91 98765 00002",
        status: "Active",
        joined_date: "2022-03-10",
        current_load: 5,
        rating: 4.9,
        avatar_url: ""
    },
    {
        id: "#TLR-003",
        name: "Amit Patel",
        specialization: "Alterations",
        phone: "+91 98765 00003",
        status: "On Leave",
        joined_date: "2023-06-01",
        current_load: 0,
        rating: 4.5,
        avatar_url: ""
    }
];

export const MOCK_PRODUCTS: Product[] = [
    {
        id: 'BNR-2024-001',
        name: 'Banarasi Silk Saree',
        sku: 'BNR-2024-001',
        price: 12500,
        category: 'Sarees',
        stock_status: 'Low Stock',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZdz9D7vS9hL1PfqSNI3aLu4QwmAj7AsYr4mPVqgddfFZ_RWlwMCmXTrYfJ3oXcxctKDG_hGAAT0ckO1etWNwWTw9epDQzvIKdmKFgZqBK1HoiA8OoXvQXszb0HT9LU-aH4vTW2sQ8CxurhcpsrTVmQ2PKYBEKGcqv_uurVVxnQ8nfG66cau8YeUY4SJGLN76LaxUEV9UeNdGGaDmnt24Os84tixOmVe9mqY6iOibPnqGjdvf1LaxK_87zQ5px_XX2vluc-FAogo0',
        description: 'Luxurious Banarasi silk saree with intricate golden zari work',
        is_stitch_to_order: true
    },
    {
        id: 'LEH-RED-99',
        name: 'Crimson Bridal Lehenga',
        sku: 'LEH-RED-99',
        price: 45000,
        category: 'Bridal Wear',
        stock_status: 'Made to Order',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx15v__MeFqzYZLQpfVaXzjCEekx4LOzWWsSk5aOV1VQlkK9RfiTuUr71XfjoZuUJ8X4wwwGucQm25YfK8byqtLgS8DkVk-KoQQVOViFkWonmDNDXGxsOPiIqONCJWtzAHDGkSDNtBKl1A87l8RGO7FliMRco1DFh-4CgKENNueRKovvWri1i0GBMZf9US9Me54H4nBKBcu0ns7mMR4Z9p7bv8BnQSZO1h8fCtTBJOtyOUMbfc-VJwchEVTppEaJVC7m4Z7c8Xibs',
        description: 'Stunning crimson bridal lehenga with heavy embroidery',
        is_stitch_to_order: true
    },
    {
        id: 'KRT-BLK-005',
        name: 'Cotton Block Print Kurti',
        sku: 'KRT-BLK-005',
        price: 2200,
        category: 'Kurtis',
        stock_status: 'In Stock',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfq27wsmo6Zsslz2RtWQY66OJKU10MUaWWoBpxtn09nd82f3gLnsaQs-_ky7JqO21gNCeUP_i039ebV5szcF98bOk1Di9nEclYiTtwiWa_HSvIa0vk6uZ4Czwwr5RqwuCdB19zoOVfqVEHGIWyIf3JylxBrWss_oYvtqPdxTvy-p7IQb-Obw1ABfqZ79zAlLioO9jfqJ4j_51hiZzD4AqxH55W8SZO2jVSBvRczNVZpaj-1HUkREXsl2cKQypNscbVIJ0W4WHva3g',
        description: 'Comfortable cotton kurti with traditional block print design',
        is_stitch_to_order: false
    },
    {
        id: 'ZAR-VEL-112',
        name: 'Zardozi Velvet Suit',
        sku: 'ZAR-VEL-112',
        price: 8990,
        category: 'Suits',
        stock_status: 'Out of Stock',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuoIDAe5wmBrWQt8TPkVed4NcECqEF2MqYzoq3Uo3A8HX-7xtosgyXs-7AR2fkmAihb7rbnNjPs5vG5TD_bzeoA7w4B-rMD8WGUR_t7ipfeC3cFFCTNH_pxQ6YVn82ff6bxJtnHPLyraZuUNQGLp0-DG7TIIiK_M0v48BsggzOmpgErVTw39pegu4nCY-sXCFBClQ3W3p2wKeT4cVMWSTZgz7cJf7jg2dyiVMIjBWRYRQxyURK6jT7JQ4Nkf46mAhKPNzwl9G9SAY',
        description: 'Elegant velvet suit with exquisite zardozi embroidery',
        is_stitch_to_order: true
    },
    {
        id: 'MAT-FLR-202',
        name: 'Floral Maxi Dress',
        sku: 'MAT-FLR-202',
        price: 3450,
        category: 'Maternity',
        stock_status: 'In Stock',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0ENUuLMWxG8LeY27t8vC5PATGLMOM9Ogw12UAgp08Io8AxzRL5Wf4F10aT87dlVeKj8dK5j6dMQajwIkbKUDEIvxPqPKD2Pzi7CvhRjy4R4hwAMhGkiP2uVC3zK80hijdUW_Oeb7iAz3De2r7S5rOwfh2G0M4GAiuRHCRTykaWfEhLZRCXVQA_unSwZ5wRAZ19mTMJY2qVN6CRa_iT2bINyBZEGMyaON85r4rLwJkkKonBllCVGbFCLAu-FDE90g6zmFx2qp8oQs',
        description: 'Comfortable floral print maxi dress for maternity wear',
        is_stitch_to_order: false
    },
    {
        id: 'ACC-GLD-088',
        name: 'Embroidered Clutch',
        sku: 'ACC-GLD-088',
        price: 4100,
        category: 'Accessories',
        stock_status: 'In Stock',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEJiUCrw-OvAWpKgeNdeS9_pff01LJ970VhV18k1QporCWw_Ca0NFyVq2KtqFGLtriG2WX4EG7STrvU-jfldbDg95pDkBDwfmUsN1XdBHoxwETuY9IdW-qUTm5PvAmRRzZNUf-Bws8hjPJ3POH4U1kpqhE4Vic1uWa19rYakcuR-o6TnqETckWVfoKXucehgX2U-lbXLEWdbF-jVct81MwNfw-XO1FO55n11W747dNtkrFds58i3PHAStioueaTkYlArG4I4uv8D4',
        description: 'Elegant golden embroidered clutch for special occasions',
        is_stitch_to_order: false
    },
];
