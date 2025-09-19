import { cn } from "@/lib/utils";
import { FlavorType, PurchaseMode } from "@/types/product";

interface FlavorSelectorProps {
  selectedFlavors: FlavorType[];
  onFlavorChange: (flavors: FlavorType[]) => void;
  mode: PurchaseMode;
}

const flavorDetails = {
  chocolate: {
    name: "Chocolate",
    color: "hsl(var(--chocolate))",
  },
  vanilla: {
    name: "Vanilla", 
    color: "hsl(var(--vanilla))",
  },
  orange: {
    name: "Orange",
    color: "hsl(var(--orange))",
  },
};

export function FlavorSelector({ selectedFlavors, onFlavorChange, mode }: FlavorSelectorProps) {
  const handleFlavorClick = (flavor: FlavorType) => {
    if (mode === "single") {
      onFlavorChange([flavor]);
    } else {
      // Double mode - allow selecting up to 2 flavors
      if (selectedFlavors.includes(flavor)) {
        // Remove flavor if already selected
        onFlavorChange(selectedFlavors.filter(f => f !== flavor));
      } else if (selectedFlavors.length < 2) {
        // Add flavor if less than 2 selected
        onFlavorChange([...selectedFlavors, flavor]);
      } else {
        // Replace first flavor with new one
        onFlavorChange([selectedFlavors[1], flavor]);
      }
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-sm">Choose Flavor</h3>
      <div className="flex gap-3">
        {(Object.keys(flavorDetails) as FlavorType[]).map((flavor) => (
          <button
            key={flavor}
            onClick={() => handleFlavorClick(flavor)}
            className={cn(
              "flex flex-col items-center gap-2 p-2 rounded-lg border transition-all",
              selectedFlavors.includes(flavor)
                ? "border-primary bg-accent"
                : "border-border hover:border-primary/50"
            )}
          >
            <div 
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: flavorDetails[flavor].color }}
            />
            <span className="text-xs font-medium">
              {flavorDetails[flavor].name}
            </span>
          </button>
        ))}
      </div>
      
      {mode === "double" && (
        <p className="text-xs text-muted-foreground">
          {selectedFlavors.length === 0 && "Select up to 2 flavors"}
          {selectedFlavors.length === 1 && "Select 1 more flavor or continue with single flavor"}
          {selectedFlavors.length === 2 && "Maximum flavors selected"}
        </p>
      )}
    </div>
  );
}