import Link from 'next/link';

// Simple Icon Components
function IconTruck(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 17h4"/><path d="M20 17h2v-2a1 1 0 0 0-1-1h-5v-5h-9a1 1 0 0 0-1 1v12h2"/><path d="M16 17h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
  )
}
function IconClock(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  )
}
function IconMap(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
  )
}

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-32 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <div className="mt-24 sm:mt-32 lg:mt-16">
                   <div className="inline-flex space-x-6">
                      <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
                        New Feature
                      </span>
                      <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                        <span>Just shipped v1.0</span>
                      </span>
                   </div>
                </div>
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Logistics, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Reimagined</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Experience the future of delivery with SlotSavvy. AI-powered slot scheduling, real-time route optimization, and seamless tracking in one beautiful platform.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                   <Link href="/sender" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5">
                     Book Shipment
                   </Link>
                   <Link href="/staff" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition">
                     View Demo <span aria-hidden="true">→</span>
                   </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
             <div className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36" aria-hidden="true" />
             <div className="shadow-lg md:rounded-3xl relative">
                <div className="bg-blue-600 absolute inset-0 rounded-3xl -rotate-6 opacity-20"></div>
                <div className="bg-white/80 backdrop-blur-xl border border-white/40 p-8 rounded-3xl relative animate-float">
                   <div className="flex items-center gap-4 mb-6">
                       <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">📦</div>
                       <div>
                           <div className="font-bold text-gray-900">Parcel #8821</div>
                           <div className="text-sm text-green-600 font-medium">Out for Delivery</div>
                       </div>
                   </div>
                   <div className="space-y-4">
                       <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                           <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                       </div>
                       <div className="flex justify-between text-sm text-gray-500">
                           <span>Depot</span>
                           <span>Arriving in 15m</span>
                           <span>Home</span>
                       </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>

      {/* Features Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-20">
         <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Faster, Smarter, Green</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to run operations</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8 perspective-1000">
             <div className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl p-8 transition-all duration-500 ease-out hover:shadow-2xl hover:scale-[1.02] hover:-rotate-1 hover:-translate-y-2 group cursor-default relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full pointer-events-none"></div>
                 <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 group-hover:rotate-12 transition duration-300 shadow-sm">
                     <IconClock />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">AI Scheduling</h3>
                 <p className="text-gray-600 leading-relaxed group-hover:text-gray-700">
                     Our ML models predict the optimal time slots for delivery to minimize failure rates and maximize customer satisfaction.
                 </p>
             </div>
             
             <div className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl p-8 transition-all duration-500 ease-out hover:shadow-2xl hover:scale-[1.02] hover:rotate-1 hover:-translate-y-2 group cursor-default relative overflow-hidden delay-75">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full pointer-events-none"></div>
                 <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:-rotate-12 transition duration-300 shadow-sm">
                     <IconMap />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Dynamic Routing</h3>
                 <p className="text-gray-600 leading-relaxed group-hover:text-gray-700">
                     Generate the most efficient routes for your fleet in seconds using advanced VRP solvers, saving fuel and time.
                 </p>
             </div>

             <div className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl p-8 transition-all duration-500 ease-out hover:shadow-2xl hover:scale-[1.02] hover:-rotate-1 hover:-translate-y-2 group cursor-default relative overflow-hidden delay-150">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full pointer-events-none"></div>
                 <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 group-hover:rotate-6 transition duration-300 shadow-sm">
                     <IconTruck />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Live Tracking</h3>
                 <p className="text-gray-600 leading-relaxed group-hover:text-gray-700">
                     Give your customers peace of mind with real-time tracking updates, SMS notifications, and instant rescheduling.
                 </p>
             </div>
         </div>
      </div>
    </div>
  )
}
