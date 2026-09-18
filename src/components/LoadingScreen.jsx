import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Car } from 'lucide-react';

export default function LoadingScreen({ onFinish }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 400);
    const timer2 = setTimeout(() => setStage(2), 900);
    const timer3 = setTimeout(() => {
      if (onFinish) onFinish();
    }, 1400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        key="loading-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-brand-950 to-slate-900 text-white select-none overflow-hidden"
      >
        {/* Ambient subtle glow background */}
        <div className="absolute w-96 h-96 rounded-full bg-brand-600/20 blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute w-64 h-64 rounded-full bg-gold-500/10 blur-2xl pointer-events-none"></div>

        <div className="relative flex flex-col items-center text-center px-4">
          {/* Monogram emblem */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-sky-400 p-[2px] shadow-glow mb-6"
          >
            <div className="w-full h-full bg-slate-900/90 rounded-2xl flex items-center justify-center border border-brand-400/30">
              <span className="text-3xl sm:text-4xl font-black tracking-wider bg-gradient-to-r from-white via-sky-200 to-gold-400 bg-clip-text text-transparent font-display">
                SV
              </span>
            </div>
          </motion.div>

          {/* Animated Brand Title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-1"
          >
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
              Sri Venkateswara
            </h1>
            <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-brand-300 uppercase">
              Tours &amp; Travels
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 1 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4 text-xs sm:text-sm text-slate-400 font-medium italic flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4 text-gold-400 animate-spin" style={{ animationDuration: '6s' }} />
            Your Journey Starts Here.
          </motion.p>

          {/* Animated road track indicator */}
          <div className="w-48 sm:w-60 h-1 bg-slate-800 rounded-full mt-6 overflow-hidden relative">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
              className="w-1/2 h-full bg-gradient-to-r from-transparent via-brand-400 to-transparent"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
