"use client";
import React, { useContext } from "react";
import Hero from "../components/ui/Hero";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Properties from "../components/ui/Properties";
import { useRouter } from "next/navigation";
import { ProductContext } from "../components/context/ProductContext";
import { CountContext } from "../type/dataType";
import { IoMdTrash } from "react-icons/io";

const WishList = () => {
  const route = useRouter();
  const { wishlist, handleRemoveFromWishlist } = useContext(
    ProductContext
  ) as CountContext;

  const calculateTotal = () => {
    return wishlist.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckOut = () => {
    const queryParams = new URLSearchParams({
      cart: JSON.stringify(wishlist),
    }).toString(); // Using wishlist for checkout, adjust if needed
    route.push(`/checkout?${queryParams}`);
  };

  const totalAmount = calculateTotal();

  return (
    <>
      <div>
        <Hero navName="Wishlist" title="Wishlist" navLink="/wishlist" />
      </div>
      <div className="lg:py-10 xs:py-5 py-3 lg:px-14 xs:px-7 px-3 grid md:grid-cols-[2fr,1fr] grid-cols-1 gap-4">
        <div className="part 1">
          <div className="wishlist-nav sm:mb-10 mb-5 bg-[#F9F1E7] grid grid-cols-6 justify-items-center items-center sm:pl-0 pl-5 py-3">
            <p className="md:text-16 sm:text-14 xs:text-12 text-10 font-medium">
              Product
            </p>
            <p className="md:text-16 sm:text-14 xs:text-12 text-10 font-medium">
              Title
            </p>
            <p className="md:text-16 sm:text-14 xs:text-12 text-10 font-medium">
              Price
            </p>
            <p className="md:text-16 sm:text-14 xs:text-12 text-10 font-medium">
              Quantity
            </p>
            <p className="md:text-16 sm:text-14 xs:text-12 text-10 font-medium">
              Subtotal
            </p>
          </div>

          <div className="wishlist-product-details space-y-4">
            {wishlist.length === 0 ? (
              <p className="md:text-16 sm:text-14 xs:text-12 text-10">
                Your Wishlist is Empty
              </p>
            ) : (
              wishlist.map((item, index) => (
                <div
                  key={index}
                  className="product-details grid grid-cols-6 gap-4 justify-items-center items-center xs:px-0 xss:px-5 px-2"
                >
                  <div className="bg-[#FAF3EA] sm:p-2 p-1 sm:w-[108px] xss:w-[60px] w-[50px] sm:h-[105px] xss:h-[60px] h-[50px] rounded-lg">
                    <Image
                      src={item.imageUrls[0]}
                      alt="product-img"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover rounded-lg cursor-pointer"
                    />
                  </div>

                  <h1 className="text-gray md:text-16 sm:text-14 xs:text-12 text-10">
                    {item.title}
                  </h1>
                  <p className="md:text-16 sm:text-14 xs:text-12 text-10">
                    ${item.price}
                  </p>
                  <p className="pl-5 md:text-16 sm:text-14 xs:text-12 text-10">
                    {item.quantity}
                  </p>
                  <p className="md:text-16 sm:text-14 xs:text-12 text-10">
                    ${item.price * item.quantity}
                  </p>
                  <div className="justify-self-center">
                    <IoMdTrash
                      className="xs:w-6 w-4 xs:h-6 h-4 cursor-pointer"
                      onClick={() => handleRemoveFromWishlist(item._id)} // Remove from wishlist
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="part2 bg-[#F9F1E7] pt-5 lg:px-16 px-10 lg:pb-14 pb-10 text-center h-[18rem]">
          <h1 className="lg:text-30 text-24 font-semibold lg:mb-10 mb-6">
            Wishlist Totals
          </h1>
          <div className="space-y-6">
            <div className="flex justify-between">
              <p className="lg:text-16 text-14 font-medium">Subtotal</p>
              <p className="lg:text-16 text-14 text-gray">${totalAmount}</p>
            </div>
            <div className="flex justify-between">
              <p className="lg:text-16 text-14 font-medium">Total</p>
              <p className="lg:text-20 text-18 font-medium text-[#B88E2F]">
                ${totalAmount}
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Button
              variant={"secondary"}
              className="bg-transparent text-black border border-black rounded-[10px] px-10 py-[1.25rem]"
              onClick={handleCheckOut}
            >
              Check out
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Properties />
      </div>
    </>
  );
};

export default WishList;
