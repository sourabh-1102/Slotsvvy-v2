export interface Driver {
    id: string;
    name: string;
    vehicle: string;
    status: string;
    phone: string;
    capacity_used: number;
    max_capacity: number;
    current_load: number;
    shift_end: string;
    rating: number;
}
