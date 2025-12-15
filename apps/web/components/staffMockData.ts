export const MOCK_KPIS = {
  totalParcels: 142,
  scheduled: 85,
  outForDelivery: 42,
  delivered: 12,
  failed: 3,
  pendingReschedule: 5,
  slotUtilization: 78,
  alerts: [
    { id: 1, type: 'warning', message: 'Slots in Pincode 110001 are nearing capacity (90%).' },
    { id: 2, type: 'critical', message: 'Route recomputation required for Driver D-04 due to traffic.' },
    { id: 3, type: 'info', message: '5 new reschedule requests pending approval.' }
  ]
};

export const MOCK_DRIVERS = [
  { id: 'D-01', name: 'Ramesh Kumar', vehicle: 'Van (KA-01-8888)', status: 'ON_DUTY', phone: '9876543210', capacity_used: 85, max_capacity: 100, current_load: 12, shift_end: '18:00', rating: 4.8 },
  { id: 'D-02', name: 'Suresh Singh', vehicle: 'Bike (KA-05-1234)', status: 'BUSY', phone: '9876543211', capacity_used: 90, max_capacity: 40, current_load: 8, shift_end: '16:00', rating: 4.5 },
  { id: 'D-03', name: 'Alex John', vehicle: 'Van (KA-51-5555)', status: 'ON_BREAK', phone: '9876543212', capacity_used: 10, max_capacity: 100, current_load: 2, shift_end: '20:00', rating: 4.9 },
  { id: 'D-04', name: 'Maria Garcia', vehicle: 'Scooter (KA-03-9999)', status: 'OFF_DUTY', phone: '9876543213', capacity_used: 0, max_capacity: 30, current_load: 0, shift_end: '14:00', rating: 4.7 },
];

export const MOCK_SLOTS_STATS = [
  { time: '09:00 - 11:00', capacity: 50, booked: 45, utilization: 90 },
  { time: '11:00 - 13:00', capacity: 50, booked: 30, utilization: 60 },
  { time: '14:00 - 16:00', capacity: 50, booked: 48, utilization: 96 },
  { time: '16:00 - 18:00', capacity: 50, booked: 20, utilization: 40 },
];

export const STATUSES = ['SCHEDULED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'FAILED', 'PENDING_RESCHEDULE'];
export const LOCATIONS = ['Koramangala, Blr', 'Indiranagar, Blr', 'HSR Layout, Blr', 'Whitefield, Blr'];
export const CONST_PINCODES = ['560034', '560038', '560102', '560066'];
export const CONST_SLOTS = ['09:00 - 11:00 AM', '11:00 - 01:00 PM', '02:00 - 04:00 PM', '04:00 - 06:00 PM'];

export const generateMockParcels = (count = 50) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `P-${1000 + i}`,
    sender: `Sender ${i + 1}`,
    receiver: `Receiver ${i + 1}`,
    address: LOCATIONS[i % LOCATIONS.length],
    pincode: '110001',
    slot: '09:00 - 11:00 AM',
    status: STATUSES[i % STATUSES.length],
    driverId: i % 3 === 0 ? `D-0${(i % 3) + 1}` : null,
    weight: ((i % 5) + 0.5).toFixed(1),
    eta: '10:30 AM'
  }));
};

export const MOCK_PARCELS = generateMockParcels();

export const MOCK_COORDINATES = [
    { lat: 12.9716, lng: 77.5946 }, // Bangalore Center
    { lat: 12.9279, lng: 77.6271 }, // Koramangala
    { lat: 12.9784, lng: 77.6408 }, // Indiranagar
    { lat: 12.9141, lng: 77.6101 }, // BTM Layout
    { lat: 12.9352, lng: 77.6245 }, // Sony World Signal
    { lat: 12.9698, lng: 77.7500 }, // Whitefield
    { lat: 13.0354, lng: 77.5988 }, // Hebbal
    { lat: 12.9345, lng: 77.6050 }, // Dairy Circle
    { lat: 12.9081, lng: 77.6476 }, // HSR Layout
    { lat: 12.9857, lng: 77.5342 }, // Rajajinagar
];
