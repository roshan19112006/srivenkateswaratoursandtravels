import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  PhoneCall,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { galleryCategories, galleryImages } from '../data/gallery';
import { BUSINESS_INFO, createWhatsAppUrl } from '../utils/helpers';

export default function GallerySection({ onSelectVehicleForBooking }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const handleOpenLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));
  };

  const currentImage = selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;

  const handleWhatsAppBooking = (img) => {
    const url = createWhatsAppUrl({
      vehicle: img.title,
      message: `Hello Bala, I saw the vehicle photo "${img.title} (${img.vehicleNumber})" in your gallery and would like to book or inquire about it.`
    });
    window.open(url, '_blank');
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-gold-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Actual Fleet & Coach Gallery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight">
            OUR VEHICLES IN ACTION
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Real photos of our well-maintained Volvo coaches, Toyota Innova Crystas, luxury Force Travellers, and premium AC interiors.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {galleryCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-brand-600 text-white shadow-glow'
                    : 'bg-white/5 text-slate-300 hover:bg-white/15 border border-white/10'
                }`}
              >
                {cat}
                {cat === 'All' && ` (${galleryImages.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredImages.map((img, idx) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              onClick={() => handleOpenLightbox(idx)}
              className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700/80 hover:border-brand-500 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-950">
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                  <span className="bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                    {img.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/20">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block bg-gold-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded mb-1">
                    {img.vehicleNumber}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-gold-300 transition-colors line-clamp-1">
                    {img.title}
                  </h3>
                </div>
              </div>

              {/* Card Footer Caption */}
              <div className="p-3.5 bg-slate-850 border-t border-slate-750 flex items-center justify-between text-xs text-slate-400">
                <p className="line-clamp-1 text-slate-400 text-[11px]">
                  {img.caption}
                </p>
                <span className="shrink-0 text-brand-400 font-bold ml-2 text-[11px] group-hover:translate-x-0.5 transition-transform">
                  View →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Nav Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                title="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                title="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Full Image */}
              <div className="flex-1 bg-black flex items-center justify-center min-h-[300px] sm:min-h-[460px] max-h-[62vh] overflow-hidden">
                <img
                  src={currentImage.src}
                  alt={currentImage.title}
                  className="max-w-full max-h-[62vh] object-contain"
                />
              </div>

              {/* Caption & Actions */}
              <div className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="bg-gold-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded">
                      {currentImage.vehicleNumber}
                    </span>
                    <span className="text-xs text-slate-400 uppercase font-semibold">
                      {currentImage.category} • Photo {selectedImageIndex + 1} of {filteredImages.length}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {currentImage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                    {currentImage.caption}
                  </p>
                </div>

                {/* Quick Booking Buttons */}
                <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
                  <button
                    onClick={() => handleWhatsAppBooking(currentImage)}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire WhatsApp</span>
                  </button>

                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call Bala</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
