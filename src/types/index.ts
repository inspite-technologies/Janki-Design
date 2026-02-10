// Common Response Wrapper
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    meta?: {
        total: number;
        page: number;
        limit: number;
    };
}
// Order Types
export type OrderStatus = 'Pending' | 'Processing' | 'Completed' | 'Cancelled' | 'Delivered' | 'Shipped';
export type OrderType = 'Stitching' | 'Boutique' | 'Alteration' | 'Custom';
export interface Order {
    id: string;
    customer_name: string;
    customer_id?: string;
    order_type: OrderType;
    status: OrderStatus;
    amount: number;
    date: string; // ISO Date string
    items?: number; // Count of items
    delivery_date?: string; // ISO Date string
}
// Customer Types
export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    location?: string;
    total_orders?: number;
    total_spent?: number;
    type?: 'Regular' | 'VIP' | 'New';
    avatar_url?: string;
    joined_date?: string;
}
// Product / Catalogue Types
export type ProductStockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Made to Order';
export interface Product {
    id: string;
    name: string;
    sku: string;
    price: number;
    category: string;
    subcategory?: string;
    stock_status: ProductStockStatus;
    image_url?: string; // Primary image (backward compatibility)
    images?: string[]; // Multiple images
    videos?: string[]; // Video URLs
    image_360?: string; // 360-degree image URL
    description?: string;
    is_stitch_to_order?: boolean;
}
// Inventory / Material Types
export interface InventoryItem {
    id: string;
    name: string;
    sku: string;
    type: 'Fabric' | 'Accessory' | 'Thread' | 'Other';
    quantity: number;
    unit: 'yds' | 'meters' | 'pieces' | 'rolls';
    min_stock_level: number;
    image_url?: string;
    stock_status: 'Healthy' | 'Low' | 'Critical';
    last_restocked?: string;
}
// Invoice Types
export interface Invoice {
    id: string;
    order_id?: string;
    client_name: string;
    date: string;
    amount: number;
    status: 'Paid' | 'Pending' | 'Overdue';
    pdf_url?: string;
}
// Dashboard Statistics
export interface DashboardStats {
    todays_revenue: number;
    new_stitching_orders: number;
    total_boutique_orders: number;
    pending_deliveries: number;
    low_stock_alerts: number;
    revenue_growth?: number; // Percentage
}
// Dashboard Extended Types
export interface RecentActivity {
    id: string;
    action: string;
    description: string;
    time: string;
    icon: string;
    icon_bg: string;
    icon_color: string;
}
export interface UrgentDelivery {
    id: string;
    customer_name: string;
    order_type: string;
    due_time: string;
    urgent_level: 'High' | 'Medium';
    image_url: string;
}
// Sales Data for Charts
export interface SalesData {
    date: string;
    day: string;
    sales: number;
    orders?: number;
}
// Tailor Management
export interface Tailor {
    id: string;
    name: string;
    specialization: 'Suits' | 'Dresses' | 'Alterations' | 'General' | 'Embroidery';
    phone: string;
    email?: string;
    status: 'Active' | 'On Leave' | 'Inactive';
    joined_date: string; // ISO
    current_load?: number; // Number of active orders
    rating?: number; // 0-5
    avatar_url?: string;
}
