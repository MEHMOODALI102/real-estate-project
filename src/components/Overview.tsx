
import React from 'react';
import { cn } from '@/lib/utils';

const Overview: React.FC = () => {
  return (
    <section id="overview" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-luxury-black">The Epitome of</span>
              <span className="gold-gradient block mt-1">Luxury Living</span>
            </h2>
            <p className="text-luxury-black/80 mb-6 leading-relaxed">
              Cavalli Bay Residences represents the pinnacle of waterfront luxury living. Combining 
              innovative architecture with timeless design, these exclusive residences offer an 
              unparalleled lifestyle experience.
            </p>
            <p className="text-luxury-black/80 mb-8 leading-relaxed">
              Each residence is meticulously crafted with premium finishes and state-of-the-art amenities, 
              offering breathtaking views of the bay and surrounding landscape. Every detail has been 
              considered to create a living experience that is both elegant and comfortable.
            </p>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { number: '45+', label: 'Luxury Units' },
                { number: '5★', label: 'Amenities' },
                { number: '100%', label: 'Exclusive' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold gold-gradient">{stat.number}</p>
                  <p className="text-sm text-luxury-black/70 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            
            <a 
              href="#amenities" 
              className="inline-block px-8 py-3 bg-gradient-luxury text-luxury-black font-medium rounded-sm hover:shadow-lg transition-all duration-300"
            >
              Explore Amenities
            </a>
          </div>
          
          <div className="relative order-1 md:order-2">
            <div className="relative aspect-[3/4] rounded-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80" 
                alt="Luxury Residence" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-2/3 aspect-[4/3] rounded-md overflow-hidden border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80" 
                alt="Interior Design" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
