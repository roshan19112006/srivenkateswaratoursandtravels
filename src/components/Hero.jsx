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
      className="relative min-h-[88vh] lg:min-h-[92vh] flex items-center pt-24 sm:pt-28 pb-14 lg:pb-16 overflow-hidden bg-slate-950 text-white"
    >
      {/* High-Resolution Chennai Landmark Theme Background Image */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <img
          src="/chennai/chennai_hero_bg.jpg"
          alt="Chennai Central Station, Marina Coast & Heritage - Sri Venkateswara Tours & Travels"
          className="w-full h-full object-cover object-[center_right] sm:object-center scale-105 motion-safe:animate-fade-in"
        />
        {/* Cinematic Dual-Tone Overlays for High Legibility & Warmth */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/40 lg:to-slate-950/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-slate-950/70"></div>
        <div className="absolute inset-0 bg-amber-950/15 mix-blend-color pointer-events-none"></div>
      </div>

      {/* Subtle ambient glow accents */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-500/15 rounded-full blur-3xl pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clean, Bold, High-Contrast Typography */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Location & Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-lg backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Chennai, Tamil Nadu • 24/7 Chauffeur Service</span>
            </div>

            {/* Main Brand Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight font-display drop-shadow-md">
              SRI VENKATESWARA
              <span className="block bg-gradient-to-r from-amber-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                TOURS &amp; TRAVELS
              </span>
            </h1>

            {/* Crisp & Clean Tagline */}
            <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-xl font-normal leading-relaxed drop-shadow-sm">
              Premium chauffeur-driven car rentals, 24/7 airport transfers, and comfortable outstation road trips across Tamil Nadu and South India.
            </p>

            {/* Call to Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenBooking}
                className="btn-shimmer w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-brand-600 via-brand-500 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white font-bold text-sm sm:text-base rounded-xl shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Book Your Ride</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-900/80 hover:bg-slate-800/90 text-white font-bold text-sm sm:text-base rounded-xl border border-white/20 hover:border-amber-400/60 shadow-md backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Call Bala ({BUSINESS_INFO.displayPhone})</span>
              </a>
            </div>

            {/* Clean Trust Badges Strip */}
            <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2.5 text-xs font-semibold text-slate-200">
              <span className="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Sanitized Modern Vehicles
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                Licensed Seasoned Drivers
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                <Star className="w-4 h-4 text-amber-400 shrink-0 fill-amber-400" />
                Zero Hidden Charges
              </span>
            </div>
          </motion.div>

          {/* Right Column: Theme-Matching Professional Fleet Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 25 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900/80 backdrop-blur-xl group">
              <img
                src="/hero_travels.jpg"
                alt="Sri Venkateswara Tours & Travels Chennai Chauffeur Vehicles"
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>

              {/* Floating Top Rating Card */}
              <div className="absolute top-3.5 right-3.5 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-400/40 shadow-md flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-xs font-black text-white">4.9</span>
                <span className="text-[11px] text-slate-300 font-medium">(1000+ Happy Trips)</span>
              </div>

              {/* Floating Bottom Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                      Direct Chauffeur Service
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white">
                      Sedans • Innova Crysta • Vans • Volvo Coaches
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-brand-600 to-brand-700 text-white text-[11px] font-bold shrink-0 border border-brand-500/40">
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
