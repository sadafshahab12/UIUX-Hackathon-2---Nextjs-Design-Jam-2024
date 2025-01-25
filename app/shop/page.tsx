"use client";
import React, { useContext, useState } from "react";
import Hero from "../components/ui/Hero";

import Properties from "../components/ui/Properties";
import ShopPro from "../components/Products/ShopPro";
import { Input } from "@/components/ui/input";
import { ProductContext } from "../components/context/ProductContext";
import { IoIosSearch } from "react-icons/io";
import { CountContext, ProductType } from "../type/dataType";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const Shop = () => {
  const {
    searchQuery,
    handleSearchChange,
    filteredProducts,
    handleCategoryChange,
    handleClearSearchQuery,
  } = useContext(ProductContext) as CountContext;
  
  const productsPerPage = 12; // Number of products per page
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
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

          {searchQuery && filteredProducts.length > 0 && (
            <ul className="absolute left-0 bg-white  w-full border border-gray-300 rounded-md shadow-lg mt-2 z-50">
              {filteredProducts.map((product: ProductType) => (
                <li
                  key={product._id}
                  className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer"
                >
                  <Link
                    href={`/single-product/${product.slug.current}`}
                    onClick={handleClearSearchQuery}
                  >
                    {product.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
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
        <ShopPro products={paginatedProducts} />
      </div>
      {/* pagination  */}
      <div className="flex justify-center mt-6 xs:gap-4 xxs:gap-2 gap-1 text-sm">
        <button
          className="px-3 py-1 bg-gray-200 rounded-md sm:text-base xs:text-sm text-[0.6rem] md:text-[0.7rem]"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <div className="flex items-center xs:gap-4 xxs:gap-2 gap-1 overflow-x-auto">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 sm:text-base xs:text-sm text-[0.7rem] md:text-[0.8rem] ${currentPage === index + 1 ? "bg-[#f1d7b3] text-black" : "bg-gray-200"}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          className="px-3 py-1 mx-1 bg-gray-200 rounded-md sm:text-base xs:text-sm text-[0.6rem] md:text-[0.7rem]"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <div className="mt-10">
        <Properties />
      </div>
    </>
  );
};

export default Shop;
