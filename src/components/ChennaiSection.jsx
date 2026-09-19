import React from 'react';
import { motion } from 'framer-motion';
import {
  Plane,
  MapPin,
  Navigation,
  Users,
  Compass,
  Building2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { chennaiCorridors } from '../data/destinations';

const iconMap = {
  Plane,
  MapPin,
  Navigation,
  Users,
  Compass
};

const corridorBadges = {
  'Airport Transfers': 'MAA Terminals 1, 2 & 4',
  'Local City Rides': 'T. Nagar • Adyar • OMR',
  'Outstation Drops': 'GST & NH-48 Express',
  'Family & Group Travel': 'Innova & Urbania',
  'Temple Pilgrimages': 'Mylapore & Kanchi Circuit'
};

export default function ChennaiSection({ onSelectService }) {
  return (
    <section id="chennai" className="py-14 sm:py-20 bg-gradient-to-b from-amber-50/70 via-[#fcf9f2] to-amber-50/50 relative overflow-hidden border-y border-amber-200/60">
      {/* Subtle traditional Kolam pattern backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_0.8px,transparent_0.8px)] [background-size:28px_28px] opacity-25 pointer-events-none"></div>
      
      {/* Warm ambient glows */}
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-900 text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-amber-700" />
            <span>Chennai Chauffeur &amp; Travel Hub</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
            STARTING FROM CHENNAI
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-700 font-medium">
            24/7 Doorstep pickups across Chennai city, airport drop-offs, and comfortable outstation journeys across Tamil Nadu.
          </p>
        </div>

        {/* Chennai Corridor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {chennaiCorridors.map((corridor, idx) => {
            const IconComponent = iconMap[corridor.icon] || MapPin;
            const badgeText = corridorBadges[corridor.name] || 'Chennai Direct';
            return (
              <motion.div
                key={corridor.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => onSelectService(corridor.name)}
                className="bg-white/95 hover:bg-white p-5 rounded-2xl border border-amber-200/90 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-amber-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                      {badgeText}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">
                    {corridor.name}
                  </h3>

                  <p className="text-xs font-bold text-amber-700 mt-1">
                    {corridor.tagline}
                  </p>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {corridor.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-brand-600 transition-colors">
                  <span>Book Ride</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-amber-600" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
