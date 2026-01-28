
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  ShieldCheck, 
  BookOpen, 
  Phone, 
  Menu, 
  X,
  Sprout
} from 'lucide-react';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import FeaturesPage from './pages/FeaturesPage';
import GuidelinesPage from './pages/GuidelinesPage';
import ContactPage from './pages/ContactPage';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Features', path: '/features', icon: ShieldCheck },
    { name: 'Guidelines', path: '/guidelines', icon: BookOpen },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <nav className="bg-[#2d5a27] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Sprout className="w-8 h-8 text-[#a3b18a]" />
              <span className="font-bold text-xl tracking-tight">AgriBioSecure</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path ? 'bg-[#1b3a1a]' : 'hover:bg-[#3a6b33]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#3a6b33] focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1b3a1a] animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path ? 'bg-[#2d5a27]' : 'hover:bg-[#2d5a27]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-[#1b3a1a] text-[#a3b18a] py-8 mt-auto border-t border-[#2d5a27]">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Sprout className="w-6 h-6" />
        <span className="font-bold text-white">AgriBioSecure Portal</span>
      </div>
      <p className="text-sm max-w-md mx-auto mb-4">
        Promoting sustainable agriculture through advanced biosecurity measures and AI-driven monitoring.
      </p>
      <div className="text-xs opacity-75">
        &copy; {new Date().getFullYear()} AgriBioSecure. Final Year Project Demo.
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-[#fdfcfb]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/guidelines" element={<GuidelinesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
