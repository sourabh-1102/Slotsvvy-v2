'use client';
import { useState, useEffect } from 'react';
import Sidebar from '../../components/staff/Sidebar';
import Overview from '../../components/staff/Overview';
import Deliveries from '../../components/staff/Deliveries';
import RoutePlanner from '../../components/staff/RoutePlanner';
import Drivers from '../../components/staff/Drivers';
import Reports from '../../components/staff/Reports';
import { MOCK_PARCELS, MOCK_DRIVERS } from '../../components/staffMockData';
import { FilterState } from '../../components/staff/DeliveriesComponents';

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Lifted State to persist across tabs
  const [parcels, setParcels] = useState<any[]>(MOCK_PARCELS);
  const [drivers, setDrivers] = useState(MOCK_DRIVERS);

  // Fetch real data on mount and tab change (simple polling effect)
  useEffect(() => {
      const fetchParcels = async () => {
          try {
              const res = await fetch('/api/parcels');
              if (res.ok) {
                  const data = await res.json();
                  // Merge or replace. For simplicity, we just set the list.
                  // If API returns empty (first load), we might want to keep Mocks, 
                  // but here we want to show the persistent state.
                  if (Array.isArray(data) && data.length > 0) {
                      setParcels(data);
                  }
              }
          } catch (e) {
              console.error("Failed to fetch parcels", e);
          }
      };

      fetchParcels();
      // Optional: Poll every 5 seconds for "Real-time" effect
      const interval = setInterval(fetchParcels, 5000);
      return () => clearInterval(interval);
  }, []); // Run once on mount, interval handles updates

  // Lifted Filter State for Cross-Tab Interactions
  const [filters, setFilters] = useState<FilterState>({
      status: 'ALL',
      pincode: 'ALL',
      slot: 'ALL',
      driverStatus: 'ALL',
      search: ''
  });

  const renderContent = () => {
    switch (activeTab) {
        case 'overview': return <Overview setActiveTab={setActiveTab} parcels={parcels} setFilters={setFilters} />;
        case 'deliveries': return <Deliveries parcels={parcels} setParcels={setParcels} filters={filters} setFilters={setFilters} />;
        case 'routes': return <RoutePlanner parcels={parcels} activeDrivers={drivers.filter(d => d.status === 'ON_DUTY' || d.status === 'BUSY')} />;
        case 'drivers': return <Drivers drivers={drivers} setDrivers={setDrivers} />;
        case 'reports': return <Reports />;
        default: return <Overview setActiveTab={setActiveTab} parcels={parcels} setFilters={setFilters} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content Area - Shifted Right to accomodate Sidebar */}
        <div className="md:ml-64 p-8 pt-10 min-h-screen">
            {renderContent()}
        </div>
    </div>
  );
}
