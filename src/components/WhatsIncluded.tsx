import { Check } from "lucide-react";
import { PurchaseMode, FlavorType } from "@/types/product";

interface WhatsIncludedProps {
  mode: PurchaseMode;
  selectedFlavors: FlavorType[];
}

const includedItems = {
  single: [
    "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit",
    "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit", 
    "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit",
    "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit"
  ],
  double: [
    "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit",
    "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit",
    "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit", 
    "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit",
    "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit"
  ]
};

export function WhatsIncluded({ mode, selectedFlavors }: WhatsIncludedProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">What's Included</h3>
      
      <div className="space-y-3">
        {/* Delivery frequency */}
        <div className="p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">
            {mode === "single" ? "Every 30 Days" : "One Time Order"}
          </span>
        </div>
        
        {/* Product showcase grid */}
        <div className="grid grid-cols-2 gap-2">
          {selectedFlavors.map((flavor, index) => (
            <div key={`${flavor}-${index}`} className="aspect-square bg-background border rounded-lg p-2 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 mx-auto mb-1 bg-primary/20 rounded-full"></div>
                <span className="text-xs capitalize">{flavor}</span>
              </div>
            </div>
          ))}
          {mode === "double" && selectedFlavors.length === 1 && (
            <div className="aspect-square bg-background border border-dashed rounded-lg p-2 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Select 2nd flavor</span>
            </div>
          )}
        </div>
        
        {/* Benefits list */}
        <div className="space-y-2">
          {includedItems[mode].map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}