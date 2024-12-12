"use client";
import React from "react";
import Hero from "../components/ui/Hero";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { poppins } from "../fonts/font";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import Properties from "../components/ui/Properties";
import { useRouter } from "next/navigation";

const ProductComparison = () => {
  const route = useRouter();
  return (
    <>
      <div>
        <Hero
          title="Product Comparison"
          navLink="/productcomparison"
          navName="Comparison"
        />
      </div>
      <div className="grid md:grid-cols-4 xs:grid-cols-2 grid-cols-1 gap-4 p-5">
        <div className={` ${poppins.className} sec1`}>
          <h1 className="lg:text-26 sm:text-20 text-18 font-semibold">
            Go to Product page for more Products
          </h1>
          <Link
            href="/shop"
            className="underline underline-offset-8 text-[#727272]"
          >
            View More
          </Link>
        </div>
        <div
          className={` ${poppins.className} sec2 md:order-none xs:order-3 order-3`}
        >
          <div className="image bg-[#F9F1E7] lg:p-5 p-3">
            <Image
              src="/product-comp-img/pro-2.png"
              alt="product"
              width={500}
              height={500}
              className="lg:w-[239px] w-[200px] lg:h-[142px] h-[130px] object-cover"
            />
          </div>
          <div className="content ">
            <h1 className="lg:text-20 xs:text-18 text-14 font-semibold">
              Asgaard Sofa
            </h1>
            <p className="lg:text-16 xs:text-14 text-12 font-medium">
              Rs. 250,000.00
            </p>
            <div className="flex-no-center gap-2">
              <p className="lg:text-16 xs:text-14 text-12 font-medium">4.7</p>
              <div className="text-[#FFC700] flex-no-center lg:gap-2 gap-0   border-r-2">
                <FontAwesomeIcon icon={faStar} width={15} height={15} />
                <FontAwesomeIcon icon={faStar} width={15} height={15} />
                <FontAwesomeIcon icon={faStar} width={15} height={15} />
                <FontAwesomeIcon icon={faStar} width={15} height={15} />
                <FontAwesomeIcon icon={faStarHalf} width={15} height={15} />
              </div>

              <p className="text-[13px]">204 Review</p>
            </div>
          </div>
        </div>
        <div
          className={` ${poppins.className} sec3 md:order-none xs:order-4 order-4`}
        >
          <div className="image overflow-hidden bg-[#F9F1E7]  lg:p-5 p-3 flex-center">
            <Image
              src="/product-comp-img/pro1.png"
              alt="product"
              width={500}
              height={500}
              className="lg:w-[239px] w-[200px] lg:h-[142px] h-[130px] object-cover"
            />
          </div>
          <div className="content ">
            <h1 className="lg:text-20 xs:text-18 text-14 font-semibold">
              Outdoor Sofa Set
            </h1>
            <p className="lg:text-16 xs:text-14 text-12 font-medium">
              Rs. 224,000.00
            </p>
            <div className="flex-no-center gap-2">
              <p className="lg:text-16 xs:text-14 text-12 font-medium">4.2</p>
              <div className="text-[#FFC700] flex-no-center lg:gap-2 gap-0  border-r-2">
                <FontAwesomeIcon icon={faStar} width={15} height={15} />
                <FontAwesomeIcon icon={faStar} width={15} height={15} />
                <FontAwesomeIcon icon={faStar} width={15} height={15} />
                <FontAwesomeIcon icon={faStar} width={15} height={15} />
                <FontAwesomeIcon icon={faStarHalf} width={15} height={15} />
              </div>

              <p className="text-[13px]">145 Review</p>
            </div>
          </div>
        </div>
        <div className={` ${poppins.className} sec4 md:order-none order-2`}>
          <h1 className="lg:text-20 xs:text-18 text-16 font-bold mb-4">
            Add A Product
          </h1>
          <Select>
            <SelectTrigger className="w-full border-none text-white py-4 bg-[#B88E2F]">
              <SelectValue placeholder="Choose a Product" className="text-14" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sofa">Sofa</SelectItem>
              <SelectItem value="bed">Bed</SelectItem>
              <SelectItem value="chair">Chair</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div
        className={`${poppins.className} grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 grid-rows-[auto,1fr]  border-t border-gray-400 mx-4 mt-4`}
      >
        <div className="list1 sm:border-r border-0 border-gray-400 lg:p-10 p-5">
          <h1 className="lg:text-26 text-24 font-semibold pb-5 ">General</h1>
          <ul className="lg:text-16 text-14  sm:space-y-5 space-y-2 ">
            <li>Sales Package</li>
            <li>Model Number</li>
            <li>Secondary Material</li>
            <li>Configuration</li>
            <li>Upholstery Material</li>
            <li>Upholstery Color</li>
          </ul>
        </div>
        <div className="list2 sm:border-r border-0 border-gray-400 lg:pt-[6rem] sm:pt-[4.8rem]  pt-[1rem] lg:px-10 px-5">
          <ul className="lg:text-16 text-14  sm:space-y-5 space-y-2">
            <li>1 sectional sofa</li>
            <li>TFCBLIGRBL6SRHS</li>
            <li>Solid Wood</li>
            <li>L-shaped</li>
            <li>Fabric + Cotton</li>
            <li>Bright Grey & Lion</li>
          </ul>
        </div>
        <div className="list3 sm:border-r border-0 border-gray-400 lg:pt-[6rem] sm:pt-[4.8rem]  pt-[1.5rem] lg:px-10 px-5">
          <ul className="lg:text-16 text-14  sm:space-y-5 space-y-2 ">
            <li>1 Three Seater, 2 Single Seater</li>
            <li>DTUBLIGRBL568</li>
            <li>Solid Wood</li>
            <li>L-shaped</li>
            <li>Fabric + Cotton</li>
            <li>Bright Grey & Lion</li>
          </ul>
        </div>
        <div className="list4"></div>
      </div>
      <div
        className={`${poppins.className} grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 grid-rows-[auto,1fr]  mx-4`}
      >
        <div className="list1 sm:border-r border-0 border-gray-400 lg:p-10 p-5">
          <h1 className="lg:text-26 text-24 font-semibold pb-5 ">Product</h1>
          <ul className="lg:text-16 text-14  sm:space-y-5 space-y-2 ">
            <li>Filling Material</li>
            <li>Finish Type</li>
            <li>Adjustable Headrest</li>
            <li>Maximum Load Capacity</li>
            <li>Origin of Manufacture</li>
          </ul>
        </div>
        <div className="list2 sm:border-r border-0 border-gray-400 lg:pt-[6rem] sm:pt-[4.8rem]  pt-[1rem] lg:px-10 px-5">
          <ul className="lg:text-16 text-14 sm:space-y-5 space-y-2">
            <li>Foam</li>
            <li>Bright Grey & Lion</li>
            <li>No</li>
            <li>280 KG</li>
            <li>India</li>
          </ul>
        </div>
        <div className="list3 sm:border-r border-0 border-gray-400 lg:pt-[6rem] sm:pt-[4.8rem]  pt-[1.5rem] lg:px-10 px-5">
          <ul className="lg:text-16 text-14  sm:space-y-5 space-y-2">
            <li>Matte</li>
            <li>Bright Grey & Lion</li>
            <li>yes</li>
            <li>300 KG</li>
            <li>India</li>
          </ul>
        </div>
        <div className="list4"></div>
      </div>
      <div
        className={`${poppins.className} grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-1  grid-rows-[auto,1fr]  mx-4`}
      >
        <div className="list1 sm:border-r border-0 border-gray-400 lg:p-10 p-5">
          <h1 className="lg:text-26 text-24 font-semibold pb-5 ">Dimensions</h1>
          <ul className="lg:text-16 text-14  sm:space-y-5 space-y-2 ">
            <li>Width</li>
            <li>Height</li>
            <li>Depth</li>
            <li>Weight</li>
            <li>Seat Height</li>
            <li>Leg Height</li>
          </ul>
        </div>
        <div className="list2 sm:border-r border-0 border-gray-400 lg:pt-[6rem] sm:pt-[4.8rem]  pt-[1rem] lg:px-10 px-5">
          <ul className="lg:text-16 text-14  sm:space-y-5 space-y-2">
            <li>265.32 cm</li>
            <li>76 cm</li>
            <li>167.76 cm</li>
            <li>45 KG</li>
            <li>41.52 cm</li>
            <li>5.46 cm</li>
          </ul>
        </div>
        <div className="list3 sm:border-r border-0 border-gray-400 lg:pt-[6rem] sm:pt-[4.8rem]  pt-[1.5rem] lg:px-10 px-5">
          <ul className="lg:text-16 text-14  sm:space-y-5 space-y-2">
            <li>265.32 cm</li>
            <li>76 cm</li>
            <li>167.76 cm</li>
            <li>65 KG</li>
            <li>41.52 cm</li>
            <li>5.46 cm</li>
          </ul>
        </div>
        <div className="list4"></div>
      </div>
      <div
        className={`${poppins.className} grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 grid-rows-[auto,1fr]  mx-4`}
      >
        <div className="list1 sm:border-r border-0 border-gray-400 lg:p-10 p-5">
          <h1 className="lg:text-26 text-24 font-semibold pb-5 ">Warranty</h1>
          <ul className="lg:text-16 text-14  sm:space-y-5 space-y-2">
            <li>Warranty Summary</li>
            <li>Warranty Service </li>
            <li>Type</li>
            <li>Covered in Warranty</li>
            <li>Not Covered in Warranty</li>
            <li>Domestic Warranty</li>
          </ul>
        </div>
        <div className="list2 sm:border-r border-0 border-gray-400 lg:pt-[6rem] sm:pt-[4.8rem]  pt-[1rem] lg:px-10 px-5">
          <ul className="lg:text-16 md:text-14 sm:text-12 text-14 space-y-5">
            <li>1 Year Manufacturing Warranty</li>
            <li className="text-wrap">
              For Warranty Claims or Any Product Related Issues Please Email at
              operations@trevifurniture.com
            </li>
            <li>Warranty Against Manufacturing Defect</li>
            <li>
              The Warranty Does Not Cover Damages Due To Usage Of The Product
              Beyond Its Intended Use And Wear & Tear
            </li>{" "}
            <li>In The Natural Course Of Product Usage.</li>
            <li>1 Year</li>
          </ul>
          <Button
            className="bg-[#B88E2F] text-18 text-white rounded-none px-10 py-5 mt-11 "
            onClick={() => route.push("/cart")}
          >
            Add To Cart
          </Button>
        </div>
        <div className="list3 sm:border-r border-0 border-gray-400 lg:pt-[6rem] sm:pt-[4.8rem]  pt-[1rem] lg:px-10 px-5">
          <ul className="lg:text-16 md:text-14 sm:text-12 text-14 space-y-5">
            <li>1.2 Year Manufacturing Warranty</li>
            <li className="text-wrap">
              For Warranty Claims or Any Product Related Issues Please Email at
              support@xyz.com
            </li>
            <li>
              Warranty of the product is limited to manufacturing defects only.
            </li>
            <li>
              The Warranty Does Not Cover Damages Due To Usage Of The Product
              Beyond Its Intended Use And Wear & Tear
            </li>{" "}
            <li>In The Natural Course Of Product Usage.</li>
            <li>3 Months</li>
          </ul>
          <Button
            className="bg-[#B88E2F] text-18 text-white rounded-none px-10 py-5 mt-5 "
            onClick={() => route.push("/cart")}
          >
            Add To Cart
          </Button>
        </div>

        <div className="list4"></div>
      </div>
      <div className="mt-14">
        <Properties />
      </div>
    </>
  );
};

export default ProductComparison;
