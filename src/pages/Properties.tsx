
import React from 'react';
import Navbar from '@/components/Navbar';
import PropertyList from '@/components/PropertyList';
import Footer from '@/components/Footer';

const Properties: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-12">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-luxury-black">Exclusive</span>
            <span className="gold-gradient block mt-1">Properties</span>
          </h1>
          <p className="text-luxury-black/80 leading-relaxed mb-8">
            Discover our handpicked collection of luxury properties in prime locations across Delhi NCR
          </p>
        </div>
        <PropertyList />
      </div>
      <Footer />
    </div>
  );
};

export default Properties;
