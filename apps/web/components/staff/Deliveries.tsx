import { useState, Dispatch, SetStateAction } from 'react';
import { MOCK_DRIVERS, STATUSES } from '../staffMockData';
import { FilterBar, EditParcelModal, AssignDriverModal, BulkActionModal, FilterState } from './DeliveriesComponents';

interface DeliveriesProps {
    parcels: any[];
    setParcels: Dispatch<SetStateAction<any[]>>;
    filters: FilterState;
    setFilters: Dispatch<SetStateAction<FilterState>>;
}

export default function Deliveries({ parcels, setParcels, filters, setFilters }: DeliveriesProps) {
  // Filters now come from props for cross-tab capability
  // const [filters, setFilters] = useState(...) -> Removed
  
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Modal States
  const [currentParcel, setCurrentParcel] = useState<any>(null);
  const [isBulkDriverModalOpen, setIsBulkDriverModalOpen] = useState(false);
  const [isBulkActionModalOpen, setIsBulkActionModalOpen] = useState(false);
  const [selectedDriverForBulk, setSelectedDriverForBulk] = useState('');

  // Enhanced Filter Logic
  const filteredParcels = parcels.filter(p => {
     // Search
     if (filters.search) {
         const term = filters.search.toLowerCase();
         if (!p.receiver.toLowerCase().includes(term) && !p.id.toLowerCase().includes(term) && !p.address.toLowerCase().includes(term)) {
             return false;
         }
     }
     
     // Status
     if (filters.status !== 'ALL' && p.status !== filters.status) return false;
     
     // Pincode
     if (filters.pincode !== 'ALL' && p.pincode !== filters.pincode) return false;

     // Slot
     if (filters.slot !== 'ALL' && p.slot !== filters.slot) return false;

     // Driver Status
     if (filters.driverStatus === 'ASSIGNED' && !p.driverId) return false;
     if (filters.driverStatus === 'UNASSIGNED' && p.driverId) return false;

     return true;
  });

  const toggleSelection = (id: string) => {
      setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
      if (selectedIds.length === filteredParcels.length) {
          setSelectedIds([]);
      } else {
          setSelectedIds(filteredParcels.map(p => p.id));
      }
  };

  const handleEditClick = (parcel: any) => {
      setCurrentParcel({ ...parcel });
  };

  const handleSaveEdit = (updatedParcel: any) => {
      setParcels(parcels.map(p => p.id === updatedParcel.id ? updatedParcel : p));
      setCurrentParcel(null);
  };

  const handleBulkAssign = (driverId: string) => {
      if (!driverId) return;
      setParcels(parcels.map(p => selectedIds.includes(p.id) ? { ...p, driverId: driverId, status: 'SCHEDULED' } : p));
      setIsBulkDriverModalOpen(false);
      setSelectedIds([]);
      setSelectedDriverForBulk('');
  };

  const handleBulkUpdateAction = (action: string, value: string) => {
      if (action === 'STATUS') {
          setParcels(parcels.map(p => selectedIds.includes(p.id) ? { ...p, status: value } : p));
      } else if (action === 'SLOT') {
          setParcels(parcels.map(p => selectedIds.includes(p.id) ? { ...p, slot: value, status: 'PENDING_RESCHEDULE' } : p));
      } else if (action === 'EXPORT') {
          alert(`Exporting ${selectedIds.length} parcels to CSV...`);
      }
      setIsBulkActionModalOpen(false);
      setSelectedIds([]);
  };

  return (
    <div className="space-y-6 animate-fade-in-up relative">
       {/* Actions Bar */}
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Manage Deliveries</h1>
          <div className="flex gap-2">
             <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">Export CSV</button>
             <button 
                onClick={() => setIsBulkDriverModalOpen(true)}
                disabled={selectedIds.length === 0}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
             >
                Assign Driver ({selectedIds.length})
             </button>
             {selectedIds.length > 0 && (
                <button 
                    onClick={() => setIsBulkActionModalOpen(true)}
                    className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-100"
                >
                    Bulk Updates
                </button>
             )}
          </div>
       </div>
       
       {/* New Modular Filter Bar */}
       <FilterBar 
            filters={filters} 
            setFilters={setFilters} 
            onReset={() => setFilters({ status:'ALL', pincode:'ALL', slot:'ALL', driverStatus: 'ALL', search:'' })} 
       />

       {/* Table */}
       <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[400px]">
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-4 py-4 w-4">
                            <input 
                                type="checkbox" 
                                checked={selectedIds.length === filteredParcels.length && filteredParcels.length > 0} 
                                onChange={toggleSelectAll}
                                className="rounded text-indigo-600 focus:ring-indigo-500"
                            />
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-700">Parcel ID</th>
                        <th className="px-6 py-4 font-semibold text-gray-700">Receiver</th>
                        <th className="px-6 py-4 font-semibold text-gray-700">Driver</th>
                        <th className="px-6 py-4 font-semibold text-gray-700">Slot</th>
                        <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 font-semibold text-gray-700">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredParcels.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="text-center py-10 text-gray-500">
                                No parcels match your filters.
                            </td>
                        </tr>
                    ) : filteredParcels.map((parcel) => (
                        <tr key={parcel.id} className={`hover:bg-gray-50 transition ${selectedIds.includes(parcel.id) ? 'bg-indigo-50/30' : ''}`}>
                            <td className="px-4 py-4">
                                <input 
                                    type="checkbox" 
                                    checked={selectedIds.includes(parcel.id)}
                                    onChange={() => toggleSelection(parcel.id)}
                                    className="rounded text-indigo-600 focus:ring-indigo-500"
                                />
                            </td>
                            <td className="px-6 py-4 font-medium text-indigo-600">
                                {parcel.id}
                                {/* Pincode Badge */}
                                <div className="text-[10px] text-gray-400 mt-1">{parcel.pincode}</div>
                            </td>
                            <td className="px-6 py-4 text-gray-900">
                                <div>{parcel.receiver}</div>
                                <div className="text-xs text-gray-400 max-w-[150px] truncate">{parcel.address}</div>
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                                {parcel.driverId ? (
                                    <span className="inline-flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                                        🚗 {MOCK_DRIVERS.find(d => d.id === parcel.driverId)?.name || parcel.driverId}
                                    </span>
                                ) : (
                                    <span className="text-gray-400 italic text-xs">Unassigned</span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-gray-700 font-medium">{parcel.slot}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize
                                     ${
                                        parcel.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                        parcel.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                                        parcel.status === 'OUT_FOR_DELIVERY' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                                     }
                                `}>
                                    {parcel.status.replace(/_/g, ' ').toLowerCase()}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <button 
                                    onClick={() => handleEditClick(parcel)}
                                    className="text-indigo-600 hover:text-indigo-900 font-bold text-xs bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
             </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex justify-between">
              <span>Showing {filteredParcels.length} results</span>
              <span>Page 1 of 1</span>
          </div>
       </div>

       {/* Edit Modal (Now uses Component) */}
       {currentParcel && (
           <EditParcelModal 
                parcel={currentParcel} 
                onClose={() => setCurrentParcel(null)} 
                onSave={handleSaveEdit} 
           />
       )}

       {/* Bulk Driver Assign Modal */}
       {isBulkDriverModalOpen && (
           <AssignDriverModal 
                selectedCount={selectedIds.length}
                onClose={() => setIsBulkDriverModalOpen(false)}
                onAssign={handleBulkAssign}
           />
       )}

       {/* General Bulk Actions Modal */}
       {isBulkActionModalOpen && (
           <BulkActionModal 
                selectedCount={selectedIds.length}
                onClose={() => setIsBulkActionModalOpen(false)}
                onConfirm={handleBulkUpdateAction}
           />
       )}
    </div>
  );
}
