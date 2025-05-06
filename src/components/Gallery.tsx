
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80',
  'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1984&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
];

const Gallery: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const goToPrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-luxury-beige/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-luxury-black">Discover Our</span>
            <span className="gold-gradient block mt-1">Luxury Spaces</span>
          </h2>
          <p className="text-luxury-black/80 leading-relaxed">
            Take a visual journey through our exquisite residences and experience 
            the epitome of luxury living at Cavalli Bay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="cursor-pointer overflow-hidden rounded-md aspect-[4/3] group"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={image} 
                alt={`Luxury Residence ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-luxury-gold"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-luxury-gold p-2"
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
          >
            <ChevronLeft size={40} />
          </button>
          
          <div 
            className="max-w-5xl max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={galleryImages[currentImage]} 
              alt={`Large view ${currentImage + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
          
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-luxury-gold p-2"
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
          >
            <ChevronRight size={40} />
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentImage + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
