import { useState } from 'react';
import { MOCK_KPIS, MOCK_DRIVERS, MOCK_PARCELS } from '../staffMockData';

// --- Helper Components ---

function KPICard({ title, value, subtext, trend }: { title: string, value: string | number, subtext: string, trend?: 'up' | 'down' | 'neutral' }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">{title}</h3>
            <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-gray-900">{value}</div>
                {trend && (
                    <div className={`px-2 py-1 rounded text-xs font-bold ${
                        trend === 'up' ? 'bg-green-100 text-green-700' : 
                        trend === 'down' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                        {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '—'} 
                    </div>
                )}
            </div>
            <p className="text-sm text-gray-400 mt-2">{subtext}</p>
        </div>
    );
}

function ProgressBar({ label, value, max = 100, color = 'indigo' }: { label?: string, value: number, max?: number, color?: string }) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const colorClass = 
        color === 'green' ? 'bg-green-500' : 
        color === 'red' ? 'bg-red-500' : 
        color === 'yellow' ? 'bg-yellow-500' : 'bg-indigo-600';
    
    return (
        <div className="w-full">
            {label && <div className="flex justify-between text-xs mb-1">
                <span className="font-bold text-gray-600">{label}</span>
                <span className="text-gray-500">{value}/{max} ({Math.round(percentage)}%)</span>
            </div>}
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${colorClass} transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
}

// --- Main Component ---

export default function Reports() {
    const [activeTab, setActiveTab] = useState('overview'); // overview, drivers, operations
    const [aiQuestion, setAiQuestion] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);

    // Aggregations
    const totalCapacity = MOCK_DRIVERS.reduce((acc, d) => acc + d.max_capacity, 0);
    const usedCapacity = MOCK_DRIVERS.reduce((acc, d) => acc + d.current_load, 0);
    const avgDriverRating = (MOCK_DRIVERS.reduce((acc, d) => acc + d.rating, 0) / MOCK_DRIVERS.length).toFixed(1);

    const handleAskAI = async () => {
        if (!aiQuestion.trim()) return;
        setIsAiLoading(true);
        setAiResponse('');
        try {
            const res = await fetch('/api/ai/insights', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    question: aiQuestion,
                    context: { kpis: MOCK_KPIS, drivers: MOCK_DRIVERS }
                })
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || res.statusText);
            }
            setAiResponse(data.insight);
        } catch (err: any) {
            console.error("Frontend AI Error:", err);
            setAiResponse(`Error: ${err.message}`);
        } finally {
            setIsAiLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up h-[calc(100vh-140px)] flex flex-col">
            <div className="flex justify-between items-center shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
                    <p className="text-gray-500">Real-time performance insights</p>
                </div>
                
                <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
                    {['overview', 'drivers', 'operations'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-bold rounded-md capitalize transition-colors ${
                                activeTab === tab ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* KPI Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <KPICard title="Total Parcels" value={MOCK_KPIS.totalParcels} subtext="Volume today" trend="up" />
                            <KPICard title="Delivery Rate" value={`${Math.round((MOCK_KPIS.delivered / MOCK_KPIS.totalParcels)*100)}%`} subtext="Completion percentage" trend="up" />
                            <KPICard title="Slot Utilization" value={`${MOCK_KPIS.slotUtilization}%`} subtext="Average across routes" trend="neutral" />
                            <KPICard title="Active Drivers" value={MOCK_DRIVERS.filter(d => d.status !== 'OFF_DUTY').length} subtext="Currently on road" />
                        </div>

                        {/* Charts Area */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Delivery Status Breakdown */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm lg:col-span-2">
                                <h3 className="font-bold text-gray-900 mb-6">Delivery Status Breakdown</h3>
                                <div className="space-y-4">
                                    <ProgressBar label="Delivered" value={MOCK_KPIS.delivered} max={MOCK_KPIS.totalParcels} color="green" />
                                    <ProgressBar label="Out for Delivery" value={MOCK_KPIS.outForDelivery} max={MOCK_KPIS.totalParcels} color="indigo" />
                                    <ProgressBar label="Scheduled" value={MOCK_KPIS.scheduled} max={MOCK_KPIS.totalParcels} color="yellow" />
                                    <ProgressBar label="Failed / Pending" value={MOCK_KPIS.failed + MOCK_KPIS.pendingReschedule} max={MOCK_KPIS.totalParcels} color="red" />
                                </div>
                            </div>

                            {/* Recent Alerts */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-4">Operational Alerts</h3>
                                <div className="space-y-3">
                                    {MOCK_KPIS.alerts.map(alert => (
                                        <div key={alert.id} className={`p-3 rounded-lg text-sm border-l-4 ${
                                            alert.type === 'critical' ? 'bg-red-50 border-red-500 text-red-900' :
                                            alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500 text-yellow-900' :
                                            'bg-blue-50 border-blue-500 text-blue-900'
                                        }`}>
                                            <p className="font-medium">{alert.type.toUpperCase()}</p>
                                            <p className="opacity-80 mt-1">{alert.message}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'drivers' && (
                    <div className="grid grid-cols-1 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-6">Driver Performance Leaderboard</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-xs text-gray-500 uppercase border-b border-gray-100">
                                            <th className="py-3 font-bold">Driver Name</th>
                                            <th className="py-3 font-bold">Status</th>
                                            <th className="py-3 font-bold">Load Capacity</th>
                                            <th className="py-3 font-bold">Rating</th>
                                            <th className="py-3 font-bold text-right">Performance Score</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {MOCK_DRIVERS.map(driver => (
                                            <tr key={driver.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition">
                                                <td className="py-4 font-bold text-gray-900">{driver.name} <span className="text-xs text-gray-400 font-normal block">{driver.id}</span></td>
                                                <td className="py-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                        driver.status === 'ON_DUTY' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                                    }`}>{driver.status.replace('_', ' ')}</span>
                                                </td>
                                                <td className="py-4 min-w-[150px] pr-4">
                                                    <ProgressBar value={driver.current_load} max={driver.max_capacity} />
                                                </td>
                                                <td className="py-4 text-gray-900">⭐ {driver.rating}</td>
                                                <td className="py-4 text-right font-bold text-indigo-600">{Math.round((driver.rating/5) * 100)}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'operations' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-6">Fleet Capacity Health</h3>
                            <div className="flex items-center justify-center p-6">
                                <div className="relative w-48 h-48 rounded-full border-[12px] border-indigo-100 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-indigo-600">{Math.round((usedCapacity / totalCapacity) * 100)}%</div>
                                        <div className="text-xs text-gray-500 uppercase font-bold mt-1">Utilized</div>
                                    </div>
                                    <svg className="absolute inset-0 w-full h-full -rotate-90 stroke-indigo-600 fill-none" viewBox="0 0 100 100" style={{ strokeWidth: 12, strokeDasharray: 283, strokeDashoffset: 283 - (283 * (usedCapacity / totalCapacity)) }}></svg>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center mt-6">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-500 font-bold uppercase">Total Capacity</p>
                                    <p className="text-lg font-bold text-gray-900">{totalCapacity} pkgs</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-500 font-bold uppercase">Currently Loaded</p>
                                    <p className="text-lg font-bold text-gray-900">{usedCapacity} pkgs</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl shadow-lg text-white flex flex-col">
                            <div>
                                <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
                                    AI Insights Generator
                                </h3>
                                <p className="text-indigo-100 mb-6 text-sm opacity-90">Ask questions about your fleet (e.g., "Which driver is most efficient?", "Summary of delivery failures")</p>
                            </div>
                            
                            <div className="mt-auto space-y-4">
                                {aiResponse && (
                                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 animate-in fade-in slide-in-from-bottom-2">
                                        <p className="text-sm italic text-white/90">"{aiResponse}"</p>
                                    </div>
                                )}

                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={aiQuestion}
                                        onChange={e => setAiQuestion(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleAskAI()}
                                        placeholder="Ask about your operations..." 
                                        disabled={isAiLoading}
                                        className="w-full pl-4 pr-12 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition disabled:opacity-50" 
                                    />
                                    <button 
                                        onClick={handleAskAI}
                                        disabled={isAiLoading || !aiQuestion.trim()}
                                        className="absolute right-2 top-2 p-1.5 bg-white text-indigo-600 rounded-lg shadow-sm hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        {isAiLoading ? (
                                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
