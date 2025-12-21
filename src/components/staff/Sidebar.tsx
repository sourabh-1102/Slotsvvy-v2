import Link from 'next/link';

// Fallback Icons if Lucide issues persist (though we assume they work or we'd use SVGs)
// Use simple SVGs for reliability in this specific file if lucide isn't verified, 
// but since I'm defining a component, let's try to stick to a pattern.
// I'll use SVGs directly to avoid "module not found" errors that plague new setups.

const Icons = {
  Home: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Package: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16.5 9.4-9-5.19"/><path d="m21 16-9 5.19-9-5.19"/><path d="m12 14.6 9-5.19"/><path d="M21 16v-6.3a2 2 0 0 0-.99-1.72L12.99 3a2 2 0 0 0-1.98 0l-8.01 4.61A2 2 0 0 0 2 9.3v6.4a2 2 0 0 0 .99 1.72l8.02 4.61a2 2 0 0 0 1.98 0l8.01-4.61a2 2 0 0 0 1-1.73Z"/></svg>,
  Map: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>,
  Users: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  BarChart: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>,
  LogOut: (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
};

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Icons.Home },
    { id: 'deliveries', label: 'Deliveries', icon: Icons.Package },
    { id: 'routes', label: 'Route Planner', icon: Icons.Map },
    { id: 'drivers', label: 'Drivers', icon: Icons.Users },
    { id: 'reports', label: 'Reports', icon: Icons.BarChart },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-[calc(100vh-64px)] fixed left-0 top-16 z-10 transition-all duration-300">
      <div className="flex flex-col flex-1 py-6 space-y-1">
        {menuItems.map((item) => {
           const Icon = item.icon;
           return (
             <button
               key={item.id}
               onClick={() => setActiveTab(item.id)}
               className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors relative
                 ${activeTab === item.id 
                   ? 'text-blue-600 bg-blue-50' 
                   : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                 }
               `}
             >
               {activeTab === item.id && (
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full"></div>
               )}
               <Icon className="w-5 h-5" />
               {item.label}
             </button>
           );
        })}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <Link href="/" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors mb-2">
            <Icons.LogOut className="w-5 h-5" />
            <span>Exit Dashboard</span>
        </Link>
        <div className="bg-indigo-50 p-4 rounded-xl">
           <h4 className="font-bold text-indigo-900 text-sm">System Status</h4>
           <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-indigo-700 font-medium">All Services Online</span>
           </div>
        </div>
      </div>
    </div>
  );
}
