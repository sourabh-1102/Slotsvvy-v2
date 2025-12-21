'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  // Hide Navbar on staff pages to allow Sidebar full control
  if (pathname?.startsWith('/staff')) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 lg:px-8 flex justify-center">
      <nav className="bg-white/70 backdrop-blur-md rounded-full border border-white/50 shadow-xl shadow-indigo-500/10 px-8 py-4 flex items-center justify-between w-full max-w-6xl transition-all hover:bg-white/90">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
            <div className="text-blue-600 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight font-display">Slot<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Savvy</span></span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-2">
          <Link href="/" className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive('/') ? 'bg-gray-900 text-white shadow-lg scale-105' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50 hover:shadow-sm'}`}>
            Home 
          </Link>
        
          <Link href="/sender" className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive('/sender') ? 'bg-gray-900 text-white shadow-lg scale-105' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50 hover:shadow-sm'}`}>
            Book Parcel
          </Link>
          <Link href="/receiver" className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive('/receiver') ? 'bg-gray-900 text-white shadow-lg scale-105' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50 hover:shadow-sm'}`}>
            Track Parcel
          </Link>
          <Link href="/staff" className={`ml-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive('/staff') ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105' : 'bg-blue-50 text-blue-700 hover:bg-blue-100/80 hover:shadow-md'}`}>
            Staff Dashboard
          </Link>
        </div>
      </nav>
    </div>
  );
}
