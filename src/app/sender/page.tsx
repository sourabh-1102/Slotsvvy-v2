'use client';
import { useState } from 'react';
import { api } from '../../lib/api';

// Fallback data matching the UI
const MOCK_SLOTS = [
  { slot_id: 's1', start: '2023-12-12T18:00:00', end: '2023-12-12T20:00:00', score: 0.85, label: '6:00 - 8:00 PM', recommended: true },
  { slot_id: 's2', start: '2023-12-12T20:00:00', end: '2023-12-12T22:00:00', score: 0.90, label: '8:00 - 10:00 PM', recommended: false },
  { slot_id: 's3', start: '2023-12-12T10:00:00', end: '2023-12-12T12:00:00', score: 0.75, label: '10:00 - 12:00 PM', recommended: false },
  { slot_id: 's4', start: '2023-12-12T14:00:00', end: '2023-12-12T16:00:00', score: 0.70, label: '2:00 - 4:00 PM', recommended: false },
];

interface Slot {
    slot_id: string;
    start: string;
    end: string;
    score: number;
    label: string;
    recommended: boolean;
}

export default function SenderPage() {
  const [form, setForm] = useState({ 
    senderName: 'Sourabh Singh',
    senderAddress: 'Bikaner, Rajasthan',
    recipientName: 'Priya Sharma',
    recipientAddress: 'Koramangala, Bangalore',
    recipientPhone: '9876543210',
    weight: '0.8',
    pincode: '110001' // Hidden field for logic
  });
  
  const [slots, setSlots] = useState<Slot[]>(MOCK_SLOTS); // Default to mock for UI dev
  const [selectedSlot, setSelectedSlot] = useState<string>('s2'); // Default selected matching screenshot
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
        const selectedSlotData = slots.find(s => s.slot_id === selectedSlot);
        const payload = {
            sender: form.senderName,
            receiver: form.recipientName,
            address: form.recipientAddress,
            senderAddress: form.senderAddress,
            weight: form.weight,
            pincode: form.pincode,
            slot: selectedSlotData?.label || '',
            phone: form.recipientPhone
        };

        const response = await api.parcels.create(payload);

        if (response.success) {
            alert(`✅ Parcel Booked Successfully!\n\nTracking ID: ${response.parcel.trackingId || response.parcel.id}\nNotifications sent to recipient.`);
            // Reset form or redirect if needed
        } else {
            alert(`Error: ${response.message}`);
        }
    } catch (error: unknown) {
        console.error('Booking failed', error);
        const msg = error instanceof Error ? error.message : 'Unknown error';
        alert(`Failed to book parcel: ${msg}`);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50/50 pb-20"> {/* Light purple background implied */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 p-8 sm:p-12">
            
            <h1 className="text-3xl font-extrabold text-gray-900 mb-10">Book Your Parcel</h1>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 mb-12">
                {/* Row 1 */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">Sender Name</label>
                    <input 
                        type="text" 
                        value={form.senderName}
                        onChange={e => setForm({...form, senderName: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">Sender Address</label>
                    <textarea 
                        rows={1}
                        value={form.senderAddress}
                        onChange={e => setForm({...form, senderAddress: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                    ></textarea>
                </div>

                {/* Row 2 */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">Recipient Name</label>
                    <input 
                        type="text" 
                        value={form.recipientName}
                        onChange={e => setForm({...form, recipientName: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>
                
                 {/* Row 3 - Spanning differently in grid roughly, assuming standard grid flow */}
                 <div className="space-y-2 row-span-2">
                    <label className="block text-sm font-bold text-gray-700">Recipient Address</label>
                    <textarea 
                        rows={4}
                        value={form.recipientAddress}
                        onChange={e => setForm({...form, recipientAddress: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                    ></textarea>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">Recipient Phone</label>
                    <input 
                        type="text" 
                        value={form.recipientPhone}
                        onChange={e => setForm({...form, recipientPhone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>

                <div className="space-y-2">
                     <label className="block text-sm font-bold text-gray-700">Parcel Weight (kg)</label>
                    <input 
                        type="text" 
                        value={form.weight}
                        onChange={e => setForm({...form, weight: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>
            </div>

            {/* Slots Section */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="text-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">AI-Recommended Delivery Slots</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {slots.map((slot) => (
                        <div 
                            key={slot.slot_id}
                            onClick={() => setSelectedSlot(slot.slot_id)}
                            className={`relative cursor-pointer rounded-2xl border-2 p-4 text-center transition-all duration-200 ${
                                selectedSlot === slot.slot_id 
                                ? 'border-blue-500 bg-blue-50 shadow-md transform -translate-y-1' 
                                : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                            }`}
                        >
                            {/* AI Pick Badge */}
                            {slot.recommended && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm">
                                    AI Pick
                                </span>
                            )}

                            <div className="mt-2 text-lg font-bold text-gray-800">{slot.label}</div>
                            <div className={`mt-1 text-sm font-bold ${selectedSlot === slot.slot_id ? 'text-green-600' : 'text-green-500'}`}>
                                {(slot.score * 100).toFixed(0)}% Success Rate
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
                <button 
                    onClick={handleSubmit}
                    className="group relative inline-flex items-center justify-center gap-2 px-12 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                    <span>Book Parcel</span>
                </button>
            </div>

        </div>
      </div>
    </div>
  );
}
