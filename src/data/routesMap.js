export const mapHub = {
  id: 'chennai',
  name: 'Chennai',
  tagline: 'Origin Hub (All Departures)',
  x: 72, // % inside viewport
  y: 26,
  labelPos: 'left',
  description: 'Primary hub for all pickups, airport arrivals, local city rides and outstation departures.'
};

export const mapDestinations = [
  {
    id: 'tiruvallur',
    name: 'Tiruvallur',
    direction: 'North-West',
    distance: '45 km',
    time: '1.2 Hours',
    x: 48,
    y: 18,
    labelPos: 'top',
    routeVia: 'NH 716 Expressway',
    highlight: 'Sacred Temples & Water Reservoirs'
  },
  {
    id: 'kanchipuram',
    name: 'Kanchipuram',
    direction: 'West',
    distance: '75 km',
    time: '2.0 Hours',
    x: 42,
    y: 38,
    labelPos: 'bottom',
    routeVia: 'NH 48 Expressway',
    highlight: 'City of Thousand Temples & Silk'
  },
  {
    id: 'ranipet-vellore',
    name: 'Ranipet & Vellore',
    direction: 'West',
    distance: '140 km',
    time: '3.0 Hours',
    x: 18,
    y: 32,
    labelPos: 'bottom',
    routeVia: 'NH 48 6-Lane Expressway',
    highlight: 'Sripuram Golden Temple & Vellore Fort'
  },
  {
    id: 'chengalpattu',
    name: 'Chengalpattu',
    direction: 'South-West',
    distance: '56 km',
    time: '1.5 Hours',
    x: 60,
    y: 52,
    labelPos: 'left',
    routeVia: 'GST Road (NH 32)',
    highlight: 'Gateway to South & Kolavai Lake'
  },
  {
    id: 'mahabalipuram',
    name: 'Mahabalipuram',
    direction: 'South Coast',
    distance: '55 km',
    time: '1.3 Hours',
    x: 82,
    y: 50,
    labelPos: 'right',
    routeVia: 'East Coast Road (ECR)',
    highlight: 'UNESCO Shore Temples & Coastal Drive'
  },
  {
    id: 'villupuram',
    name: 'Villupuram',
    direction: 'South-West',
    distance: '165 km',
    time: '3.5 Hours',
    x: 42,
    y: 72,
    labelPos: 'left',
    routeVia: 'NH 32 South Expressway',
    highlight: 'Historic Gingee Fort & Monoliths'
  },
  {
    id: 'tiruvannamalai',
    name: 'Tiruvannamalai',
    direction: 'South-West',
    distance: '195 km',
    time: '4.5 Hours',
    x: 18,
    y: 65,
    labelPos: 'bottom',
    routeVia: 'State Highway via Gingee',
    highlight: 'Annamalaiyar Temple & Girivalam'
  },
  {
    id: 'pondicherry',
    name: 'Puducherry',
    direction: 'South Coast',
    distance: '150 km',
    time: '3.5 Hours',
    x: 74,
    y: 80,
    labelPos: 'bottom',
    routeVia: 'Scenic ECR Ocean Road',
    highlight: 'French White Town & Promenade Beach'
  }
];
