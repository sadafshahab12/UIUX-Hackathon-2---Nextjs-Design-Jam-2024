import { ReactNode } from "react";

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

}

export interface TagType {
  tags: string[];
  imageUrls: string[];
}



