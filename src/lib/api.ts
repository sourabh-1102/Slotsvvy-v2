const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface Parcel {
    id: string; // The friendly tracking ID
    trackingId?: string; // Mongoose/Prisma difference
    sender: string;
    senderAddress?: string;
    receiver: string;
    address: string;
    phone?: string;
    weight: string;
    pincode: string;
    status: string;
    slot: string;
    driverId?: string | null;
    createdAt?: string;
}

export interface Credentials {
    email?: string;
    password?: string;
    [key: string]: string | undefined;
}

export interface Driver {
    id: string;
    name: string;
    status: string; // 'ON_DUTY' | 'OFF_DUTY' | 'BUSY' | 'ON_BREAK'
    vehicle: string;
    phone: string;
    rating: number;
    current_load: number;
    max_capacity: number;
    shift_end: string;
    capacity_used: number;
    [key: string]: any;
}

export interface ParcelCreateData {
    sender: string;
    receiver: string;
    [key: string]: any; // Allow flexibility for now but prefer strictness
}

export const api = {
    auth: {
        login: async (credentials: Credentials) => {
            const res = await fetch(`${API_URL}/auth/login`, {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(credentials),
            });
            if (!res.ok) throw new Error('Login failed');
            return res.json();
        }
    },
    parcels: {
        list: async (): Promise<Parcel[]> => {
            try {
                const url = `${API_URL}/parcels`;
                console.log("Fetching parcels from:", url);
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error(`Failed to fetch parcels: ${res.status} ${res.statusText}`);
                }
                return res.json();
            } catch (error) {
                console.error("API List Parcels Error:", error);
                // Return empty array instead of crashing to allow UI to render
                return []; 
            }
        },
        create: async (data: ParcelCreateData): Promise<{ success: boolean; parcel: Parcel; message: string }> => {
            const res = await fetch(`${API_URL}/parcels`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to create parcel');
            }
            return res.json();
        },
        track: async (id: string) => {
             const res = await fetch(`${API_URL}/tracking/${id}`);
             if (!res.ok) return null;
             return res.json();
        }
    },
    slots: {
        recommend: async (pincode: string, date: string, weight: number) => {
             const res = await fetch(`${API_URL}/slots/recommend?pincode=${pincode}&date=${date}&weight=${weight}`);
             return res.json();
        }
    },
    routes: {
        compute: async (date: string, pincode: string) => {
             const res = await fetch(`${API_URL}/routes/compute?date=${date}&pincode=${pincode}`, {
                 method: 'POST'
             });
             return res.json();
        }
    },
    ai: {
        getInsights: async (question: string, context: Record<string, unknown>) => {
            const res = await fetch(`${API_URL}/ai/insights`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question, context }),
            });
            if (!res.ok) throw new Error('Failed to get AI insights');
            return res.json();
        }
    }
};
