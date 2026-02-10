import axios, { AxiosResponse, AxiosError } from 'axios';
import {
    Order,
    Customer,
    Product,
    Invoice,
    InventoryItem,
    DashboardStats,
    ApiResponse,
    Tailor
} from '@/types';
import {
    MOCK_ORDERS,
    MOCK_CUSTOMERS,
    MOCK_INVENTORY,
    MOCK_TAILORS,
    MOCK_PRODUCTS,
    MOCK_DASHBOARD_STATS
} from './mock-data';

// API Configuration
const API_BASE_URL = 'http://localhost:3333/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000, // Reduced to 5 seconds for faster fallback
});

// Request Interceptor (for Auth tokens in future)
apiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('authToken');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => Promise.reject(error)
);

// Initialize local mock data
let localCustomers = [...MOCK_CUSTOMERS];
let localOrders = [...MOCK_ORDERS];
let localInventory = [...MOCK_INVENTORY];
let localTailors = [...MOCK_TAILORS]; // Mutable in-memory store for tailors
let localProducts = [...MOCK_PRODUCTS]; // Mutable in-memory store for products

// ... (rest of imports)

// Response Interceptor (for global error handling & MOCK FALLBACK)
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        // Mock data fallback for demonstration when backend is offline
        const url = error.config?.url;
        const method = error.config?.method?.toLowerCase();

        console.warn(`[API] Intercepted Error: ${error.message}`);
        console.warn(`[API] Config URL: "${url}", Method: "${method}"`);

        // --- CUSTOMERS MOCK HANDLER ---
        // Relaxed check: just 'customers' to catch 'customers', '/customers', '/api/customers'
        if (url && url.includes('customers')) {
            console.warn('[API] Handling Customers Mock Fallback');
            // GET: List/Search/Pagination
            if (method === 'get') {
                const params = error.config?.params || {};
                console.warn('[API] GET Params:', JSON.stringify(params));
                console.warn(`[API] localCustomers length: ${localCustomers.length}`);

                const search = (params.search || '').toLowerCase();
                const page = parseInt(params.page as string) || 1;
                const limit = parseInt(params.limit as string) || 10;

                // 1. Filter
                let filtered = localCustomers.filter(c =>
                    (c.name || '').toLowerCase().includes(search) ||
                    (c.email || '').toLowerCase().includes(search) ||
                    (c.id || '').toLowerCase().includes(search)
                );
                console.warn(`[API] Filtered ${localCustomers.length} -> ${filtered.length} customers`);

                // 2. Paginate
                const start = (page - 1) * limit;
                const end = start + limit;
                const paginated = filtered.slice(start, end);

                return {
                    data: {
                        success: true,
                        data: paginated,
                        meta: {
                            total: filtered.length,
                            page,
                            limit,
                            totalPages: Math.ceil(filtered.length / limit)
                        }
                    }
                };
            }

            // POST: Create
            if (method === 'post') {
                console.log('[API] POST Data Raw:', error.config?.data);
                let newData;
                try {
                    newData = typeof error.config?.data === 'string' ? JSON.parse(error.config?.data) : error.config?.data;
                } catch (e) {
                    console.error('[API] Failed to parse POST data', e);
                    newData = {};
                }

                const newCustomer = {
                    ...newData,
                    id: `#JD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                    avatar_url: '', // Default or random
                    type: newData.type || 'New'
                };

                localCustomers.unshift(newCustomer); // Add to beginning
                console.log('[API] Created new mock customer:', newCustomer);
                console.log('[API] New Local Data Count:', localCustomers.length);

                return { data: { success: true, data: newCustomer } };
            }
        }

        // --- ORDERS MOCK HANDLER ---
        if (url?.includes('/orders')) {
            // GET /orders (List)
            if (method === 'get' && !url.match(/\/orders\/.+/)) {
                // Initial load of localOrders if empty (optional, but good for persistence across hot reloads if var is outside)
                // Note: localOrders is defined below, make sure to move it up or use a module-level var.
                // actually, I need to define localOrders at the top level of the file like localCustomers.
                // Since I can't easily move code blocks around with replace_file_content if they are far apart, 
                // I will rely on the fact that I'll add localOrders definition in a separate replace call or just use the MOCK_ORDERS if local is empty.

                // Let's assume I will add `localOrders` at the top.
                return { data: { success: true, data: localOrders } };
            }

            // GET /orders/:id
            if (method === 'get' && url.match(/\/orders\/.+/)) {
                const id = decodeURIComponent(url.split('/orders/')[1]);
                const order = localOrders.find(o => o.id === id);
                if (order) return {
                    data: {
                        success: true,
                        data: order
                    }
                };
                return {
                    data: {
                        success: true,
                        data: null
                    }
                };
            }

            // POST /orders (Create)
            if (method === 'post') {
                let newData;
                try {
                    newData = typeof error.config?.data === 'string' ? JSON.parse(error.config?.data) : error.config?.data;
                } catch (e) {
                    newData = {};
                }

                const newOrder = {
                    ...newData,
                    id: `#ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
                    date: new Date().toISOString(),
                };
                localOrders.unshift(newOrder);
                return { data: { success: true, data: newOrder } };
            }

            // PUT /orders/:id (Update)
            if (method === 'put') {
                const id = decodeURIComponent(url.split('/orders/')[1]);
                let updateData;
                try {
                    updateData = typeof error.config?.data === 'string' ? JSON.parse(error.config?.data) : error.config?.data;
                } catch (e) {
                    updateData = {};
                }

                const index = localOrders.findIndex(o => o.id === id);
                if (index !== -1) {
                    localOrders[index] = { ...localOrders[index], ...updateData };
                    return { data: { success: true, data: localOrders[index] } };
                }
                return Promise.reject(new Error('Order not found'));
            }
        }

        // --- INVENTORY MOCK HANDLER ---
        if (url?.includes('/inventory/materials')) {
            // Ensure data is initialized
            if (localInventory.length === 0 && MOCK_INVENTORY.length > 0) {
                console.log('[API] Re-initializing localInventory from MOCK_INVENTORY');
                localInventory = [...MOCK_INVENTORY];
            }

            // GET /inventory/materials (List)
            if (method === 'get' && !url.match(/\/inventory\/materials\/.+/)) {
                const params = error.config?.params || {};
                const type = params.type;
                const search = (params.search || '').toLowerCase();

                let data = localInventory;

                if (type) {
                    data = data.filter(item => item.type === type);
                }

                if (search) {
                    data = data.filter(item =>
                        item.name.toLowerCase().includes(search) ||
                        item.sku.toLowerCase().includes(search)
                    );
                }

                return { data: { success: true, data } };
            }

            // Helper to clean ID from URL
            const getIdFromUrl = (url: string) => {
                const path = url.split('/inventory/materials/')[1];
                if (!path) return '';
                // Remove query params if any
                const segment = path.split('?')[0];
                return decodeURIComponent(segment);
            };

            // GET /inventory/materials/:id
            if (method === 'get' && url.match(/\/inventory\/materials\/.+/)) {
                const id = getIdFromUrl(url);
                const item = localInventory.find(i => i.id === id);
                if (item) return { data: { success: true, data: item } };
                return { data: { success: true, data: null } };
            }

            // POST /inventory/materials (Create)
            if (method === 'post') {
                let newData;
                try {
                    newData = typeof error.config?.data === 'string' ? JSON.parse(error.config?.data) : error.config?.data;
                } catch (e) {
                    newData = {};
                }
                const newItem = {
                    ...newData,
                    id: `#MAT-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
                    last_restocked: new Date().toISOString(),
                };
                localInventory.unshift(newItem);
                return { data: { success: true, data: newItem } };
            }

            // PUT /inventory/materials/:id (Update)
            if (method === 'put') {
                const id = getIdFromUrl(url);
                let updateData;
                try {
                    updateData = typeof error.config?.data === 'string' ? JSON.parse(error.config?.data) : error.config?.data;
                } catch (e) {
                    updateData = {};
                }
                const index = localInventory.findIndex(i => i.id === id);
                if (index !== -1) {
                    localInventory[index] = { ...localInventory[index], ...updateData };
                    return { data: { success: true, data: localInventory[index] } };
                }
                return Promise.reject(new Error('Item not found'));
            }

            // DELETE /inventory/materials/:id
            if (method === 'delete') {
                const id = getIdFromUrl(url);
                const index = localInventory.findIndex(i => i.id === id);
                if (index !== -1) {
                    localInventory.splice(index, 1);
                    return { data: { success: true } };
                }
                console.warn(`[API] Delete failed - Item ID ${id} not found in inventory of size ${localInventory.length}`);
                return Promise.reject(new Error('Item not found'));
            }
        }

        // --- TAILORS MOCK HANDLER ---
        if (url?.includes('/tailors')) {
            if (localTailors.length === 0 && MOCK_TAILORS.length > 0) {
                localTailors = [...MOCK_TAILORS];
            }

            const getId = (u: string) => {
                const path = u.split('/tailors/')[1];
                if (!path) return '';
                return decodeURIComponent(path.split('?')[0]);
            };

            // LIST
            if (method === 'get' && !url.match(/\/tailors\/.+/)) {
                const params = error.config?.params || {};
                const search = (params.search || '').toLowerCase();
                let data = localTailors;
                if (search) {
                    data = data.filter(t =>
                        t.name.toLowerCase().includes(search) ||
                        t.specialization.toLowerCase().includes(search)
                    );
                }
                return { data: { success: true, data } };
            }

            // GET ONE
            if (method === 'get' && url.match(/\/tailors\/.+/)) {
                const id = getId(url);
                const item = localTailors.find(t => t.id === id);
                return { data: { success: true, data: item || null } };
            }

            // CREATE
            if (method === 'post') {
                let newData;
                try {
                    newData = typeof error.config?.data === 'string' ? JSON.parse(error.config?.data) : error.config?.data;
                } catch (e) {
                    newData = {};
                }
                const newItem = {
                    ...newData,
                    id: `#TLR-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                    joined_date: new Date().toISOString().split('T')[0],
                    current_load: 0
                };
                localTailors.unshift(newItem);
                return { data: { success: true, data: newItem } };
            }

            // UPDATE
            if (method === 'put') {
                const id = getId(url);
                let updateData;
                try {
                    updateData = typeof error.config?.data === 'string' ? JSON.parse(error.config?.data) : error.config?.data;
                } catch (e) {
                    updateData = {};
                }
                const index = localTailors.findIndex(t => t.id === id);
                if (index !== -1) {
                    localTailors[index] = { ...localTailors[index], ...updateData };
                    return { data: { success: true, data: localTailors[index] } };
                }
            }

            // DELETE
            if (method === 'delete') {
                const id = getId(url);
                const index = localTailors.findIndex(t => t.id === id);
                if (index !== -1) {
                    localTailors.splice(index, 1);
                    return { data: { success: true } };
                }
            }
        }

        // --- PRODUCTS MOCK HANDLER ---
        if (url?.includes('/products')) {
            if (localProducts.length === 0 && MOCK_PRODUCTS.length > 0) {
                localProducts = [...MOCK_PRODUCTS];
            }

            const getIdFromUrl = (u: string) => {
                const path = u.split('/products/')[1];
                if (!path) return '';
                return decodeURIComponent(path.split('?')[0]);
            };

            // LIST
            if (method === 'get' && !url.match(/\/products\/.+/)) {
                const params = error.config?.params || {};
                const search = (params.search || '').toLowerCase();
                const category = params.category || '';
                let data = localProducts;

                if (search) {
                    data = data.filter(p =>
                        p.name.toLowerCase().includes(search) ||
                        p.sku.toLowerCase().includes(search) ||
                        p.category.toLowerCase().includes(search) ||
                        (p.description && p.description.toLowerCase().includes(search))
                    );
                }

                if (category && category !== 'All Items') {
                    data = data.filter(p => p.category === category);
                }

                return { data: { success: true, data } };
            }

            // GET ONE
            if (method === 'get' && url.match(/\/products\/.+/)) {
                const id = getIdFromUrl(url);
                const product = localProducts.find(p => p.id === id);
                if (product) {
                    return { data: { success: true, data: product } };
                }
                return Promise.reject(new Error('Product not found'));
            }

            // CREATE
            if (method === 'post') {
                // Parse the data - it might be a string or already an object
                let productData = error.config?.data;
                if (typeof productData === 'string') {
                    try {
                        productData = JSON.parse(productData);
                    } catch (e) {
                        console.error('Failed to parse product data:', e);
                    }
                }

                const newProduct: Product = {
                    ...productData,
                    id: `PRD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                };
                localProducts.unshift(newProduct);
                console.log('Product created:', newProduct);
                console.log('Total products:', localProducts.length);
                return { data: { success: true, data: newProduct } };
            }

            // UPDATE
            if (method === 'put') {
                const id = getIdFromUrl(url);
                const index = localProducts.findIndex(p => p.id === id);
                if (index !== -1) {
                    localProducts[index] = { ...localProducts[index], ...error.config?.data };
                    return { data: { success: true, data: localProducts[index] } };
                }
                return Promise.reject(new Error('Product not found'));
            }

            // DELETE
            if (method === 'delete') {
                const id = getIdFromUrl(url);
                const index = localProducts.findIndex(p => p.id === id);
                if (index !== -1) {
                    localProducts.splice(index, 1);
                    return { data: { success: true } };
                }
                return Promise.reject(new Error('Product not found'));
            }
        }

        // --- DASHBOARD STATS MOCK HANDLER ---
        if (url?.includes('/dashboard/stats')) {
            return { data: { success: true, data: MOCK_DASHBOARD_STATS } };
        }

        if (url?.includes('/dashboard/activity')) {
            const { MOCK_RECENT_ACTIVITY } = require('./mock-data');
            return { data: { success: true, data: MOCK_RECENT_ACTIVITY } };
        }

        if (url?.includes('/dashboard/urgent')) {
            const { MOCK_URGENT_DELIVERIES } = require('./mock-data');
            return { data: { success: true, data: MOCK_URGENT_DELIVERIES } };
        }

        if (url?.includes('/dashboard/sales')) {
            const { MOCK_SALES_DATA } = require('./mock-data');
            return { data: { success: true, data: MOCK_SALES_DATA } };
        }

        // Return empty lists for other endpoints to prevent crashes
        if (url?.includes('/products') || url?.includes('/invoices')) {
            return { data: { success: true, data: [] } };
        }

        return Promise.reject(error);
    }
);

// Generic API function wrapper
const requests = {
    get: <T>(url: string, params?: object) => apiClient.get<ApiResponse<T>>(url, { params }).then(res => res.data),
    post: <T>(url: string, body: object) => apiClient.post<ApiResponse<T>>(url, body).then(res => res.data),
    put: <T>(url: string, body: object) => apiClient.put<ApiResponse<T>>(url, body).then(res => res.data),
    delete: <T>(url: string) => apiClient.delete<ApiResponse<T>>(url).then(res => res.data),
};

// --- API Modules ---

// Dashboard
export const DashboardAPI = {
    getStats: () => requests.get<DashboardStats>('/dashboard/stats'),
    getRecentActivity: () => requests.get<import('@/types').RecentActivity[]>('/dashboard/activity'),
    getUrgentDeliveries: () => requests.get<import('@/types').UrgentDelivery[]>('/dashboard/urgent'),
    getSalesData: () => requests.get<import('@/types').SalesData[]>('/dashboard/sales'),
};

// Orders
export const OrdersAPI = {
    list: (params?: { page?: number; limit?: number; status?: string; search?: string }) =>
        requests.get<Order[]>('/orders', params),
    get: (id: string) => requests.get<Order>(`/orders/${encodeURIComponent(id)}`),
    create: (data: Omit<Order, 'id'>) => requests.post<Order>('/orders', data),
    update: (id: string, data: Partial<Order>) => requests.put<Order>(`/orders/${encodeURIComponent(id)}`, data),
    delete: (id: string) => requests.delete<void>(`/orders/${encodeURIComponent(id)}`),
};

// Customers - Fully Mocked for Frontend Demo
export const CustomersAPI = {
    list: async (params?: { page?: number; limit?: number; search?: string }) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const search = (params?.search || '').toLowerCase();
        const page = params?.page || 1;
        const limit = params?.limit || 10;

        let filtered = localCustomers.filter(c =>
            (c.name || '').toLowerCase().includes(search) ||
            (c.email || '').toLowerCase().includes(search) ||
            (c.id || '').toLowerCase().includes(search)
        );

        const start = (page - 1) * limit;
        const end = start + limit;
        const data = filtered.slice(start, end);

        return {
            success: true,
            data: data,
            meta: {
                total: filtered.length,
                page,
                limit,
                totalPages: Math.ceil(filtered.length / limit)
            }
        };
    },
    get: async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const customer = localCustomers.find(c => c.id === id);
        if (!customer) throw new Error('Customer not found');
        return customer;
    },
    create: async (data: Omit<Customer, 'id'>) => {
        await new Promise(resolve => setTimeout(resolve, 600));
        const newCustomer: Customer = {
            ...data,
            id: `#JD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
            avatar_url: data.avatar_url || '',
            type: data.type || 'New'
        };
        localCustomers.unshift(newCustomer);
        return newCustomer;
    },
    update: async (id: string, data: Partial<Customer>) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = localCustomers.findIndex(c => c.id === id);
        if (index === -1) throw new Error('Customer not found');
        localCustomers[index] = { ...localCustomers[index], ...data };
        return localCustomers[index];
    },
    // Adding delete for completeness
    delete: async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const index = localCustomers.findIndex(c => c.id === id);
        if (index === -1) throw new Error('Customer not found');
        localCustomers.splice(index, 1);
        return { success: true };
    }
};

// Inventory / Catalogue
export const InventoryAPI = {
    listMaterials: (params?: { type?: string; search?: string }) => requests.get<InventoryItem[]>('/inventory/materials', params),
    getMaterial: (id: string) => requests.get<InventoryItem>(`/inventory/materials/${encodeURIComponent(id)}`),
    createMaterial: (data: Omit<InventoryItem, 'id'>) => requests.post<InventoryItem>('/inventory/materials', data),
    updateMaterial: (id: string, data: Partial<InventoryItem>) => requests.put<InventoryItem>(`/inventory/materials/${encodeURIComponent(id)}`, data),
    deleteMaterial: (id: string) => requests.delete<void>(`/inventory/materials/${encodeURIComponent(id)}`),
};

// --- Tailors API ---
export const TailorsAPI = {
    list: (params?: { search?: string }) => requests.get<Tailor[]>('/tailors', params),
    get: (id: string) => requests.get<Tailor>(`/tailors/${encodeURIComponent(id)}`),
    create: (data: Omit<Tailor, 'id'>) => requests.post<Tailor>('/tailors', data),
    update: (id: string, data: Partial<Tailor>) => requests.put<Tailor>(`/tailors/${encodeURIComponent(id)}`, data),
    delete: (id: string) => requests.delete<void>(`/tailors/${encodeURIComponent(id)}`),
};

export const ProductsAPI = {
    list: (params?: { search?: string; category?: string }) => requests.get<Product[]>('/products', params),
    get: (id: string) => requests.get<Product>(`/products/${encodeURIComponent(id)}`),
    create: (data: Omit<Product, 'id'>) => requests.post<Product>('/products', data),
    update: (id: string, data: Partial<Product>) => requests.put<Product>(`/products/${encodeURIComponent(id)}`, data),
    delete: (id: string) => requests.delete<void>(`/products/${encodeURIComponent(id)}`),
};

// Invoices
export const InvoicesAPI = {
    list: (params?: { status?: string }) => requests.get<Invoice[]>('/invoices', params),
};

export default apiClient;
