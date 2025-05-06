import React, { useState } from 'react';
import { Square, Maximize2, Bed, Bath, MapPin, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type FloorPlan = {
  id: number;
  name: string;
  type: string;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  price: string;
  description?: string;
  features?: string[];
};

const floorPlans: FloorPlan[] = [
  {
    id: 1,
    name: 'The Ashoka',
    type: 'Apartment',
    sqft: 1250,
    bedrooms: 2,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    price: '₹1,20,00,000',
    description: 'Luxurious 2-bedroom apartment with premium finishes, spacious living areas, and panoramic city views. Features include a gourmet kitchen, marble bathrooms, and private balcony.',
    features: ['Modern Kitchen', 'Balcony', 'Walk-in Closet', 'Central Air Conditioning', 'High Ceilings', 'Marble Countertops']
  },
  {
    id: 2,
    name: 'The Rajputana',
    type: 'Penthouse',
    sqft: 2100,
    bedrooms: 3,
    bathrooms: 3.5,
    image: 'https://images.unsplash.com/photo-1580229080435-1c7e2ce835c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    price: '₹2,80,00,000',
    description: 'Opulent 3-bedroom penthouse offering unparalleled luxury with 360-degree views of the city. Includes private terrace, double-height ceilings, and exclusive elevator access.',
    features: ['Private Terrace', 'Double-Height Ceilings', 'Private Elevator', 'Smart Home System', 'Home Theatre', 'Jacuzzi']
  },
  {
    id: 3,
    name: 'The Maharaja',
    type: 'Villa',
    sqft: 3500,
    bedrooms: 4,
    bathrooms: 4.5,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80',
    price: '₹4,50,00,000',
    description: 'Majestic 4-bedroom villa set in lush gardens with private pool and outdoor entertainment area. Features bespoke interiors, imported marble flooring, and state-of-the-art security system.',
    features: ['Private Pool', 'Landscaped Garden', 'Home Office', 'Servant Quarters', 'Multiple Terraces', 'Wine Cellar']
  },
];

const FloorPlans: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<FloorPlan>(floorPlans[0]);
  const [showFullPlan, setShowFullPlan] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <section id="floor-plans" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-luxury-black">Designed for</span>
            <span className="gold-gradient block mt-1">Elegant Living</span>
          </h2>
          <p className="text-luxury-black/80 leading-relaxed">
            Explore our thoughtfully designed floor plans, each crafted to maximize space, 
            light, and views while providing the utmost in comfort and luxury.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="space-y-4">
              {floorPlans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={cn(
                    "p-4 border cursor-pointer transition-all duration-300",
                    selectedPlan.id === plan.id
                      ? "border-luxury-gold bg-luxury-beige/20"
                      : "border-gray-200 hover:border-luxury-gold/50"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-xl">{plan.name}</h3>
                      <p className="text-sm text-luxury-black/70">{plan.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold gold-gradient">{plan.price}</p>
                      <p className="text-sm text-luxury-black/70">{plan.sqft} sq ft</p>
                    </div>
                  </div>
                  
                  <div className="flex mt-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Bed size={16} className="text-luxury-gold" />
                      <span className="text-sm text-luxury-black/70">{plan.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath size={16} className="text-luxury-gold" />
                      <span className="text-sm text-luxury-black/70">{plan.bathrooms} Baths</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <a
                href="#contact"
                className="inline-block w-full text-center px-8 py-3 bg-luxury-black text-white hover:bg-luxury-gold hover:text-luxury-black transition-colors duration-300 rounded-sm"
              >
                Schedule a Tour
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-lg">
              <img 
                src={selectedPlan.image} 
                alt={selectedPlan.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-luxury-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button 
                  className="px-4 py-2 bg-luxury-gold text-luxury-black rounded-sm flex items-center gap-2"
                  onClick={() => setIsFullScreen(true)}
                >
                  <Maximize2 size={18} />
                  View Full Plan
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-luxury-black/80 text-white p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{selectedPlan.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-white/80">
                      <MapPin size={14} />
                      <span>Estate, South Delhi</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square size={16} />
                    <span>{selectedPlan.sqft} sq ft</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFullScreen && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="sticky top-0 z-10 p-4 bg-white border-b flex items-center justify-between">
            <button 
              onClick={() => setIsFullScreen(false)}
              className="flex items-center gap-2 text-luxury-black hover:text-luxury-gold transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Floor Plans</span>
            </button>
            <h2 className="text-xl font-semibold">{selectedPlan.name}</h2>
            <div className="w-[76px]">
              {/* Empty div to balance the header */}
            </div>
          </div>
          
          <div className="container mx-auto max-w-7xl px-4 py-8">
            <div className="grid gap-8 mb-8">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <img 
                  src={selectedPlan.image} 
                  alt={selectedPlan.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-luxury-gold px-4 py-2 rounded-sm text-luxury-black font-semibold">
                  {selectedPlan.price}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{selectedPlan.name}</h1>
                  <p className="flex items-center gap-2 text-lg text-gray-600 mb-6">
                    <MapPin size={20} className="text-luxury-gold" />
                    Estate, South Delhi
                  </p>
                  
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-semibold mb-4">Floor Plan Details</h3>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center p-4 bg-white rounded-lg">
                        <Bed size={24} className="text-luxury-gold mb-2" />
                        <span className="text-lg font-medium">{selectedPlan.bedrooms}</span>
                        <span className="text-sm text-gray-500">Bedrooms</span>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-white rounded-lg">
                        <Bath size={24} className="text-luxury-gold mb-2" />
                        <span className="text-lg font-medium">{selectedPlan.bathrooms}</span>
                        <span className="text-sm text-gray-500">Bathrooms</span>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-white rounded-lg">
                        <Square size={24} className="text-luxury-gold mb-2" />
                        <span className="text-lg font-medium">{selectedPlan.sqft}</span>
                        <span className="text-sm text-gray-500">Square Feet</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Description</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedPlan.description}
                    </p>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      className="flex-1 px-6 py-3 bg-luxury-gold text-luxury-black hover:bg-luxury-lightGold transition-colors duration-300 rounded-sm"
                      onClick={() => {
                        setIsFullScreen(false);
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      Book a Tour
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedPlan.features?.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <div className="w-3 h-3 bg-luxury-gold rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Property Type</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-lg font-medium">{selectedPlan.type}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedPlan.type === 'Apartment' ? 'Modern living space in a multi-unit building' : 
                          selectedPlan.type === 'Penthouse' ? 'Luxury top-floor apartment with premium amenities' : 
                          'Standalone luxury residence with private grounds'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Location</h3>
                    <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <MapPin size={24} className="mr-2" />
                        Estate, South Delhi
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={showFullPlan} onOpenChange={setShowFullPlan}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-2">{selectedPlan.name}</DialogTitle>
            <DialogDescription className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} className="text-luxury-gold" />
              Estate, South Delhi
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6">
            <div className="aspect-video overflow-hidden rounded-lg">
              <img 
                src={selectedPlan.image} 
                alt={selectedPlan.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Bed size={20} className="text-luxury-gold" />
                <span>{selectedPlan.bedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath size={20} className="text-luxury-gold" />
                <span>{selectedPlan.bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-2">
                <Square size={20} className="text-luxury-gold" />
                <span>{selectedPlan.sqft} sqft</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <span className="gold-gradient">{selectedPlan.price}</span>
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {selectedPlan.description}
              </p>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Key Features</h4>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {selectedPlan.features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button 
                className="px-6 py-2 bg-luxury-gold text-luxury-black rounded-sm"
                onClick={() => {
                  setShowFullPlan(false);
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Book a Tour
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FloorPlans;
