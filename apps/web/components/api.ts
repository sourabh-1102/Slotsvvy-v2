const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function createParcel(data: any) {
  const res = await fetch(`${API_URL}/api/parcels`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getRecommendedSlots(pincode: string, date: string, weight: number) {
  const res = await fetch(`${API_URL}/api/slots/recommend?pincode=${pincode}&date=${date}&weight=${weight}`);
  return res.json();
}

export async function computeRoutes(date: string, pincode: string) {
    const res = await fetch(`${API_URL}/api/routes/compute?date=${date}&pincode=${pincode}`, {
        method: 'POST'
    });
    return res.json();
}

export async function trackParcel(id: string) {
    const res = await fetch(`${API_URL}/api/tracking/${id}`);
    if (!res.ok) return null;
    return res.json();
}
