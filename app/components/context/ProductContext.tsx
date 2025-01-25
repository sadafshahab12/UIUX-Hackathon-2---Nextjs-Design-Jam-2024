"use client";
import {
  CartItem,
  CountContext,
  ProductProviderType,
  ProductType,
} from "@/app/type/dataType";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import React, { createContext, useEffect, useState } from "react";

export const ProductContext = createContext<CountContext | undefined>(undefined);

export const ProductProvider = ({ children }: ProductProviderType) => {
  const [count, setCount] = useState<number>(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Correct type for cart items

  const countIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const countDecrement = () => {
    setCount((prevCount) => Math.max(1, prevCount - 1)); // Ensure count does not go below 1
  };

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
      const fetchedData = await client.fetch(groqQuery); // Corrected fetch
      return fetchedData;
    } catch (error) {
      console.error(`Error in Fetching home product data: ${error}`);
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
        console.error(`Error in Fetching data ${error}`);
      }
    };
    getData();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredProducts = product.filter((furniture) => {
    const matchesSearch = furniture.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || furniture.title.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: ProductType, quantity: number) => {
    setCartItems((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item._id === product._id);
      
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        // Update the quantity by adding the new quantity
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + quantity,
        };
        return updatedCart;
      } else {
        // Add the product with the given quantity if it doesn't exist in the cart
        return [...prevCart, { ...product, quantity }];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCartItems((prevCart) => prevCart.filter((item) => item._id !== productId));
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
        addToCart
      }}
    >
      <div>{children}</div>
    </ProductContext.Provider>
  );
};
