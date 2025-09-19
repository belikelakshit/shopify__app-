export type PurchaseMode = "single" | "double";
export type FlavorType = "chocolate" | "vanilla" | "orange";

export interface ProductData {
  name: string;
  basePrice: number;
  subscriptionDiscount: number; // 25% off
  salesDiscount: number; // 20% off
}

export interface CartItem {
  mode: PurchaseMode;
  flavors: FlavorType[];
  price: number;
  originalPrice: number;
}