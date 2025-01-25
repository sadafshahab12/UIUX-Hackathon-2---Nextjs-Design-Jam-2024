"use client";
import React, { useContext } from "react";
import Hero from "../components/ui/Hero";

import Properties from "../components/ui/Properties";
import ShopPro from "../components/Products/ShopPro";
import { Input } from "@/components/ui/input";
import { ProductContext } from "../components/context/ProductContext";
import { IoIosSearch } from "react-icons/io";
import { CountContext } from "../type/dataType";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Shop = () => {
  const {
    searchQuery,
    handleSearchChange,
    filteredProducts,
    handleCategoryChange,
  } = useContext(ProductContext) as CountContext;
  return (
    <>
      <div>
        <Hero navName="Shop" navLink="/shop" title="Shop" />
      </div>
      <div className="bg-[#F9F1E7] md:py-6 py-4 lg:px-14 xs:px-7 px-4 flex-between sm:flex-row flex-col sm:gap-10 gap-5">
        <div className="search relative w-full">
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border border-slate-800 py-5 px-5 outline-none focus:outline-none w-full"
          />
          <IoIosSearch className="w-6 h-6 absolute  top-2 right-3" />
        </div>
        <div className="sm:w-[250px] w-full">
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full border border-slate-800 py-5 ">
              <SelectValue placeholder="Select by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Bed">Bed</SelectItem>
              <SelectItem value="Desk">Desk</SelectItem>
              <SelectItem value="Dining">Dining</SelectItem>
              <SelectItem value="Glass">Glass</SelectItem>
              <SelectItem value="Lamp">Lamp</SelectItem>
              <SelectItem value="Sofa">Sofa</SelectItem>
              <SelectItem value="Table">Table</SelectItem>
              <SelectItem value="Wooden">Wooden</SelectItem>
              <SelectItem value="Vintage">Vintage</SelectItem>

            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto RP-card grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 lg:gap-x-20 md:gap-x-5 gap-x-5 lg:gap-y-5 gap-y-10 md:justify-items-center  py-10 lg:px-14 px-7">
        <ShopPro products={filteredProducts} />
      </div>

      <div className="mt-10">
        <Properties />
      </div>
    </>
  );
};

export default Shop;
