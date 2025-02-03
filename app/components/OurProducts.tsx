import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import HomeProducts from "./Products/HomePro";


const OurProducts = () => {
  return (
    <>
      <div className="products">
        <div className="md:p-10 p-5">
          <h1 className="md:text-38 sm:text-34 xs:text-30 xss:text-28 text-26  font-bold text-center">
            Our Products
          </h1>
        </div>

        <div className="RP-card grid lg:grid-cols-4 xs:grid-cols-2 grid-cols-1 justify-items-center lg:gap-x-32 gap-5  ">
          <HomeProducts />
        </div>
        <div className="button text-center my-10">
          <Link href="/shop">
            <Button
              variant={"outline"}
              className="rounded-none border border-[#B88E2F]  font-semibold text-16 px-10 text-[#B88E2F] hover:text-[#d6a637] transition duration-300"
            >
              Show More
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OurProducts;
