import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, PhoneCall, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO, createWhatsAppUrl } from '../utils/helpers';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip / Prompt popup */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 10 }}
            className="hidden sm:flex items-center gap-2 bg-slate-900 text-white px-3.5 py-2 rounded-2xl shadow-xl border border-slate-700 text-xs font-bold"
          >
            <span>Chat with BALA</span>
            <span className="text-[10px] text-emerald-400 font-semibold">• Online</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <a
        href={createWhatsAppUrl({ message: 'Hello Bala, I would like to book a ride with Sri Venkateswara Tours and Travels.' })}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative group p-3.5 sm:p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-2 border-white focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Chat with Sri Venkateswara Tours and Travels on WhatsApp"
      >
        {/* Pulsing Ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-75 animate-ping -z-10"></span>
        
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>
    </div>
  );
}
