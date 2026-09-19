import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Clock,
  Compass,
  Repeat,
  PhoneCall,
  Sparkles,
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { whyChooseUsData } from '../data/services';
import { BUSINESS_INFO } from '../utils/helpers';

const iconMap = {
  ShieldCheck: ShieldCheck,
  Clock: Clock,
  Compass: Compass,
  Repeat: Repeat,
  PhoneCall: PhoneCall
};

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 sm:py-24 bg-gradient-to-b from-amber-50/50 via-[#faf6ee] to-amber-50/30 relative overflow-hidden border-t border-amber-200/60">
      {/* Background Kolam pattern and warm ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_0.8px,transparent_0.8px)] [background-size:28px_28px] opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-900 text-xs font-black uppercase tracking-wider mb-4 shadow-xs">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />
            <span>Dedicated Service Quality</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight leading-tight">
            WHY TRAVELLERS CHOOSE US
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-700 font-medium">
            Over a decade of trusted chauffeur services in Chennai: sanitised modern vehicles, courteous drivers, and 100% transparent pricing.
          </p>
        </div>

        {/* Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
          {whyChooseUsData.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || ShieldCheck;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white/95 hover:bg-white rounded-3xl p-6 border border-amber-200/90 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mb-5">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-amber-100 flex items-center gap-1.5 text-[11px] font-bold text-amber-700 group-hover:text-brand-600">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Sri Venkateswara Quality</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Chennai Trust Seal Strip */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-white/90 border border-amber-200/80 shadow-md flex flex-wrap items-center justify-around gap-4 text-xs font-bold text-slate-700">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            Direct Owner Assistance with Bala ({BUSINESS_INFO.displayPhone})
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            Tamil, Telugu &amp; English Speaking Drivers
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            Chennai City &amp; Tamil Nadu Permits Cleared
          </span>
        </div>

      </div>
    </section>
  );
}
