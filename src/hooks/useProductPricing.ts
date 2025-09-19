import { useMemo } from "react";
import { PurchaseMode, ProductData } from "@/types/product";

export function useProductPricing(productData: ProductData, mode: PurchaseMode) {
  return useMemo(() => {
    const basePrice = mode === "single" ? productData.basePrice : productData.basePrice * 2;
    
    // Apply subscription discount (25% off from main price)
    const subscriptionPrice = basePrice * (1 - productData.subscriptionDiscount / 100);
    
    // Apply sales discount (20% off on both)
    const finalPrice = subscriptionPrice * (1 - productData.salesDiscount / 100);
    
    return {
      originalPrice: basePrice,
      subscriptionPrice,
      finalPrice,
      savings: basePrice - finalPrice,
      subscriptionDiscount: productData.subscriptionDiscount,
      salesDiscount: productData.salesDiscount
    };
  }, [productData, mode]);
}