export const BUSINESS_INFO = {
  name: 'Sri Venkateswara Tours and Travels',
  shortName: 'SV Tours & Travels',
  owner: 'BALA',
  phone: '9840651522',
  displayPhone: '+91 98406 51522',
  email: 'srivenkateswara620@gmail.com',
  serviceArea: 'Chennai and nearby districts in Tamil Nadu',
  concept: 'Your Journey Starts Here.'
};

export const createWhatsAppUrl = ({ pickup = '', drop = '', date = '', passengers = '', message = '', vehicle = '' } = {}) => {
  const phone = '919840651522';
  let text = `Hello Sri Venkateswara Tours & Travels (Bala), I would like to enquire about a trip:\n`;
  if (pickup) text += `• Pickup: ${pickup}\n`;
  if (drop) text += `• Destination: ${drop}\n`;
  if (date) text += `• Travel Date: ${date}\n`;
  if (vehicle) text += `• Preferred Vehicle: ${vehicle}\n`;
  if (passengers) text += `• Passengers: ${passengers}\n`;
  if (message) text += `• Additional Details: ${message}\n`;
  if (!pickup && !drop && !message) {
    text = `Hello Sri Venkateswara Tours & Travels (Bala), I am interested in booking a ride with you. Please share details.`;
  }
  return `https://wa.me/${phone}?text=${encodeURIComponent(text.trim())}`;
};

export const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};
