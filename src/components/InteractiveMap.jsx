import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Navigation,
  Clock,
  Car,
  Compass,
  ArrowRight,
  Sparkles,
  Info,
  Check
} from 'lucide-react';
import { mapHub, mapDestinations } from '../data/routesMap';
import { createWhatsAppUrl } from '../utils/helpers';

export default function InteractiveMap({ onPlanTrip }) {
  const [selectedDest, setSelectedDest] = useState(mapDestinations[0]);
  const [hoveredDest, setHoveredDest] = useState(null);

  const active = hoveredDest || selectedDest;

  const getLabelClass = (pos, isSelected) => {
    const base = `absolute text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md transition-all whitespace-nowrap shadow-sm pointer-events-none z-30 ${
      isSelected
        ? 'bg-gold-400 text-slate-950 font-black shadow-glow-gold scale-105'
        : 'text-slate-200 bg-slate-900/90 border border-slate-700/80 backdrop-blur-xs'
    }`;

    switch (pos) {
      case 'top':
        return `${base} bottom-full mb-1.5 left-1/2 -translate-x-1/2`;
      case 'bottom':
        return `${base} top-full mt-1.5 left-1/2 -translate-x-1/2`;
      case 'left':
        return `${base} right-full mr-2 top-1/2 -translate-y-1/2`;
      case 'right':
        return `${base} left-full ml-2 top-1/2 -translate-y-1/2`;
      default:
        return `${base} top-full mt-1.5 left-1/2 -translate-x-1/2`;
    }
  };

  return (
    <section id="map" className="py-20 sm:py-24 bg-gradient-to-b from-slate-900 via-navy-900 to-slate-900 text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-900/80 border border-brand-500/40 text-sky-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5 text-brand-400 animate-spin" style={{ animationDuration: '10s' }} />
            <span>Interactive Travel Corridor Map</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-tight">
            CONNECTING CHENNAI TO TAMIL NADU
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 font-normal">
            Select or tap any destination route below to view express highways, estimated travel times, and one-click booking.
          </p>

          {/* Quick Route Selector Pills (Great for Mobile & Touch) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-4xl mx-auto">
            {mapDestinations.map((dest) => {
              const isSelected = active?.id === dest.id;
              return (
                <button
                  key={dest.id}
                  onClick={() => {
                    setSelectedDest(dest);
                    setHoveredDest(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-gold-400 text-slate-950 shadow-glow-gold scale-105'
                      : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/70'
                  }`}
                >
                  <MapPin className={`w-3 h-3 ${isSelected ? 'text-slate-950' : 'text-brand-400'}`} />
                  <span>{dest.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Stylized Vector Route Canvas */}
          <div className="lg:col-span-7 xl:col-span-8 bg-slate-950/90 rounded-3xl p-4 sm:p-6 border border-slate-800 shadow-2xl relative min-h-[420px] sm:min-h-[520px] flex items-center justify-center overflow-hidden">
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3341551a_1px,transparent_1px),linear-gradient(to_bottom,#3341551a_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-60 pointer-events-none"></div>

            {/* Bay of Bengal subtle indicator */}
            <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-sky-500/20 rotate-90 select-none pointer-events-none">
              Bay of Bengal Coast
            </div>

            {/* SVG Canvas for Radiating Route Arcs */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full absolute inset-0 pointer-events-none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="routeGradientDefault" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="routeGradientActive" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* Radiating Arcs from Chennai (x:72, y:26) */}
              {mapDestinations.map((dest) => {
                const isCurrentActive = active?.id === dest.id;
                // Arch bezier calculation
                const midX = (mapHub.x + dest.x) / 2 + (dest.y > mapHub.y ? -4 : 4);
                const midY = (mapHub.y + dest.y) / 2 - 4;
                const pathD = `M ${mapHub.x} ${mapHub.y} Q ${midX} ${midY} ${dest.x} ${dest.y}`;

                return (
                  <g key={dest.id}>
                    {/* Base faint route path */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isCurrentActive ? '#f59e0b' : '#38bdf8'}
                      strokeWidth={isCurrentActive ? '1.4' : '0.6'}
                      strokeDasharray={isCurrentActive ? '2 1.2' : '1.5 1.5'}
                      opacity={isCurrentActive ? 0.95 : 0.22}
                      className={isCurrentActive ? 'road-dash-moving' : ''}
                    />

                    {/* Active Route Glow */}
                    {isCurrentActive && (
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="3"
                        opacity="0.35"
                        filter="blur(1px)"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Origin Hub: Chennai */}
            <div
              style={{ left: `${mapHub.x}%`, top: `${mapHub.y}%` }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
            >
              <div className="relative group cursor-pointer">
                {/* Pulsing Beacon */}
                <div className="w-10 h-10 -top-2 -left-2 absolute rounded-full bg-brand-500/40 animate-ping pointer-events-none"></div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-600 via-brand-500 to-sky-400 border-2 border-white flex items-center justify-center shadow-glow">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>

                {/* Chennai Label (Positioned safely to the left to prevent edge cutoff) */}
                <div className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 bg-slate-900/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-brand-400/50 whitespace-nowrap shadow-xl">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <p className="text-xs font-black text-sky-200 tracking-wide">CHENNAI</p>
                  </div>
                  <p className="text-[9px] text-slate-300 font-medium">Origin Hub</p>
                </div>
              </div>
            </div>

            {/* Destination Nodes */}
            {mapDestinations.map((dest) => {
              const isSelected = active?.id === dest.id;
              return (
                <div
                  key={dest.id}
                  style={{ left: `${dest.x}%`, top: `${dest.y}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                  onClick={() => {
                    setSelectedDest(dest);
                    setHoveredDest(null);
                  }}
                  onMouseEnter={() => setHoveredDest(dest)}
                  onMouseLeave={() => setHoveredDest(null)}
                >
                  <div className="relative flex flex-col items-center">
                    {/* Node Pin */}
                    <div
                      className={`rounded-full transition-all duration-200 flex items-center justify-center ${
                        isSelected
                          ? 'w-7 h-7 bg-gold-400 border-2 border-white shadow-glow-gold scale-110'
                          : 'w-4 h-4 bg-slate-800 border border-slate-400 hover:bg-brand-500 hover:scale-125'
                      }`}
                    >
                      {isSelected ? (
                        <MapPin className="w-3.5 h-3.5 text-slate-950" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      )}
                    </div>

                    {/* Node Name Label with collision-proof placement */}
                    <span className={getLabelClass(dest.labelPos, isSelected)}>
                      {dest.name}
                    </span>
                  </div>
                </div>
              );
            })}

          </div>

          {/* Destination Details & Action Card */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="glass-panel-dark p-5 sm:p-7 rounded-3xl border border-slate-700/80 shadow-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-brand-500/20 text-sky-300 border border-brand-400/30 rounded-full text-[11px] font-bold uppercase tracking-wider">
                        {active.direction} corridor
                      </span>
                      <span className="text-xs font-bold text-gold-400 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Direct Route
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                      {active.name}
                    </h3>

                    <p className="text-xs text-sky-200 font-semibold mt-1">
                      {active.highlight}
                    </p>

                    {/* Stats Grid */}
                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                      <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Distance</p>
                        <p className="text-sm font-extrabold text-white mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-brand-400" />
                          {active.distance}
                        </p>
                      </div>

                      <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Est. Time</p>
                        <p className="text-sm font-extrabold text-white mt-0.5 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gold-400" />
                          {active.time}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/40">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Highway Highway</p>
                      <p className="text-xs text-slate-200 mt-0.5 font-medium flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        {active.routeVia}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-700/70 flex flex-col gap-2">
                    <button
                      onClick={() => onPlanTrip(active)}
                      className="w-full py-3 bg-gradient-to-r from-brand-600 via-brand-500 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-glow transition-all flex items-center justify-center gap-2"
                    >
                      <span>Plan Ride to {active.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={createWhatsAppUrl({ drop: active.name, message: `Enquiring for travel route to ${active.name} from Chennai.` })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold text-center border border-slate-700 transition-colors"
                    >
                      WhatsApp Quote
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
