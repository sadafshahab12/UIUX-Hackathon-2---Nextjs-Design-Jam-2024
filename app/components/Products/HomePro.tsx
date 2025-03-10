"use client";
import Image from "next/image";
import { CountContext, ProductType } from "@/app/type/dataType";
import { useContext, useEffect, useState } from "react";
import CardHover from "../ui/CardHover";
import { ProductContext } from "../context/ProductContext";
import Loading from "./Loading";
import Errpage from "@/app/single-product/errpage";

const HomeProducts = () => {
  const { product, loading, error } = useContext(
    ProductContext
  ) as CountContext;
  const [clientProduct, setClientProduct] = useState<ProductType[]>([]);

  // Ensure the product data is only updated on the client side
  useEffect(() => {
    if (product) {
      setClientProduct(product);
    }
  }, [product]);

  if (loading) return <Loading />;
  if (error) return <Errpage error={error} />;
  if (!clientProduct || clientProduct.length === 0)
    return <p>No products available</p>;

  return (
    <>
      {clientProduct
        .slice(0, 8)
        .map((furniture: ProductType, index: number) => {
          const discountPercentage = furniture.dicountPercentage || 0; // Fixed typo
          const discountPrice = (furniture.price * discountPercentage) / 100;
          const discounted = furniture.price - discountPrice;

          return (
            <div
              key={index}
              className="lg:w-[285px] md:w-[350px] sm:w-[300px] w-[250px] relative group transition duration-300 ease-in-out"
            >
              <div className="relative">
                <div className="w-full lg:h-[301px] md:h-[350px] h-[250px] cursor-pointer">
                  <Image
                    src={furniture.imageUrls[0]}
                    alt="RP-img"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                </div>
                {(furniture.isNew || discountPercentage > 0) && (
                  <div
                    className={`discount sm:h-[3rem] h-[2.5rem] sm:w-[3rem] w-[2.5rem] rounded-full flex-center text-white absolute top-3 right-5 ${
                      furniture.isNew ? "bg-[#2EC1AC]" : "bg-[#E97171]"
                    }`}
                  >
                    <p className="sm:text-14 text-12">
                      {furniture.isNew ? "New" : `${discountPercentage}%`}
                    </p>
                  </div>
                )}
              </div>
              <div className="content bg-[#F4F5F7] py-3 px-5 space-y-3 h-[8.5rem]">
                <h1 className="md:text-18 text-14 font-semibold">
                  {furniture.title}
                </h1>

                <div className="flex-between">
                  <p className="sm:text-16 text-14 font-medium">${discounted}</p>
                  <p className="sm:text-14 text-14 text-gray line-through">
                    ${!furniture.isNew && discountPercentage > 0
                      ? furniture.price
                      : ""}
                  </p>
                </div>
                <div className="flex-between">
                  {furniture.availableForRental && (
                    <p className="text-10 bg-gradient-to-br from-slate-800 to-black text-white py-1 px-3 rounded-xl">
                      Available for Rent
                    </p>
                  )}
                  <p
                    className={`text-12 ${furniture.isStock ? "text-green-700" : "text-red-500"}`}
                  >
                    {furniture.isStock
                      ? `Stock: ${furniture.stock}`
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

export default HomeProducts;
