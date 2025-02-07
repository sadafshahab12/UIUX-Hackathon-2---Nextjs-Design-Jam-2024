"use client";
import {
  CartItem,
  CountContext,
  ProductProviderType,
  ProductType,
  WishList, // Import WishList type
} from "@/app/type/dataType";
import { client } from "@/sanity/lib/client";
import { useUser } from "@clerk/nextjs";
import React, { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useClerk } from "@clerk/nextjs";
export const ProductContext = createContext<CountContext | undefined>(
  undefined
);

export const ProductProvider = ({ children }: ProductProviderType) => {
  const [count, setCount] = useState<number>(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { isSignedIn } = useUser();
  const clerk = useClerk();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError(
          "We're really sorry, but we couldn't find the product you were looking for."
        );
        console.error(`Error fetching data: ${error}`);
      } finally {
        setTimeout(() => {
          setLoading(false); // After 5 seconds, stop loading
        }, 1500);
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
    if (!isSignedIn) {
      // If the user is not signed in, open the sign-in modal
      clerk.openSignIn();
      return; // Prevent proceeding with adding to cart
    }
    if (product.isStock === false) {
      alert("Out of Stock");
      return;
    }
    setCartItems((prevCart) => {
      // Check current state of cartItems
      console.log("Current Cart Items:", prevCart);

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
        console.log("Updated Cart:", updatedCart); // Debugging: Check updated cart state
        return updatedCart;
      } else {
        const updatedCart = [...prevCart, { ...product, quantity }];
        console.log("New Cart:", updatedCart); // Debugging: Check new cart state
        return updatedCart;
      }
    });
    Swal.fire({
      text: `${product.title} added to Cart!`,
      icon: "success",
      position: "center",
      timer: 3000,
      showConfirmButton: false,
    });
  };

  const removeFromCart = (productId: string) => {
    Swal.fire({
      title: "Are You Sure?",
      text: `You want to remove this item`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove it.",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        setCartItems((prevCart) =>
          prevCart.filter((item) => item._id !== productId)
        );
        Swal.fire({
          title: "Removed!",
          text: "Item has been removed successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleAddToWishlist = (product: ProductType, quantity: number = 1) => {
    if (!isSignedIn) {
      // If the user is not signed in, open the sign-in modal
      clerk.openSignIn();
      return; // Prevent proceeding with adding to cart
    }
    const userId = clerk.user?.id;

    const currentWishlist: WishList[] = JSON.parse(
      localStorage.getItem(`wishlist-${userId}`) || "[]"
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
    localStorage.setItem(`wishlist-${userId}`, JSON.stringify(currentWishlist));
    setWishlist(currentWishlist); // Update the state to re-render the component

    Swal.fire({
      text: `${product.title} add to Wishlist!`,
      icon: "success",
      position: "center",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const [wishlist, setWishlist] = useState<WishList[]>([]);

  useEffect(() => {
    const userId = clerk.user?.id;
    if (userId) {
      const storedWishlist = JSON.parse(
        localStorage.getItem(`wishlist-${userId}`) || "[]"
      );
      setWishlist(storedWishlist);
    }
  }, [clerk.user?.id]);

  const handleRemoveFromWishlist = (productId: string) => {
    const userId = clerk.user?.id;
    if (!userId) return; // Ensure user is logged in
    // Remove from wishlist state
    const updatedWishlist = wishlist.filter((item) => item._id !== productId);
    // Update localStorage with the new wishlist
    localStorage.setItem(`wishlist-${userId}`, JSON.stringify(updatedWishlist));
    // Update the wishlist state
    Swal.fire({
      title: "Are You Sure?",
      text: `You want to remove this item`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove it.",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        setWishlist(updatedWishlist);
        Swal.fire({
          title: "Removed",
          text: "Wishlist Item has been removed successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const addToRentalCart = (
    product: ProductType,
    rentalStartDate: string,
    rentalEndDate: string
  ) => {
    if (!isSignedIn) {
      // If the user is not signed in, open the sign-in modal
      clerk.openSignIn();
      return; // Prevent proceeding with adding to cart
    }
    if (product.isStock === false) {
      alert("Out of Stock");
      return;
    }

    // Calculate the rental days and total rental price
    const rentalStart = new Date(rentalStartDate);
    const rentalEnd = new Date(rentalEndDate);
    const rentalDays = Math.ceil(
      (rentalEnd.getTime() - rentalStart.getTime()) / (1000 * 3600 * 24)
    );
    const totalRentalPrice = rentalDays * (product.rentalPricePerDay || 0);

    setCartItems((prevCart) => {
      // Check current state of cartItems
      const existingProductIndex = prevCart.findIndex(
        (item) => item._id === product._id
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1, // Optionally adjust quantity
        };
        return updatedCart;
      } else {
        const updatedCart = [
          ...prevCart,
          {
            ...product,
            rentalStartDate,
            rentalEndDate,
            rentalDays,
            totalRentalPrice,
            quantity: 1,
          },
        ];
        return updatedCart;
      }
    });

    Swal.fire({
      text: `${product.title} added to Rental Cart!`,
      icon: "success",
      position: "center",
      timer: 3000,
      showConfirmButton: false,
    });
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
        setCartItems,
        removeFromCart,
        addToCart,
        handleAddToWishlist,
        handleClearSearchQuery,
        wishlist,
        handleRemoveFromWishlist,
        loading,
        error,
        addToRentalCart,
      }}
    >
      <div>{children}</div>
    </ProductContext.Provider>
  );
};
