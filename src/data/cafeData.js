export const cafeData = {
  name: 'Chai Loop Cafe',
  phone: '+917736158820',
  displayPhone: '+91 77361 58820',
  whatsapp: '917736158820',
  address: 'Kunnumpuram, Thrikkakara, Vazhakkala, Kakkanad, Kerala 682021, India',
  shortAddress: 'Kakkanad, Kochi',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Chai+Loop+Cafe+Kunnumpuram+Kakkanad+Kerala',
  openingHours: '10:00 AM – 3:00 AM',
  rating: '4.6',
  reviewCount: '21',
  priceRange: '₹200–₹400 per person',
  services: ['Dine-in', 'Drive-through', 'No-contact delivery'],
  instagramUrl: '',
  facebookUrl: '',
}

export const getWhatsAppUrl = (message = 'Hello Chai Loop Cafe! I would like to know more about your menu.') =>
  `https://wa.me/${cafeData.whatsapp}?text=${encodeURIComponent(message)}`
