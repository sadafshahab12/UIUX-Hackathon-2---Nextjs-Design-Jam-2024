"use client";
import {
  CartItem,
  CountContext,
  ProductProviderType,
  ProductType,
  WishList, // Import WishList type
} from "@/app/type/dataType";
import { client } from "@/sanity/lib/client";
import React, { createContext, useEffect, useState } from "react";

export const ProductContext = createContext<CountContext | undefined>(
  undefined
);

export const ProductProvider = ({ children }: ProductProviderType) => {
  const [count, setCount] = useState<number>(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const countIncrement = () => setCount((prevCount) => prevCount + 1);

  const countDecrement = () =>
    setCount((prevCount) => Math.max(1, prevCount - 1));

  // Fetching product data from Sanity
  const fetchProductData = async () => {
    const groqQuery = `*[_type == "furniture"]{
      _id,
      title,
      tags,
      isNew, 
      availableForRental,
      stock,
      description,
      dicountPercentage,
      "imageUrls": productImage[].asset->url,
      slug,
      isStock,
      price,
      rentalPricePerDay
    }`;

    try {
      const fetchedData = await client.fetch(groqQuery);
      return fetchedData;
    } catch (error) {
      console.error(`Error in Fetching product data: ${error}`);
      return [];
    }
  };

  const [product, setProduct] = useState<ProductType[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchProductData();
        setProduct(data);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    };
    getData();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);
  const handleClearSearchQuery = () => {
    setSearchQuery("");
  };

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const handleCategoryChange = (category: string) =>
    setSelectedCategory(category);

  const filteredProducts = product.filter((furniture) => {
    const matchesSearch = furniture.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      furniture.title.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: ProductType, quantity: number) => {
    setCartItems((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item._id === product._id
      );
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity:
            (updatedCart[existingProductIndex].quantity || 0) + quantity,
        };
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item._id !== productId)
    );
  };

  const handleAddToWishlist = (product: ProductType, quantity: number = 1) => {
    const currentWishlist: WishList[] = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    // Check if the product is already in the wishlist
    const existingProductIndex = currentWishlist.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      // If the product exists, update its quantity
      currentWishlist[existingProductIndex].quantity += quantity;
    } else {
      // If the product doesn't exist, add it with the given quantity
      currentWishlist.push({ ...product, quantity });
    }

    // Store the updated wishlist in localStorage
    localStorage.setItem("wishlist", JSON.stringify(currentWishlist));
    setWishlist(currentWishlist); // Update the state to re-render the component
    alert("Product added to wishlist!");
  };

  const [wishlist, setWishlist] = useState<WishList[]>([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  const handleRemoveFromWishlist = (productId: string) => {
    // Remove from wishlist state
    const updatedWishlist = wishlist.filter((item) => item._id !== productId);

    // Update localStorage with the new wishlist
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    // Update the wishlist state
    setWishlist(updatedWishlist);
  };


  return (
    <ProductContext.Provider
      value={{
        searchQuery,
        count,
        countDecrement,
        countIncrement,
        product,
        filteredProducts,
        handleSearchChange,
        handleCategoryChange,
        cartItems,
        removeFromCart,
        addToCart,
        handleAddToWishlist,
        handleClearSearchQuery,
        wishlist,
        handleRemoveFromWishlist,
      }}
    >
      <div>{children}</div>
    </ProductContext.Provider>
  );
};
