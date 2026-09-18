import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Briefcase,
  ShieldCheck,
  Check,
  Info,
  Car,
  ChevronRight,
  ArrowLeft,
  PhoneCall,
  Sparkles,
  MessageCircle,
  Clock,
  Shield,
  Star
} from 'lucide-react';
import { fleetCategories } from '../data/fleet';
import { BUSINESS_INFO, createWhatsAppUrl } from '../utils/helpers';
import GallerySection from './GallerySection';

export default function FleetPage({ onBackToHome, onSelectVehicle }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filterOptions = [
    { label: 'All Vehicles', value: 'All' },
    { label: 'Sedans', value: 'Sedan Class' },
    { label: 'SUVs', value: 'SUV Class' },
    { label: 'Luxury Cars', value: 'Premium Class' },
    { label: 'Group Travellers', value: 'Group Traveller Class' },
    { label: 'Luxury Buses', value: 'Coach Bus Class' }
  ];

  const filteredVehicles = activeFilter === 'All'
    ? fleetCategories
    : fleetCategories.filter(v => v.category === activeFilter);

  const handleWhatsAppVehicle = (vehicle) => {
    const url = createWhatsAppUrl({
      vehicle: vehicle.name,
      message: `Hello Bala, I am interested in booking the ${vehicle.name} (${vehicle.category}) with Sri Venkateswara Tours & Travels.`
    });
    window.open(url, '_blank');
  };

  return (
    <div id="vehicles" className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-20">
      
      {/* Top Breadcrumb / Return to Home Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-brand-600 hover:border-brand-300 font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-brand-600 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Car className="w-3.5 h-3.5 text-brand-600" />
            <span>Sri Venkateswara Chauffeur Vehicles</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight leading-tight">
            COMFORT ON EVERY JOURNEY
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Choose from well-maintained, sanitized sedans, spacious SUVs, luxury cars, group travellers, and executive Volvo coaches fitted for relaxed city and highway travel.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {filterOptions.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeFilter === tab.value
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6 mb-16">
          {filteredVehicles.map((vehicle, idx) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-premium-hover hover:border-brand-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Vehicle Image Stage */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-extrabold text-slate-900 uppercase tracking-wider shadow-xs">
                    {vehicle.category}
                  </span>

                  <span className="absolute bottom-2.5 left-3 text-gold-300 text-xs font-extrabold">
                    ★ {vehicle.badge}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 font-display group-hover:text-brand-600 transition-colors">
                    {vehicle.name}
                  </h2>

                  <p className="text-xs text-slate-600 mt-1 mb-3 leading-relaxed min-h-[36px]">
                    {vehicle.idealFor}
                  </p>

                  {/* Capacity Info Badges */}
                  <div className="grid grid-cols-2 gap-2 mb-3 bg-slate-50 p-2 rounded-xl border border-slate-100 text-xs text-slate-700 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                      <span className="truncate">{vehicle.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span className="truncate">{vehicle.luggage}</span>
                    </div>
                  </div>

                  {/* Full Feature Checklist */}
                  <div className="border-t border-slate-100 pt-3 mb-4">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Included Amenities
                    </p>
                    <ul className="space-y-1.5">
                      {vehicle.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-tight">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 sm:p-5 pt-0 space-y-2">
                <button
                  onClick={() => onSelectVehicle(vehicle.name)}
                  className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-glow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{vehicle.buttonText || `Select ${vehicle.name.split(' ')[0]}`}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleWhatsAppVehicle(vehicle)}
                  className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Inquiry</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Real Vehicle & Travel Gallery */}
        <GallerySection onSelectVehicleForBooking={onSelectVehicle} />

        {/* Direct Contact & Dispatch Banner */}
        <div className="mt-14 bg-gradient-to-r from-slate-900 to-navy-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-gold-400 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Chauffeur Dispatch</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-display">
              Need Help Choosing the Right Vehicle?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Contact Bala directly for custom group bookings, Volvo luxury coaches, corporate requirements, or multi-day temple tours.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="px-5 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Bala ({BUSINESS_INFO.displayPhone})</span>
            </a>

            <button
              onClick={onBackToHome}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl transition-all"
            >
              Return to Home
            </button>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="mt-8 p-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl max-w-2xl mx-auto flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 font-medium leading-relaxed">
            <strong className="font-bold">Please Note:</strong> Vehicle availability depends on your trip requirements. Contact us to choose the right option.
          </p>
        </div>
      </div>
    </div>
  );
}
