import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  MapPin,
  Clock,
  Compass,
  ArrowRight,
  ArrowLeft,
  Car,
  ChevronRight,
  Sparkles,
  CalendarCheck,
  CheckCircle2
} from 'lucide-react';
import { destinationsData } from '../data/destinations';

/**
 * Individual Destination Card with counter-parallax inner image and depth layers
 */
function ParallaxDestinationCard({
  dest,
  index,
  total,
  progress,
  onPlanTrip,
  isActive
}) {
  // Normalized scroll intervals for this card's lifecycle
  const cardStart = index / total;
  const cardEnd = (index + 1) / total;
  const extendedStart = Math.max(0, cardStart - 0.2);
  const extendedEnd = Math.min(1, cardEnd + 0.2);

  // Parallax shifts:
  // 1. Image shifts horizontally within its framed window
  const imgX = useTransform(progress, [extendedStart, extendedEnd], ['-10%', '10%']);
  const imgScale = useTransform(progress, [extendedStart, (cardStart + cardEnd) / 2, extendedEnd], [1.12, 1.04, 1.12]);

  // 2. Numeric watermark shifts with subtle parallax
  const watermarkX = useTransform(progress, [extendedStart, extendedEnd], ['20px', '-20px']);

  return (
    <motion.div
      className={`group relative shrink-0 w-[78vw] sm:w-[320px] md:w-[350px] lg:w-[370px] rounded-2xl bg-slate-900/90 backdrop-blur-xl border transition-all duration-400 flex flex-col justify-between overflow-hidden ${
        isActive
          ? 'border-brand-500/80 shadow-[0_0_25px_rgba(59,130,246,0.25)]'
          : 'border-slate-800/80 hover:border-slate-700 shadow-lg'
      }`}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {/* Background glowing gradient highlights */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-500/20 transition-all duration-500"></div>
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-gold-400/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Floating numeric watermark with parallax */}
      <motion.span
        style={{ x: watermarkX }}
        className="absolute top-2 right-4 text-5xl sm:text-6xl font-black font-display text-white/[0.04] pointer-events-none select-none"
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>

      {/* Card Content Top Container */}
      <div className="p-4 sm:p-5 relative z-10">
        
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/15 border border-brand-400/30 text-brand-300 text-[11px] font-bold uppercase tracking-wider">
            <Compass className="w-3 h-3 text-brand-400" />
            <span>{dest.category}</span>
          </div>

          <span className="text-[11px] font-mono font-bold text-slate-400 tracking-wider">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Framed Parallax Window Image */}
        <div className="relative h-36 sm:h-40 w-full rounded-xl overflow-hidden bg-slate-950 mb-3.5 border border-slate-800/60 shadow-inner">
          <motion.img
            src={dest.image}
            alt={dest.name}
            style={{ x: imgX, scale: imgScale }}
            className="w-[120%] h-full max-w-none object-cover absolute left-[-10%] top-0 transition-opacity duration-300"
            loading="lazy"
          />
          {/* Gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent pointer-events-none"></div>

          {/* Distance & Time Pills inside image corner */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-semibold text-slate-200">
            <div className="bg-slate-950/85 backdrop-blur-md border border-slate-700/60 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
              <MapPin className="w-2.5 h-2.5 text-gold-400" />
              <span>{dest.distance}</span>
            </div>
            <div className="bg-slate-950/85 backdrop-blur-md border border-slate-700/60 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
              <Clock className="w-2.5 h-2.5 text-sky-400" />
              <span>{dest.travelTime}</span>
            </div>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-base sm:text-lg font-black text-white font-display tracking-tight group-hover:text-brand-300 transition-colors">
          {dest.name}
        </h3>
        
        {dest.title && (
          <p className="text-[11px] sm:text-xs font-medium text-brand-400 mt-0.5 line-clamp-1">
            {dest.title}
          </p>
        )}

        <p className="text-[11px] sm:text-xs text-slate-300 mt-1.5 leading-relaxed line-clamp-2">
          {dest.description}
        </p>

        {/* Popular spots tags */}
        {dest.popularSpots && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {dest.popularSpots.slice(0, 2).map((spot, sIdx) => (
              <span
                key={sIdx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/70 border border-slate-700/50 text-[10px] font-medium text-slate-300"
              >
                <CheckCircle2 className="w-2.5 h-2.5 text-brand-400 shrink-0" />
                <span>{spot}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="p-4 sm:p-5 pt-0 relative z-10">
        <button
          onClick={() => onPlanTrip(dest)}
          className="w-full group/btn relative flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold text-xs shadow hover:shadow-glow transition-all duration-200 cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Plan This Journey</span>
          </span>
          <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center group-hover/btn:translate-x-0.5 transition-transform">
            <ArrowRight className="w-3 h-3" />
          </div>
        </button>
      </div>
    </motion.div>
  );
}

export default function DestinationSection({ onPlanTrip }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Link vertical scroll to continuous progress between 0 and 1
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  // Smooth dampening spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001
  });

  // Calculate dynamic maximum horizontal scroll distance based on track and window width
  useEffect(() => {
    const updateDimensions = () => {
      if (trackRef.current) {
        const totalWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const diff = totalWidth - viewportWidth + 60;
        setMaxScroll(Math.max(0, diff));
      }
    };

    updateDimensions();
    const timer = setTimeout(updateDimensions, 300);
    window.addEventListener('resize', updateDimensions);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Map progress to pixel translation
  const trackX = useTransform(smoothProgress, [0, 1], [0, -maxScroll]);

  // Background Parallax Kinetic Typography Layer
  const bgTextX = useTransform(smoothProgress, [0, 1], ['3%', '-30%']);
  const orb1X = useTransform(smoothProgress, [0, 1], ['-10%', '20%']);
  const orb2X = useTransform(smoothProgress, [0, 1], ['20%', '-15%']);

  // Track active card index
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      const p = Math.max(0, Math.min(1, latest));
      const idx = Math.min(
        destinationsData.length - 1,
        Math.floor(p * destinationsData.length + 0.3)
      );
      setActiveIndex(idx);
    });

    return () => unsubscribe();
  }, [smoothProgress]);

  // Programmatic smooth scroll to a specific card index
  const scrollToCard = (index) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const sectionTop = rect.top + scrollTop;
    const totalScrollableHeight = sectionRef.current.offsetHeight - window.innerHeight;
    const targetY = sectionTop + (index / (destinationsData.length - 1)) * totalScrollableHeight;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  const handlePrev = () => {
    scrollToCard(Math.max(0, activeIndex - 1));
  };

  const handleNext = () => {
    scrollToCard(Math.min(destinationsData.length - 1, activeIndex + 1));
  };

  return (
    <section
      id="destinations"
      ref={sectionRef}
      className="relative h-[240vh] sm:h-[280vh] bg-slate-950 text-white selection:bg-brand-500 selection:text-white"
    >
      {/* Sticky Parallax Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-4 sm:pb-6">
        
        {/* Layer 1: Parallax Ambient Glow Orbs */}
        <motion.div
          style={{ x: orb1X }}
          className="absolute -top-24 -left-24 w-[28rem] h-[28rem] bg-brand-600/15 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          style={{ x: orb2X }}
          className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-gold-400/10 rounded-full blur-[100px] pointer-events-none"
        />

        {/* Layer 2: Background Kinetic Typography Parallax */}
        <motion.div
          style={{ x: bgTextX }}
          className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none z-0 opacity-15"
        >
          <span className="text-[10vw] font-black uppercase tracking-tight text-white/5 font-display stroke-text">
            FROM CHENNAI • KANCHIPURAM • PUDUCHERRY • MAHABALIPURAM • VELLORE • TIRUVANNAMALAI •
          </span>
        </motion.div>

        {/* Top Header Bar & Live Status */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            
            <div>
              {/* Category Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-400/30 text-brand-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                <Compass className="w-3 h-3 text-brand-400" />
                <span>District &amp; Outstation Travel</span>
              </div>

              {/* Headline */}
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white font-display tracking-tight leading-tight flex items-center gap-2.5">
                FROM CHENNAI TO WHEREVER YOU NEED TO GO
                <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
              </h2>

              <p className="mt-0.5 text-xs sm:text-sm text-slate-300 max-w-xl font-normal">
                Explore nearby districts, famous temple towns, coastal retreats, and historical landmarks with our clean, reliable vehicles.
              </p>
            </div>

            {/* Gallery Progress & Controls */}
            <div className="flex items-center gap-3 self-start md:self-end">
              
              {/* Current Active Badge */}
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[11px] font-mono font-bold text-slate-400">
                  DESTINATION {String(activeIndex + 1).padStart(2, '0')} OF {String(destinationsData.length).padStart(2, '0')}
                </span>
                <span className="text-xs font-extrabold text-brand-300">
                  {destinationsData[activeIndex]?.name}
                </span>
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-brand-400 text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-600 cursor-pointer shadow-md"
                  aria-label="Previous destination"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleNext}
                  disabled={activeIndex === destinationsData.length - 1}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-brand-400 text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-600 cursor-pointer shadow-md"
                  aria-label="Next destination"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Middle Stage: The Horizontal Parallax Cards Track */}
        <div className="relative z-10 w-full overflow-visible my-auto py-2">
          <motion.div
            ref={trackRef}
            style={{ x: trackX }}
            className="flex gap-4 sm:gap-6 px-4 sm:px-10 md:px-16 w-max cursor-grab active:cursor-grabbing"
          >
            {destinationsData.map((dest, idx) => (
              <ParallaxDestinationCard
                key={dest.id}
                dest={dest}
                index={idx}
                total={destinationsData.length}
                progress={smoothProgress}
                onPlanTrip={onPlanTrip}
                isActive={activeIndex === idx}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom Interactive Progress Bar & Cues */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 text-xs text-slate-400 border-t border-slate-800/80 pt-2.5">
            
            {/* Scroll Indicator Prompt */}
            <div className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-brand-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="font-semibold text-slate-300 text-[11px] hidden sm:inline">
                Scroll down or use arrows to traverse outstation destinations
              </span>
              <span className="font-semibold text-slate-300 text-[11px] sm:hidden">
                Swipe / scroll destinations
              </span>
            </div>

            {/* Visual Progress Line & Destination Dots */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {destinationsData.map((dest, idx) => (
                <button
                  key={dest.id}
                  onClick={() => scrollToCard(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeIndex === idx
                      ? 'w-5 sm:w-7 h-1.5 bg-brand-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]'
                      : 'w-1.5 h-1.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Jump to ${dest.name}`}
                />
              ))}
            </div>

            {/* Quick direct info */}
            <div className="text-right text-[11px]">
              <span className="text-slate-400 font-medium">Sri Venkateswara</span>
              <span className="hidden sm:inline text-brand-400 font-bold ml-1">★ Direct Highway Vehicles</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
