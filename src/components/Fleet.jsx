import React from 'react';
import { motion } from 'framer-motion';
import {
  Car,
  ChevronRight,
  Sparkles,
  Users,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { fleetCategories } from '../data/fleet';

export default function Fleet({ onViewAllFleet, onSelectVehicle }) {
  return (
    <section id="fleet" className="py-20 sm:py-24 bg-slate-50 relative overflow-hidden">
      {/* Subtle background ambient blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-100/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Car className="w-3.5 h-3.5 text-brand-600" />
            <span>Chauffeur-Driven Vehicles</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight leading-tight">
            COMFORT ON EVERY JOURNEY
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Choose from well-maintained, sanitized sedans, spacious SUVs, luxury cars, and group travellers fitted for relaxed city and highway travel.
          </p>
        </div>

        {/* Compact Fleet Showcase Teaser Stage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10">
          {fleetCategories.map((vehicle, idx) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              onClick={onViewAllFleet}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-brand-300 hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                  
                  <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-extrabold text-slate-900 uppercase tracking-wider">
                    {vehicle.category}
                  </span>

                  <span className="absolute bottom-2 left-2.5 text-white text-[11px] font-bold">
                    {vehicle.badge}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="text-base font-black text-slate-900 font-display group-hover:text-brand-600 transition-colors">
                    {vehicle.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {vehicle.idealFor}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-brand-600" />
                      {vehicle.capacity}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-gold-600" />
                      {vehicle.luggage}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-600 group-hover:translate-x-0.5 transition-transform">
                  <span>View Specifications</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Prominent CTA Banner to enter the dedicated Fleet Page */}
        <div className="text-center">
          <button
            onClick={onViewAllFleet}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg hover:shadow-glow transition-all duration-200 cursor-pointer group"
          >
            <span>Explore Complete Vehicles &amp; Real Photo Gallery</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="mt-3 text-xs text-slate-500 font-medium">
            Detailed specifications, seating layouts, luggage bays &amp; instant booking available on the dedicated page.
          </p>
        </div>

      </div>
    </section>
  );
}
