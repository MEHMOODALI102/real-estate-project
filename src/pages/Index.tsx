
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Overview from '@/components/Overview';
import Amenities from '@/components/Amenities';
import FloorPlans from '@/components/FloorPlans';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot/ChatBot';

const Index: React.FC = () => {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Optional: Add a preloader that disappears after the page loads
    const timer = setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.classList.add('opacity-0');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Preloader */}
      <div 
        id="preloader" 
        className="fixed inset-0 bg-luxury-black z-50 flex items-center justify-center transition-opacity duration-500"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold gold-gradient mb-4">Estate</h1>
          <div className="w-16 h-1 bg-gradient-luxury mx-auto"></div>
        </div>
      </div>
      
      <Navbar />
      <Hero />
      <Overview />
      <Amenities />
      <FloorPlans />
      <Gallery />
      <Contact />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
