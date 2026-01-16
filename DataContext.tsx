import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Service, Booking, Testimonial, BlogPost, SiteSettings, BookingStatus } from './types';
import { INITIAL_SERVICES, INITIAL_BOOKINGS, INITIAL_TESTIMONIALS, INITIAL_POSTS, INITIAL_SETTINGS } from './constants';

interface DataContextType {
  services: Service[];
  bookings: Booking[];
  testimonials: Testimonial[];
  posts: BlogPost[];
  settings: SiteSettings;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  updateSettings: (settings: SiteSettings) => void;
  updateService: (service: Service) => void;
  deleteService: (id: string) => void;
  addService: (service: Service) => void;
  deleteBooking: (id: string) => void;
  // Testimonials
  addTestimonial: (t: Testimonial) => void;
  updateTestimonial: (t: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  // Auth simulation
  isAuthenticated: boolean;
  login: (pass: string) => boolean;
  logout: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State initialization
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Actions
  const addBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
  };

  const updateService = (updatedService: Service) => {
    setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
  };

  const addService = (service: Service) => {
    setServices(prev => [...prev, service]);
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const addTestimonial = (t: Testimonial) => {
    setTestimonials(prev => [t, ...prev]);
  };

  const updateTestimonial = (t: Testimonial) => {
    setTestimonials(prev => prev.map(item => item.id === t.id ? t : item));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const login = (pass: string) => {
    // Hardcoded demo password
    if (pass === 'Shifi786') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <DataContext.Provider value={{
      services,
      bookings,
      testimonials,
      posts,
      settings,
      addBooking,
      updateBookingStatus,
      updateSettings,
      updateService,
      addService,
      deleteService,
      deleteBooking,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};