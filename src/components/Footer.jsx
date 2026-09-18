import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Heart,
  ShieldCheck,
  ChevronRight,
  Navigation
} from 'lucide-react';
import { BUSINESS_INFO, scrollToSection } from '../utils/helpers';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 p-[1.5px] shadow-glow">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <span className="text-white font-black text-sm tracking-wider font-display">SV</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-black text-white font-display">
                  Sri Venkateswara
                </h3>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400">
                  Tours &amp; Travels
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 font-semibold italic">
              “Your Journey. Our Service.”
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Premium, dependable travel and car rental services based in Chennai, serving all surrounding districts and tourist corridors across Tamil Nadu.
            </p>

            <div className="pt-2 text-xs text-slate-400">
              <span>Managed by: </span>
              <strong className="text-white font-bold">{BUSINESS_INFO.owner}</strong>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Quick Navigation
            </p>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Home', id: 'hero' },
                { label: 'Interactive Journey', id: 'journey' },
                { label: 'Starting From Chennai', id: 'chennai' },
                { label: 'Destinations & Districts', id: 'destinations' },
                { label: 'Tamil Nadu Route Map', id: 'map' },
                { label: 'Our Vehicles', id: 'vehicles' },
                { label: 'Real Photo Gallery', id: 'gallery' },
                { label: 'Contact & Booking', id: 'contact' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="hover:text-brand-400 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Direct Contact
            </p>

            <ul className="space-y-3 text-xs">
              <li>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center gap-2.5 text-slate-300 hover:text-brand-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                  <span className="font-bold">{BUSINESS_INFO.displayPhone}</span>
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-2.5 text-slate-300 hover:text-brand-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="truncate">{BUSINESS_INFO.email}</span>
                </a>
              </li>

              <li className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.serviceArea}</span>
              </li>
            </ul>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400">
              <span className="text-emerald-400 font-bold">● Active 24/7</span> for Airport transfers, urgent city commutes &amp; planned outstation bookings.
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {currentYear} Sri Venkateswara Tours and Travels. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-slate-400">
            Comfortable &amp; Reliable Rides from Chennai
          </p>
        </div>

      </div>
    </footer>
  );
}
