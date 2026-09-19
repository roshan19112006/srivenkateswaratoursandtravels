import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Compass,
  MapPin,
  Car,
  Navigation,
  Sparkles,
  Gauge,
  Milestone,
  ArrowRight
} from 'lucide-react';
import { BUSINESS_INFO } from '../utils/helpers';

export default function JourneyRoad({ onSelectDestination }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(1000);
  const [carState, setCarState] = useState({ x: 500, y: 50, angle: 90, speed: 45 });
  const [activeZone, setActiveZone] = useState('Chennai Central & Heritage Gateway');
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

        // Determine active Chennai landmark zone based on progress
        if (p < 0.20) {
          setActiveZone('Chennai Central & Heritage Gateway');
        } else if (p < 0.40) {
          setActiveZone('Marina Beach & Napier Bridge Promenade');
        } else if (p < 0.60) {
          setActiveZone('Mylapore Kapaleeshwarar Cultural Belt');
        } else if (p < 0.80) {
          setActiveZone('Kathipara Cloverleaf & Airport Corridor');
        } else {
          setActiveZone('Mahabalipuram Shore Temple & Scenic ECR');
        }
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, pathLength]);

  // Chennai Attractive Landmarks along the winding path
  const landmarks = [
    {
      progress: 0.08,
      title: 'Chennai Central & Heritage Gateway',
      subtitle: 'Puratchi Thalaivar Dr. M.G.R Station & Ripon Building',
      badge: 'City Center Hub',
      stoneMarker: '0 KM • CENTRAL',
      roadCode: 'NH-32 / SH-1',
      distance: 'City Gateway',
      image: '/chennai/chennai_hero_bg.jpg',
      desc: '150-year-old terracotta Indo-Saracenic gateway & majestic clock tower connecting Chennai to all of India.',
      y: 190,
      align: 'left',
      pinX: 420,
      pinY: 180
    },
    {
      progress: 0.28,
      title: 'Marina Beach & Light House',
      subtitle: 'Scenic Coastal Promenade & Napier Bridge',
      badge: 'Coastal Wonder',
      stoneMarker: '6 KM • MARINA',
      roadCode: 'KAMARAJAR SALAI',
      distance: '6 km • Bay of Bengal',
      image: '/chennai/chennai_marina.jpg',
      desc: "World's 2nd longest natural urban beach with red-and-white lighthouse, morning sea breeze, and illuminated Napier Bridge.",
      y: 620,
      align: 'right',
      pinX: 280,
      pinY: 610
    },
    {
      progress: 0.48,
      title: 'Kapaleeshwarar Temple, Mylapore',
      subtitle: 'Sacred 7th-Century Dravidian Architecture',
      badge: 'Cultural Soul',
      stoneMarker: '11 KM • MYLAPORE',
      roadCode: 'MYLAPORE TANK',
      distance: '11 km • Spiritual Heart',
      image: '/chennai/chennai_kapaleeshwarar.jpg',
      desc: 'Towering sculpted Dravidian gopuram, sacred temple tank, and centuries of vibrant classical Tamil culture and traditions.',
      y: 1060,
      align: 'left',
      pinX: 720,
      pinY: 1050
    },
    {
      progress: 0.70,
      title: 'Kathipara Cloverleaf & Airport Corridor',
      subtitle: 'Asia’s Largest Cloverleaf Flyover & GST Highway',
      badge: 'Express Corridor',
      stoneMarker: '16 KM • KATHIPARA',
      roadCode: 'GST ROAD / NH-45',
      distance: '16 km • Airport Link',
      image: '/chennai/chennai_kathipara.jpg',
      desc: 'Grand multi-level highway interchange connecting OMR tech corridor, Chennai International Airport, and southern expressways.',
      y: 1530,
      align: 'right',
      pinX: 350,
      pinY: 1520
    },
    {
      progress: 0.90,
      title: 'Mahabalipuram Shore Temple & ECR',
      subtitle: 'UNESCO World Heritage Bay Coastal Cruise',
      badge: 'UNESCO Wonder',
      stoneMarker: '55 KM • SHORE TEMPLE',
      roadCode: 'ECR / SH-49',
      distance: '55 km • Coastal Highway',
      image: '/destinations/mahabalipuram.jpg',
      desc: 'Picturesque East Coast Road cruise leading to 8th-century monolithic rock-cut temples kissed by Bay of Bengal waves.',
      y: 1980,
      align: 'left',
      pinX: 340,
      pinY: 1970
    }
  ];

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-[#0a1224] to-slate-950 text-white overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none"></div>
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-2/3 -right-32 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-lg backdrop-blur-md">
            <Compass className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Interactive Chennai Scenic Route</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight">
            CRUISING THROUGH CHENNAI
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Scroll down to ride along Chennai's most iconic attractive landmarks, scenic beach corridors, and heritage sites with Sri Venkateswara Travels.
          </p>
        </div>

        {/* Floating Journey HUD */}
        <div className="sticky top-16 sm:top-20 z-30 mb-8 max-w-2xl mx-auto px-2">
          <div className="glass-panel-dark p-3 sm:p-4 rounded-2xl shadow-2xl border border-white/15 backdrop-blur-xl flex items-center justify-between gap-3">
            
            {/* Current Zone */}
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                <Navigation className="w-4 h-4 animate-pulse" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] font-bold tracking-wider text-amber-400 uppercase">Live Route Location</p>
                <p className="text-xs sm:text-sm font-extrabold text-white truncate">
                  {activeZone}
                </p>
              </div>
            </div>

            {/* Live Speedometer & Progress */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <div className="hidden md:flex items-center gap-2 text-slate-300">
                <Gauge className="w-4 h-4 text-amber-400" />
                <div className="text-right">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Speed</p>
                  <p className="text-xs font-bold text-white">{Math.max(35, carState.speed)} km/h</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Progress</p>
                  <p className="text-xs sm:text-sm font-black text-amber-400">{progressPercent}%</p>
                </div>
                <div className="w-12 sm:w-16 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-150"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Winding Highway SVG Stage */}
        <div className="relative w-full h-[2280px] max-w-4xl mx-auto select-none">
          
          <svg
            viewBox="0 0 1000 2200"
            className="w-full h-full absolute inset-0 overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="asphaltGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="50%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              <filter id="roadShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="#020617" floodOpacity="0.4" />
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
              stroke="#334155"
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

            {/* Attractive Landmark Waypoint Markers along the road path */}
            {landmarks.map((lm, idx) => (
              <g key={`pin-${idx}`} transform={`translate(${lm.pinX}, ${lm.pinY})`}>
                <circle cx="0" cy="0" r="14" fill="#f59e0b" opacity="0.2" className="animate-ping" />
                <circle cx="0" cy="0" r="8" fill="#0f172a" stroke="#fbbf24" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="3.5" fill="#fef08a" />
              </g>
            ))}

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

          {/* Roadside Chennai Landmark Milestone Cards */}
          {landmarks.map((lm, index) => (
            <div
              key={index}
              style={{
                top: `${(lm.y / 2200) * 100}%`,
                left: lm.align === 'left' ? '2%' : 'auto',
                right: lm.align === 'right' ? '2%' : 'auto',
              }}
              className="absolute z-20 w-[270px] sm:w-[320px] transform -translate-y-1/2"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: '-40px' }}
                transition={{ duration: 0.4 }}
                className="glass-panel-dark p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-white/20 transition-all hover:scale-[1.02] hover:border-amber-400/60 group"
              >
                {/* Milestone Stone Header Pill */}
                <div className="flex items-center justify-between mb-2">
                  <div className="inline-flex items-center rounded-lg overflow-hidden border border-amber-400/50 shadow-xs">
                    <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-2 py-0.5 uppercase tracking-wide">
                      {lm.roadCode}
                    </span>
                    <span className="bg-slate-900 text-amber-300 font-bold text-[9px] px-2 py-0.5">
                      {lm.stoneMarker}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">
                    {lm.distance}
                  </span>
                </div>

                {/* Real Landmark Photo Preview */}
                <div className="relative h-28 sm:h-32 w-full rounded-xl overflow-hidden mb-2.5 bg-slate-950 border border-white/10">
                  <img
                    src={lm.image}
                    alt={lm.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent"></div>
                  
                  <span className="absolute bottom-1.5 left-2 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-400/30">
                    {lm.badge}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {lm.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed line-clamp-2">
                  {lm.desc}
                </p>

                {/* Interactive Action: Book ride to this Chennai attraction */}
                <button
                  onClick={() => onSelectDestination && onSelectDestination({ name: lm.title, category: 'Chennai Landmark Tour' })}
                  className="mt-3 pt-2 border-t border-white/10 w-full flex items-center justify-between text-[11px] font-bold text-amber-400 group-hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <span>Plan Ride Here</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
