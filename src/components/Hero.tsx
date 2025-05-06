
import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-luxury-black/50 z-10"></div>
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80"
        >
          <source
            src="https://player.vimeo.com/external/517090081.sd.mp4?s=c3775ad8d3a96c99db60599335f0e4be351dfbfd&profile_id=164&oauth2_token_id=57447761"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="relative h-full z-20 flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center leading-tight mb-6 animate-fade-in">
          <span className="block">Experience Luxury Living</span>
          <span className="block mt-2 gold-gradient">by Estate</span>
        </h1>
        <p className="text-lg md:text-xl text-center max-w-2xl mb-8 text-white/80 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          An exclusive collection of premium residences in South Delhi designed to offer an unparalleled lifestyle experience
        </p>
        <div className="flex flex-col md:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <a
            href="#overview"
            className="px-8 py-3 bg-luxury-gold text-luxury-black font-medium rounded-sm hover:bg-luxury-lightGold transition-colors duration-300"
          >
            Discover More
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-white hover:border-luxury-gold text-white hover:text-luxury-gold transition-colors duration-300 rounded-sm"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#overview"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center animate-bounce"
      >
        <span className="text-white text-sm mb-2">Scroll Down</span>
        <ChevronDown className="text-luxury-gold" size={24} />
      </a>
    </section>
  );
};

export default Hero;
