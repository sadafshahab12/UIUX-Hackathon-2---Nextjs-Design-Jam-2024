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

export const ProductContext = createContext<CountContext | undefined>(
  undefined
);

export const ProductProvider = ({ children }: ProductProviderType) => {
  const [count, setCount] = useState<number>(1);
  const countIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const countDecrement = () => {
    setCount((prevCount) => (prevCount <= 1 ? 1 : prevCount - 1));
  };

  // sanity product fecthing
  const fetchProductData = async () => {
    const groqQuery = `*[_type == "furniture"]{
    title,tags,
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
      const fetch = await client.fetch(groq`${groqQuery}`);
      // console.log(fetch);
      return fetch;
    } catch (error) {
      console.error(`Error in Fetching home product data : ${error}`);
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
    const matchesSearch = furniture.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      furniture.title.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.title === item.title
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        return updatedCart;
      } else {
        [...prevCart, item];
      }
    });
  };

  const removeFromCart = (title: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.title !== title));
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
        cart,
        setCart,
        addToCart,
        removeFromCart,
      }}
    >
      <div>{children}</div>
    </ProductContext.Provider>
  );
};
