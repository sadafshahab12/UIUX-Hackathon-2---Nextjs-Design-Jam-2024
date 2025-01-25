import { ReactNode } from "react";

// ProductType updated with quantity in cartItems
export interface ProductType {
  imageUrls: string[];
  price: number;
  tags: string[];
  dicountPercentage: number;
  description: string;
  isNew?: boolean;
  _id: string;
  title: string;
  isStock?: boolean;
  stock?: number;
  rentalPricePerDay?: number;
  availableForRental?: boolean;
  slug: {
    current: string;
  };
  quantity?: number;  // added to handle cart items
}

export interface ProductProviderType {
  children: ReactNode;
}

export interface SlugType {
  slug?: string;
}

export interface CountContext {
  searchQuery: string;
  count: number;
  countIncrement: () => void;
  countDecrement: () => void;
  product: ProductType[];
  filteredProducts: ProductType[];
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (category: string) => void;
  cartItems: CartItem[];
  removeFromCart: (productId: string) => void;
  addToCart: (product: ProductType, quantity: number) => void;
}

// New CartItem type to reflect items in the cart
export interface CartItem extends ProductType {
  quantity: number;
}

// TagType is fine, no changes required
export interface TagType {
  tags: string[];
  imageUrls: string[];
}
