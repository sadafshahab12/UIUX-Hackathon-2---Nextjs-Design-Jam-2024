import { ReactNode } from "react";

// Updated ProductType with quantity for cartItems and wishlist
export interface ProductType {
  imageUrls: string[]; // Image URLs for the product
  price: number; // Price of the product
  tags: string[]; // Tags for the product (e.g., category)
  dicountPercentage: number; // Discount percentage on the product (fixed typo)
  description: string; // Product description
  isNew?: boolean; // Optional field for marking a new product
  _id: string; // Unique ID for the product
  title: string; // Product title
  isStock?: boolean; // If the product is in stock
  stock?: number; // Available stock for the product
  rentalPricePerDay?: number; // Rental price per day, if applicable
  availableForRental?: boolean; // Whether the product is available for rental
  slug: {
    current: string; // Slug for the product URL
  };
  quantity?: number; // Optional quantity field for cart or wishlist items (used when added to cart or wishlist)
}

// Updated ProductProviderType to define children prop for ProductProvider component
export interface ProductProviderType {
  children: ReactNode; // Child components passed to ProductProvider
}

// SlugType for slug handling in URL or navigation (simplified)
export interface SlugType {
  slug?: string; // Optional slug for routing/navigation
}

// CountContext defines all the values and methods available in the context
export interface CountContext {
  error: string | null;
  loading: boolean;
  searchQuery: string; // Search query for filtering products
  count: number; // Current count of selected product quantity
  countIncrement: () => void; // Function to increment count
  countDecrement: () => void; // Function to decrement count
  product: ProductType[]; // List of all products
  filteredProducts: ProductType[]; // Filtered list of products based on search and category
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Handle search query change
  handleCategoryChange: (category: string) => void; // Handle category change
  cartItems: CartItem[]; // Items in the cart
  removeFromCart: (productId: string) => void; // Remove product from cart by ID
  addToCart: (product: ProductType, quantity: number) => void; // Add product to cart with quantity
  handleAddToWishlist: (product: ProductType, quantity: number) => void; // Add product to wishlist with quantity
  wishlist: WishList[]; // List of wishlist items
  handleRemoveFromWishlist: (productId: string) => void;  // Remove product from wishlist by ID
  handleClearSearchQuery: () => void;
  setCartItems: (items: CartItem[]) => void;
}

// CartItem extends ProductType to add quantity for cart items
export interface CartItem extends ProductType {
  quantity: number; // Quantity of the product in the cart (required)
}

// WishList extends ProductType to add quantity for wishlist items
export interface WishList extends ProductType {
  quantity: number; // Quantity of the product in the wishlist (required)
}

// TagType is used to handle tags and related images for filtering and categorization
export interface TagType {
  tags: string[]; // Tags related to the product
  imageUrls: string[]; // Associated images for tags or categories
}

// Adding a new interface for products' meta data
export interface ProductMetaData {
  createdAt: string; // Date the product was added
  updatedAt: string; // Last update date of the product
}

// A simpler interface to handle category and its related information
export interface CategoryType {
  categoryName: string; // Category name
  categorySlug: string; // Category URL slug
  imageUrls: string[]; // Images for the category
}
export interface CustomerData {
  firstName: string;
  lastName: string;
  country: string;
  streetAddress: string;
  city: string;
  province: string;
  zipCode: string;
  phone: string;
  email: string;
  additionalInfo: string;
  errors?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    streetAddress?: string;
    city?: string;
    zipCode?: string;
    [key: string]: string | undefined;
  };
}

export interface SanityCustomerType {
  userId:string,
  _id: string;
  firstName: string;
  lastName: string;
  country: string; // default country
  streetAddress: string;
  city: string;
  province: string;
  zipCode: string;
  phone: string;
  email: string;
  additionalInfo: string;
  paymentMethod: string;
}

// order page data type
// Data type for Items in the order


// Data type for the Customer
export interface OrderPageCustomerType {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  country: string;
  province: string;
  additionalInfo: string;
  
}

// Data type for the Order
export interface OrderPageType {
  _id: string;
  order_date: string;
  _createdAt: string;
  _updatedAt: string;
  cartItems:ProductType[];
  customer: OrderPageCustomerType;
  status : string;
  totalPrice: number;
  quantity: number;
}
