import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  User,
  Calendar,
  Navigation,
  Send,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Car
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BUSINESS_INFO, createWhatsAppUrl } from '../utils/helpers';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: '',
    destination: '',
    travelDate: '',
    vehicle: 'Any Suitable Vehicle',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSendingWhatsApp, setIsSendingWhatsApp] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your phone number';
    } else if (!/^[0-9+\-\s]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.pickup.trim()) errs.pickup = 'Please provide a pickup location';
    if (!formData.destination.trim()) errs.destination = 'Please provide a destination';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    
    // Trigger festive celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  const handleSendViaWhatsApp = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const url = createWhatsAppUrl({
      pickup: formData.pickup,
      drop: formData.destination,
      date: formData.travelDate,
      vehicle: formData.vehicle,
      message: `Name: ${formData.name} (Phone: ${formData.phone}) - ${formData.message}`
    });
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-brand-50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Mail className="w-3.5 h-3.5 text-brand-600" />
            <span>Direct Travel Booking</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight leading-tight">
            LET'S PLAN YOUR JOURNEY
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal">
            Fill out your travel details below, or reach out to us directly for immediate trip confirmation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Business Contact Information Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-gradient-to-br from-slate-900 via-navy-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center font-black text-lg text-white font-display shadow-glow">
                  SV
                </div>
                <div>
                  <h3 className="text-lg font-black font-display text-white">
                    {BUSINESS_INFO.name}
                  </h3>
                  <p className="text-xs font-semibold text-sky-300">
                    Proprietor / Lead: <span className="text-gold-400 font-bold">{BUSINESS_INFO.owner}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-800/80 text-sm">
                
                {/* Phone */}
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-semibold uppercase">Phone Number</p>
                    <p className="font-bold text-white group-hover:text-sky-300 transition-colors">
                      {BUSINESS_INFO.displayPhone}
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-slate-400 font-semibold uppercase">Official Email</p>
                    <p className="font-bold text-white group-hover:text-sky-300 transition-colors truncate text-xs sm:text-sm">
                      {BUSINESS_INFO.email}
                    </p>
                  </div>
                </a>

                {/* Service Area */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-semibold uppercase">Primary Service Area</p>
                    <p className="font-bold text-white text-xs sm:text-sm">
                      {BUSINESS_INFO.serviceArea}
                    </p>
                  </div>
                </div>

              </div>

              {/* Direct WhatsApp Action */}
              <div className="mt-6 pt-5 border-t border-slate-800/80">
                <a
                  href={createWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            <div className="bg-brand-50/80 p-5 rounded-3xl border border-brand-200/80">
              <h4 className="text-sm font-bold text-brand-900 flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-4 h-4 text-brand-600" />
                Prompt Personal Attention
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                All enquiries are directly handled by <strong>BALA</strong> to ensure accurate scheduling, transparent vehicle arrangements, and on-time arrival.
              </p>
            </div>
          </div>

          {/* Right Column: Contact & Trip Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm relative">
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success-box"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 font-display">
                      Enquiry Received!
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                      Thank you, <strong>{formData.name}</strong>. We have logged your request from <strong>{formData.pickup}</strong> to <strong>{formData.destination}</strong>.
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      BALA will contact you shortly at <strong>{formData.phone}</strong>.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                      <button
                        onClick={handleSendViaWhatsApp}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Send Copy to WhatsApp</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: '',
                            phone: '',
                            pickup: '',
                            destination: '',
                            travelDate: '',
                            vehicle: 'Any Suitable Vehicle',
                            message: ''
                          });
                        }}
                        className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-100"
                      >
                        Send Another Enquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form key="booking-form" onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-xl font-black text-slate-900 font-display mb-2">
                      Trip Enquiry Form
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Your Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="text"
                            placeholder="e.g. Ramesh Kumar"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 ${
                              errors.name ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-200 focus:border-brand-500'
                            }`}
                          />
                        </div>
                        {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="tel"
                            placeholder="e.g. 98400 12345"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 ${
                              errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-200 focus:border-brand-500'
                            }`}
                          />
                        </div>
                        {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Pickup Location */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Pickup Location *
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="text"
                            placeholder="e.g. Chennai Central / Airport / Anna Nagar"
                            value={formData.pickup}
                            onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                            className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 ${
                              errors.pickup ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-200 focus:border-brand-500'
                            }`}
                          />
                        </div>
                        {errors.pickup && <p className="text-[11px] text-red-500 mt-1">{errors.pickup}</p>}
                      </div>

                      {/* Destination */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Destination *
                        </label>
                        <div className="relative">
                          <Navigation className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="text"
                            placeholder="e.g. Kanchipuram / Pondicherry / Vellore"
                            value={formData.destination}
                            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                            className={`w-full pl-9 pr-3 py-2.5 bg-white border rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 ${
                              errors.destination ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-brand-200 focus:border-brand-500'
                            }`}
                          />
                        </div>
                        {errors.destination && <p className="text-[11px] text-red-500 mt-1">{errors.destination}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Travel Date */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Travel Date
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="date"
                            value={formData.travelDate}
                            onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                            className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-500"
                          />
                        </div>
                      </div>

                      {/* Preferred Vehicle */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Preferred Vehicle
                        </label>
                        <div className="relative">
                          <Car className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <select
                            value={formData.vehicle}
                            onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                            className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-500"
                          >
                            <option value="Any Suitable Vehicle">Any Suitable Vehicle</option>
                            <option value="Executive Sedan (4 Seater)">Executive Sedan (4 Seater)</option>
                            <option value="Family SUV (6-7 Seater)">Family SUV (6-7 Seater)</option>
                            <option value="Premium Luxury Car">Premium Luxury Car</option>
                            <option value="Group Traveller (12-18 Seater)">Group Traveller (12-18 Seater)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Message / Special Requirements */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Trip Notes / Special Requests (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Need baby seat, multiple stops in temple circuit, or flight landing time..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-500"
                      ></textarea>
                    </div>

                    {/* Form Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="submit"
                        className="btn-shimmer w-full sm:flex-1 py-3 bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800 hover:from-brand-500 hover:to-brand-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-glow transition-all flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Enquiry</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSendViaWhatsApp}
                        className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Send via WhatsApp</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400 text-center mt-2">
                      Direct contact with BALA (9840651522) • Fast response guaranteed
                    </p>
                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
