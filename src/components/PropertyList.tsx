import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is installed
import { MapPin, IndianRupee, Bed, Bath, Square, X, ArrowLeft, Maximize, Loader2 } from 'lucide-react';
import PropertyMap from './PropertyMap';
import PropertyFilters from './PropertyFilters';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

// Define an interface that accommodates fields from BOTH hardcoded and fetched data
interface Property {
  _id?: string;
  id?: number;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image?: string; // From hardcoded data (external URL)
  mainImage?: string; // From backend (relative path like /uploads/...)
  interiorImages?: string[]; // From backend (relative paths) or hardcoded (external URLs)
  coordinates?: [number, number];
  description: string;
  propertyType: string;
  transactionType: string;
}

// Keep your initial hardcoded properties
const initialProperties: Property[] = [
    {
        id: 1, title: "Luxury Villa in South Delhi", location: "Greater Kailash, Delhi", price: "4,50,00,000", bedrooms: 4, bathrooms: 4.5, sqft: 3500,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80",
        interiorImages: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3", "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-4.0.3"],
        coordinates: [77.2090, 28.5355], description: "Exquisite villa...", propertyType: "Villa", transactionType: "Buy"
    },
    {
        id: 2, title: "Premium Apartment in Gurgaon", location: "Golf Course Road, Gurgaon", price: "2,80,00,000", bedrooms: 3, bathrooms: 3.5, sqft: 2100,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
        interiorImages: [], coordinates: [77.0878, 28.4595], description: "Modern apartment...", propertyType: "Apartment", transactionType: "Buy"
    },
    // ... other initial properties ...
];

// Define backend URL constant
const BACKEND_URL = 'http://localhost:5000'; // Adjust if your backend runs elsewhere

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(properties.length > 0 ? properties[0] : null);
  const [showDetails, setShowDetails] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [filters, setFilters] = useState({
    search: "", location: "", propertyType: "", priceRange: "", transactionType: "",
  });

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch properties from backend API
        const response = await axios.get<Property[]>(`${BACKEND_URL}/api/properties`);
        const fetchedProperties = response.data;
        // Combine initial and fetched properties
        // Ensure fetchedProperties is an array before spreading
        const combinedProperties = [
            ...initialProperties,
            ...(Array.isArray(fetchedProperties) ? fetchedProperties : [])
        ];
        setProperties(combinedProperties);
      } catch (err) {
        console.error("Failed to fetch properties from backend:", err);
        setError("Could not load additional properties from the server.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Filtering logic
  const filteredProperties = useMemo(() => {
     return properties.filter((property) => {
        // --- Your existing filter logic here ---
        if (filters.search && !property.title.toLowerCase().includes(filters.search.toLowerCase()) && !property.description.toLowerCase().includes(filters.search.toLowerCase()) && !property.location.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (filters.location && filters.location !== "All Locations" && !property.location.includes(filters.location)) return false;
        if (filters.propertyType && filters.propertyType !== "All Types" && property.propertyType !== filters.propertyType) return false;
        if (filters.priceRange && filters.priceRange !== "Any Price") {
            const price = parseFloat(String(property.price).replace(/,/g, ""));
            if (isNaN(price)) return true;
            if (filters.priceRange === "Under ₹1 Cr" && price >= 10000000) return false;
            if (filters.priceRange === "₹1 Cr - ₹2 Cr" && (price < 10000000 || price >= 20000000)) return false;
            if (filters.priceRange === "₹2 Cr - ₹3 Cr" && (price < 20000000 || price >= 30000000)) return false;
            if (filters.priceRange === "₹3 Cr - ₹5 Cr" && (price < 30000000 || price >= 50000000)) return false;
            if (filters.priceRange === "Above ₹5 Cr" && price < 50000000) return false;
        }
        if (filters.transactionType && filters.transactionType !== "Buy or Rent" && property.transactionType !== filters.transactionType) return false;
        return true;
     });
  }, [filters, properties]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  // Update selected property logic
  useEffect(() => {
     // If a property is selected, check if it still exists in the filtered list
     if(selectedProperty && !filteredProperties.find(p => (p._id || p.id) === (selectedProperty._id || selectedProperty.id))) {
         // If not found, select the first available property in the filtered list, or null if list is empty
         setSelectedProperty(filteredProperties.length > 0 ? filteredProperties[0] : null);
         setShowDetails(false); // Close details if property is filtered out
     } else if (!selectedProperty && filteredProperties.length > 0) {
          // If nothing is selected but there are filtered properties, select the first one
          setSelectedProperty(filteredProperties[0]);
     }
     // Ensure this effect runs when the filtered list or the selected property changes
  }, [filteredProperties, selectedProperty]); // <-- Corrected dependency array

  // --- Render Section ---
  return ( // <-- Error was likely caused by syntax error *before* this line
    <div>
      <div className="mb-8">
        <PropertyFilters onFilterChange={handleFilterChange} />
      </div>
      {isLoading && (
          <div className="flex justify-center items-center my-4">
              <Loader2 className="h-6 w-6 animate-spin text-luxury-gold" />
              <span className="ml-2">Loading more properties...</span>
          </div>
       )}
      {error && <div className="text-center my-4 text-red-600">{error}</div>}

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>

        {filteredProperties.length === 0 && !isLoading ? (
            <div className="text-center py-16">
                <h3 className="text-xl mb-2">No properties match your search criteria</h3>
                <p className="text-gray-500">Try adjusting your filters or wait for properties to load.</p>
            </div>
         ) : (
          <>
            <TabsContent value="list" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => {
                // Determine the correct image source URL
                let imageSource = "https://placehold.co/400x225/eeeeee/cccccc?text=No+Image"; // Default fallback
                if (property.mainImage) {
                    imageSource = `${BACKEND_URL}${property.mainImage}`;
                } else if (property.image) {
                    imageSource = property.image;
                }

                return (
                  <Card
                    key={property._id || property.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={imageSource}
                        alt={property.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          console.error(`Error loading image: ${target.src}`);
                          target.onerror = null;
                          target.src = "https://placehold.co/400x225/eeeeee/cccccc?text=Load+Error";
                        }}
                      />
                      <div className="absolute top-4 right-4 bg-luxury-gold px-3 py-1 rounded-sm text-luxury-black font-medium text-sm shadow">
                         <span className="flex items-center gap-1">
                           <IndianRupee size={14} />
                           {(() => {
                               const priceNum = parseFloat(String(property.price).replace(/,/g, ''));
                               return isNaN(priceNum) ? property.price : new Intl.NumberFormat('en-IN').format(priceNum);
                           })()}
                           {property.transactionType === "Rent" && <span className="text-xs ml-1">/month</span>}
                         </span>
                      </div>
                      <div className="absolute top-4 left-4 bg-luxury-black/80 px-3 py-1 rounded-sm text-white text-xs font-medium shadow">
                        {property.transactionType}
                      </div>
                    </div>
                    <CardContent className="p-6">
                       <h3 className="text-xl font-semibold mb-2 line-clamp-1">{property.title}</h3>
                       <p className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                         <MapPin size={16} className="text-luxury-gold flex-shrink-0" />
                         <span className="line-clamp-1">{property.location}</span>
                       </p>
                        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                           <div className="flex items-center gap-2">
                             <Bed size={16} className="text-luxury-gold flex-shrink-0" />
                             <span>{property.bedrooms} Beds</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <Bath size={16} className="text-luxury-gold flex-shrink-0" />
                             <span>{property.bathrooms} Baths</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <Square size={16} className="text-luxury-gold flex-shrink-0" />
                             <span>{property.sqft} sqft</span>
                           </div>
                         </div>
                       <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                         {property.description}
                       </p>
                       <button onClick={() => { setSelectedProperty(property); setShowDetails(true); }} className="w-full px-4 py-2 bg-luxury-black text-white hover:bg-luxury-gold hover:text-luxury-black transition-colors duration-300 rounded-sm text-sm font-medium">
                         View Details
                       </button>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="map" className="aspect-[16/9] w-full rounded-lg overflow-hidden shadow-md">
              <PropertyMap properties={filteredProperties} selectedProperty={selectedProperty} />
            </TabsContent>
          </>
        )}
      </Tabs>

      {/* --- Details Dialog --- */}
      {selectedProperty && !isFullScreen && (
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-4xl p-0">
            <DialogHeader className="p-6 pb-4 border-b">
               <DialogTitle className="text-2xl font-bold mb-1">{selectedProperty.title}</DialogTitle>
               <DialogDescription className="flex items-center gap-2 text-sm text-gray-600">
                   <MapPin size={16} className="text-luxury-gold flex-shrink-0" />
                   {selectedProperty.location}
               </DialogDescription>
                <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
            </DialogHeader>
            <div className="max-h-[calc(90vh-150px)] overflow-y-auto p-6 pt-4">
              <div className="grid gap-6">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={selectedProperty.mainImage ? `${BACKEND_URL}${selectedProperty.mainImage}` : selectedProperty.image || "https://placehold.co/600x338/eeeeee/cccccc?text=No+Image"}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                         const target = e.target as HTMLImageElement;
                         target.onerror = null;
                         target.src = "https://placehold.co/600x338/eeeeee/cccccc?text=Image+Error";
                     }}
                  />
                </div>
                {/* Interior Images */}
                {selectedProperty.interiorImages && selectedProperty.interiorImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedProperty.interiorImages.map((imagePath, index) => {
                        const isRelativePath = imagePath && imagePath.startsWith('/uploads/');
                        const interiorImageSource = isRelativePath ? `${BACKEND_URL}${imagePath}` : imagePath || "https://placehold.co/300x169/eeeeee/cccccc?text=No+Image";
                        return (
                            <div key={index} className="aspect-video overflow-hidden rounded-lg">
                                <img
                                    src={interiorImageSource}
                                    alt={`Interior ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                         const target = e.target as HTMLImageElement;
                                         target.onerror = null;
                                         target.src = "https://placehold.co/300x169/eeeeee/cccccc?text=Image+Error";
                                     }}
                                />
                            </div>
                        );
                    })}
                  </div>
                )}
                 {/* Key Details Section */}
                 <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                     <div className="text-center">
                         <Bed size={20} className="text-luxury-gold mx-auto mb-1" />
                         <span className="font-medium">{selectedProperty.bedrooms}</span>
                         <span className="text-xs block text-gray-500">Beds</span>
                     </div>
                     <div className="text-center">
                         <Bath size={20} className="text-luxury-gold mx-auto mb-1" />
                         <span className="font-medium">{selectedProperty.bathrooms}</span>
                         <span className="text-xs block text-gray-500">Baths</span>
                     </div>
                     <div className="text-center">
                         <Square size={20} className="text-luxury-gold mx-auto mb-1" />
                         <span className="font-medium">{selectedProperty.sqft}</span>
                         <span className="text-xs block text-gray-500">sqft</span>
                     </div>
                 </div>
                 {/* Price and Description */}
                 <div className="space-y-4">
                     <h3 className="text-2xl font-semibold flex items-center gap-2">
                         <IndianRupee size={22} className="text-luxury-gold" />
                          {(() => {
                              const priceNum = parseFloat(String(selectedProperty.price).replace(/,/g, ''));
                              return isNaN(priceNum) ? selectedProperty.price : new Intl.NumberFormat('en-IN').format(priceNum);
                          })()}
                         {selectedProperty.transactionType === "Rent" && <span className="text-sm font-normal text-gray-500">/month</span>}
                     </h3>
                     <div>
                         <h4 className="font-semibold mb-1">Description</h4>
                         <p className="text-gray-600 leading-relaxed">
                             {selectedProperty.description}
                         </p>
                     </div>
                 </div>
                 {/* Action Buttons */}
                 <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t">
                     <button
                         onClick={() => {
                             setShowDetails(false);
                             setIsFullScreen(true);
                         }}
                         className="flex items-center justify-center gap-2 text-sm text-luxury-black hover:text-luxury-gold"
                     >
                         <Maximize size={16} />
                         <span>View Full Screen</span>
                     </button>
                     <div className="flex gap-4">
                         <button className="flex-1 px-4 py-2 text-sm border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-colors duration-300 rounded-sm">
                             Schedule Visit
                         </button>
                         <button className="flex-1 px-4 py-2 text-sm bg-luxury-gold text-luxury-black hover:bg-luxury-lightGold transition-colors duration-300 rounded-sm">
                             Contact Agent
                         </button>
                     </div>
                 </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* --- Full Screen View --- */}
      {selectedProperty && isFullScreen && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
           <div className="sticky top-0 z-10 p-4 bg-white border-b flex items-center justify-between">
               <button
                   onClick={() => setIsFullScreen(false)}
                   className="flex items-center gap-2 text-luxury-black hover:text-luxury-gold transition-colors"
               >
                   <ArrowLeft size={20} />
                   <span>Back</span>
               </button>
               <h2 className="text-xl font-semibold truncate px-4">{selectedProperty.title}</h2>
               <div className="w-[76px]"></div> {/* Spacer */}
           </div>
          <div className="container mx-auto max-w-7xl px-4 py-8">
            <div className="grid gap-8 mb-8">
              <div className="aspect-[16/9] overflow-hidden rounded-lg">
                <img
                  src={selectedProperty.mainImage ? `${BACKEND_URL}${selectedProperty.mainImage}` : selectedProperty.image || "https://placehold.co/1200x675/eeeeee/cccccc?text=No+Image"}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                       const target = e.target as HTMLImageElement;
                       target.onerror = null;
                       target.src = "https://placehold.co/1200x675/eeeeee/cccccc?text=Image+Error";
                   }}
                />
              </div>
               <div className="grid md:grid-cols-2 gap-8">
                   <div>
                       <h1 className="text-3xl font-bold mb-2">{selectedProperty.title}</h1>
                       <p className="flex items-center gap-2 text-lg text-gray-600 mb-6">
                           <MapPin size={20} className="text-luxury-gold" />
                           {selectedProperty.location}
                       </p>
                       <div className="bg-gray-50 p-6 rounded-lg mb-6">
                           <h3 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                               <IndianRupee size={24} className="text-luxury-gold" />
                               {(() => {
                                   const priceNum = parseFloat(String(selectedProperty.price).replace(/,/g, ''));
                                   return isNaN(priceNum) ? selectedProperty.price : new Intl.NumberFormat('en-IN').format(priceNum);
                               })()}
                               {selectedProperty.transactionType === "Rent" && <span className="text-sm font-normal text-gray-500">/month</span>}
                           </h3>
                           <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                    <Bed size={24} className="text-luxury-gold mx-auto mb-2" />
                                    <span className="text-lg font-medium">{selectedProperty.bedrooms}</span>
                                    <span className="text-sm block text-gray-500">Bedrooms</span>
                                </div>
                                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                    <Bath size={24} className="text-luxury-gold mx-auto mb-2" />
                                    <span className="text-lg font-medium">{selectedProperty.bathrooms}</span>
                                    <span className="text-sm block text-gray-500">Bathrooms</span>
                                </div>
                                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                    <Square size={24} className="text-luxury-gold mx-auto mb-2" />
                                    <span className="text-lg font-medium">{selectedProperty.sqft}</span>
                                    <span className="text-sm block text-gray-500">Square Feet</span>
                                </div>
                           </div>
                       </div>
                       <div className="mb-6">
                           <h3 className="text-xl font-semibold mb-4">Description</h3>
                           <p className="text-gray-600 leading-relaxed">
                               {selectedProperty.description}
                           </p>
                       </div>
                       <div className="flex gap-4">
                           <button className="flex-1 px-6 py-3 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-colors duration-300 rounded-sm">
                               Schedule a Visit
                           </button>
                           <button className="flex-1 px-6 py-3 bg-luxury-gold text-luxury-black hover:bg-luxury-lightGold transition-colors duration-300 rounded-sm">
                               Contact Agent
                           </button>
                       </div>
                   </div>
                {selectedProperty.interiorImages && selectedProperty.interiorImages.length > 0 && (
                     <div>
                         <h3 className="text-xl font-semibold mb-4">Interior Photos</h3>
                         <div className="grid gap-4">
                             {selectedProperty.interiorImages.map((imagePath, index) => {
                                 const isRelativePath = imagePath && imagePath.startsWith('/uploads/');
                                 const interiorImageSource = isRelativePath ? `${BACKEND_URL}${imagePath}` : imagePath || "https://placehold.co/600x338/eeeeee/cccccc?text=No+Image";
                                 return (
                                     <div key={index} className="aspect-video overflow-hidden rounded-lg">
                                         <img
                                             src={interiorImageSource}
                                             alt={`Interior ${index + 1}`}
                                             className="w-full h-full object-cover"
                                             onError={(e) => {
                                                  const target = e.target as HTMLImageElement;
                                                  target.onerror = null;
                                                  target.src = "https://placehold.co/600x338/eeeeee/cccccc?text=Image+Error";
                                              }}
                                         />
                                     </div>
                                 );
                             })}
                         </div>
                     </div>
                 )}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyList;
