import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useMemo, useEffect } from 'react';

// Default center (Bangalore)
const DEFAULT_CENTER = { lat: 12.9716, lng: 77.5946 };
const MAP_CONTAINER_STYLE = { width: '100%', height: '100%' };

export interface RouteData {
    id: string;
    startLocation?: google.maps.LatLngLiteral;
    endLocation?: google.maps.LatLngLiteral;
    currentLocation?: google.maps.LatLngLiteral;
    driver: string;
    vehicle: string;
    stops: number;
    distance: string;
    [key: string]: any;
}

interface RouteMapProps {
    routes: RouteData[];
    selectedRouteId: string | null;
    onSelectRoute: (id: string) => void;
}

export default function RouteMap({ routes, selectedRouteId, onSelectRoute }: RouteMapProps) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "unable to fetch api"
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [selectedMarker, setSelectedMarker] = useState<RouteData | null>(null);

    // Filter to show only the selected route if one is selected, otherwise show all
    const displayRoutes = useMemo(() => {
        if (selectedRouteId) {
            return routes.filter(r => r.id === selectedRouteId);
        }
        return routes;
    }, [routes, selectedRouteId]);

    // Update map bounds when routes change
    useEffect(() => {
        if (map && displayRoutes.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            displayRoutes.forEach(r => {
                if (r.startLocation) bounds.extend(r.startLocation);
                if (r.endLocation) bounds.extend(r.endLocation);
                // Also include stops if needed
            });
            map.fitBounds(bounds);
        }
    }, [map, displayRoutes]);

    if (loadError) {
        return (
            <div className="h-full w-full bg-red-50 rounded-2xl flex flex-col items-center justify-center p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                <h3 className="text-red-800 font-bold mb-1">Map Loading Failed</h3>
                <p className="text-red-600 text-sm mb-4">Google Maps API key is missing or invalid.</p>
                <div className="bg-white p-3 rounded border border-red-200 text-xs text-left w-full overflow-hidden">
                    <p className="font-mono text-gray-500 mb-1">.env.local</p>
                    <code className="block bg-gray-100 p-2 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here</code>
                </div>
            </div>
        );
    }

    if (!isLoaded) return <div className="h-full w-full bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center text-gray-400 font-bold">Loading Maps...</div>;

    return (
        <GoogleMap
            mapContainerStyle={MAP_CONTAINER_STYLE}
            center={DEFAULT_CENTER}
            zoom={12}
            onLoad={setMap}
            options={{
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
            }}
        >
            {displayRoutes.map(route => (
                <Marker
                    key={route.id}
                    position={route.currentLocation || DEFAULT_CENTER}
                    onClick={() => {
                        setSelectedMarker(route);
                        onSelectRoute(route.id);
                    }}
                    icon={{
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 10,
                        fillColor: route.id === selectedRouteId ? '#4F46E5' : '#EF4444', // Indigo for selected, Red for others
                        fillOpacity: 1,
                        strokeColor: '#ffffff',
                        strokeWeight: 2,
                    }}
                />
            ))}

            {selectedMarker && (
                <InfoWindow
                    position={selectedMarker.currentLocation || DEFAULT_CENTER}
                    onCloseClick={() => setSelectedMarker(null)}
                >
                    <div className="p-2 min-w-[200px]">
                        <h3 className="font-bold text-gray-900">{selectedMarker.driver}</h3>
                        <p className="text-sm text-gray-500">{selectedMarker.vehicle}</p>
                        <div className="mt-2 flex justify-between text-xs">
                            <span className="font-bold">Load: {selectedMarker.stops} stops</span>
                            <span className="text-gray-500">{selectedMarker.distance}</span>
                        </div>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}
