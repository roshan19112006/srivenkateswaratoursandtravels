import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import JourneyRoad from './components/JourneyRoad';
import ChennaiSection from './components/ChennaiSection';
import DestinationSection from './components/DestinationSection';
import InteractiveMap from './components/InteractiveMap';
import FleetPage from './components/FleetPage';
import WhyChooseUs from './components/WhyChooseUs';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import TripPlannerModal from './components/TripPlannerModal';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTripData, setSelectedTripData] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'vehicles'

  // Handle hash changes on mount or back/forward navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (['#vehicles-page', '#vehicles', '#fleet-page', '#fleet', '#gallery'].includes(hash)) {
        setCurrentView('vehicles');
        if (hash === '#gallery') {
          setTimeout(() => {
            const el = document.getElementById('gallery');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 120);
        }
      } else {
        setCurrentView('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigateView = (view, targetId = null) => {
    if (view === 'vehicles' || view === 'fleet') {
      setCurrentView('vehicles');
      window.history.pushState(null, '', targetId ? `#${targetId}` : '#vehicles-page');
      if (targetId) {
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setCurrentView('home');
      window.history.pushState(null, '', window.location.pathname + (targetId ? `#${targetId}` : ''));
      if (targetId) {
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleOpenBooking = (tripData = null) => {
    setSelectedTripData(tripData);
    setModalOpen(true);
  };

  const handleCloseBooking = () => {
    setModalOpen(false);
    setSelectedTripData(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white relative">
      {/* 1. Initial Loading Experience */}
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}

      {/* 2. Top Sticky Navbar with View Routing */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        currentView={currentView}
        onNavigateView={handleNavigateView}
      />

      {/* 3. Conditional Page View: Home vs Dedicated Vehicles Page */}
      {currentView === 'vehicles' || currentView === 'fleet' ? (
        <FleetPage
          onBackToHome={() => handleNavigateView('home')}
          onSelectVehicle={(vehicleName) => handleOpenBooking({ vehicle: vehicleName, name: 'Vehicle Reservation' })}
        />
      ) : (
        <>
          {/* Hero Stage with Travels Name & Chennai Location */}
          <Hero onOpenBooking={() => handleOpenBooking()} />

          {/* Master Interactive Road Scroll Journey */}
          <JourneyRoad onSelectDestination={handleOpenBooking} />

          {/* Starting From Chennai Experience */}
          <ChennaiSection onSelectService={(serviceName) => handleOpenBooking({ name: serviceName, category: 'Chennai Transfer' })} />

          {/* Destination Discovery with Horizontal Parallax Gallery (FROM CHENNAI TO WHEREVER YOU NEED TO GO) */}
          <DestinationSection onPlanTrip={handleOpenBooking} />

          {/* Stylized Interactive Tamil Nadu Map */}
          <InteractiveMap onPlanTrip={handleOpenBooking} />

          {/* Why Travellers Choose Us */}
          <WhyChooseUs />

          {/* Quick Booking Action Bar & Contact */}
          <BookingSection onOpenBookingModal={() => handleOpenBooking()} />
        </>
      )}

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Global Trip Planner Modal */}
      <TripPlannerModal
        isOpen={modalOpen}
        onClose={handleCloseBooking}
        initialData={selectedTripData}
      />
    </div>
  );
}
