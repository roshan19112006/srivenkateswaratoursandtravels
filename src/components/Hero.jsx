import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  ArrowRight,
  PhoneCall,
  ShieldCheck,
  Star,
  CheckCircle2
} from 'lucide-react';
import { BUSINESS_INFO } from '../utils/helpers';

export default function Hero({ onOpenBooking }) {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center pt-24 sm:pt-28 pb-14 lg:pb-16 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50"
    >
      {/* Ambient background glow accents */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-sky-100/40 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clean, Bold, Professional Typography */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Location & Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-brand-600" />
              <span>Chennai, Tamil Nadu • 24/7 Chauffeur Service</span>
            </div>

            {/* Main Brand Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.08] tracking-tight font-display">
              SRI VENKATESWARA
              <span className="block bg-gradient-to-r from-brand-600 via-blue-600 to-sky-600 bg-clip-text text-transparent">
                TOURS &amp; TRAVELS
              </span>
            </h1>

            {/* Crisp & Clean Tagline */}
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
              Premium chauffeur-driven car rentals, 24/7 airport transfers, and comfortable outstation road trips across Tamil Nadu and South India.
            </p>

            {/* Call to Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-7 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Book Your Ride</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base rounded-xl border border-slate-200 shadow-xs hover:border-brand-300 hover:text-brand-600 transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-brand-600" />
                <span>Call Bala ({BUSINESS_INFO.displayPhone})</span>
              </a>
            </div>

            {/* Clean Trust Badges Strip */}
            <div className="mt-8 pt-6 border-t border-slate-200/70 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Sanitized Modern Vehicles
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" />
                Licensed Seasoned Drivers
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-gold-500 shrink-0 fill-gold-400" />
                Zero Hidden Charges
              </span>
            </div>
          </motion.div>

          {/* Right Column: Theme-Matching Professional Image Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 25 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 group">
              <img
                src="/hero_travels.jpg"
                alt="Sri Venkateswara Tours & Travels Chennai Chauffeur Vehicles"
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

              {/* Floating Top Rating Card */}
              <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/40 shadow-md flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-400" />
                <span className="text-xs font-black text-slate-900">4.9</span>
                <span className="text-[11px] text-slate-500 font-medium">(1000+ Happy Trips)</span>
              </div>

              {/* Floating Bottom Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/70 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 block">
                      Direct Chauffeur Service
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white">
                      Sedans • Innova Crysta • Vans • Volvo Coaches
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-brand-600/90 text-white text-[11px] font-bold shrink-0">
                    24/7 Available
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
