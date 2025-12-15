'use client';
import { useState } from 'react';
import { trackParcel } from '../../components/api';

const MOCK_PARCEL = {
  id: 'mock-p-123',
  status: 'SCHEDULED',
  weight: 2.5,
  pincode: '110001',
  chosenSlotId: 's-1',
  deliveryDate: '2023-12-12'
};

const MOCK_SLOTS = [
  { slot_id: 'm-1', start: '2023-12-13T14:30:00', end: '2023-12-13T17:30:00', label: '02:30 PM - 05:30 PM', spots: 5 },
  { slot_id: 'm-2', start: '2023-12-13T17:30:00', end: '2023-12-13T20:30:00', label: '05:30 PM - 08:30 PM', spots: 3 },
];

export default function ReceiverPage() {
  const [parcelId, setParcelId] = useState('mock-p-123'); // Default for demo
  const [parcel, setParcel] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false); // Default false, toggled to show slots
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    const [success, setSuccess] = useState(false);

    const handleTrack = async () => {
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            setParcel(MOCK_PARCEL);
            setLoading(false);
            setIsRescheduling(true); // Auto-open rescheduling for demo purposes to match screenshot request
        }, 800);
    };

    const handleConfirmCallback = async () => {
        if (!selectedSlot) return;
        setLoading(true);
        
        // Mock API call to store data
        // In a real app: await rescheduleParcel(parcelId, selectedSlot);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1500);
    };

    if (success) {
        return (
             <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center items-center">
                <div className="bg-white p-8 rounded-[30px] shadow-xl text-center max-w-md w-full animate-fade-in-up border border-green-100">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Reschedule Confirmed!</h2>
                    <p className="text-gray-500 mb-8">Your package has been successfully updated to the new time slot.</p>
                    
                    <div className="bg-green-50 p-4 rounded-xl border border-green-100 mb-8">
                        <p className="font-bold text-green-800">
                            {MOCK_SLOTS.find(s => s.slot_id === selectedSlot)?.label}
                        </p>
                    </div>

                    <button 
                        onClick={() => { setSuccess(false); setParcel(null); setParcelId(''); }}
                        className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition"
                    >
                        Track Another
                    </button>
                </div>
             </div>
        )
    }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start pt-20">
      
      {/* Container matching the card width in screenshot approx */}
      <div className={`transition-all duration-500 w-full max-w-lg ${parcel ? 'opacity-100 translate-y-0' : 'opacity-100'}`}>
        
        {/* Search Box (only if not showing result, or kept above) */}
        {!parcel && (
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 mb-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Track Your Package</h1>
                <div className="flex gap-2">
                    <input 
                        value={parcelId}
                        onChange={e => setParcelId(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter Parcel ID"
                    />
                    <button 
                        onClick={handleTrack}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                    >
                        {loading ? '...' : 'Track'}
                    </button>
                </div>
            </div>
        )}

        {parcel && (
          <div className="bg-white rounded-[24px] shadow-2xl overflow-hidden border border-gray-100">
             
             {/* Header - Blue Gradient */}
             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-start">
                   <div>
                       <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1 opacity-80">PARCEL ID</p>
                       <h2 className="text-3xl font-bold tracking-tight">{parcel.id}</h2>
                   </div>
                   <span className="bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                      {parcel.status}
                   </span>
                </div>
             </div>

             <div className="p-8">
                {/* Info Rows */}
                <div className="space-y-6">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                             {/* Scale Icon */}
                             <span className="text-2xl">⚖️</span> 
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-400">Weight</p>
                            <p className="text-lg font-bold text-gray-900">{parcel.weight} kg</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                             {/* Calendar Icon */}
                             <span className="text-2xl">🗓️</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-400">Scheduled Delivery</p>
                            <p className="text-lg font-bold text-gray-900">{parcel.chosenSlotId ? 'Slot Confirmed' : 'Processing'}</p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-8 border-gray-100" />

                {/* Reschedule Section */}
                <div className="animate-fade-in-up">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Available Slots for Tomorrow</h3>
                    
                    <div className="space-y-4">
                        {MOCK_SLOTS.map((slot) => {
                            const isSelected = selectedSlot === slot.slot_id;
                            return (
                                <div 
                                    key={slot.slot_id}
                                    onClick={() => setSelectedSlot(slot.slot_id)}
                                    className={`
                                        cursor-pointer flex justify-between items-center p-5 rounded-xl border-2 transition-all duration-200
                                        ${isSelected 
                                            ? 'border-blue-500 bg-blue-50/50' 
                                            : 'border-gray-100 bg-white hover:border-gray-200'
                                        }
                                    `}
                                >
                                    <span className={`font-bold text-lg ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                                        {slot.label}
                                    </span>
                                    <span className="text-sm font-bold text-green-500">
                                        {slot.spots} spots
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <button 
                        onClick={() => { setParcel(null); setIsRescheduling(false); }}
                        className="mt-6 text-sm text-gray-400 font-medium hover:text-gray-600 hover:underline transition"
                    >
                        Cancel
                    </button>
                    
                    {selectedSlot && (
                        <button 
                            onClick={handleConfirmCallback}
                            className="w-full mt-4 bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1 flex justify-center"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                            ) : 'Confirm New Slot'}
                        </button>
                    )}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
