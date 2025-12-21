import { useState, useMemo, Dispatch, SetStateAction } from 'react';
import { MOCK_SLOTS_STATS } from '../staffMockData';
import { Parcel } from '../../lib/api';
import { FilterState } from './DeliveriesComponents';

interface StatCardProps {
    title: string;
    value: string | number;
    subtext?: string;
    type?: 'neutral' | 'primary' | 'warning' | 'danger';
    onClick?: () => void;
}

// Simple Stat Card
function StatCard({ title, value, subtext, type = 'neutral', onClick }: StatCardProps) {
    const colors = {
        neutral: 'bg-white border-gray-100 text-gray-900',
        primary: 'bg-blue-600 border-blue-600 text-white',
        warning: 'bg-orange-50 border-orange-100 text-orange-900',
        danger: 'bg-red-50 border-red-100 text-red-900',
    };
    
    // @ts-ignore
    const styles = colors[type] || colors.neutral;
    const isPrimary = type === 'primary';

    return (
        <div 
            onClick={onClick} 
            className={`p-6 rounded-2xl shadow-sm border ${styles} transition hover:shadow-md cursor-pointer relative overflow-hidden group`}
        >
            <p className={`text-sm font-medium ${isPrimary ? 'text-blue-100' : 'text-gray-500'}`}>{title}</p>
            <h3 className="text-3xl font-bold mt-2">{value}</h3>
            {subtext && <p className={`text-xs mt-2 ${isPrimary ? 'text-blue-200' : 'text-gray-400'}`}>{subtext}</p>}
            
            {/* Hover indication */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
        </div>
    );
}

// ... internal helper code remains ...
const computeKPIs = (parcels: Parcel[]) => {
    return {
        total: parcels.length,
        scheduled: parcels.filter(p => p.status === 'SCHEDULED' || p.status === 'Expected').length,
        outForDelivery: parcels.filter(p => p.status === 'OUT_FOR_DELIVERY').length,
        delivered: parcels.filter(p => p.status === 'DELIVERED').length,
        failed: parcels.filter(p => p.status === 'FAILED').length,
    };
};

export default function Overview({ setActiveTab, parcels, setFilters }: { setActiveTab: (t: string) => void, parcels: Parcel[], setFilters: Dispatch<SetStateAction<FilterState>> }) {
  const kpis = computeKPIs(parcels);
  
  const handleCardClick = (filterStatus: string, driverStatus?: string) => {
      setFilters((prev: any) => ({
          ...prev,
          status: filterStatus,
          driverStatus: driverStatus || 'ALL',
          pincode: 'ALL',
          slot: 'ALL',
          search: ''
      }));
      setActiveTab('deliveries');
  };

  // ... rest of the code ...
  
  // Dynamic Alerts State
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'Slots in Pincode 110001 are nearing capacity (90%).' },
    { id: 2, type: 'critical', message: 'Route recomputation required for Driver D-04 due to traffic.' },
    { id: 3, type: 'info', message: `${parcels.filter(p => p.status === 'FAILED').length} parcels require attention / failed delivery.` }
  ]);

  const handleResolveAlert = (id: number) => {
      setAlerts(prev => prev.filter(a => a.id !== id));
  };
    
  // Compute Slot Utilization Dynamically
  const slotStats = useMemo(() => {
      // Map simplified times to full slot strings if needed, or just use raw strings
      // Assuming parcels have a 'slot' field like '09:00 - 11:00'
      const stats = MOCK_SLOTS_STATS.map(mockStat => {
          const bookedCount = parcels.filter(p => p.slot === mockStat.time).length;
          // Use mock capacity (50) unless we want to change it
          const capacity = 50; 
          const utilization = Math.round((bookedCount / capacity) * 100);
          
          return {
              ...mockStat,
              booked: bookedCount,
              capacity: capacity,
              utilization: Math.min(100, utilization)
          };
      });
      return stats;
  }, [parcels]);

  return (
    <div className="space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center">
            {/* ... */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Real-time Operations Data</p>
            </div>
            <div className="flex gap-3">
                <button onClick={() => { setActiveTab('routes'); }} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 shadow-sm">
                    Recompute Routes
                </button>
                <button onClick={() => { setActiveTab('deliveries'); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 shadow-lg">
                    Manage Deliveries
                </button>
            </div>
        </div>

        {/* Interactive KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
                title="Total Parcels" 
                value={kpis.total} 
                subtext="View all parcels" 
                onClick={() => handleCardClick('ALL')} 
            />
            <StatCard 
                title="Scheduled Slots" 
                value={kpis.scheduled} 
                subtext="Confirmed bookings" 
                type="primary" 
                onClick={() => handleCardClick('SCHEDULED')} 
            />
            <StatCard 
                title="Out for Delivery" 
                value={kpis.outForDelivery} 
                subtext="On the road" 
                onClick={() => handleCardClick('OUT_FOR_DELIVERY')} 
            />
            <StatCard 
                title="Delivered / Failed" 
                value={`${kpis.delivered} / ${kpis.failed}`} 
                subtext={kpis.failed > 0 ? "Action Required" : "All clear"} 
                type={kpis.failed > 0 ? "danger" : "neutral"} 
                onClick={() => handleCardClick('FAILED')} 
            />
        </div>
        
        {/* ... Rest of the component (Alerts/Slots) ... */}

        {/* Alerts & Slot Usage */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Alerts Panel */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex justify-between items-center">
                    System Alerts 
                    <span className="bg-gray-100 text-gray-600 py-1 px-3 rounded-full text-xs font-bold">{alerts.length} Active</span>
                </h2>
                {alerts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <svg className="w-12 h-12 mb-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <p>All clear! No pending alerts.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {alerts.map((alert) => (
                            <div key={alert.id} className={`flex items-start gap-4 p-4 rounded-xl border-l-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-sm ${
                                alert.type === 'critical' ? 'bg-red-50 border-red-500' :
                                alert.type === 'warning' ? 'bg-orange-50 border-orange-500' :
                                'bg-blue-50 border-blue-500'
                            }`}>
                                <div className="flex-1">
                                    <h4 className={`text-sm font-bold capitalize ${
                                        alert.type === 'critical' ? 'text-red-800' :
                                        alert.type === 'warning' ? 'text-orange-800' :
                                        'text-blue-800'
                                    }`}>{alert.type} Alert</h4>
                                    <p className="text-gray-700 text-sm mt-1">{alert.message}</p>
                                </div>
                                <button 
                                    onClick={() => handleResolveAlert(alert.id)}
                                    className="text-xs font-semibold underline text-gray-500 hover:text-gray-900 whitespace-nowrap"
                                >
                                    Resolve
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Slot Utilization Mini-Table */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Slot Utilization</h2>
                <div className="space-y-4">
                    {slotStats.map((stat, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-gray-700">{stat.time}</span>
                                <span className={`font-bold ${stat.utilization > 85 ? 'text-red-500' : 'text-gray-900'}`}>{stat.utilization}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-1000 ${stat.utilization > 85 ? 'bg-red-500' : 'bg-blue-500'}`} 
                                    style={{ width: `${stat.utilization}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1 text-right">{stat.booked} / {stat.capacity} booked</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}
