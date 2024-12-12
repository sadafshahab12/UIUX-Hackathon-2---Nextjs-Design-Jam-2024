"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import RelatedProductCard from "./ui/RelatedProductCard";
import { useRouter } from "next/navigation";

const OurProducts = () => {
  const route = useRouter();
  return (
    <>
      <div className="products">
        <div className="md:p-10 p-5">
          <h1 className="md:text-38 sm:text-34 xs:text-30 xss:text-28 text-26  font-bold text-center">
            Our Products
          </h1>
        </div>

        <div className="RP-card grid lg:grid-cols-4 xs:grid-cols-2 grid-cols-1 sm:justify-items-center lg:gap-32 gap-5  ">
          <RelatedProductCard
            RPImg="/related-produtcs/product1.png"
            productTitle="Syltherine"
            productType="Stylish cafe chair"
            priceWithDiscount="Rp 2.500.000"
            originalPrice="Rp 3.500.000"
            discount="-30%"
          />
          <RelatedProductCard
            RPImg="/related-produtcs/product2.png"
            productTitle="Leviosa"
            productType="Stylish cafe chair"
            priceWithDiscount="Rp 2.500.000"
          />
          <RelatedProductCard
            RPImg="/related-produtcs/product3.png"
            productTitle="Lolito"
            productType="Luxury big sofa"
            priceWithDiscount="Rp 7.000.000"
            originalPrice="Rp 14.000.000"
            discount="-50%"
          />
          <RelatedProductCard
            RPImg="/related-produtcs/product4.jpg"
            productTitle="Respira"
            productType="Outdoor bar table and stool"
            priceWithDiscount="Rp 500.000"
            discount="New"
          />
          <RelatedProductCard
            RPImg="/home-products/product1.png"
            productTitle="Grifo"
            productType="Night lamp"
            priceWithDiscount="Rp 1.500.000"
          />
          <RelatedProductCard
            RPImg="/home-products/product2.png"
            productTitle="Muggo"
            productType="Small mug"
            priceWithDiscount="Rp 150.000"
            discount="New"
          />
          <RelatedProductCard
            RPImg="/home-products/product3.jpg"
            productTitle="Pingky"
            productType="Cute bed set"
            priceWithDiscount="Rp 7.000.000"
            discount="-50%"
            originalPrice="Rp 14.000.000"
          />
          <RelatedProductCard
            RPImg="/home-products/product4.jpg"
            productTitle="Potty"
            productType="Minimalist flower pot"
            priceWithDiscount="Rp 500.000"
            discount="New"
          />
        </div>
        <div className="button text-center my-10">
          <Button
            variant={"outline"}
            className="rounded-none border border-[#B88E2F]  font-semibold text-16 px-10 text-[#B88E2F] hover:text-[#d6a637] transition duration-300"
            onClick={() => route.push("/shop")}
          >
            Show More
          </Button>
        </div>
      </div>
    </>
  );
};

export default OurProducts;
