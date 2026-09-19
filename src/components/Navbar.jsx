import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Navigation, ChevronRight, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, scrollToSection, createWhatsAppUrl } from '../utils/helpers';

export default function Navbar({ onOpenBooking, currentView = 'home', onNavigateView }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: 'hero' },
    { label: 'Journey', href: 'journey' },
    { label: 'Chennai', href: 'chennai' },
    { label: 'Destinations', href: 'destinations' },
    { label: 'Route Map', href: 'map' },
    { label: 'Vehicles', href: 'vehicles' },
    { label: 'Gallery', href: 'gallery' },
    { label: 'Why Us', href: 'why-us' },
    { label: 'Contact', href: 'contact' },
  ];

  const handleNavClick = (id) => {
    if (id === 'vehicles' || id === 'fleet') {
      if (onNavigateView) onNavigateView('vehicles');
    } else if (id === 'gallery') {
      if (onNavigateView) onNavigateView('vehicles', 'gallery');
    } else {
      if (onNavigateView) onNavigateView('home', id);
      else scrollToSection(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-amber-200/60 py-2.5 sm:py-3'
          : 'bg-slate-950/40 backdrop-blur-md border-b border-white/10 py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="group flex items-center gap-3 select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-amber-400 to-brand-500 p-[1.5px] shadow-sm group-hover:shadow-glow transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="text-amber-300 font-black text-sm tracking-wider font-display">SV</span>
            </div>
          </div>
          <div>
            <span className={`text-base sm:text-lg font-black tracking-tight font-display block leading-none transition-colors ${
              isScrolled ? 'text-slate-900' : 'text-white'
            }`}>
              Sri Venkateswara
            </span>
            <span className="text-[10px] tracking-widest text-amber-400 uppercase font-extrabold block mt-0.5">
              Tours &amp; Travels
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className={`px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                (currentView === 'vehicles' || currentView === 'fleet') && link.href === 'vehicles'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : isScrolled
                  ? 'text-slate-700 hover:text-brand-600 hover:bg-amber-50/80'
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all shadow-xs ${
              isScrolled
                ? 'text-slate-800 hover:text-brand-600 bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200/80'
                : 'text-white hover:text-amber-300 bg-white/10 hover:bg-white/20 border border-white/20'
            }`}
            title={`Call BALA: ${BUSINESS_INFO.phone}`}
          >
            <Phone className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{BUSINESS_INFO.displayPhone}</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="btn-shimmer relative px-4 py-2 bg-gradient-to-r from-brand-600 via-brand-500 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-glow transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Book Now</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 bg-gradient-to-r from-brand-600 to-brand-500 text-white text-xs font-bold rounded-lg shadow-sm"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-slate-700 hover:text-slate-900 bg-slate-100' : 'text-white hover:text-amber-300 bg-white/10'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-brand-50 hover:text-brand-600 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}

              <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-800 rounded-xl font-bold text-sm"
                >
                  <Phone className="w-4 h-4 text-brand-600" />
                  <span>Call {BUSINESS_INFO.displayPhone}</span>
                </a>
                <a
                  href={createWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
