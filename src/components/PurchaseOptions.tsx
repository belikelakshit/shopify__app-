import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export type PurchaseMode = "single" | "double";

interface PurchaseOptionsProps {
  selectedMode: PurchaseMode;
  onModeChange: (mode: PurchaseMode) => void;
  singlePrice: number;
  doublePrice: number;
}

export function PurchaseOptions({ 
  selectedMode, 
  onModeChange, 
  singlePrice, 
  doublePrice 
}: PurchaseOptionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="bg-primary text-primary-foreground">
          Recommended
        </Badge>
      </div>
      
      <RadioGroup 
        value={selectedMode} 
        onValueChange={(value) => onModeChange(value as PurchaseMode)}
        className="space-y-3"
      >
        <div className="flex items-center space-x-3 p-3 rounded-lg border transition-colors hover:bg-accent">
          <RadioGroupItem value="single" id="single" />
          <Label htmlFor="single" className="flex-1 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="font-medium">Single Drink Subscription</span>
              <span className="font-semibold">${singlePrice.toFixed(2)}</span>
            </div>
          </Label>
        </div>
        
        <div className="flex items-center space-x-3 p-3 rounded-lg border transition-colors hover:bg-accent">
          <RadioGroupItem value="double" id="double" />
          <Label htmlFor="double" className="flex-1 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="font-medium">Double Drink Subscription</span>
              <span className="font-semibold">${doublePrice.toFixed(2)}</span>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}