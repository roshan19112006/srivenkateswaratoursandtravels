import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Compass,
  MapPin,
  Car,
  Navigation,
  Sparkles,
  Gauge,
  Milestone
} from 'lucide-react';
import { BUSINESS_INFO } from '../utils/helpers';

export default function JourneyRoad({ onSelectDestination }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(1000);
  const [carState, setCarState] = useState({ x: 500, y: 50, angle: 90, speed: 45 });
  const [activeZone, setActiveZone] = useState('Chennai City Hub (MAA / Central)');
  const [progressPercent, setProgressPercent] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    let prevProgress = 0;
    let lastTime = performance.now();

    const unsubscribe = smoothProgress.on('change', (latest) => {
      const p = Math.max(0, Math.min(1, latest));
      setProgressPercent(Math.round(p * 100));

      if (pathRef.current && pathLength > 0) {
        const currentLength = p * pathLength;
        const point = pathRef.current.getPointAtLength(currentLength);
        
        // Calculate tangent angle
        const delta = 2;
        const nextLength = Math.min(pathLength, currentLength + delta);
        const nextPoint = pathRef.current.getPointAtLength(nextLength);
        const angleRad = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x);
        const angleDeg = (angleRad * 180) / Math.PI;

        const now = performance.now();
        const dt = (now - lastTime) / 1000;
        const dp = Math.abs(p - prevProgress);
        const calculatedSpeed = dt > 0 ? Math.min(95, Math.round((dp / dt) * 1200)) : 0;

        lastTime = now;
        prevProgress = p;

        setCarState({
          x: point.x,
          y: point.y,
          angle: angleDeg,
          speed: calculatedSpeed
        });

        // Determine environment zone
        if (p < 0.25) {
          setActiveZone('Chennai City Hub (MAA / Central)');
        } else if (p < 0.55) {
          setActiveZone('GST & ECR Express Corridors');
        } else if (p < 0.85) {
          setActiveZone('District Corridors (Kanchi / Vellore / Pondy)');
        } else {
          setActiveZone('Tamil Nadu State-Wide Travel');
        }
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, pathLength]);

  // Road SVG Waypoints and Milestone checkpoints
  const milestones = [
    {
      progress: 0.08,
      title: 'Departure: Chennai Hub',
      subtitle: 'Doorstep pickup from anywhere in Chennai',
      badge: 'Origin',
      y: 200,
      align: 'left'
    },
    {
      progress: 0.32,
      title: 'ECR & GST Toll Expressway',
      subtitle: 'FastTag express transit with scenic corridors',
      badge: 'Highway Transition',
      y: 720,
      align: 'right'
    },
    {
      progress: 0.58,
      title: 'Heritage & District Corridors',
      subtitle: 'Kanchipuram, Vellore, Chengalpattu routes',
      badge: 'District Crossways',
      y: 1300,
      align: 'left'
    },
    {
      progress: 0.88,
      title: 'Spiritual & Coastal Horizons',
      subtitle: 'Pondicherry, Tiruvannamalai & beyond',
      badge: 'Destinations',
      y: 1900,
      align: 'right'
    }
  ];

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-sky-50/40 to-slate-100 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/70 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-4 h-4 text-brand-600 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Interactive Road Journey</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-display tracking-tight">
            YOUR JOURNEY STARTS HERE
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Scroll down to ride along our scenic travel corridors from Chennai to surrounding districts across Tamil Nadu.
          </p>
        </div>

        {/* Floating Journey HUD */}
        <div className="sticky top-16 sm:top-20 z-30 mb-8 max-w-2xl mx-auto px-2">
          <div className="glass-panel p-3 sm:p-4 rounded-2xl shadow-premium border border-slate-200/90 flex items-center justify-between gap-3">
            
            {/* Current Zone */}
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Navigation className="w-4 h-4 animate-pulse" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] font-bold tracking-wider text-slate-400 uppercase">Live Route Status</p>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                  {activeZone}
                </p>
              </div>
            </div>

            {/* Live Speedometer & Progress */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <div className="hidden md:flex items-center gap-2 text-slate-700">
                <Gauge className="w-4 h-4 text-brand-600" />
                <div className="text-right">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Speed</p>
                  <p className="text-xs font-bold text-slate-800">{Math.max(35, carState.speed)} km/h</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Progress</p>
                  <p className="text-xs sm:text-sm font-black text-brand-600">{progressPercent}%</p>
                </div>
                <div className="w-12 sm:w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-600 to-sky-500 rounded-full transition-all duration-150"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Winding Highway SVG Stage */}
        <div className="relative w-full h-[2200px] max-w-4xl mx-auto select-none">
          
          <svg
            viewBox="0 0 1000 2200"
            className="w-full h-full absolute inset-0 overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="asphaltGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>

              <filter id="roadShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="#0f172a" floodOpacity="0.18" />
              </filter>
            </defs>

            {/* Highway Curb */}
            <path
              d="M 500 50 
                 C 500 250, 200 350, 200 600 
                 C 200 850, 800 950, 800 1200 
                 C 800 1450, 250 1550, 250 1800 
                 C 250 2050, 500 2100, 500 2200"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="90"
              strokeLinecap="round"
              filter="url(#roadShadow)"
            />

            {/* Asphalt */}
            <path
              d="M 500 50 
                 C 500 250, 200 350, 200 600 
                 C 200 850, 800 950, 800 1200 
                 C 800 1450, 250 1550, 250 1800 
                 C 250 2050, 500 2100, 500 2200"
              fill="none"
              stroke="url(#asphaltGradient)"
              strokeWidth="80"
              strokeLinecap="round"
            />

            {/* Master Tracking Path */}
            <path
              ref={pathRef}
              id="journey-path"
              d="M 500 50 
                 C 500 250, 200 350, 200 600 
                 C 200 850, 800 950, 800 1200 
                 C 800 1450, 250 1550, 250 1800 
                 C 250 2050, 500 2100, 500 2200"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="3.5"
              strokeDasharray="18 14"
              strokeLinecap="round"
              className="road-dash-moving"
            />

            {/* Animated Car Node */}
            <g
              transform={`translate(${carState.x}, ${carState.y}) rotate(${carState.angle})`}
              className="transition-transform duration-75 ease-out"
            >
              <path
                d="M 22 -6 L 90 -28 L 90 28 L 22 6 Z"
                fill="url(#headlightGradient)"
                opacity="0.65"
              />

              <defs>
                <linearGradient id="headlightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#fef08a" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                </linearGradient>
              </defs>

              <ellipse cx="-2" cy="0" rx="24" ry="13" fill="#020617" opacity="0.45" filter="blur(3px)" />

              <rect
                x="-22"
                y="-11"
                width="44"
                height="22"
                rx="6"
                fill="#1e40af"
                stroke="#60a5fa"
                strokeWidth="1.5"
              />

              <path
                d="M 8 -10 L 20 -7 Q 22 0 20 7 L 8 10 Z"
                fill="#2563eb"
              />

              <rect
                x="-8"
                y="-8"
                width="16"
                height="16"
                rx="3"
                fill="#0f172a"
                stroke="#38bdf8"
                strokeWidth="0.8"
              />

              <rect
                x="-4"
                y="-5"
                width="8"
                height="10"
                rx="1.5"
                fill="#0284c7"
                opacity="0.8"
              />

              <path
                d="M -9 -7 L -17 -6 Q -19 0 -17 6 L -9 7 Z"
                fill="#0f172a"
              />

              <circle cx="21" cy="-7" r="2" fill="#fef08a" />
              <circle cx="21" cy="7" r="2" fill="#fef08a" />

              <rect x="-22" y="-9" width="1.5" height="3" fill="#ef4444" />
              <rect x="-22" y="6" width="1.5" height="3" fill="#ef4444" />

              <circle cx="8" cy="-12" r="1.5" fill="#1e40af" />
              <circle cx="8" cy="12" r="1.5" fill="#1e40af" />
            </g>
          </svg>

          {/* Roadside Milestone Cards */}
          {milestones.map((ms, index) => (
            <div
              key={index}
              style={{
                top: `${(ms.y / 2200) * 100}%`,
                left: ms.align === 'left' ? '2%' : 'auto',
                right: ms.align === 'right' ? '2%' : 'auto',
              }}
              className="absolute z-20 w-[240px] sm:w-[280px] transform -translate-y-1/2"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: '-40px' }}
                transition={{ duration: 0.4 }}
                className="glass-panel p-3.5 sm:p-4 rounded-2xl shadow-premium hover:shadow-premium-hover border border-slate-200/90 transition-all hover:scale-[1.02] group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider border border-brand-100">
                    {ms.badge}
                  </span>
                  <Milestone className="w-3.5 h-3.5 text-brand-600" />
                </div>
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-brand-600 transition-colors">
                  {ms.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {ms.subtitle}
                </p>
              </motion.div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
