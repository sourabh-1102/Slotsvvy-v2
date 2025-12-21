import { Parcel } from './api';

// Types matched to the existing frontend interfaces
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'SENDER' | 'STAFF' | 'DRIVER';
}

export interface Route {
  id: string;
  driverId: string;
  date: string;
  pincode: string;
  stops: any[];
}

// Initial Mock Data
const MOCK_USERS: User[] = [
  { id: 'u1', email: 'sender@example.com', name: 'John Doe', role: 'SENDER' },
  { id: 'u2', email: 'staff@example.com', name: 'Alice Staff', role: 'STAFF' },
  { id: 'u3', email: 'driver@example.com', name: 'Bob Driver', role: 'DRIVER' },
];

const MOCK_PARCELS: Parcel[] = [
  {
    id: 'TRK-2023-001',
    trackingId: 'TRK-2023-001',
    sender: 'John Doe',
    senderAddress: '123 Main St, Bangalore',
    receiver: 'Jane Smith',
    address: '456 Cross Rd, Koramangala, Bangalore',
    phone: '9876543210',
    weight: '2.5',
    pincode: '560034',
    status: 'DELIVERED',
    slot: '09:00 - 11:00 AM',
    driverId: 'D-01',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'TRK-2023-002',
    trackingId: 'TRK-2023-002',
    sender: 'John Doe',
    senderAddress: '123 Main St, Bangalore',
    receiver: 'Mike Ross',
    address: '789 High St, Indiranagar, Bangalore',
    phone: '9876543211',
    weight: '1.0',
    pincode: '560038',
    status: 'SCHEDULED',
    slot: '14:00 - 16:00 PM',
    driverId: null,
    createdAt: new Date().toISOString(),
  }
];

class MockDatabase {
  private users: User[] = [...MOCK_USERS];
  private parcels: Parcel[] = [...MOCK_PARCELS];
  private routes: Route[] = [];

  // User Methods
  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email);
  }

  // Parcel Methods
  async getAllParcels(): Promise<Parcel[]> {
    return this.parcels;
  }

  async getParcelByTrackingId(id: string): Promise<Parcel | undefined> {
    return this.parcels.find(p => p.id === id || p.trackingId === id);
  }

  async createParcel(data: Omit<Parcel, 'id' | 'createdAt'>): Promise<Parcel> {
    const newParcel: Parcel = {
      ...data,
      id: `TRK-${new Date().getFullYear()}-${String(this.parcels.length + 1).padStart(3, '0')}`,
      trackingId: `TRK-${new Date().getFullYear()}-${String(this.parcels.length + 1).padStart(3, '0')}`,
      status: 'SCHEDULED',
      createdAt: new Date().toISOString(),
    };
    this.parcels.unshift(newParcel); // Add to top
    return newParcel;
  }

  async updateParcelStatus(id: string, status: string): Promise<Parcel | null> {
    const parcel = this.parcels.find(p => p.id === id);
    if (!parcel) return null;
    parcel.status = status;
    return parcel;
  }

  // Route Methods
  async createRoute(route: Route): Promise<Route> {
    const newRoute = { ...route, id: `R-${Date.now()}` };
    this.routes.push(newRoute);
    return newRoute;
  }
}

// Singleton instance
export const mockDb = new MockDatabase();
