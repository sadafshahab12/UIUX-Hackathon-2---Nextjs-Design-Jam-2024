"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { CountContext, ProductType } from "@/app/type/dataType";
import CardHover from "../ui/CardHover";
import Loading from "./Loading";
import { ProductContext } from "../context/ProductContext";

const ShopPro = ({ products }: { products: ProductType[] }) => {
  const {loading} = useContext(ProductContext) as CountContext
  if (loading) {
    return (

        <Loading />
    );
  }
  return (
    <>
      {products.map((furniture: ProductType, index: number) => {
        const discountPrice =
          (furniture.price * furniture.dicountPercentage) / 100;
        const discounted = furniture.price - discountPrice;

        // Check if there's a valid image URL before rendering Image
        const imageUrl = furniture.imageUrls?.[0] || null;

        return (
          <div
            key={index}
            className=" md:w-[285px] sm:w-[300px] w:[250px] relative group  transition duration-300 ease-in-out"
          >
            <div className="relative">
              <div className="w-full lg:h-[301px] md:h-[300px] h-[250px] cursor-pointer">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={furniture.title || "Furniture Image"}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {(furniture.isNew || furniture.dicountPercentage > 0) && (
                <div
                  className={`discount sm:h-[3rem] h-[2.5rem] sm:w-[3rem] w-[2.5rem] rounded-full flex-center text-white absolute top-3 right-5 ${
                    furniture.isNew ? "bg-[#2EC1AC]" : "bg-[#E97171]"
                  }`}
                >
                  <p className="sm:text-14 text-12">
                    {furniture.isNew
                      ? "New"
                      : `${furniture.dicountPercentage}%`}
                  </p>
                </div>
              )}
            </div>
            <div className="content bg-[#F4F5F7] py-3 px-5 space-y-3 h-[10rem]">
              <h1 className="md:text-18 text-14 font-semibold">
                {furniture.title}
              </h1>

              <div className="flex-between">
                <p className="sm:text-16 text-14 font-medium">{discounted}</p>
                <p className="sm:text-14 text-14 text-gray line-through">
                  {!furniture.isNew && furniture.dicountPercentage > 0
                    ? furniture.price
                    : ""}
                </p>
              </div>
              <div className="flex-between">
                <p
                  className={`text-10 bg-gradient-to-br from-slate-800 to-black text-white py-1 px-3 rounded-xl ${
                    furniture.availableForRental ? "inline" : "hidden"
                  }`}
                >
                  {furniture.availableForRental ? "Available for Rent" : ""}
                </p>
                <p
                  className={`text-12 ${
                    furniture.isStock ? "text-green-700" : "text-red-500"
                  }`}
                >
                  {furniture.isStock
                    ? `Stock : ${furniture.stock}`
                    : "Out of Stock"}
                </p>
              </div>
            </div>
            <CardHover slug={furniture.slug.current} />
          </div>
        );
      })}
    </>
  );
};

export default ShopPro;
