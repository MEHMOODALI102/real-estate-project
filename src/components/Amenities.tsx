
import React from 'react';
import { Check, Wifi, Dumbbell, Ship, Utensils, Waves } from 'lucide-react';

const AmenityCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}> = ({ icon, title, description, index }) => (
  <div 
    className="group p-6 bg-white hover:bg-luxury-black border border-gray-100 hover:border-luxury-gold rounded-md shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="w-12 h-12 rounded-full bg-luxury-beige group-hover:bg-luxury-gold/20 flex items-center justify-center mb-4 transition-colors duration-300">
      <div className="text-luxury-gold transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
    </div>
    <h3 className="text-xl font-semibold mb-3 text-luxury-black group-hover:text-white transition-colors duration-300">
      {title}
    </h3>
    <p className="text-luxury-black/70 group-hover:text-white/70 transition-colors duration-300">
      {description}
    </p>
  </div>
);

const Amenities: React.FC = () => {
  const amenities = [
    {
      icon: <Waves size={24} />,
      title: 'Infinity Pool',
      description: 'Relax in our stunning infinity pool with panoramic views of the bay.'
    },
    {
      icon: <Dumbbell size={24} />,
      title: 'Fitness Center',
      description: 'State-of-the-art fitness center with the latest equipment and personal trainers.'
    },
    {
      icon: <Ship size={24} />,
      title: 'Private Marina',
      description: 'Exclusive access to private marina with boat slips for residents.'
    },
    {
      icon: <Utensils size={24} />,
      title: 'Fine Dining',
      description: 'On-site restaurant offering gourmet cuisine prepared by world-class chefs.'
    },
    {
      icon: <Wifi size={24} />,
      title: 'Smart Homes',
      description: 'Cutting-edge smart home technology integrated throughout each residence.'
    },
    {
      icon: <Check size={24} />,
      title: 'Concierge',
      description: '24/7 concierge service to attend to your every need and request.'
    }
  ];

  return (
    <section id="amenities" className="py-20 md:py-28 bg-luxury-beige/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-luxury-black">Exquisite</span>
            <span className="gold-gradient block mt-1">Amenities</span>
          </h2>
          <p className="text-luxury-black/80 leading-relaxed">
            Experience a lifestyle beyond compare with our exclusive selection of 
            world-class amenities designed to enhance every aspect of luxury living.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity, index) => (
            <AmenityCard
              key={index}
              icon={amenity.icon}
              title={amenity.title}
              description={amenity.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
