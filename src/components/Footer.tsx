
import React from 'react';
import { Instagram, Facebook, Twitter, Linkedin, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-luxury-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold gold-gradient mb-4">Estate</h2>
            <p className="text-white/70 mb-6">
              Experience luxury living at its finest with Estate's exclusive collection of residences in the heart of India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-black transition-colors duration-300">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-black transition-colors duration-300">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-black transition-colors duration-300">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-black transition-colors duration-300">
                <Linkedin size={16} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Properties', 'Floor Plans', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-white/70 hover:text-luxury-gold transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-white/70">
                123 Luxury Avenue, South Delhi, New Delhi, 110021
              </li>
              <li>
                <a href="tel:+919876543210" className="text-white/70 hover:text-luxury-gold transition-colors duration-300">
                  +91 9876 543 210
                </a>
              </li>
              <li>
                <a href="mailto:info@estate.in" className="text-white/70 hover:text-luxury-gold transition-colors duration-300">
                  info@estate.in
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-white/70 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-sm placeholder-white/40 text-white focus:outline-none focus:border-luxury-gold"
              />
              <button
                type="submit"
                className="w-full py-2 bg-luxury-gold text-luxury-black font-medium rounded-sm hover:bg-luxury-lightGold transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <hr className="border-white/10 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Estate Residences. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/60 text-sm hover:text-luxury-gold transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 text-sm hover:text-luxury-gold transition-colors duration-300">
              Terms of Service
            </a>
          </div>
          <button 
            onClick={scrollToTop}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-luxury-gold/20 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-colors duration-300 mt-4 md:mt-0"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
      
      {/* Mobile scroll to top */}
      <div className="md:hidden fixed bottom-6 right-6 z-10">
        <button 
          onClick={scrollToTop}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-luxury-gold text-luxury-black shadow-lg hover:bg-luxury-lightGold transition-colors duration-300"
        >
          <ArrowUp size={24} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
