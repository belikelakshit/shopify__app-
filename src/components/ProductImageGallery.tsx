import { useState } from "react";
import { cn } from "@/lib/utils";
import { FlavorType } from "@/types/product";

import chocolateBottle from "@/assets/bottle-chocolate.png";
import vanillaBottle from "@/assets/bottle-vanilla.png";
import orangeBottle from "@/assets/bottle-orange.png";

const flavorImages = {
  chocolate: chocolateBottle,
  vanilla: vanillaBottle,
  orange: orangeBottle,
};

interface ProductImageGalleryProps {
  selectedFlavor: FlavorType;
  onFlavorChange: (flavor: FlavorType) => void;
}

export function ProductImageGallery({ selectedFlavor, onFlavorChange }: ProductImageGalleryProps) {
  const [mainImage, setMainImage] = useState(flavorImages[selectedFlavor]);

  const handleThumbnailClick = (flavor: FlavorType) => {
    setMainImage(flavorImages[flavor]);
    onFlavorChange(flavor);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Product Image */}
      <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={mainImage}
          alt={`${selectedFlavor} flavored bottle`}
          className="h-full w-auto object-contain"
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-2 justify-center">
        {(Object.keys(flavorImages) as FlavorType[]).map((flavor) => (
          <button
            key={flavor}
            onClick={() => handleThumbnailClick(flavor)}
            className={cn(
              "w-16 h-16 rounded-md border-2 overflow-hidden bg-muted transition-all",
              selectedFlavor === flavor 
                ? "border-primary" 
                : "border-border hover:border-primary/50"
            )}
          >
            <img
              src={flavorImages[flavor]}
              alt={`${flavor} flavor`}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}