import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, Link, useNavigate } from 'react-router-dom';
import { DataProvider, useData } from './DataContext';
import {
  Menu, X, Phone, MapPin, Instagram, Facebook, Star,
  ChevronRight, CheckCircle, Clock, Calendar, MessageSquare,
  LayoutDashboard, Users, FileText, Settings, LogOut, Check, Image as ImageIcon,
  ExternalLink, Quote, Plus, Trash2, Edit2, Shield, AlertCircle, AlertTriangle,
  Award, Heart, Map, GraduationCap, Zap, Navigation, Save, ShieldCheck,
  BookOpen, HelpCircle, Lightbulb, Search, Info
} from 'lucide-react';
import { BookingStatus, Service, Testimonial, ServiceCategory } from './types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Logo from './Logo';

// --- Components ---

const WhatsAppFloat = () => {
  const { settings } = useData();
  return (
    <a
      href={`https://wa.me/${settings.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50 flex items-center gap-2 group animate-bounce focus:outline-none focus:ring-4 focus:ring-green-300 active:scale-95"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageSquare className="w-6 h-6" aria-hidden="true" />
      <span className="hidden group-hover:inline font-medium text-base">Chat with us</span>
    </a>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll handler for One-Page navigation
  const handleNavClick = (id: string) => {
    setIsOpen(false);

    // If we are not on the homepage (e.g. on /booking), go home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Already on home, just scroll
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Why Us', id: 'features' },
    { name: 'Prices', id: 'services' },
    { name: 'Areas', id: 'areas' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        {/* Top Bar for Mobile/Desktop visibility of phone */}
        <div className="bg-slate-900 text-white text-xs md:text-sm py-2.5 text-center md:hidden">
          <a href={`tel:${settings.phone}`} className="flex items-center justify-center gap-2 font-bold focus:outline-none focus:underline py-1">
            <Phone size={14} className="text-brand-accent" aria-hidden="true" /> Call Us: {settings.phone}
          </a>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            {/* Logo and Company Name */}
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-brand-accent rounded-lg p-1 group" aria-label="Tolworth Driving School Home">
              <div className="group-hover:scale-105 transition-transform flex items-center gap-3">
                <Logo className="w-14 h-14 md:w-16 md:h-16" />
                <div className="flex flex-col">
                  <span className="font-extrabold text-slate-900 text-lg md:text-xl leading-none uppercase tracking-tight">Tolworth</span>
                  <span className="font-bold text-brand-primary text-xs md:text-sm leading-none mt-1 uppercase tracking-[0.2em]">Driving School</span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
              {navLinks.map((link) => (
                link.path ? (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-sm font-medium text-slate-600 hover:text-brand-accent transition-colors focus:outline-none focus:text-brand-accent focus:underline py-2"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.id!)}
                    className="text-sm font-medium text-slate-600 hover:text-brand-accent transition-colors cursor-pointer focus:outline-none focus:text-brand-accent focus:underline py-2"
                  >
                    {link.name}
                  </button>
                )
              ))}

              {/* Highlighted Phone Number */}
              <div className="hidden lg:flex items-center gap-2 text-slate-900 font-bold bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <Phone size={16} className="text-brand-accent fill-current" aria-hidden="true" />
                <a href={`tel:${settings.phone}`} className="focus:outline-none focus:underline">{settings.phone}</a>
              </div>

              <Link to="/booking" className="bg-brand-accent text-brand-dark px-5 py-2.5 rounded-md font-bold hover:bg-yellow-300 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent active:scale-95 transform">
                Book Lesson
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-700 p-2 focus:outline-none focus:ring-2 focus:ring-brand-accent rounded-lg hover:bg-slate-50 relative z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Portal - Renders at document body level to avoid clipping/z-index issues */}
      {isOpen && createPortal(
        <div id="mobile-menu" className="md:hidden fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div
            className="bg-white w-3/4 max-w-sm h-full shadow-2xl p-4 flex flex-col animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
          >
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
              <span className="font-bold text-lg text-slate-900">Menu</span>
              <button onClick={() => setIsOpen(false)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto">
              {navLinks.map((link) => (
                link.path ? (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left px-4 py-4 rounded-xl text-lg font-medium text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.id!)}
                    className="block w-full text-left px-4 py-4 rounded-xl text-lg font-medium text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors"
                  >
                    {link.name}
                  </button>
                )
              ))}
            </div>

            <div className="pt-6 space-y-3 mt-auto border-t border-gray-100">
              <a href={`tel:${settings.phone}`} className="flex items-center justify-center gap-2 w-full text-center bg-slate-100 text-slate-900 px-4 py-4 rounded-xl font-bold active:scale-95 transition-transform">
                <Phone size={20} aria-hidden="true" /> Call {settings.phone}
              </a>
              <Link
                to="/booking"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full text-center bg-brand-accent text-brand-dark px-4 py-4 rounded-xl font-bold active:scale-95 transition-transform shadow-md"
              >
                <Calendar size={20} aria-hidden="true" /> Book Online
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

const Footer = () => {
  const { settings } = useData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Logo className="w-16 h-16 md:w-24 md:h-24 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
            </div>
            <p className="mb-6 max-w-sm text-slate-400 leading-relaxed">
              Professional <strong>driving instruction in Tolworth</strong> helping students pass with confidence.
              Top rated <strong>driving school covering Kingston upon Thames, Surbiton KT6, Chessington, Esher</strong> and surrounding Surrey areas.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-slate-800 rounded-full hover:bg-brand-accent hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent" aria-label="Visit our Facebook page"><Facebook size={20} /></a>
              <a href="#" className="p-3 bg-slate-800 rounded-full hover:bg-brand-accent hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent" aria-label="Visit our Instagram page"><Instagram size={20} /></a>
            </div>
            {/* Added sister company note */}
            <p className="mt-8 text-sm text-slate-500 font-medium">
              Sister company of <span className="text-slate-300">Kings Driving Centre</span>
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/booking" className="hover:text-brand-accent transition-colors block py-1 font-bold">Book Online</Link></li>
              <li><Link to="/resources" className="hover:text-brand-accent transition-colors block py-1">Learner Resources</Link></li>
              <li><Link to="/terms" className="hover:text-brand-accent transition-colors block py-1">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-accent transition-colors block py-1">Privacy Policy</Link></li>
              <li><Link to="/admin" className="hover:text-brand-accent transition-colors block py-1">Instructor Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 text-brand-accent shrink-0" size={20} aria-hidden="true" />
                <span className="leading-relaxed">{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-brand-accent shrink-0" size={20} aria-hidden="true" />
                <a href={`tel:${settings.phone}`} className="hover:text-brand-accent block py-1 font-medium">{settings.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 gap-4">
          <p>&copy; {currentYear} {settings.siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// --- HomePage (The Single Page Aggregator) ---

const HomePage = () => {
  const { services, testimonials, settings } = useData();
  const [postcode, setPostcode] = useState('');
  const [checkResult, setCheckResult] = useState<null | string>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState<ServiceCategory>('standard');

  // Expanded contact state to match booking requirements more closely for Quick Enquiry
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    postcode: '',
    transmission: 'Manual',
    message: ''
  });

  const areas = [
    "Tolworth (KT5, KT6)", "Surbiton (KT6)", "Kingston (KT1, KT2)", "New Malden (KT3)",
    "Worcester Park (KT4)", "Chessington (KT9)", "Ewell (KT17, KT19)", "Stoneleigh (KT17, KT19)", "Hook (KT9)",
    "Long Ditton (KT6)", "Richmond (TW9, TW10)", "Ham (TW10)", "Sheen (SW14)", "Putney (SW15)",
    "Molesey (KT8)", "Claygate (KT10)", "Esher (KT10)"
  ];

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode) return;
    const cleanPostcode = postcode.toUpperCase().replace(/\s/g, '');
    if (cleanPostcode.startsWith('KT') || cleanPostcode.startsWith('SW') || cleanPostcode.startsWith('TW')) {
      setCheckResult('Great news! We cover your area.');
    } else {
      setCheckResult('Please contact us directly to confirm availability.');
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      const response = await fetch("https://formspree.io/f/xojjjabe", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...contactData,
          _subject: `New Enquiry: ${contactData.name} - ${contactData.transmission}`
        })
      });
      if (response.ok) {
        setFormStatus('success');
        setContactData({ name: '', phone: '', email: '', postcode: '', transmission: 'Manual', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const filteredServices = services.filter(s => s.category === activeTab);

  return (
    <div className="font-sans">

      {/* 1. HERO SECTION */}
      <section id="home" className="relative bg-slate-900 min-h-[85vh] md:min-h-[750px] flex items-center overflow-hidden">
        {/* Optimized Background Layer: Image with 90% opacity + Adjusted Gradient */}
        <div className="absolute inset-0 z-0 bg-slate-900">
          <img
            src={settings.images.heroBg}
            alt="Learner driver passing test at Tolworth Driving Centre"
            className="w-full h-full object-cover object-center opacity-90"
            loading="eager"
          />
          {/* Lighter gradient overlay to ensure image visibility while keeping text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 bg-brand-accent/20 backdrop-blur-md border border-brand-accent/30 text-brand-accent px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider mb-6">
              <Star size={16} fill="currentColor" aria-hidden="true" /> One of the Top Rated in Tolworth & Richmond
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-white drop-shadow-sm">
              {settings.heroHeadline}
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed max-w-xl font-medium">
              {settings.heroSubheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/booking" className="bg-brand-accent text-slate-900 px-8 py-4 rounded-lg font-bold text-center hover:bg-yellow-300 transition-all shadow-lg text-lg transform active:scale-95 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-brand-accent/50">
                Book Your Lesson
              </Link>
              <a href={`tel:${settings.phone}`} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg font-bold text-center hover:bg-white/20 transition-all flex items-center justify-center gap-2 text-lg active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/30">
                <Phone size={20} aria-hidden="true" />
                {settings.phone}
              </a>
            </div>
            {/* Quick trust badges */}
            <div className="mt-10 flex flex-wrap gap-4 text-xs sm:text-sm font-medium text-slate-300">
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full"><CheckCircle size={16} className="text-brand-accent" aria-hidden="true" /> DVSA Approved</span>
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full"><CheckCircle size={16} className="text-brand-accent" aria-hidden="true" /> High Pass Rate</span>
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full"><CheckCircle size={16} className="text-brand-accent" aria-hidden="true" /> Flexible Hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STATS */}
      <section className="bg-white py-12 md:py-16 border-b border-slate-100" aria-label="Key Statistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {[
              { label: 'Pass Rate', value: '92%' },
              { label: 'Happy Students', value: '500+' },
              { label: 'Coverage', value: 'Wide Area' },
            ].map((stat, idx) => (
              <div key={idx} className="p-4">
                <div className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-500 font-bold text-xs md:text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION (Why Learn With Us - Redesigned & Moved Above Pricing) */}
      <section id="features" className="py-16 md:py-28 bg-slate-900 text-white relative overflow-hidden" aria-labelledby="features-heading">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <div className="inline-block px-3 py-1 bg-brand-accent text-slate-900 text-xs font-bold uppercase rounded-full mb-4 tracking-wide">The Tolworth Difference</div>
            <h2 id="features-heading" className="text-3xl md:text-5xl font-extrabold text-white mb-6">More Than Just "Lessons"</h2>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed px-4">
              We don't just help you pass; we build confident drivers for life.
              Experience the difference of learning with true local experts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
            {/* Feature 1 */}
            <div className="bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-700 hover:border-brand-accent/50 transition-colors group">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-accent text-slate-900 rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <Award size={24} className="md:w-7 md:h-7" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">Grade A Local Driving Instructors</h3>
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                    Learn from the #1 rated <strong>driving school in Tolworth & Surbiton</strong>. Our instructors are fully qualified DVSA Approved Driving Instructors (ADIs), holding the top 'Grade A' standard.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-700 hover:border-brand-accent/50 transition-colors group">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-accent text-slate-900 rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <Heart size={24} className="md:w-7 md:h-7" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">Nervous Driver Specialists KT6</h3>
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                    Providing patient <strong>driving lessons in Surbiton and Kingston</strong>. Our "Patience-First" methodology turns panic into confidence. We move at your pace, ensuring you feel safe and in control.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-700 hover:border-brand-accent/50 transition-colors group">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-accent text-slate-900 rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <Map size={24} className="md:w-7 md:h-7" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">Tolworth & Kingston Test Experts</h3>
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                    Master the <strong>Tolworth Test Centre</strong> routes. From the Tolworth Roundabout to the tricky A3 junctions in <strong>Kingston upon Thames</strong>, we ensure you're never caught off guard.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-700 hover:border-brand-accent/50 transition-colors group">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-accent text-slate-900 rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <Zap size={24} className="md:w-7 md:h-7" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">Fast-Track Your License</h3>
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                    Need your license fast? Our intensive courses and block booking options are designed to accelerate your learning curve without compromising on safety or quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRICING & SERVICES SECTION (Redesigned) */}
      <section id="services" className="py-20 md:py-32 bg-white" aria-labelledby="pricing-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-24">
            <h2 id="pricing-heading" className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Simple, Transparent <span className="text-brand-accent">Pricing</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-medium">
              Professional instruction at competitive rates. Choose the package that best fits your goals and schedule.
            </p>
          </div>

          {/* Regular Lessons Section */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-10 overflow-hidden">
              <h3 className="text-2xl font-bold text-slate-900 shrink-0 capitalize">Regular Lessons</h3>
              <div className="h-px bg-slate-200 w-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              {services.filter(s => s.category === 'standard').map((service, idx) => (
                <div key={service.id} className={`flex flex-col rounded-[2.5rem] overflow-hidden border-2 transition-all hover:scale-[1.02] hover:shadow-2xl h-full flex-grow group ${idx === 0 ? 'bg-blue-50/30 border-blue-100 hover:border-blue-300' :
                  idx === 1 ? 'bg-emerald-50/30 border-emerald-100 hover:border-emerald-300' :
                    idx === 2 ? 'bg-amber-50/30 border-amber-100 hover:border-amber-300' :
                      'bg-slate-50/30 border-slate-100'
                  }`}>
                  <div className="p-8 md:p-10 text-center flex flex-col items-center">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">{idx === 0 ? 'BASIC' : idx === 1 ? 'STANDARD' : idx === 2 ? 'REFRESHER' : 'COURSE'}</span>
                    <h4 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 px-4 h-12 line-clamp-2">{service.description}</p>

                    <div className="mb-8 items-center flex flex-col">
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-black text-slate-900 leading-none">£{service.price}</span>
                      </div>
                      <span className="text-slate-400 font-bold text-sm mt-3 uppercase tracking-wider italic">Per {service.duration} Session</span>
                    </div>

                    <div className={`px-6 py-2.5 rounded-full text-white font-bold text-sm mb-10 shadow-lg ${idx === 0 ? 'bg-blue-500 shadow-blue-200' :
                      idx === 1 ? 'bg-emerald-500 shadow-emerald-200' :
                        idx === 2 ? 'bg-amber-500 shadow-amber-200' :
                          'bg-slate-900'
                      }`}>
                      {service.duration} 1-to-1
                    </div>

                    <div className="w-full h-px bg-slate-200 mb-10 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[10px] font-bold text-slate-300 tracking-tighter uppercase whitespace-nowrap">Features Included</div>
                    </div>

                    <ul className="w-full space-y-4 mb-10">
                      {service.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                          <Check className={`shrink-0 w-4 h-4 ${idx === 0 ? 'text-blue-500' :
                            idx === 1 ? 'text-emerald-500' :
                              idx === 2 ? 'text-amber-500' :
                                'text-slate-900'
                            }`} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link to={`/booking?service=${service.id}`} className={`mt-auto w-full py-5 rounded-2xl font-black text-center transition-all shadow-xl active:scale-95 ${idx === 1 ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-white text-slate-900 hover:bg-slate-100 border-2 border-slate-100'
                      }`}>
                      SELECT PACKAGE
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Intensive Packages Section */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-10 overflow-hidden">
              <h3 className="text-2xl font-bold text-slate-900 shrink-0 capitalize">Intensive Courses</h3>
              <div className="h-px bg-slate-200 w-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              {services.filter(s => s.category === 'intensive').map((service, idx) => (
                <div key={service.id} className={`flex flex-col rounded-[2.5rem] overflow-hidden border-2 transition-all hover:scale-[1.02] hover:shadow-2xl h-full flex-grow group ${idx === 0 ? 'bg-cyan-50/30 border-cyan-100 hover:border-cyan-300' :
                  idx === 1 ? 'bg-purple-50/30 border-purple-100 hover:border-purple-300' :
                    idx === 2 ? 'bg-rose-50/30 border-rose-100 hover:border-rose-300' :
                      'bg-slate-50/30 border-slate-100'
                  }`}>
                  <div className="p-8 md:p-10 text-center flex flex-col items-center">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">{idx === 0 ? 'STARTER' : idx === 1 ? 'INTERMEDIATE' : idx === 2 ? 'ADVANCED' : 'INTENSIVE'}</span>
                    <h4 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 px-4 h-12 line-clamp-2">{service.description}</p>

                    <div className="mb-8 items-center flex flex-col">
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-black text-slate-900 leading-none">£{service.price}</span>
                      </div>
                      <span className="text-slate-400 font-bold text-sm mt-3 uppercase tracking-wider italic">Fixed Package Rate</span>
                    </div>

                    <div className={`px-6 py-2.5 rounded-full text-white font-bold text-sm mb-10 shadow-lg ${idx === 0 ? 'bg-cyan-500 shadow-cyan-200' :
                      idx === 1 ? 'bg-purple-500 shadow-purple-200' :
                        idx === 2 ? 'bg-rose-500 shadow-rose-200' :
                          'bg-slate-900'
                      }`}>
                      {service.duration} Training
                    </div>

                    <div className="w-full h-px bg-slate-200 mb-10 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[10px] font-bold text-slate-300 tracking-tighter uppercase whitespace-nowrap">Package Perks</div>
                    </div>

                    <ul className="w-full space-y-4 mb-10">
                      {service.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                          <Check className={`shrink-0 w-4 h-4 ${idx === 0 ? 'text-cyan-500' :
                            idx === 1 ? 'text-purple-500' :
                              idx === 2 ? 'text-rose-500' :
                                'text-slate-900'
                            }`} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link to={`/booking?service=${service.id}`} className={`mt-auto w-full py-5 rounded-2xl font-black text-center transition-all shadow-xl active:scale-95 ${service.popular ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-white text-slate-900 hover:bg-slate-100 border-2 border-slate-100'
                      }`}>
                      {service.popular ? 'LOCK IN POPULAR CHOICE' : 'SELECT INTENSIVE'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Test Services */}
          <div>
            <div className="flex items-center gap-4 mb-10 overflow-hidden">
              <h3 className="text-2xl font-bold text-slate-900 shrink-0 capitalize">Test Prep & Services</h3>
              <div className="h-px bg-slate-200 w-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              {services.filter(s => s.category === 'test-prep').map((service, idx) => (
                <div key={service.id} className="bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 group hover:scale-[1.01] transition-transform shadow-2xl">
                  <div className="flex-1">
                    <div className="text-brand-accent font-black text-xs uppercase tracking-widest mb-4">TEST READY</div>
                    <h4 className="text-3xl font-black mb-4">{service.title}</h4>
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">{service.description}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {service.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-300 text-sm font-bold">
                          <CheckCircle size={18} className="text-brand-accent shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full md:w-auto text-center md:text-right border-t md:border-t-0 md:border-l border-slate-700 pt-8 md:pt-0 md:pl-12">
                    <div className="text-5xl font-black mb-2">£{service.price}</div>
                    <div className="text-slate-500 font-bold text-sm uppercase mb-10">{service.duration} Session</div>
                    <Link to={`/booking?service=${service.id}`} className="block w-full md:w-48 bg-brand-accent text-slate-900 py-5 rounded-2xl font-black hover:bg-yellow-300 transition-all shadow-lg active:scale-95 text-center">
                      BOOK NOW
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges & Payments */}
          <div className="mt-24 border-t border-slate-100 pt-16 flex flex-col items-center">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <div className="flex items-center gap-2 font-black text-2xl text-slate-900">VISA</div>
              <div className="flex items-center gap-2 font-black text-2xl text-slate-900">Mastercard</div>
              <div className="flex items-center gap-2 font-black text-2xl text-slate-900">AMEX</div>
              <div className="flex items-center gap-2 font-black text-2xl text-slate-900 italic">PayPal</div>
              <div className="flex items-center gap-2 font-black text-2xl text-slate-900">Klarna</div>
            </div>
            <p className="mt-12 text-slate-400 text-sm font-medium max-w-lg text-center leading-relaxed">
              Payment plans available for all intensive courses. 48-hour cancellation policy applies to all individual lessons. Prices subject to change based on location.
            </p>
          </div>
        </div>
      </section>

      {/* 5. AREAS SECTION (Redesigned & More Attractive) */}
      <section id="areas" className="py-16 md:py-28 bg-slate-950 text-white relative overflow-hidden" aria-labelledby="areas-heading">
        {/* Background Image with heavy darkening and gradient */}
        <div className="absolute inset-0 bg-cover bg-center opacity-20 scale-105" style={{ backgroundImage: `url('${settings.images.areasBg}')` }} aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/80"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

            {/* Content Side */}
            <div className="text-left order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/20 text-brand-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
                <Navigation size={14} /> Expert Local Coverage
              </div>
              <h2 id="areas-heading" className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-yellow-200">Local Routes</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed">
                Passing isn't just about driving; it's about knowing the roads. We specialize in the test routes for <strong>Tolworth</strong>, <strong>Morden</strong>, and <strong>Isleworth</strong>.
                From the Tolworth Roundabout to the A3 exits, we ensure you're never caught off guard.
              </p>

              <div className="mb-10">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Primary Coverage Zones</h3>
                <div className="flex flex-wrap gap-2">
                  {areas.map((area, i) => (
                    <span key={i} className="px-3 py-1.5 md:px-4 md:py-2 bg-slate-800/80 hover:bg-brand-accent hover:text-slate-900 border border-slate-700 rounded-full text-xs md:text-sm font-medium transition-all cursor-default">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Interaction Side */}
            <div className="relative order-1 md:order-2">
              {/* Decorative backdrop glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-orange-400 rounded-2xl blur opacity-20"></div>

              <div className="relative bg-slate-900/50 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-slate-700 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-brand-accent shadow-inner border border-slate-700">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-white">Coverage Checker</h3>
                    <p className="text-slate-400 text-sm">Verify we cover your street instantly</p>
                  </div>
                </div>

                <form onSubmit={handleCheck} className="space-y-4">
                  <div>
                    <label htmlFor="area-checker-postcode" className="sr-only">Enter Postcode</label>
                    <div className="relative">
                      <input
                        id="area-checker-postcode"
                        type="text"
                        placeholder="Enter your postcode (e.g. KT6 7QJ)"
                        className="w-full pl-4 pr-4 py-4 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all shadow-inner text-base"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-brand-accent hover:bg-yellow-300 text-slate-900 py-4 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg flex items-center justify-center gap-2 text-base">
                    Check Availability <ChevronRight size={18} />
                  </button>
                </form>

                {checkResult && (
                  <div className={`mt-6 p-4 rounded-xl border flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${checkResult.includes('Great news') ? 'bg-green-500/10 border-green-500/30 text-green-300' : 'bg-slate-800 border-slate-700 text-slate-300'}`} role="status">
                    {checkResult.includes('Great news') ? <CheckCircle className="shrink-0" size={20} /> : <AlertTriangle className="shrink-0" size={20} />}
                    <span className="font-medium text-sm">{checkResult}</span>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>• 7-mile radius from Tolworth Test Centre</span>
                  <span>• Short notice cover available</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. REVIEWS SECTION (High-End Redesign) */}
      <section id="reviews" className="py-24 md:py-32 bg-slate-950 relative overflow-hidden" aria-labelledby="reviews-heading">
        {/* Curved Background Lines (SVG) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-full">
            <path d="M-100 400C200 300 400 600 720 400C1040 200 1240 500 1540 400" stroke="url(#paint0_linear)" strokeWidth="2" />
            <path d="M-100 440C200 340 400 640 720 440C1040 240 1240 540 1540 440" stroke="url(#paint0_linear)" strokeWidth="2" />
            <path d="M-100 480C200 380 400 680 720 480C1040 280 1240 580 1540 480" stroke="url(#paint1_linear)" strokeWidth="2" />
            <path d="M-100 520C200 420 400 720 720 520C1040 320 1240 620 1540 520" stroke="url(#paint1_linear)" strokeWidth="2" />
            <path d="M-100 560C200 460 400 760 720 560C1040 360 1240 660 1540 560" stroke="url(#paint1_linear)" strokeWidth="2" />
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#a855f7" />
              </linearGradient>
              <linearGradient id="paint1_linear" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a855f7" />
                <stop offset="1" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Avatars (Static for demo, but positioned to match design) */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
          {[
            { top: '35%', left: '15%', size: 'w-16 h-16', delay: '0s', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
            { top: '55%', left: '8%', size: 'w-20 h-20', delay: '1s', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
            { top: '25%', left: '45%', size: 'w-14 h-14', delay: '0.5s', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150' },
            { top: '45%', left: '65%', size: 'w-18 h-18', delay: '1.5s', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150' },
            { top: '65%', left: '85%', size: 'w-16 h-16', delay: '0.8s', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' }
          ].map((avatar, i) => (
            <div
              key={i}
              className={`absolute ${avatar.size} rounded-full border-2 border-white/20 overflow-hidden animate-pulse shadow-2xl`}
              style={{ top: avatar.top, left: avatar.left, animationDelay: avatar.delay, opacity: 0.6 }}
            >
              <img src={avatar.img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <h2 id="reviews-heading" className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Helping thousands of students <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 italic">to succeed with speed</span>
            </h2>

          </div>

          {/* Testimonial Slider/Grid Container */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {testimonials.filter(t => t.approved).slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="bg-slate-900/40 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl hover:border-blue-500/50 transition-all flex flex-col group"
              >
                <div className="flex gap-1 mb-6 text-brand-accent">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>

                <p className="text-slate-300 mb-8 text-lg leading-relaxed font-medium italic group-hover:text-white transition-colors">
                  &ldquo;{review.content}&rdquo;
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-black text-white shadow-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{review.name}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Verified Student</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Success Gallery (Redesigned for 'wow' factor) */}
          {settings.gallery.length > 0 && (
            <div className="mt-32 relative h-[600px] w-full hidden lg:block overflow-hidden" aria-hidden="true">
              <p className="text-center text-slate-500 text-[10px] font-bold uppercase tracking-[0.5em] mb-12 relative z-10">Real Success Stories from Tolworth</p>

              {[
                { top: '10%', left: '5%', size: 'w-64', rotate: '-6deg', delay: '0s', url: settings.gallery[0] },
                { top: '40%', left: '25%', size: 'w-48', rotate: '4deg', delay: '1.5s', url: settings.gallery[1] },
                { top: '5%', left: '55%', size: 'w-56', rotate: '-3deg', delay: '0.8s', url: settings.gallery[2] },
                { top: '35%', left: '75%', size: 'w-72', rotate: '8deg', delay: '2s', url: settings.gallery[3] },
                { top: '65%', left: '45%', size: 'w-52', rotate: '-4deg', delay: '1s', url: settings.gallery[4] || settings.gallery[0] },
                { top: '70%', left: '10%', size: 'w-44', rotate: '12deg', delay: '2.5s', url: settings.gallery[5] || settings.gallery[1] },
                { top: '15%', left: '85%', size: 'w-40', rotate: '-10deg', delay: '1.2s', url: settings.gallery[6] || settings.gallery[2] }
              ].map((item, i) => (
                <div
                  key={i}
                  className={`absolute ${item.size} aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-700 hover:scale-110 hover:z-50 cursor-pointer group`}
                  style={{
                    top: item.top,
                    left: item.left,
                    transform: `rotate(${item.rotate})`,
                    animation: `float ${6 + i}s ease-in-out infinite alternate`,
                    animationDelay: item.delay
                  }}
                >
                  <img src={item.url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Student Pass" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-white text-[10px] font-black uppercase tracking-widest">Official Pass</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mobile Fallback Grid (Simplified) */}
          {settings.gallery.length > 0 && (
            <div className="lg:hidden pt-12 border-t border-white/5">
              <div className="grid grid-cols-2 gap-4">
                {settings.gallery.slice(0, 4).map((url, i) => (
                  <div key={i} className="aspect-video bg-slate-900 rounded-xl overflow-hidden relative border border-white/5 shadow-lg">
                    <img src={url} className="w-full h-full object-cover" alt="Student Pass" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes float {
            0% { transform: translateY(0px) rotate(-2deg); }
            100% { transform: translateY(-20px) rotate(2deg); }
          }
        `}} />
      </section>

      {/* 7. CONTACT SECTION (Integrated - Updated to be Quick Enquiry Form with expanded fields) */}
      <section id="contact" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200" aria-labelledby="contact-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h2 id="contact-heading" className="text-3xl font-bold text-slate-900 mb-6">Quick Enquiry</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Ready to start? Have questions about test cover? We are here to help 7 days a week.
                Fill out the form or use WhatsApp for the fastest response.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-brand-primary" aria-hidden="true"><Phone size={24} /></div>
                  <div>
                    <h3 className="font-bold text-slate-900">Phone</h3>
                    <a href={`tel:${settings.phone}`} className="text-slate-600 hover:text-brand-accent transition-colors focus:outline-none focus:underline">{settings.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-green-600" aria-hidden="true"><MessageSquare size={24} /></div>
                  <div>
                    <h3 className="font-bold text-slate-900">WhatsApp</h3>
                    <a href={`https://wa.me/${settings.whatsapp}`} className="text-slate-600 hover:text-brand-accent transition-colors focus:outline-none focus:underline">Chat Now</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-brand-primary" aria-hidden="true"><MapPin size={24} /></div>
                  <div>
                    <h3 className="font-bold text-slate-900">HQ Address</h3>
                    <p className="text-slate-600">{settings.address}</p>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="mt-8 rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-video md:aspect-auto md:h-48">
                  <iframe
                    title="Tolworth Driving School Location"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10000!2d-0.2796!3d51.3789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876097d64b0f0a5%3A0x442fc95a5f78860!2sTolworth%2C%20Surbiton!5e0!3m2!1sen!2suk!4v1715560000000!5m2!1sen!2suk"
                    allowFullScreen
                  ></iframe>
                  <div className="bg-white p-2 text-[10px] text-slate-400 text-center font-medium">
                    Serving Tolworth, Surbiton & Surrounding Areas
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100">
              {formStatus === 'success' ? (
                <div className="text-center py-12" role="alert">
                  <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <button onClick={() => setFormStatus('idle')} className="mt-4 text-brand-accent font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-brand-accent rounded">Send another</button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Enquiry Form</h3>
                  <div>
                    <label htmlFor="enquiry-name" className="block text-xs font-bold uppercase text-slate-500 mb-1">Name</label>
                    <input id="enquiry-name" required type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent text-base"
                      value={contactData.name} onChange={e => setContactData({ ...contactData, name: e.target.value })} placeholder="Your Name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="enquiry-phone" className="block text-xs font-bold uppercase text-slate-500 mb-1">Phone</label>
                      <input id="enquiry-phone" required type="tel" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent text-base"
                        value={contactData.phone} onChange={e => setContactData({ ...contactData, phone: e.target.value })} placeholder="Your Number" />
                    </div>
                    <div>
                      <label htmlFor="enquiry-postcode" className="block text-xs font-bold uppercase text-slate-500 mb-1">Postcode</label>
                      <input id="enquiry-postcode" required type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent text-base"
                        value={contactData.postcode} onChange={e => setContactData({ ...contactData, postcode: e.target.value })} placeholder="KT6 7QJ" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="enquiry-email" className="block text-xs font-bold uppercase text-slate-500 mb-1">Email</label>
                    <input id="enquiry-email" required type="email" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent text-base"
                      value={contactData.email} onChange={e => setContactData({ ...contactData, email: e.target.value })} placeholder="email@example.com" />
                  </div>
                  <div>
                    <label htmlFor="enquiry-type" className="block text-xs font-bold uppercase text-slate-500 mb-1">Type of Lesson</label>
                    <select id="enquiry-type" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent text-base"
                      value={contactData.transmission} onChange={e => setContactData({ ...contactData, transmission: e.target.value })}
                    >
                      <option value="Manual">Manual Lesson</option>
                      <option value="Automatic">Automatic Lesson</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="enquiry-message" className="block text-xs font-bold uppercase text-slate-500 mb-1">Message</label>
                    <textarea id="enquiry-message" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent h-24 text-base"
                      value={contactData.message} onChange={e => setContactData({ ...contactData, message: e.target.value })} placeholder="I'm interested in..." />
                  </div>
                  <button disabled={formStatus === 'submitting'} className="w-full bg-slate-900 text-white py-4 rounded-lg font-bold hover:bg-slate-800 transition-all disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-slate-500 active:scale-95">
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Enquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="bg-brand-accent py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Start Driving Today</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/booking" className="bg-slate-900 text-white px-8 py-4 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-lg focus:outline-none focus:ring-4 focus:ring-slate-900/50 active:scale-95">
              Book a Lesson
            </Link>
            <a href={`tel:${settings.phone}`} className="bg-white/20 border border-slate-900/10 text-slate-900 px-8 py-4 rounded-lg font-bold hover:bg-white/30 transition-all focus:outline-none focus:ring-4 focus:ring-white/50 active:scale-95">
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Page Components ---

const PrivacyPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[2.5rem] shadow-xl border border-slate-100">
        <div className="flex items-center gap-4 mb-12">
          <ShieldCheck className="text-brand-accent" size={40} />
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 space-y-10 leading-relaxed">
          <p className="text-lg font-medium bg-slate-50 p-6 rounded-2xl border-l-4 border-brand-accent">
            At Tolworth Driving School, we are committed to protecting your personal data and complying with the General Data Protection Regulation (GDPR). This policy explains how we collect, use, and safeguard your information.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm">01</div>
              Information We Collect
            </h2>
            <p>We collect and process the following personally identifiable information (PII) to provide our services:</p>
            <ul className="grid md:grid-cols-2 gap-3 mt-4 list-none pl-0">
              <li className="bg-slate-50 p-3 rounded-lg flex items-center gap-2 font-medium">✨ Full Name & Address</li>
              <li className="bg-slate-50 p-3 rounded-lg flex items-center gap-2 font-medium">✨ Phone & Email Address</li>
              <li className="bg-slate-50 p-3 rounded-lg flex items-center gap-2 font-medium">✨ Driving Licence Number</li>
              <li className="bg-slate-50 p-3 rounded-lg flex items-center gap-2 font-medium">✨ Eye Sight Confirmation</li>
              <li className="bg-slate-50 p-3 rounded-lg flex items-center gap-2 font-medium">✨ Pickup & Drop-off Details</li>
              <li className="bg-slate-50 p-3 rounded-lg flex items-center gap-2 font-medium">✨ Theory & Practical Test Info</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm">02</div>
              How We Use Your Data
            </h2>
            <p>Your data is used solely for the following purposes:</p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle className="text-green-500 shrink-0" size={20} />
                <span>To schedule and manage your driving lessons and progress tracking.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="text-green-500 shrink-0" size={20} />
                <span>To coordinate practical tests with the DVSA on your behalf.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="text-green-500 shrink-0" size={20} />
                <span>To communicate important updates regarding schedule changes or road safety.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="text-green-500 shrink-0" size={20} />
                <span>To maintain financial records as required by UK law (HMRC).</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm">03</div>
              Data Storage & Security
            </h2>
            <p>
              Confidential information is stored securely on password-protected digital devices and encrypted cloud storage.
              We do not leave personal information in vehicles overnight.
            </p>
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-amber-800 text-sm italic">
              Note: We retain accounting records for a minimum of 7 years to comply with statutory legal obligations.
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm">04</div>
              Your Rights (GDPR)
            </h2>
            <p>Under GDPR, you have the following rights:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-bold text-xs uppercase tracking-wider">Access to Data</div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-bold text-xs uppercase tracking-wider">Rectification</div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-bold text-xs uppercase tracking-wider">Right to Erasure</div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-bold text-xs uppercase tracking-wider">Restriction</div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-bold text-xs uppercase tracking-wider">Data Portability</div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-bold text-xs uppercase tracking-wider">Right to Object</div>
            </div>
          </section>

          <div className="pt-10 border-t border-slate-100 flex flex-col items-center">
            <p className="text-sm text-slate-400 mb-6">Last updated: February 2026. For enquiries, contact info@tolworthdriving.co.uk</p>
            <Link to="/" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform active:scale-95">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const highwayCode = [
    { rule: "Rule 1", title: "Hierarchy of Road Users", content: "Pedestrians are the most vulnerable, followed by cyclists, horse riders, and motorcyclists. Drivers have the greatest responsibility to reduce danger to others." },
    { rule: "Rule 124", title: "Speed Limits", content: "The speed limit is the absolute maximum and does not mean it is safe to drive at that speed in all conditions." },
    { rule: "Rule 170", title: "Junctions", content: "Watch out for pedestrians crossing a road into which you are turning. If they have started to cross, they have priority." },
    { rule: "Rule 195", title: "Zebra Crossings", content: "As you approach a zebra crossing, look out for people waiting to cross and be ready to slow down or stop." },
    { rule: "Rule 112", title: "The Horn", content: "The horn should only be used while your vehicle is moving and you need to warn other road users of your presence." }
  ];

  const filteredRules = highwayCode.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Logo className="absolute -top-10 -right-10 w-64 h-64 grayscale invert" />
          <Logo className="absolute -bottom-10 -left-10 w-64 h-64 grayscale invert opacity-50" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-accent/20 border border-brand-accent/30 text-brand-accent px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <GraduationCap size={16} /> Learner Success Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Everything You Need To <span className="text-brand-accent">Pass</span></h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            From your first lesson to the final test day, we've compiled the ultimate resource guide to help you get your full UK license faster.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid lg:grid-cols-12 gap-12">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 hidden lg:block sticky top-24 h-fit">
          <nav className="space-y-1">
            <a href="#license-steps" className="block px-4 py-3 rounded-xl hover:bg-white hover:shadow-sm font-bold text-slate-600 hover:text-slate-900 transition-all border border-transparent hover:border-slate-100 uppercase tracking-wider text-xs">01. UK License Roadmap</a>
            <a href="#ready-to-pass" className="block px-4 py-3 rounded-xl hover:bg-white hover:shadow-sm font-bold text-slate-600 hover:text-slate-900 transition-all border border-transparent hover:border-slate-100 uppercase tracking-wider text-xs">02. Ready To Pass Scheme</a>
            <a href="#show-me-tell-me" className="block px-4 py-3 rounded-xl hover:bg-white hover:shadow-sm font-bold text-slate-600 hover:text-slate-900 transition-all border border-transparent hover:border-slate-100 uppercase tracking-wider text-xs">03. Show Me, Tell Me</a>
            <a href="#test-tips" className="block px-4 py-3 rounded-xl hover:bg-white hover:shadow-sm font-bold text-slate-600 hover:text-slate-900 transition-all border border-transparent hover:border-slate-100 uppercase tracking-wider text-xs">04. Tolworth Test Tips</a>
            <a href="#highway-code" className="block px-4 py-3 rounded-xl hover:bg-white hover:shadow-sm font-bold text-slate-600 hover:text-slate-900 transition-all border border-transparent hover:border-slate-100 uppercase tracking-wider text-xs">05. Highway Code Search</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9 space-y-24">

          {/* Section 1: UK License Steps */}
          <section id="license-steps" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-10 overflow-hidden">
              <h2 className="text-2xl font-black text-slate-900 shrink-0 uppercase tracking-tight">The 5 Steps To Your <span className="text-blue-600 italic">License</span></h2>
              <div className="h-px bg-slate-200 w-full"></div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Eligibility", text: "Must be 15y 9m old, meet eyesight rules (read plate from 20m), and live in UK." },
                { step: "02", title: "Provisional Letter", text: "Apply via DVLA (£34). You'll need ID and address history for the last 3 years." },
                { step: "03", title: "Professional Lessons", text: "Start your journey. Most learners need 40-50 hours of structured tuition." },
                { step: "04", title: "Theory Test", text: "Pass the multiple-choice & Hazard Perception test. It's valid for 2 years." },
                { step: "05", title: "Practical Test", text: "The final hurdle. Pass with fewer than 15 minors and zero serious faults." }
              ].map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-4xl font-black text-slate-100 block mb-2">{s.step}</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 underline decoration-blue-200 decoration-4 underline-offset-4">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Ready to Pass */}
          <section id="ready-to-pass" className="scroll-mt-24 bg-blue-900 rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10">
              <div className="inline-block bg-white/10 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Official DVSA Guidelines</div>
              <h2 className="text-3xl md:text-4xl font-black mb-8">The "Ready To Pass" Checklist</h2>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  {[
                    { title: "No Prompts Needed", desc: "You can drive for at least 40 minutes without your instructor needing to give you any instructions or reminders." },
                    { title: "Serious Fault Free", desc: "You are no longer making serious or dangerous mistakes (even 'silly' ones) during your lessons." },
                    { title: "Mock Test Success", desc: "You have passed at least 2 consecutive mock tests under full test conditions on local Tolworth routes." },
                    { title: "Managing Nerves", desc: "You have practiced ways to stay calm and focused, ensuring nerves don't compromise your safety on the road." },
                    { title: "Instructor Confirmation", desc: "Your instructor, a road safety expert, agrees that you meet the standard required to pass first time." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="w-8 h-8 bg-brand-accent text-slate-900 rounded-full flex items-center justify-center shrink-0 mt-1 font-black text-xs">{i + 1}</div>
                      <div>
                        <p className="font-bold text-lg leading-none mb-2">{item.title}</p>
                        <p className="text-slate-300 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 self-start">
                  <h3 className="text-brand-accent font-black text-sm uppercase tracking-widest mb-4">Did You Know?</h3>
                  <p className="text-slate-300 m-0 leading-relaxed italic">
                    Taking the driving test before you’re ready can lead to frustration, extra costs, and a knock to your confidence.
                    Wait until you’re consistently safe to ensure a first-time pass!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Show Me Tell Me */}
          <section id="show-me-tell-me" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-10 overflow-hidden">
              <h2 className="text-2xl font-black text-slate-900 shrink-0 uppercase tracking-tight">Show Me, <span className="text-brand-accent italic">Tell Me</span> Questions</h2>
              <div className="h-px bg-slate-200 w-full"></div>
            </div>

            <div className="space-y-12">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <Info className="text-brand-accent" size={28} /> "Tell Me" Safety Checks
                </h3>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                  {[
                    { q: "How do you check the brakes work?", a: "Test them as you set off. They shouldn't feel spongy/slack, and the car shouldn't pull." },
                    { q: "Where's the recommended tyre pressure?", a: "Check the manufacturer's guide. Use a reliable gauge when tyres are cold." },
                    { q: "How do you check the head restraint?", a: "The rigid part should be at least as high as the eyes or top of ears." },
                    { q: "How do you check the tyre tread/condition?", a: "1.6mm tread depth across the central 3/4. No cuts or bulges on the side." },
                    { q: "How do you check headlights & tail lights?", a: "Operate the switch (ignition on), then walk around the vehicle to check." },
                    { q: "How would you know if there's an ABS problem?", a: "The ABS warning light will stay illuminated on the dashboard." },
                    { q: "How do you check direction indicators?", a: "Operate the hazard warning switch and walk around the vehicle." },
                    { q: "How do you check the brake lights work?", a: "Operate the brake pedal, use reflections in windows/doors or ask someone." },
                    { q: "How do you check power steering works?", a: "Apply gentle pressure to the wheel; it should be light/easy as the engine starts." },
                    { q: "How do you switch on rear fog lights?", a: "Operate switch (dipped beams on). Use when visibility is < 100m." },
                    { q: "How do you switch to main beam?", a: "Operate the switch and check the main beam warning light is on." },
                    { q: "How do you check the engine oil level?", a: "Locate dipstick, clean it, re-insert and check against min/max markers." },
                    { q: "How do you check engine coolant level?", a: "Identify high/low level markings on the header tank/radiator filler cap." },
                    { q: "How do you check hydraulic brake fluid?", a: "Identify the reservoir and check the level against high/low markings." }
                  ].map((item, i) => (
                    <div key={i} className="group border-b border-slate-50 pb-6 last:border-0 hover:border-brand-accent transition-colors">
                      <p className="font-bold text-slate-900 mb-2 flex gap-3">
                        <span className="text-brand-accent font-black">Q{i + 1}:</span> {item.q}
                      </p>
                      <p className="text-slate-600 text-sm pl-8 italic border-l-2 border-slate-100 group-hover:border-brand-accent transition-colors">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-brand-accent relative z-10">
                  <Zap size={28} /> "Show Me" Demonstrations
                </h3>
                <p className="text-slate-400 text-sm mb-10 italic relative z-10">The examiner will ask you to demonstrate one of these while driving, only when it's safe.</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                  {[
                    "Wash and wipe the front windscreen",
                    "Wash and wipe the rear windscreen",
                    "Switch on your dipped headlights",
                    "Set the rear window demister",
                    "Operate the horn",
                    "Demist the front windscreen",
                    "Open and close the side window"
                  ].map((q, i) => (
                    <div key={i} className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-2xl hover:border-brand-accent transition-all group cursor-default">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-6 h-6 bg-slate-700 text-slate-400 rounded-full flex items-center justify-center text-[10px] font-bold group-hover:bg-brand-accent group-hover:text-slate-900 transition-colors">{i + 1}</div>
                        <ChevronRight size={16} className="text-slate-600 group-hover:translate-x-1 group-hover:text-brand-accent transition-all" />
                      </div>
                      <span className="font-bold text-sm text-slate-100">{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Tolworth Test Tips */}
          <section id="test-tips" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-10 overflow-hidden">
              <h2 className="text-2xl font-black text-slate-900 shrink-0 uppercase tracking-tight">Tolworth <span className="text-rose-600 italic">Test Secrets</span></h2>
              <div className="h-px bg-slate-200 w-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-6">
                <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm group hover:border-rose-100 transition-all">
                  <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                    <MapPin className="text-rose-500" /> Tolworth Broadway
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Frequent pedestrians and multiple bus stops. Be extra vigilant with mirror checks and blind spots when overtaking halted buses.
                    <strong> Observation is key here!</strong>
                  </p>
                </div>
                <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm group hover:border-rose-100 transition-all">
                  <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                    <Navigation className="text-rose-500 rotate-45" /> A3 Slip Roads
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Merging with fast-moving traffic requires confidence and early signals. Don't hesitate, but ensure a safe gap is present.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm group hover:border-blue-100 transition-all">
                  <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                    <MapPin className="text-blue-500" /> Kingston Roundabouts
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Kingston features large multi-lane roundabouts. Practice lane discipline and early signaling.
                    <strong> Top Tip:</strong> Look for road markings early to avoid last-minute lane changes which can lead to serious faults.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm group hover:border-emerald-100 transition-all">
                  <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                    <MapPin className="text-emerald-500" /> Surbiton Station Area
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Narrow roads and parked cars on both sides means <strong>meeting traffic</strong> is a common challenge.
                    Ensure you're checking ahead for gaps and giving plenty of room. Don't rush into tight spaces!
                  </p>
                </div>
                <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm group hover:border-amber-100 transition-all">
                  <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                    <MapPin className="text-amber-500" /> Worcester Park Central
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Busy high street with lots of junctions and potential distractions. Maintain a steady speed and keep a high level of <strong>environmental awareness</strong>.
                  </p>
                </div>
              </div>
              <div className="bg-rose-50 rounded-[2.5rem] p-8 md:p-12 self-start border border-rose-100 shadow-inner">
                <h3 className="text-rose-900 font-extrabold text-2xl mb-6">Fail-Proof Tips</h3>
                <ul className="space-y-4">
                  {[
                    "Exaggerate head movements for mirror checks",
                    "Stay 2 seconds behind the car in front",
                    "Keep it slow in residential 20mph zones",
                    "Breathe! Nerves are your only real enemy"
                  ].map((tip, i) => (
                    <li key={i} className="flex gap-4 text-rose-800 font-bold">
                      <CheckCircle className="shrink-0 mt-1" size={18} />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Highway Code Search */}
          <section id="highway-code" className="scroll-mt-24 bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Search The Highway Code</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Quickly find key rules for learners from official DVSA guidelines.</p>
            </div>

            <div className="relative max-w-2xl mx-auto mb-12">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search rules (e.g. speed, junction, zebra...)"
                className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-3xl outline-none focus:border-brand-accent transition-all text-lg shadow-inner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid gap-4">
              {filteredRules.length > 0 ? (
                filteredRules.map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent bg-slate-900 px-2 py-0.5 rounded leading-none">{item.rule}</span>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed m-0">{item.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <HelpCircle className="mx-auto mb-2 opacity-50" />
                  <p className="font-medium">No matching rules found. Try searching for "speed" or "junction".</p>
                </div>
              )}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

const TermsPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[2.5rem] shadow-xl border border-slate-100">
        <div className="flex items-center gap-4 mb-12">
          <FileText className="text-brand-accent" size={40} />
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Terms & Conditions</h1>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 space-y-10 leading-relaxed">
          <p className="text-lg font-medium bg-slate-50 p-6 rounded-2xl border-l-4 border-brand-accent">
            By booking a lesson with Tolworth Driving School, you agree to the following terms and conditions. These terms ensure a safe and productive learning environment for all students and instructors.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm">01</div>
              Licence & Fitness to Drive
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle className="text-brand-accent shrink-0" size={20} />
                <span>You must hold a valid UK provisional or full driving licence and present it on your first lesson.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="text-brand-accent shrink-0" size={20} />
                <span>You must be medically fit to drive and meet the minimum eyesight requirements (read a number plate from 20m).</span>
              </li>
              <li className="flex gap-3">
                <div className="shrink-0 w-5 h-5 flex items-center justify-center bg-red-100 text-red-600 rounded-full font-black text-[10px]">!</div>
                <span className="font-bold text-slate-900 underline decoration-red-200">Zero Tolerance:</span>
                <span> You must not be under the influence of alcohol, drugs, or medication that impairs driving abilities.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm">02</div>
              Cancellations & Payments
            </h2>
            <div className="bg-red-50 border border-red-100 p-6 rounded-2xl mb-6">
              <h4 className="flex items-center gap-2 text-red-800 font-black uppercase tracking-widest text-xs mb-3">
                <Clock size={16} /> 48-Hour Policy
              </h4>
              <p className="text-red-900 font-medium m-0">A minimum of 48 hours' notice is required to cancel or reschedule a lesson. Failure to provide this will result in the full lesson fee being charged.</p>
            </div>
            <ul className="space-y-4">
              <li>Payments for individual lessons must be made at least 48 hours in advance via bank transfer or during the previous lesson.</li>
              <li>Block bookings and intensive courses are non-refundable after the first 2 hours of training have been completed.</li>
              <li>Block bookings must be consumed within 6 months of the date of purchase.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm">03</div>
              The Practical Test
            </h2>
            <p>
              Your instructor reserves the right to withhold the use of the driving school car for a practical test if they believe your driving standard is not yet safe or test-ready.
            </p>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-blue-800 text-sm font-medium">
              We recommend booking a mock test at least 4 weeks before your real exam to ensure you are fully prepared.
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm">04</div>
              Dashcam & Privacy
            </h2>
            <p>
              For safety and training purposes, vehicles are equipped with inward and outward-facing dashcams. These recordings are for internal training or insurance evidence and are deleted regularly in accordance with our Privacy Policy.
            </p>
          </section>

          <div className="pt-10 border-t border-slate-100 flex flex-col items-center">
            <p className="text-sm text-slate-400 mb-6 font-medium">Agreement: Booking constitutes acceptance of these terms.</p>
            <Link to="/" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform active:scale-95">Accept & Go Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingPage = () => {
  const { services, addBooking } = useData();
  const searchParams = new URLSearchParams(useLocation().search);
  const preSelectedService = searchParams.get('service') || (services[0]?.id || '');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceId: preSelectedService,
    date: '',
    postcode: '',
    transmission: 'Manual', // Default transmission
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedService = services.find(s => s.id === formData.serviceId);

    try {
      const response = await fetch("https://formspree.io/f/xojjjabe", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          serviceName: selectedService?.title,
          price: selectedService?.price,
          _subject: `New Booking: ${formData.name} - ${selectedService?.title}`
        })
      });

      if (response.ok) {
        const newBooking: any = {
          id: Date.now().toString(),
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone,
          serviceId: formData.serviceId,
          date: formData.date,
          postcode: formData.postcode,
          transmission: formData.transmission,
          status: BookingStatus.PENDING,
          notes: formData.notes,
          createdAt: new Date().toISOString()
        };
        addBooking(newBooking);
        setSubmitted(true);
      } else {
        alert('There was a problem submitting your booking. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('There was a network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center" role="alert">
          <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Booking Received!</h2>
          <p className="text-slate-600 mb-8">Thank you, {formData.name}. We have received your request. We will contact you shortly to confirm your slot.</p>
          <Link to="/" className="text-brand-accent font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-brand-accent rounded">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-slate-900 p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Book Your Lesson</h1>
            <p className="text-slate-400">Secure your slot in less than 2 minutes.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="booking-name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input id="booking-name" required type="text" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none text-base"
                  value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="booking-phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input id="booking-phone" required type="tel" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none text-base"
                  value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="07700 900000" />
              </div>
            </div>

            <div>
              <label htmlFor="booking-email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input id="booking-email" required type="email" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none text-base"
                value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="booking-package" className="block text-sm font-medium text-slate-700 mb-1">Select Package</label>
                <select id="booking-package" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none bg-white text-base"
                  value={formData.serviceId} onChange={e => setFormData({ ...formData, serviceId: e.target.value })}>
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.title} - from £{s.price} ({s.duration})</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="booking-transmission" className="block text-sm font-medium text-slate-700 mb-1">Type of Lesson</label>
                <select id="booking-transmission" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none bg-white text-base"
                  value={formData.transmission} onChange={e => setFormData({ ...formData, transmission: e.target.value })}>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="booking-date" className="block text-sm font-medium text-slate-700 mb-1">Preferred Date</label>
                <input id="booking-date" required type="date" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none text-base"
                  value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
              </div>
              <div>
                <label htmlFor="booking-postcode" className="block text-sm font-medium text-slate-700 mb-1">Postcode</label>
                <input id="booking-postcode" required type="text" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none text-base"
                  value={formData.postcode} onChange={e => setFormData({ ...formData, postcode: e.target.value })} placeholder="KT6 7QJ" />
              </div>
            </div>

            <div>
              <label htmlFor="booking-notes" className="block text-sm font-medium text-slate-700 mb-1">Notes (Optional)</label>
              <textarea id="booking-notes" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none h-24 text-base"
                value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} placeholder="Any specific requirements..." />
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full bg-brand-accent text-slate-900 font-bold py-4 rounded-lg hover:bg-yellow-300 transition-all shadow-md mt-4 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-slate-500 active:scale-95">
              {isSubmitting ? 'Sending Request...' : 'Submit Booking Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Admin Section ---

const AdminLogin = () => {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);
  const { login, isAuthenticated } = useData();

  if (isAuthenticated) return <Navigate to="/admin/dashboard" />;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Admin Access</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (!login(pass)) setError(true);
        }}>
          <div className="mb-4">
            <label htmlFor="admin-password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input id="admin-password" type="password" value={pass} onChange={e => setPass(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent text-base" />
          </div>
          {error && <p className="text-red-500 text-sm mb-4" role="alert">Incorrect password.</p>}
          <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold focus:outline-none focus:ring-4 focus:ring-slate-500 active:scale-95">Login</button>
          <p className="text-center text-xs text-slate-400 mt-4">Demo Hint: admin123</p>
        </form>
      </div>
    </div>
  );
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useData();
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'services', label: 'Services', icon: FileText },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col flex-shrink-0">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="text-brand-accent" aria-hidden="true" /> Admin
          </h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent ${activeTab === item.id ? 'bg-brand-accent text-slate-900 font-bold' : 'hover:bg-slate-800'}`}
            >
              <item.icon size={20} aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 w-full focus:outline-none focus:ring-2 focus:ring-red-400 rounded">
            <LogOut size={20} aria-hidden="true" /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header / Nav for Admin */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between">
        <span className="font-bold">Admin Panel</span>
        <button onClick={logout}><LogOut size={20} /></button>
      </div>
      <div className="md:hidden bg-white border-b overflow-x-auto">
        <div className="flex p-2 space-x-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap ${activeTab === item.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              <item.icon size={16} /> {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-4 md:p-8">
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'bookings' && <AdminBookings />}
        {activeTab === 'services' && <AdminServices />}
        {activeTab === 'reviews' && <AdminReviews />}
        {activeTab === 'settings' && <AdminSettings />}
      </main>
    </div>
  );
};

const AdminDashboard = () => {
  const { bookings, services } = useData();

  // Stats
  const totalRevenue = bookings.reduce((acc, b) => {
    const s = services.find(s => s.id === b.serviceId);
    return acc + (s ? s.price : 0);
  }, 0);

  const pendingBookings = bookings.filter(b => b.status === BookingStatus.PENDING).length;

  const chartData = [
    { name: 'Mon', bookings: 4 },
    { name: 'Tue', bookings: 3 },
    { name: 'Wed', bookings: 6 },
    { name: 'Thu', bookings: 8 },
    { name: 'Fri', bookings: 5 },
    { name: 'Sat', bookings: 9 },
    { name: 'Sun', bookings: 2 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="text-sm text-slate-500 uppercase font-bold tracking-wider">Total Revenue</div>
          <div className="text-3xl font-bold text-slate-900 mt-2">£{totalRevenue}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="text-sm text-slate-500 uppercase font-bold tracking-wider">Pending Requests</div>
          <div className="text-3xl font-bold text-brand-accent mt-2">{pendingBookings}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="text-sm text-slate-500 uppercase font-bold tracking-wider">Active Services</div>
          <div className="text-3xl font-bold text-slate-900 mt-2">{services.length}</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <h3 className="font-bold text-lg mb-4">Weekly Booking Activity</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#1e293b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const AdminBookings = () => {
  const { bookings, services, updateBookingStatus, deleteBooking } = useData();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Booking Management</h1>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 min-w-[600px]">
            <thead className="bg-slate-50 text-slate-900 font-bold uppercase text-xs">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Service</th>
                <th className="p-4">Date/Postcode</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map(booking => {
                const service = services.find(s => s.id === booking.serviceId);
                return (
                  <tr key={booking.id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{booking.customerName}</div>
                      <div className="text-xs">{booking.email}</div>
                      <div className="text-xs">{booking.phone}</div>
                      <div className="text-xs font-bold text-brand-primary">{booking.transmission}</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded text-xs font-bold whitespace-nowrap">
                        {service?.title || 'Unknown'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="whitespace-nowrap">{booking.date}</div>
                      <div className="text-xs uppercase">{booking.postcode}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${booking.status === BookingStatus.CONFIRMED ? 'bg-green-100 text-green-700' :
                        booking.status === BookingStatus.PENDING ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {booking.status === BookingStatus.PENDING && (
                          <button onClick={() => updateBookingStatus(booking.id, BookingStatus.CONFIRMED)} className="text-green-600 hover:text-green-800 text-xs font-bold border border-green-200 px-2 py-1 rounded">
                            Approve
                          </button>
                        )}
                        <button onClick={() => deleteBooking(booking.id)} aria-label="Delete booking" className="text-red-600 hover:text-red-800 text-xs font-bold border border-red-200 px-2 py-1 rounded">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {bookings.length === 0 && <div className="p-8 text-center text-slate-400">No bookings yet.</div>}
        </div>
      </div>
    </div>
  );
};

const AdminServices = () => {
  const { services, updateService } = useData();
  const [localServices, setLocalServices] = useState<Service[]>(services);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Sync with global state if it changes externally or on mount
    setLocalServices(services);
  }, [services]);

  const handleUpdate = (updatedService: Service) => {
    setLocalServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
    setHasChanges(true);
  };

  const handleSave = () => {
    localServices.forEach(s => updateService(s));
    setHasChanges(false);
    alert("Pricing and Services updated on the live website!");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Services & Pricing</h1>
        {hasChanges && (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-bold hover:bg-green-600 transition-all shadow-md animate-bounce active:scale-95"
          >
            <Save size={20} /> <span className="hidden md:inline">Save Changes</span><span className="md:hidden">Save</span>
          </button>
        )}
      </div>

      <div className="grid gap-6">
        {localServices.map(service => (
          <div key={service.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row justify-between items-start mb-1 gap-2 md:gap-0">
                <input
                  aria-label={`Title for ${service.title}`}
                  value={service.title}
                  onChange={(e) => handleUpdate({ ...service, title: e.target.value })}
                  className="font-bold text-lg text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-brand-accent outline-none w-full"
                />
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded md:ml-2 uppercase font-bold shrink-0">{service.category}</span>
              </div>
              <input
                aria-label={`Description for ${service.title}`}
                value={service.description}
                onChange={(e) => handleUpdate({ ...service, description: e.target.value })}
                className="text-sm text-slate-500 w-full mt-1 border-b border-transparent hover:border-slate-300 focus:border-brand-accent outline-none"
              />
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto mt-2 md:mt-0">
              <div className="flex items-center gap-2 w-full md:w-auto bg-slate-50 p-2 rounded md:bg-transparent md:p-0">
                <span className="text-slate-400 text-sm">£</span>
                <input
                  aria-label={`Price for ${service.title}`}
                  type="number"
                  value={service.price}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleUpdate({ ...service, price: val === '' ? 0 : parseInt(val) });
                  }}
                  className="w-full md:w-20 font-bold text-slate-900 border border-slate-200 rounded p-1 bg-white"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-slate-500 bg-blue-50 p-3 rounded border border-blue-100">
        Tip: Make your changes and press the <strong>Save Changes</strong> button to publish them to the live site.
      </p>
    </div>
  );
};

const AdminReviews = () => {
  const { testimonials, addTestimonial, deleteTestimonial, updateTestimonial } = useData();
  const [newReview, setNewReview] = useState({ name: '', content: '', rating: 5 });

  const handleAdd = () => {
    if (!newReview.name || !newReview.content) return;
    addTestimonial({
      id: Date.now().toString(),
      ...newReview,
      date: new Date().toISOString(),
      approved: true
    });
    setNewReview({ name: '', content: '', rating: 5 });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Reviews & Testimonials</h1>

      {/* Add New */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
        <h3 className="font-bold text-lg text-slate-900 mb-4">Add Manual Review</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            aria-label="Student Name"
            placeholder="Student Name"
            className="p-3 border border-slate-200 rounded-lg text-base"
            value={newReview.name}
            onChange={e => setNewReview({ ...newReview, name: e.target.value })}
          />
          <select
            aria-label="Rating"
            className="p-3 border border-slate-200 rounded-lg text-base"
            value={newReview.rating}
            onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}
          >
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
          </select>
        </div>
        <textarea
          aria-label="Review Content"
          placeholder="Review content..."
          className="w-full p-3 border border-slate-200 rounded-lg h-24 mb-4 text-base"
          value={newReview.content}
          onChange={e => setNewReview({ ...newReview, content: e.target.value })}
        />
        <button onClick={handleAdd} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800 active:scale-95">
          Add Review
        </button>
      </div>

      {/* List */}
      <div className="grid gap-4">
        {testimonials.map(t => (
          <div key={t.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-bold text-slate-900">{t.name}</span>
                <div className="flex text-yellow-400" aria-label={`${t.rating} Stars`}>
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" aria-hidden="true" />)}
                </div>
                <span className="text-xs text-slate-400">{new Date(t.date).toLocaleDateString()}</span>
              </div>
              <p className="text-slate-600 text-sm italic">"{t.content}"</p>
            </div>
            <div className="flex gap-2 self-end sm:self-start">
              <button
                onClick={() => updateTestimonial({ ...t, approved: !t.approved })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${t.approved ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
              >
                {t.approved ? 'Live' : 'Hidden'}
              </button>
              <button onClick={() => deleteTestimonial(t.id)} aria-label="Delete Review" className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                <Trash2 size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminSettings = () => {
  const { settings, updateSettings } = useData();
  const [bulkUrls, setBulkUrls] = useState('');

  const handleChange = (key: keyof typeof settings, value: string) => {
    updateSettings({ ...settings, [key]: value });
  };

  const handleImageChange = (key: keyof typeof settings.images, value: string) => {
    updateSettings({
      ...settings,
      images: {
        ...settings.images,
        [key]: value
      }
    });
  };

  const handleGalleryChange = (index: number, value: string) => {
    const newGallery = [...settings.gallery];
    newGallery[index] = value;
    updateSettings({ ...settings, gallery: newGallery });
  };

  const handleBulkAdd = () => {
    const urls = bulkUrls.split(/[\n,]+/).map(u => u.trim()).filter(u => u.length > 0);
    if (urls.length > 0) {
      updateSettings({ ...settings, gallery: [...settings.gallery, ...urls] });
      setBulkUrls('');
    }
  };

  return (
    <div className="max-w-4xl pb-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Global Settings</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* General Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
          <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Settings size={20} className="text-slate-400" aria-hidden="true" />
            Company Details
          </h3>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Website Name</label>
            <input type="text" value={settings.siteName} onChange={e => handleChange('siteName', e.target.value)}
              className="w-full p-2 border border-slate-200 rounded text-base" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Company Address</label>
            <input type="text" value={settings.address} onChange={e => handleChange('address', e.target.value)}
              className="w-full p-2 border border-slate-200 rounded text-base" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
              <input type="text" value={settings.phone} onChange={e => handleChange('phone', e.target.value)}
                className="w-full p-2 border border-slate-200 rounded text-base" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">WhatsApp (No +)</label>
              <input type="text" value={settings.whatsapp} onChange={e => handleChange('whatsapp', e.target.value)}
                className="w-full p-2 border border-slate-200 rounded text-base" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Google Reviews URL</label>
            <input type="text" value={settings.googleReviewsUrl} onChange={e => handleChange('googleReviewsUrl', e.target.value)}
              className="w-full p-2 border border-slate-200 rounded text-base" placeholder="https://g.page/..." />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Hero Headline</label>
            <input type="text" value={settings.heroHeadline} onChange={e => handleChange('heroHeadline', e.target.value)}
              className="w-full p-2 border border-slate-200 rounded text-base" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Hero Sub-headline</label>
            <textarea value={settings.heroSubheadline} onChange={e => handleChange('heroSubheadline', e.target.value)}
              className="w-full p-2 border border-slate-200 rounded h-24 text-base" />
          </div>
        </div>

        {/* Image Management */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
          <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <ImageIcon size={20} className="text-slate-400" aria-hidden="true" />
            Site Images (Live Preview)
          </h3>

          {[
            { key: 'heroBg', label: 'Hero Background' },
            { key: 'features', label: 'Features Section Image' },
            { key: 'areasBg', label: 'Areas Background Pattern' },
            { key: 'areasMap', label: 'Map Overlay Image' }
          ].map((item) => {
            const imgKey = item.key as keyof typeof settings.images;
            const url = settings.images[imgKey];
            const isImgBBViewer = url && url.includes('ibb.co') && !url.includes('i.ibb.co');

            return (
              <div key={imgKey} className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">{item.label}</label>

                {/* Preview */}
                <div className="aspect-video w-full bg-slate-100 rounded-lg overflow-hidden border border-slate-200 relative">
                  {url && !isImgBBViewer && (
                    <img
                      src={url}
                      alt={item.label}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {isImgBBViewer && (
                    <div className="flex flex-col items-center justify-center h-full bg-amber-50 text-amber-600 p-4 text-center">
                      <AlertTriangle className="mb-2" size={24} aria-hidden="true" />
                      <span className="text-xs font-bold">Invalid Image Link</span>
                    </div>
                  )}
                  {!url && (
                    <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                      No image URL set
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  value={url}
                  onChange={e => handleImageChange(imgKey, e.target.value)}
                  className={`w-full p-2 border rounded text-sm outline-none focus:ring-2 ${isImgBBViewer ? 'border-amber-300 ring-amber-200 bg-amber-50 text-amber-900' : 'border-slate-200 focus:ring-brand-accent text-slate-600'}`}
                  placeholder="Enter image URL..."
                />

                {/* Helper Warning */}
                {isImgBBViewer && (
                  <div className="text-xs text-amber-700 bg-amber-100 p-3 rounded-lg flex items-start gap-2" role="alert">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <strong>Warning: Viewer Link Detected.</strong><br />
                      You pasted a webpage link, not an image link.
                      <ul className="list-disc pl-4 mt-1 space-y-0.5">
                        <li>Go to your link: <a href={url} target="_blank" className="underline font-bold">Open Page</a></li>
                        <li>Right click the image and choose "Copy Image Address".</li>
                        <li>It should start with <strong>i.ibb.co</strong> and end in <strong>.jpg/.png</strong></li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Gallery Management */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2 mb-6">
          <ImageIcon size={20} className="text-slate-400" aria-hidden="true" />
          Gallery Images ({settings.gallery.length} Images)
        </h3>

        <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <label className="block text-sm font-bold text-slate-700 mb-2">Bulk Add Images</label>
          <textarea
            value={bulkUrls}
            onChange={e => setBulkUrls(e.target.value)}
            placeholder="Paste image URLs here (separated by new lines or commas)..."
            className="w-full p-3 border border-slate-300 rounded-lg text-sm h-24 mb-2 focus:ring-2 focus:ring-brand-accent outline-none"
          />
          <button onClick={handleBulkAdd} className="bg-slate-900 text-white px-4 py-2 rounded font-bold text-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 active:scale-95">
            + Add All Images
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {settings.gallery.map((url, i) => (
            <div key={i} className="space-y-2 relative group">
              <div className="aspect-video bg-slate-100 rounded overflow-hidden relative border border-slate-200">
                <img src={url} alt={`Gallery image ${i + 1}`} className="w-full h-full object-cover" />
                <span className="absolute top-1 left-1 bg-black/50 text-white text-[10px] px-1 rounded">#{i + 1}</span>
                <button
                  aria-label={`Remove image ${i + 1}`}
                  onClick={() => {
                    const newGallery = settings.gallery.filter((_, idx) => idx !== i);
                    updateSettings({ ...settings, gallery: newGallery });
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                >
                  <X size={12} aria-hidden="true" />
                </button>
              </div>
              <input
                aria-label={`URL for image ${i + 1}`}
                type="text"
                value={url}
                onChange={(e) => handleGalleryChange(i, e.target.value)}
                className="w-full p-2 text-xs border border-slate-200 rounded"
                placeholder="Image URL..."
              />
            </div>
          ))}
          {/* Empty slot for manual single add */}
          <div className="space-y-2">
            <div className="aspect-video bg-slate-50 rounded border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs">
              Add New Single
            </div>
            <input
              aria-label="Add new image URL"
              type="text"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const target = e.target as HTMLInputElement;
                  if (target.value) {
                    updateSettings({ ...settings, gallery: [...settings.gallery, target.value] });
                    target.value = '';
                  }
                }
              }}
              className="w-full p-2 text-xs border border-slate-200 rounded"
              placeholder="Paste URL & Press Enter..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- App Root & Router ---

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-white">
    <Header />
    <main className="flex-grow">{children}</main>
    <Footer />
    <WhatsAppFloat />
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useData();
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin" />;
};

const AppContent = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes - All Main Content is on Home (Single Page) */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />

        {/* Specific Functional Pages */}
        <Route path="/booking" element={<PublicLayout><BookingPage /></PublicLayout>} />

        {/* Legacy routes redirect to Home anchor (optional, but good for old links) */}
        <Route path="/services" element={<Navigate to="/#services" replace />} />
        <Route path="/areas" element={<Navigate to="/#areas" replace />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />

        {/* Legal & Educational Pages */}
        <Route path="/resources" element={<PublicLayout><ResourcesPage /></PublicLayout>} />
        <Route path="/privacy" element={<PublicLayout><PrivacyPage /></PublicLayout>} />
        <Route path="/terms" element={<PublicLayout><TermsPage /></PublicLayout>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <AdminLayout>
              {/* Content is handled by internal state in AdminLayout for this demo structure */}
              <div />
            </AdminLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

export default App;