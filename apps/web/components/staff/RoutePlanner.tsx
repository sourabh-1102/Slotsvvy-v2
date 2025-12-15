import { useState } from 'react';
import { MOCK_COORDINATES } from '../staffMockData';
import RouteMap from './RouteMap';
import { Driver } from '../../types';

// Helper to simulate route generation based on selected drivers
const simulateRouteOptimization = (selectedDriverIds: string[], allDrivers: Driver[]) => {
    return selectedDriverIds.map((driverId, index) => {
        const driver = allDrivers.find(d => d.id === driverId);
        // Randomize simulation data
        const stops = Math.floor(Math.random() * 8) + 5; // 5-12 stops
        const distance = Math.floor(Math.random() * 30) + 15; // 15-45km
        const durationHours = Math.floor(distance / 15); // Rough speed estimate
        const durationMins = Math.floor(Math.random() * 60);
        
        // Mock Location logic
        const coordIndex = (index + driverId.charCodeAt(driverId.length - 1)) % MOCK_COORDINATES.length;
        const currentLocation = MOCK_COORDINATES[coordIndex];
        
        return {
            id: `route-${driverId}-${Date.now()}`,
            driver: driver?.name || driverId,
            vehicle: driver?.vehicle,
            stops,
            distance: `${distance}km`,
            duration: `${durationHours}h ${durationMins}m`,
            status: 'Optimized',
            currentLocation,
            startLocation: currentLocation // For simplicity
        };
    });
};

interface RoutePlannerProps {
    parcels: any[];
    activeDrivers: Driver[];
}

export default function RoutePlanner({ parcels, activeDrivers }: RoutePlannerProps) {
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState<any[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  
  // Initialize with all On Duty drivers selected by default
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>(
      activeDrivers.map(d => d.id)
  );

  const toggleDriver = (id: string) => {
      setSelectedDrivers(prev => 
        prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
      );
  };

  const handleCompute = () => {
    if (selectedDrivers.length === 0) {
        alert("Please select at least one driver.");
        return;
    }

    setLoading(true);
    // Simulate API computation delay
    setTimeout(() => {
        const optimizedRoutes = simulateRouteOptimization(selectedDrivers, activeDrivers);
        setRoutes(optimizedRoutes);
        setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in-up h-[calc(100vh-140px)] flex flex-col">
       <div className="flex justify-between items-center">
            <div>
                 <h1 className="text-2xl font-bold text-gray-900">Route Planner</h1>
                 <p className="text-gray-500">AI Optimization powered by OR-Tools</p>
            </div>
       </div>

       <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
           {/* Control Panel */}
           <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-6 overflow-y-auto">
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Target Date</label>
                  <input type="date" className="w-full px-4 py-2 border rounded-lg" defaultValue={new Date().toISOString().split('T')[0]}/>
               </div>
               
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Select Drivers ({selectedDrivers.length})</label>
                  <div className="space-y-2 border rounded-lg p-3 max-h-56 overflow-y-auto bg-gray-50">
                     {activeDrivers.map(driver => (
                         <label key={driver.id} className="flex items-center gap-3 text-sm text-gray-700 hover:bg-white p-2 rounded cursor-pointer transition">
                             <input 
                                type="checkbox" 
                                checked={selectedDrivers.includes(driver.id)}
                                onChange={() => toggleDriver(driver.id)}
                                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                             />
                             <div className="flex-1">
                                 <div className="font-medium">{driver.name}</div>
                                 <div className="text-xs text-gray-500">{driver.vehicle} • <span className={driver.status === 'On Duty' || driver.status === 'ON_DUTY' ? 'text-green-600' : 'text-gray-400'}>{driver.status}</span></div>
                             </div>
                         </label>
                     ))}
                  </div>
               </div>
               
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Optimization Goal</label>
                  <select className="w-full px-4 py-2 border rounded-lg">
                      <option>Minimize Time</option>
                      <option>Minimize Distance</option>
                      <option>Balance Load</option>
                  </select>
               </div>

               <div className="border-t pt-6 mt-auto">
                  <button 
                    onClick={handleCompute}
                    disabled={loading || selectedDrivers.length === 0}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {loading ? 'Optimizing Routes...' : 'Generate Routes'}
                  </button>
               </div>
           </div>

           {/* Map & Results */}
           <div className="lg:col-span-2 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col relative overflow-hidden">
               {routes.length === 0 ? (
                   <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                       <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7"></path></svg>
                       <p className="font-medium">Map Visualization Area</p>
                       <p className="text-sm">Select drivers and generate routes to see results</p>
                   </div>
               ) : (
                   <div className="flex-1 bg-white p-6 overflow-hidden flex flex-col h-full">
                       <div className="flex justify-between items-center mb-4 shrink-0">
                           <h3 className="font-bold text-gray-900 text-lg">Optimized Route Plan</h3>
                           <span className="text-sm text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">{routes.length} Drivers Assigned</span>
                       </div>
                       
                       <div className="grid md:grid-cols-2 gap-4 h-full min-h-0">
                            {/* Route List */}
                            <div className="space-y-3 overflow-y-auto pr-2 max-h-[500px]">
                                {routes.map(r => (
                                    <div 
                                        key={r.id} 
                                        onClick={() => setSelectedRouteId(r.id === selectedRouteId ? null : r.id)}
                                        className={`p-4 border rounded-xl shadow-sm transition cursor-pointer flex justify-between items-center group
                                            ${selectedRouteId === r.id ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-gray-100 bg-white hover:shadow-md'}
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                                                ${selectedRouteId === r.id ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'}
                                            `}>
                                                {r.driver.charAt(0)}
                                            </div>
                                            <div>
                                                    <h4 className="font-bold text-gray-900">{r.driver}</h4>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <span>{r.distance}</span>
                                                        <span>•</span>
                                                        <span>{r.stops} Stops</span>
                                                    </div>
                                            </div>
                                        </div>
                                        {selectedRouteId === r.id && (
                                            <div className="text-indigo-600 text-xs font-bold animate-pulse">Viewing</div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Map Container */}
                            <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden relative min-h-[300px]">
                                <RouteMap routes={routes} selectedRouteId={selectedRouteId} onSelectRoute={setSelectedRouteId} />
                            </div>
                       </div>
                   </div>
               )}
           </div>
       </div>
    </div>
  );
}
