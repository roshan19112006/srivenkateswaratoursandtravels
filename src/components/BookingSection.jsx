import React from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  Mail,
  ArrowRight,
  Compass,
  CalendarCheck,
  CheckCircle2
} from 'lucide-react';
import { BUSINESS_INFO, createWhatsAppUrl } from '../utils/helpers';

export default function BookingSection({ onOpenBookingModal }) {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-brand-900 via-navy-900 to-slate-950 text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="glass-panel-dark p-8 sm:p-14 rounded-3xl border border-slate-700/80 shadow-2xl text-center max-w-4xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Compass className="w-3.5 h-3.5 text-brand-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Instant Trip Assistance</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
            READY FOR YOUR NEXT JOURNEY?
          </h2>

          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal">
            Tell us where you want to go. We'll help you plan the ride with the best route and vehicle.
          </p>

          {/* Quick Contact Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            
            {/* Phone Button */}
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="btn-shimmer px-6 py-3.5 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg hover:shadow-glow transition-all flex items-center gap-2.5"
            >
              <Phone className="w-4 h-4 animate-pulse" />
              <span>Call Now ({BUSINESS_INFO.displayPhone})</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href={createWhatsAppUrl({ message: 'Hello Bala, I would like to book a trip with Sri Venkateswara Tours and Travels.' })}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg transition-all flex items-center gap-2.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>

            {/* Email Button */}
            <a
              href={`mailto:${BUSINESS_INFO.email}?subject=Tour%20and%20Travel%20Booking%20Enquiry`}
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm sm:text-base rounded-2xl border border-slate-700 transition-all flex items-center gap-2.5"
            >
              <Mail className="w-4 h-4 text-sky-400" />
              <span>Email Us</span>
            </a>

          </div>

          {/* Direct Info Pills */}
          <div className="mt-10 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Direct Owner Assistance (BALA)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Chennai &amp; Tamil Nadu Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Hidden Conditions</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
