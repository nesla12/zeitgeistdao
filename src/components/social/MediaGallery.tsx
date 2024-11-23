import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MediaGalleryProps {
  media: Array<{
    id: string;
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  }>;
  onDelete?: (id: string) => void;
}

function MediaGallery({ media, onDelete }: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? media.length - 1 : selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === media.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {media.map((item, index) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setSelectedIndex(index)}
          >
            {item.type === 'image' ? (
              <img
                src={item.thumbnail || item.url}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={item.url}
                className="w-full h-full object-cover"
              />
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}
                className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            onClick={() => setSelectedIndex(null)}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Navigation */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-4 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Media Display */}
              <div
                onClick={(e) => e.stopPropagation()}
                className={`relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              >
                {media[selectedIndex].type === 'image' ? (
                  <img
                    src={media[selectedIndex].url}
                    alt=""
                    className={`max-h-[90vh] ${
                      isZoomed ? 'max-w-none' : 'max-w-[90vw]'
                    }`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                ) : (
                  <video
                    src={media[selectedIndex].url}
                    controls
                    className="max-w-[90vw] max-h-[90vh]"
                  />
                )}

                {/* Controls */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <a
                    href={media[selectedIndex].url}
                    download
                    className="p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MediaGallery;