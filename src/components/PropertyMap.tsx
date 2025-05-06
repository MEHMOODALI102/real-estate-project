
import React from 'react';

interface Property {
  id: number;
  title: string;
  location: string;
  coordinates: [number, number];
}

interface PropertyMapProps {
  properties: Property[];
  selectedProperty: Property;
}

const PropertyMap: React.FC<PropertyMapProps> = () => {
  return (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <p className="text-gray-500">
        Please connect your Mapbox account to view the property locations.
        Visit mapbox.com to get your public access token.
      </p>
    </div>
  );
};

export default PropertyMap;
