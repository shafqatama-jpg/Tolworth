
import { Service, Booking, BookingStatus, Testimonial, BlogPost, SiteSettings } from './types';

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: "Tolworth Driving School",
  phone: "07727 444 743",
  email: "info@tolworthdriving.co.uk",
  whatsapp: "447727444743",
  address: "Tolworth, Surbiton, KT6 7QJ",
  heroHeadline: "Pass Your Driving Test with Confidence",
  heroSubheadline: "The #1 choice for Tolworth Test Routes. We specialize in short-notice test cover and expert local tuition.",
  primaryColor: "#0f172a",
  images: {
    heroBg: 'https://i.ibb.co/N25fBf3X/woman-male-driving-instructor-driving-test-3.jpg',
    features: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80',
    areasBg: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&q=80',
    areasMap: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80'
  },
  googleReviewsUrl: "https://google.com",
  gallery: [
    'https://i.ibb.co/sp9x0RQz/IMG-6929.jpg',
    'https://i.ibb.co/6Rrb6GW4/IMG-6683.jpg',
    'https://i.ibb.co/F16w5Jy/IMG-6645.jpg',
    'https://i.ibb.co/gF3KVFMy/IMG-6563.jpg',
    'https://i.ibb.co/8DvjS1gP/IMG-6520.jpg',
    'https://i.ibb.co/MyjV5F74/IMG-6505.jpg',
    'https://i.ibb.co/wN2Djrz3/IMG-6450.jpg'
  ]
};

export const INITIAL_SERVICES: Service[] = [
  // Regular Lessons (Standard)
  {
    id: 's1',
    title: 'Manual Driving Lesson',
    duration: '2 Hours',
    price: 75,
    description: 'Expert manual tuition. Master gear control and local Tolworth routes.',
    features: ['1-on-1 Tuition', 'Pick up & Drop off', 'Progress Tracking', 'Theory Support'],
    category: 'standard'
  },
  {
    id: 's2',
    title: 'Automatic Driving Lesson',
    duration: '2 Hours',
    price: 75,
    description: 'Stress-free automatic lessons. Focus on the road, not the gears.',
    features: ['Modern Auto Cars', 'Faster Progress', 'Nervous Friendly', 'Traffic Management'],
    category: 'standard',
    popular: true
  },
  {
    id: 's3',
    title: 'Refresher Lesson',
    duration: '2 Hours',
    price: 80,
    description: 'For license holders needing a confidence boost or motorway practice.',
    features: ['Parking Practice', 'Motorway Confidence', 'Roundabout Safety', 'Eco Driving'],
    category: 'standard'
  },
  {
    id: 's4',
    title: 'Pass Plus Course',
    duration: '6 Hours',
    price: 240,
    description: 'Advanced training after passing your test. Six modules covering all driving conditions.',
    features: ['Insurance Discounts', 'Motorway Training', 'Night Driving', 'Rural Roads'],
    category: 'standard'
  },

  // Intensive Packages
  {
    id: 'p0',
    title: '10 Hours Block Booking',
    duration: '10 Hours',
    price: 365,
    description: 'Our most popular starter block. Perfect for both manual and automatic learners.',
    features: ['Discounted Hourly Rate', 'Flexible Scheduling', 'Manual or Automatic', 'Progress Record'],
    category: 'standard',
    popular: true
  },
  {
    id: 'p1',
    title: 'Starter Intensive',
    duration: '10 Hours',
    price: 650,
    description: 'Perfect for beginners starting their journey. Save more on block bookings.',
    features: ['Discounted Rate', 'Flexible Scheduling', 'Priority Booking', 'Syllabus Structured'],
    category: 'intensive'
  },
  {
    id: 'p2',
    title: 'Midway Intensive',
    duration: '20 Hours',
    price: 1250,
    description: 'Accelerate your learning. Ideal for those wanting to pass within 1-2 months.',
    features: ['Intensive Scheduling', 'Mock Test Included', 'Route Mastery', 'Fast-Track Progress'],
    category: 'intensive',
    popular: true
  },
  {
    id: 'p3',
    title: 'Full Intensive',
    duration: '30 Hours',
    price: 1850,
    description: 'Complete beginner to test-ready. The fastest way to get your license.',
    features: ['Total Mastery', 'Multiple Mock Tests', 'Test Booking Help', 'Guaranteed Quality'],
    category: 'intensive'
  },

  // Test Preparation
  {
    id: 't1',
    title: 'Practical Test Cover',
    duration: '3 Hours',
    price: 140,
    description: 'Emergency or planned test cover. Includes warm-up and car hire for test.',
    features: ['Short Notice Available', '1 Hour Warm-up', 'Car Hire for Test', 'Debrief'],
    category: 'test-prep'
  },
  {
    id: 't2',
    title: 'Professional Mock Test',
    duration: '2 Hours',
    price: 80,
    description: 'Simulate the real test conditions on actual Tolworth test routes.',
    features: ['Real Test Marking', 'Route Familiarization', 'Full Debrief', 'Weakness ID'],
    category: 'test-prep',
    popular: true
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    customerName: 'Alice Smith',
    email: 'alice@example.com',
    phone: '07123456789',
    serviceId: 's1',
    date: '2023-10-25',
    postcode: 'KT6 7QJ',
    transmission: 'Manual',
    status: BookingStatus.CONFIRMED,
    createdAt: '2023-10-20T10:00:00Z'
  },
  {
    id: 'b2',
    customerName: 'John Doe',
    email: 'john@example.com',
    phone: '07987654321',
    serviceId: 'p1',
    date: '2023-10-26',
    postcode: 'SW19 1AA',
    transmission: 'Automatic',
    status: BookingStatus.PENDING,
    notes: 'I am a nervous driver.',
    createdAt: '2023-10-22T15:30:00Z'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    rating: 5,
    content: 'Passed first time with 0 minors! My instructor was so patient and knew all the Tolworth test routes perfectly.',
    date: '2025-01-15',
    approved: true
  },
  {
    id: 't2',
    name: 'Mike Ross',
    rating: 5,
    content: 'Highly recommend. The 10-hour block booking was great value. I felt very prepared for the test.',
    date: '2024-12-20',
    approved: true
  },
  {
    id: 't3',
    name: 'Emma Clarke',
    rating: 5,
    content: 'I failed twice with other schools but passed here on my first go. The mock tests are a game changer.',
    date: '2025-02-01',
    approved: true
  },
  {
    id: 't4',
    name: 'David P.',
    rating: 5,
    content: 'Friendly, reliable and professional. The car is very easy to drive as well.',
    date: '2025-02-10',
    approved: true
  }
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'p1',
    title: 'Top 5 Tips for Passing at Tolworth Test Centre',
    excerpt: 'The Tolworth roundabout can be tricky. Here is how to navigate it safely during your exam.',
    content: 'Full content regarding roundabout navigation...',
    author: 'Admin',
    date: '2023-10-10',
    status: 'Published',
    imageUrl: 'https://picsum.photos/800/400?random=1'
  },
  {
    id: 'p2',
    title: 'Changes to the Practical Driving Test 2024',
    excerpt: 'Everything you need to know about the new sat-nav requirements.',
    content: 'Full content regarding sat-nav...',
    author: 'Admin',
    date: '2023-10-15',
    status: 'Published',
    imageUrl: 'https://picsum.photos/800/400?random=2'
  }
];
