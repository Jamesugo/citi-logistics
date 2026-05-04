const STATIC_COMPANIES = [
  {
    id: 1,
    name: 'GIG Logistics',
    logo: 'https://images.unsplash.com/photo-1598128558393-70ff21433be0?auto=format&fit=crop&q=80&w=100',
    price: 3500,
    deliveryTime: '1-3 Days',
    rating: 4.8,
    type: 'Standard',
    description: 'Nigeria\'s leading logistics company with the most extensive network of processing centers across the country.',
    tags: ['Reliable', 'National', 'Tracked'],
    services: ['E-commerce Shipping', 'Freight', 'International Shipping'],
    baseCurrency: '₦'
  },
  {
    id: 2,
    name: 'Red Star Express',
    logo: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=100',
    price: 5200,
    deliveryTime: 'Next Day',
    rating: 4.6,
    type: 'Express',
    description: 'Licensee of FedEx in Nigeria, providing high-speed express delivery and supply chain solutions.',
    tags: ['Express', 'Global', 'Secure'],
    services: ['Courier Services', 'Freight Forwarding', 'Cold Chain'],
    baseCurrency: '₦'
  },
  {
    id: 3,
    name: 'Kwik Delivery',
    logo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=100',
    price: 1500,
    deliveryTime: '2-4 Hours',
    rating: 4.9,
    type: 'Same Day',
    description: 'Last-mile delivery platform connecting businesses and individuals with independent delivery riders.',
    tags: ['Intra-city', 'Bike', 'Ultra-fast'],
    services: ['On-demand Delivery', 'B2B Logistics', 'Food Delivery'],
    baseCurrency: '₦'
  },
  {
    id: 4,
    name: 'ACE Logistics',
    logo: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=100',
    price: 4000,
    deliveryTime: '2-5 Days',
    rating: 4.5,
    type: 'Standard',
    description: 'Specializing in e-commerce fulfillment and tech-driven logistics solutions for Nigerian merchants.',
    tags: ['Tech-driven', 'National', 'Fulfillment'],
    services: ['Warehouse', 'Inventory Management', 'Nationwide Shipping'],
    baseCurrency: '₦'
  },
  {
    id: 5,
    name: 'Chisco Transport',
    logo: 'https://images.unsplash.com/photo-1494412574743-019488944721?auto=format&fit=crop&q=80&w=100',
    price: 8500,
    deliveryTime: '2-3 Days',
    rating: 4.4,
    type: 'Freight',
    description: 'A legacy transport and logistics brand providing heavy-duty freight and parcel transport across West Africa.',
    tags: ['Heavy-duty', 'Regional', 'Inter-state'],
    services: ['Haulage', 'Warehousing', 'Bus Parcel Service'],
    baseCurrency: '₦'
  },
  {
    id: 6,
    name: 'Courier Plus',
    logo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=100',
    price: 4800,
    deliveryTime: '1-2 Days',
    rating: 4.7,
    type: 'International',
    description: 'A leading courier and logistics company offering tailor-made solutions to corporate and individual clients.',
    tags: ['Corporate', 'Air', 'Dedicated'],
    services: ['Document Delivery', 'E-commerce Logistics', 'International Cargo'],
    baseCurrency: '₦'
  }
];

export const getCompanies = () => {
  const localData = localStorage.getItem('shipway_providers');
  const dynamicCompanies = localData ? JSON.parse(localData) : [];
  return [...STATIC_COMPANIES, ...dynamicCompanies];
};

export const saveProvider = (provider) => {
  const current = getCompanies().filter(c => !STATIC_COMPANIES.find(s => s.id === c.id));
  const newProvider = {
    ...provider,
    id: Date.now(),
    rating: 5.0,
    tags: ['New Partner', 'Verified'],
    services: ['General Delivery'],
    baseCurrency: '₦'
  };
  const updated = [...current, newProvider];
  localStorage.setItem('shipway_providers', JSON.stringify(updated));
  return newProvider;
};

export const COMPANIES = getCompanies();
