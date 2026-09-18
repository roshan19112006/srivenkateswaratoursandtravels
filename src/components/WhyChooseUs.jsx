import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Clock,
  Compass,
  Repeat,
  PhoneCall,
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import { whyChooseUsData } from '../data/services';

const iconMap = {
  ShieldCheck: ShieldCheck,
  Clock: Clock,
  Compass: Compass,
  Repeat: Repeat,
  PhoneCall: PhoneCall
};

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 bg-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-brand-50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
            <HeartHandshake className="w-3.5 h-3.5 text-brand-600" />
            <span>Dedicated Service Quality</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight leading-tight">
            WHY TRAVELLERS CHOOSE US
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal">
            We focus on clean vehicles, courteous chauffeurs, and transparent arrangements so you can sit back and enjoy every mile.
          </p>
        </div>

        {/* Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {whyChooseUsData.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || ShieldCheck;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-slate-50 hover:bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-brand-300 hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-brand-600 border border-slate-200 group-hover:border-transparent text-brand-600 group-hover:text-white flex items-center justify-center shadow-xs transition-colors mb-5">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-bold text-slate-400 group-hover:text-brand-600">
                  <Sparkles className="w-3 h-3" />
                  <span>Sri Venkateswara Quality</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
