import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ProductImageGallery } from "./ProductImageGallery";
import { PurchaseOptions } from "./PurchaseOptions";
import { FlavorSelector } from "./FlavorSelector";
import { WhatsIncluded } from "./WhatsIncluded";
import { useProductPricing } from "@/hooks/useProductPricing";
import { PurchaseMode, FlavorType, ProductData, CartItem } from "@/types/product";

const productData: ProductData = {
  name: "Lorem Ipsum",
  basePrice: 100,
  subscriptionDiscount: 25,
  salesDiscount: 20,
};

export function ProductPage() {
  const [purchaseMode, setPurchaseMode] = useState<PurchaseMode>("single");
  const [selectedFlavors, setSelectedFlavors] = useState<FlavorType[]>(["chocolate"]);
  const { toast } = useToast();

  const singlePricing = useProductPricing(productData, "single");
  const doublePricing = useProductPricing(productData, "double");

  const currentPricing = purchaseMode === "single" ? singlePricing : doublePricing;

  const handleAddToCart = () => {
    if (purchaseMode === "double" && selectedFlavors.length === 0) {
      toast({
        title: "Please select flavors",
        description: "Choose at least one flavor for your double drink subscription.",
        variant: "destructive",
      });
      return;
    }

    const cartItem: CartItem = {
      mode: purchaseMode,
      flavors: selectedFlavors,
      price: currentPricing.finalPrice,
      originalPrice: currentPricing.originalPrice,
    };

    // Here you would typically add to cart state/context
    toast({
      title: "Added to cart!",
      description: `${productData.name} ${purchaseMode} subscription has been added to your cart.`,
    });

    console.log("Cart item:", cartItem);
  };

  const handleFlavorChange = (flavors: FlavorType[]) => {
    setSelectedFlavors(flavors);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Product Images */}
          <div className="space-y-6">
            <ProductImageGallery 
              selectedFlavor={selectedFlavors[0] || "chocolate"}
              onFlavorChange={(flavor) => handleFlavorChange([flavor])}
            />
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            {/* Product Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{productData.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>★</span>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">4.8 (1,200 reviews)</span>
              </div>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nisi felis 
                vel eleifend maximus accumsan tellus. Fusce quis consequat libero id dignissim.
              </p>
            </div>

            {/* Purchase Options */}
            <PurchaseOptions
              selectedMode={purchaseMode}
              onModeChange={setPurchaseMode}
              singlePrice={singlePricing.finalPrice}
              doublePrice={doublePricing.finalPrice}
            />

            {/* Flavor Selection */}
            <FlavorSelector
              selectedFlavors={selectedFlavors}
              onFlavorChange={handleFlavorChange}
              mode={purchaseMode}
            />

            {/* What's Included */}
            <WhatsIncluded
              mode={purchaseMode}
              selectedFlavors={selectedFlavors}
            />

            {/* Pricing Display */}
            <div className="space-y-2 p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Original Price:</span>
                <span className="text-sm line-through text-muted-foreground">
                  ${currentPricing.originalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Subscription Discount ({currentPricing.subscriptionDiscount}% off):
                </span>
                <span className="text-sm text-success">
                  -${(currentPricing.originalPrice - currentPricing.subscriptionPrice).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Sales Discount ({currentPricing.salesDiscount}% off):
                </span>
                <span className="text-sm text-success">
                  -${(currentPricing.subscriptionPrice - currentPricing.finalPrice).toFixed(2)}
                </span>
              </div>
              <hr className="my-2" />
              <div className="flex items-center justify-between">
                <span className="font-semibold">Final Price:</span>
                <span className="text-xl font-bold text-primary">
                  ${currentPricing.finalPrice.toFixed(2)}
                </span>
              </div>
              <div className="text-center">
                <span className="text-sm text-success">
                  You save ${currentPricing.savings.toFixed(2)} total!
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button 
              onClick={handleAddToCart}
              className="w-full h-12 text-lg font-semibold"
              size="lg"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}