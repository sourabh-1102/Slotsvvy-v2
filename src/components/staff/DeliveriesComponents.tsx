import { useState } from 'react';
import { MOCK_DRIVERS, STATUSES, CONST_PINCODES, CONST_SLOTS } from '../staffMockData';

// --- Types ---
export interface FilterState {
    status: string;
    pincode: string;
    slot: string;
    search: string;
    driverStatus: string; // 'ALL', 'ASSIGNED', 'UNASSIGNED'
}

// --- Icons (Simple SVGs) ---
const Icons = {
    Filter: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    Close: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    Mail: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
    Warning: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
};

// --- Components ---

export function FilterBar({ filters, setFilters, onReset }: { filters: FilterState, setFilters: (f: FilterState) => void, onReset: () => void }) {
    const handleChange = (key: keyof FilterState, value: string) => {
        setFilters({ ...filters, [key]: value });
    };

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Icons.Search />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search Parcel ID, Receiver, or Address..." 
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={filters.search}
                        onChange={(e) => handleChange('search', e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <button onClick={onReset} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium">Reset</button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center gap-2">
                        <Icons.Filter /> More Filters
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <select 
                    value={filters.status} 
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:border-indigo-500 outline-none"
                >
                    <option value="ALL">All Statuses</option>
                    {STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                </select>

                <select 
                    value={filters.driverStatus} 
                    onChange={(e) => handleChange('driverStatus', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:border-indigo-500 outline-none"
                >
                    <option value="ALL">All Drivers</option>
                    <option value="ASSIGNED">Assigned</option>
                    <option value="UNASSIGNED">Unassigned</option>
                </select>

                 <select 
                    value={filters.pincode} 
                    onChange={(e) => handleChange('pincode', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:border-indigo-500 outline-none"
                >
                    <option value="ALL">All Pincodes</option>
                    {CONST_PINCODES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>

                <select 
                    value={filters.slot} 
                    onChange={(e) => handleChange('slot', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:border-indigo-500 outline-none"
                >
                    <option value="ALL">All Slots</option>
                    {CONST_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
        </div>
    );
}

// --- Modal Components ---

export function BulkActionModal({ selectedCount, onClose, onConfirm }: { selectedCount: number, onClose: () => void, onConfirm: (action: string, value: string) => void }) {
    const [actionType, setActionType] = useState('STATUS'); // STATUS, SLOT, EXPORT
    const [selectedValue, setSelectedValue] = useState('');

    const handleConfirm = () => {
        if (actionType === 'EXPORT') {
            onConfirm('EXPORT', '');
        } else if (selectedValue) {
            onConfirm(actionType, selectedValue);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Bulk Actions</h2>
                <p className="text-sm text-gray-500 mb-4">Applying changes to <span className="font-bold text-indigo-600">{selectedCount} selected parcels</span>.</p>

                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Action Type</label>
                        <select 
                            value={actionType} 
                            onChange={e => { setActionType(e.target.value); setSelectedValue(''); }}
                            className="w-full px-3 py-2 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                        >
                            <option value="STATUS">Change Status</option>
                            <option value="SLOT">Reschedule Slot</option>
                            <option value="EXPORT">Export Data</option>
                        </select>
                    </div>

                    {actionType === 'STATUS' && (
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">New Status</label>
                            <select 
                                value={selectedValue} 
                                onChange={e => setSelectedValue(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select Status...</option>
                                {STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                            </select>
                        </div>
                    )}

                    {actionType === 'SLOT' && (
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">New Slot</label>
                            <select 
                                value={selectedValue} 
                                onChange={e => setSelectedValue(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select Slot...</option>
                                {CONST_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <p className="text-xs text-orange-600 mt-1">⚠️ This will notify all {selectedCount} receivers.</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg">Cancel</button>
                    <button 
                        onClick={handleConfirm}
                        disabled={actionType !== 'EXPORT' && !selectedValue}
                        className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Apply Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export function AssignDriverModal({ selectedCount, onClose, onAssign }: { selectedCount: number, onClose: () => void, onAssign: (driverId: string) => void }) {
    const [selectedDriver, setSelectedDriver] = useState('');

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg mx-4">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Assign Driver</h2>
                        <p className="text-sm text-gray-500">Choosing best driver for {selectedCount} parcel{selectedCount > 1 ? 's' : ''}</p>
                    </div>
                    <button onClick={onClose}><Icons.Close /></button>
                </div>

                {/* Driver List */}
                <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2 mb-6">
                    {MOCK_DRIVERS.map(d => {
                        const isOverloaded = d.capacity_used > 80;
                        const isOffDuty = d.status === 'OFF_DUTY';
                        return (
                            <div 
                                key={d.id} 
                                onClick={() => !isOffDuty && setSelectedDriver(d.id)}
                                className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex justify-between items-center group
                                    ${selectedDriver === d.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}
                                    ${isOffDuty ? 'opacity-50 cursor-not-allowed grayscale' : ''}
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white
                                        ${isOffDuty ? 'bg-gray-400' : 'bg-indigo-500'}
                                    `}>
                                        {d.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{d.name} <span className="text-xs font-normal text-gray-500">({d.vehicle})</span></div>
                                        <div className="text-xs flex gap-2 mt-1">
                                            <span className={`px-1.5 py-0.5 rounded ${d.status === 'ON_DUTY' ? 'bg-green-100 text-green-700' : d.status === 'BUSY' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100'}`}>
                                                {d.status.replace('_', ' ')}
                                            </span>
                                            <span className="text-gray-500">Shift ends: {d.shift_end}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-bold text-gray-500">Load</div>
                                    <div className={`text-sm font-bold ${isOverloaded ? 'text-red-600' : 'text-gray-900'}`}>
                                        {d.current_load} pkgs
                                    </div>
                                    <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                                        <div className={`h-full ${isOverloaded ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `${d.capacity_used}%`}}></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {/* AI Recommendation Banner */}
                <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 flex gap-3 mb-6">
                    <span className="text-indigo-600">✨</span>
                    <div className="text-xs text-indigo-800">
                        <span className="font-bold">AI Suggestion:</span> assigning to <span className="font-bold">Ramesh Kumar</span> will reduce total route distance by 2.4km.
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg">Cancel</button>
                    <button 
                        onClick={() => selectedDriver && onAssign(selectedDriver)}
                        disabled={!selectedDriver}
                        className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Confirm Assignment
                    </button>
                </div>
            </div>
        </div>
    );
}

export function EditParcelModal({ parcel, onClose, onSave }: { parcel: any, onClose: () => void, onSave: (p: any) => void }) {
    const [localParcel, setLocalParcel] = useState({ ...parcel });
    const [activeTab, setActiveTab] = useState('details'); // details, metadata, timeline, comms, audit
    const [auditLog] = useState([
        { action: 'Status Update', user: 'System', date: 'Today 10:30 AM', detail: 'Changed to Out for Delivery' },
        { action: 'Edit', user: 'Staff (You)', date: 'Today 09:15 AM', detail: 'Updated slot preference' },
        { action: 'Created', user: 'Sender', date: 'Yesterday 04:00 PM', detail: 'Parcel registered' },
    ]);

    const handleSave = () => onSave(localParcel);

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Edit Parcel {parcel.id}</h2>
                        <p className="text-sm text-gray-500">{parcel.receiver} • {parcel.pincode}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <Icons.Close />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 px-6 overflow-x-auto">
                    {['details', 'metadata', 'timeline', 'communication', 'audit log'].map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize whitespace-nowrap ${
                                activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1 h-[400px]">
                    {activeTab === 'details' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</label>
                                    <select 
                                        value={localParcel.status}
                                        onChange={e => setLocalParcel({...localParcel, status: e.target.value})}
                                        className="w-full px-3 py-2 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        {STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Slot</label>
                                    <select 
                                        value={localParcel.slot}
                                        onChange={e => setLocalParcel({...localParcel, slot: e.target.value})}
                                        className="w-full px-3 py-2 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        {CONST_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    <p className="text-[10px] text-green-600 mt-1">✨ AI Recommended: 11:00 AM (Low Traffic)</p>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Assigned Driver</label>
                                <div className="p-3 border rounded-lg bg-gray-50">
                                     <select 
                                        value={localParcel.driverId || ''}
                                        onChange={e => {
                                            const newDriverId = e.target.value;
                                            let newStatus = localParcel.status;
                                            if (newDriverId && (localParcel.status === 'PENDING_RESCHEDULE' || localParcel.status === 'FAILED')) {
                                                newStatus = 'SCHEDULED';
                                            } else if (!newDriverId) {
                                                newStatus = 'PENDING_RESCHEDULE';
                                            }
                                            setLocalParcel({...localParcel, driverId: newDriverId, status: newStatus});
                                        }}
                                        className="w-full bg-transparent outline-none font-medium"
                                    >
                                        <option value="">Unassigned</option>
                                        {MOCK_DRIVERS.map(d => (
                                            <option key={d.id} value={d.id}>{d.name} ({d.vehicle}) • Load: {d.current_load}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3 items-start">
                                <span className="text-yellow-600"><Icons.Warning /></span>
                                <div>
                                    <h4 className="text-sm font-bold text-yellow-800">Impact Analysis</h4>
                                    <p className="text-xs text-yellow-700 mt-1">
                                        Changing slot to 02:00 PM will increase the route by 3km.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'metadata' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Weight (kg)</label>
                                    <input 
                                        type="number" 
                                        value={localParcel.weight || ''}
                                        onChange={e => setLocalParcel({...localParcel, weight: e.target.value})}
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Volume (L)</label>
                                    <input type="number" className="w-full px-3 py-2 border rounded-lg" placeholder="10" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Receiver Address</label>
                                <textarea 
                                    value={localParcel.address}
                                    onChange={e => setLocalParcel({...localParcel, address: e.target.value})}
                                    className="w-full px-3 py-2 border rounded-lg h-20"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Special Instructions</label>
                                <div className="flex gap-2 mb-2">
                                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded font-bold">Fragile</span>
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-bold">Documents</span>
                                </div>
                                <input className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. Leave not at door" />
                            </div>
                        </div>
                    )}

                    {activeTab === 'timeline' && (
                        <div className="space-y-6 relative pl-4 border-l-2 border-gray-100 ml-2">
                             {[
                                 { label: 'Parcel Created', time: 'Yesterday, 4:00 PM', done: true },
                                 { label: 'Slot Confirmed', time: 'Yesterday, 4:05 PM', done: true },
                                 { label: 'Driver Assigned', time: 'Today, 8:30 AM', done: !!localParcel.driverId },
                                 { label: 'Out for Delivery', time: 'Today, 9:15 AM', done: localParcel.status === 'OUT_FOR_DELIVERY' || localParcel.status === 'DELIVERED' },
                                 { label: 'Delivered', time: 'Pending', done: localParcel.status === 'DELIVERED' }
                             ].map((step, idx) => (
                                 <div key={idx} className="relative">
                                     <div className={`absolute -left-[21px] top-0.5 w-4 h-4 rounded-full border-2 ${step.done ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}></div>
                                     <h4 className={`text-sm font-bold ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</h4>
                                     <p className="text-xs text-gray-400">{step.time}</p>
                                 </div>
                             ))}
                        </div>
                    )}

                    {activeTab === 'communication' && (
                        <div className="space-y-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="text-sm font-bold text-blue-900 mb-2">Quick Actions</h4>
                                <div className="flex gap-2">
                                    <button className="flex items-center gap-2 px-3 py-2 bg-white text-blue-600 rounded border border-blue-200 text-xs font-bold shadow-sm hover:bg-blue-50">
                                        <Icons.Phone /> Call Receiver
                                    </button>
                                    <button className="flex items-center gap-2 px-3 py-2 bg-white text-blue-600 rounded border border-blue-200 text-xs font-bold shadow-sm hover:bg-blue-50">
                                        <Icons.Mail /> Send Email
                                    </button>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Send Notification</label>
                                <div className="flex gap-2">
                                    <select className="flex-1 px-3 py-2 border rounded-lg bg-gray-50 text-sm">
                                        <option>SMS: Driver Arriving Soon</option>
                                        <option>WhatsApp: Location Pin</option>
                                        <option>Email: Reschedule Confirmation</option>
                                    </select>
                                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold">Send</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'audit log' && (
                        <div className="space-y-4">
                            {auditLog.map((log, i) => (
                                <div key={i} className="flex gap-4 text-sm pb-4 border-b border-gray-100 last:border-0">
                                    <div className="text-gray-400 font-mono text-xs w-24 pt-1">{log.date}</div>
                                    <div>
                                        <div className="font-bold text-gray-900">{log.action}</div>
                                        <div className="text-gray-500">{log.detail}</div>
                                        <div className="text-xs text-gray-400 mt-1">by {log.user}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg text-sm">Cancel</button>
                    <button onClick={handleSave} className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm text-sm">Save Changes</button>
                </div>
            </div>
        </div>
    );
}
