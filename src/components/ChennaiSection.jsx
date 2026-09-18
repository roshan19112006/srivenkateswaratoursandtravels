import React from 'react';
import { motion } from 'framer-motion';
import {
  Plane,
  MapPin,
  Navigation,
  Users,
  Compass,
  Building2,
  ArrowRight
} from 'lucide-react';
import { chennaiCorridors } from '../data/destinations';

const iconMap = {
  Plane,
  MapPin,
  Navigation,
  Users,
  Compass
};

export default function ChennaiSection({ onSelectService }) {
  return (
    <section id="chennai" className="py-8 sm:py-12 bg-white relative overflow-hidden">
      {/* Subtle ambient blur */}
      <div className="absolute top-1/2 -right-32 w-72 h-72 bg-brand-50/70 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header - Compact & Simple */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-[10px] font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-3 h-3 text-brand-600" />
            <span>Chennai Travel Hub</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 font-display tracking-tight">
            STARTING FROM CHENNAI
          </h2>

          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 font-normal">
            Local city rides, airport drops, and outstation trips starting anywhere in Chennai.
          </p>
        </div>

        {/* Simplified Compact Cards Grid (No Photos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-3.5">
          {chennaiCorridors.map((corridor, idx) => {
            const IconComponent = iconMap[corridor.icon] || MapPin;
            return (
              <motion.div
                key={corridor.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                onClick={() => onSelectService(corridor.name)}
                className="bg-slate-50/80 hover:bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 hover:border-brand-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-white group-hover:bg-brand-600 text-brand-600 group-hover:text-white border border-slate-200/80 group-hover:border-transparent flex items-center justify-center mb-2.5 transition-colors shadow-xs">
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">
                    {corridor.name}
                  </h3>

                  <p className="text-[10px] font-semibold text-brand-600 mt-0.5">
                    {corridor.tagline}
                  </p>

                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {corridor.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-brand-600 transition-colors">
                  <span>Book Ride</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
