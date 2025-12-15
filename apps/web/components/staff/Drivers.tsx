import { useState, Dispatch, SetStateAction } from 'react';

// --- Icons ---
const Icons = {
    Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    Close: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    User: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
};

// --- Modals ---

function AddDriverModal({ onClose, onAdd }: { onClose: () => void, onAdd: (d: any) => void }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        vehicle: 'Bike',
        vehicleNo: '',
        status: 'OFF_DUTY'
    });

    const handleSubmit = () => {
        if (!formData.name || !formData.phone) return;
        const newDriver = {
            id: `D-NEW-${Math.floor(Math.random() * 1000)}`,
            ...formData,
            vehicle: `${formData.vehicle} (${formData.vehicleNo})`,
            capacity_used: 0,
            current_load: 0,
            shift_end: 'N/A',
            rating: 5.0 // New drivers start with 5 stars
        };
        onAdd(newDriver);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Add New Driver</h2>
                    <button onClick={onClose}><Icons.Close /></button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                        <input 
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Rahul Sharma" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
                        <input 
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. 9876543210" 
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Vehicle Type</label>
                            <select 
                                value={formData.vehicle}
                                onChange={e => setFormData({...formData, vehicle: e.target.value})}
                                className="w-full px-3 py-2 border rounded-lg bg-white"
                            >
                                <option value="Bike">Bike</option>
                                <option value="Van">Van</option>
                                <option value="Scooter">Scooter</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Vehicle No.</label>
                            <input 
                                value={formData.vehicleNo}
                                onChange={e => setFormData({...formData, vehicleNo: e.target.value})}
                                className="w-full px-3 py-2 border rounded-lg" placeholder="KA-01-..." 
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg">Cancel</button>
                    <button 
                        onClick={handleSubmit} 
                        className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-lg"
                    >
                        Add Driver
                    </button>
                </div>
            </div>
        </div>
    );
}

function DriverProfileModal({ driver, onClose }: { driver: any, onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
                <div className="bg-indigo-600 px-6 py-6 text-white flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
                            {driver.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{driver.name}</h2>
                            <p className="text-white/80 text-sm">{driver.id} • {driver.vehicle}</p>
                            <div className="flex gap-2 mt-2">
                                <span className="bg-white/20 px-2 py-0.5 rounded text-xs backdrop-blur-sm">⭐ {driver.rating} Rating</span>
                                <span className="bg-white/20 px-2 py-0.5 rounded text-xs backdrop-blur-sm">{driver.status}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white"><Icons.Close /></button>
                </div>
                
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-gray-50 rounded-xl">
                            <div className="text-sm text-gray-500 mb-1">Today's Load</div>
                            <div className="text-lg font-bold text-gray-900">{driver.current_load}</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl">
                            <div className="text-sm text-gray-500 mb-1">Shift Ends</div>
                            <div className="text-lg font-bold text-gray-900">{driver.shift_end}</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl">
                            <div className="text-sm text-gray-500 mb-1">Utilization</div>
                            <div className="text-lg font-bold text-gray-900">{driver.capacity_used}%</div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">Contact Info</h3>
                        <div className="flex items-center gap-2 p-3 border rounded-lg">
                            <Icons.Phone />
                            <span className="text-gray-600 font-medium">{driver.phone}</span>
                            <button className="ml-auto text-indigo-600 text-sm font-bold">Call Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DriverHistoryModal({ driver, onClose }: { driver: any, onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                     <h2 className="text-lg font-bold">History: {driver.name}</h2>
                     <button onClick={onClose}><Icons.Close /></button>
                </div>
                <div className="p-6 h-[300px] overflow-y-auto">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="mb-4 pb-4 border-b last:border-0">
                            <div className="flex justify-between mb-1">
                                <span className="font-bold text-gray-800">Route #{100+i}</span>
                                <span className="text-xs text-gray-500">2 days ago</span>
                            </div>
                            <p className="text-sm text-gray-600">Completed 45 deliveries in Koramangala.</p>
                            <span className="inline-block mt-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded font-bold">On Time</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function EditDriverModal({ driver, onClose, onSave, onDelete }: { driver: any, onClose: () => void, onSave: (d: any) => void, onDelete: (id: string) => void }) {
    const [formData, setFormData] = useState({ ...driver });

    const handleSubmit = () => {
        onSave(formData);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this driver? This action cannot be undone.')) {
            onDelete(driver.id);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Edit Driver Details</h2>
                    <button onClick={onClose}><Icons.Close /></button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                        <input 
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
                        <input 
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                        />
                    </div>
                    <div>
                         <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</label>
                         <select 
                            value={formData.status}
                            onChange={e => setFormData({...formData, status: e.target.value})}
                            className="w-full px-3 py-2 border rounded-lg bg-white"
                        >
                            <option value="ON_DUTY">On Duty</option>
                            <option value="OFF_DUTY">Off Duty</option>
                            <option value="BUSY">Busy</option>
                            <option value="ON_BREAK">On Break</option>
                        </select>
                    </div>
                    <div>
                         <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Vehicle Details</label>
                         <input 
                            value={formData.vehicle}
                            onChange={e => setFormData({...formData, vehicle: e.target.value})}
                            className="w-full px-3 py-2 border rounded-lg" 
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                    <button 
                        onClick={handleDelete}
                        className="text-red-500 text-sm font-bold hover:text-red-700 flex items-center gap-1"
                    >
                         Delete Driver
                    </button>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg">Cancel</button>
                        <button 
                            onClick={handleSubmit} 
                            className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-lg"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Main Component ---

interface DriversProps {
    drivers: any[];
    setDrivers: Dispatch<SetStateAction<any[]>>;
}

export default function Drivers({ drivers, setDrivers }: DriversProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewProfileId, setViewProfileId] = useState<string | null>(null);
  const [viewHistoryId, setViewHistoryId] = useState<string | null>(null);
  const [editDriverId, setEditDriverId] = useState<string | null>(null);

  const handleAddDriver = (newDriver: any) => {
      setDrivers([...drivers, newDriver]);
      setShowAddModal(false);
  };

  const handleUpdateDriver = (updatedDriver: any) => {
      setDrivers(drivers.map(d => d.id === updatedDriver.id ? updatedDriver : d));
      setEditDriverId(null);
  };

  const handleDeleteDriver = (driverId: string) => {
       setDrivers(drivers.filter(d => d.id !== driverId));
       setEditDriverId(null);
  };

  const getDriver = (id: string | null) => drivers.find(d => d.id === id);

  return (
    <div className="space-y-6 animate-fade-in-up relative">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Driver Management</h1>
            <button 
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-lg hover:bg-indigo-700 flex items-center gap-2"
            >
                <Icons.Plus /> Add New Driver
            </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drivers.map(driver => (
                <div key={driver.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4 hover:border-indigo-200 transition-colors">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-gray-500">
                        {driver.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-gray-900">{driver.name}</h3>
                            <button 
                                onClick={() => setEditDriverId(driver.id)}
                                className="text-gray-400 hover:text-indigo-600 transition-colors"
                                title="Edit Details"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                            </button>
                        </div>
                        <span className={`inline-block mb-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            driver.status === 'ON_DUTY' ? 'bg-green-100 text-green-700' :
                            driver.status === 'BUSY' ? 'bg-orange-100 text-orange-700' :
                            driver.status === 'OFF_DUTY' ? 'bg-gray-100 text-gray-500' :
                            'bg-yellow-100 text-yellow-700'
                        }`}>{driver.status && driver.status.replace('_', ' ')}</span>
                        
                        <p className="text-sm text-gray-500 mt-0.5">{driver.id} • {driver.vehicle}</p>
                        <p className="text-sm text-gray-400 mt-0.5 flex items-center gap-1">
                            <Icons.Phone /> {driver.phone}
                        </p>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                             <button 
                                onClick={() => setViewProfileId(driver.id)}
                                className="flex-1 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 rounded hover:bg-indigo-100 transition"
                            >
                                View Profile
                            </button>
                             <button 
                                onClick={() => setViewHistoryId(driver.id)}
                                className="flex-1 py-1.5 text-xs font-bold text-gray-600 bg-gray-50 rounded hover:bg-gray-100 transition"
                            >
                                History
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Modals */}
        {showAddModal && <AddDriverModal onClose={() => setShowAddModal(false)} onAdd={handleAddDriver} />}
        {viewProfileId && <DriverProfileModal driver={getDriver(viewProfileId)} onClose={() => setViewProfileId(null)} />}
        {viewHistoryId && <DriverHistoryModal driver={getDriver(viewHistoryId)} onClose={() => setViewHistoryId(null)} />}
        {editDriverId && <EditDriverModal driver={getDriver(editDriverId)} onClose={() => setEditDriverId(null)} onSave={handleUpdateDriver} onDelete={handleDeleteDriver} />}
    </div>
  )
}
