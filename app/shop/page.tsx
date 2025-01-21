import React from "react";
import Hero from "../components/ui/Hero";
import Image from "next/image";
import { poppins } from "../fonts/font";
import MyPagination from "../components/ui/MyPagination";
import Properties from "../components/ui/Properties";
import ShopPro from "../components/Products/ShopPro";

const Shop = () => {
  return (
    <>
      <div>
        <Hero navName="Shop" navLink="/shop" title="Shop" />
      </div>
      <div
        className={`${poppins.className} bg-[#F9F1E7] md:py-6 py-4 lg:px-14 xs:px-7 px-4 sm:flex-between md:space-y-0 space-y-4`}
      >
        <div className="flex-no-center  gap-4">
          <div className="flex-no-center xs:gap-4 gap-2 cursor-pointer">
            <Image
              src="/shop-icon/system-uicons_filtering.png"
              alt="filter-icon"
              width={500}
              height={500}
              className="xs:w-[1.5rem] w-[1rem] xs:h-[1.5rem] h-[1rem] object-contain"
            />
            <p className="lg:text-18 xs:text-16 text-14">Filter</p>
          </div>
          <div className="cursor-pointer">
            <Image
              src="/shop-icon/ci_grid-big-round.png"
              alt="grid-icon"
              width={500}
              height={500}
              className="xs:w-[1.5rem] w-[1rem] xs:h-[1.5rem] h-[1rem] object-contain"
            />
          </div>
          <div className="cursor-pointer">
            <Image
              src="/shop-icon/bi_view-list.png"
              alt="grid-icon"
              width={20}
              height={20}
            />
          </div>
          <p>|</p>
          <div className="cursor-pointer">
            <p className="lg:text-16 xs:text-14 text-12 ">
              Showing 1–16 of 32 results
            </p>
          </div>
        </div>
        <div className="flex-no-center gap-4">
          <div className="flex-no-center xs:gap-4 gap-2">
            <p className="lg:text-16 xs:text-14 text-12">Show</p>
            <p className="bg-white py-2 lg:px-5 px-3 lg:text-16 text-14">16</p>
          </div>
          <div className="flex-no-center xs:gap-4 gap-2">
            <p className="lg:text-16 xs:text-14 text-12">Sort by</p>
            <p className="bg-white py-2 pl-5 lg:pr-14 pr-12 text-gray lg:text-16 text-14">
              Default
            </p>
          </div>
        </div>
      </div>

      <div className="RP-card grid lg:grid-cols-4 xs:grid-cols-2 grid-cols-1 lg:gap-x-20 md:gap-x-5 gap-x-5 lg:gap-y-5 gap-y-10 md:justify-items-center  py-10 lg:px-14 px-7">
        <ShopPro />
      </div>
      <div>
        <MyPagination />
      </div>
      <div className="mt-10">
        <Properties />
      </div>
    </>
  );
};

export default Shop;
