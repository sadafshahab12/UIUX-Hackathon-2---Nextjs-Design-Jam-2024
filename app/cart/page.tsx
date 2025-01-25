"use client";
import React from "react";
import Hero from "../components/ui/Hero";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { poppins } from "../fonts/font";
import Properties from "../components/ui/Properties";
import { useRouter } from "next/navigation";

const Cart = () => {
  const route = useRouter();
  return (
    <>
      <div>
        <Hero navName="Cart" title="Cart" navLink="/cart" />
      </div>
      <div
        className={` ${poppins.className} lg:py-10 xs:py-5 py-3 lg:px-14 xs:px-7 px-3 grid lg:grid-cols-3 grid-cols-1 lg:gap-8 gap-6`}
      >
        <div className="part sm:col-span-2 col-span-1">
          <div className="cart-nav sm:mb-10 mb-5">
            <ul className="bg-[#F9F1E7] grid sm:grid-cols-6 xs:grid-cols-5  xss:grid-cols-4 grid-cols-3 items-center sm:pl-0 pl-5  py-3 ">
              <li className="sm:col-start-2 col-start-1">
                <Link
                  href="/"
                  className="lg:text-16 sm:text-14 text-12 font-medium"
                >
                  Product
                </Link>
              </li>
              <li className="xss:block hidden">
                <Link
                  href="/"
                  className="lg:text-16 sm:text-14 text-12 font-medium"
                >
                  Price
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="lg:text-16 sm:text-14 text-12 font-medium"
                >
                  Quantity
                </Link>
              </li>
              <li className="xs:block hidden">
                <Link
                  href="/"
                  className="lg:text-16 sm:text-14 text-12 font-medium"
                >
                  Subtotal
                </Link>
              </li>
            </ul>
          </div>
          <div className="cart-product-details">
            <div className="product-details grid sm:grid-cols-6 xs:grid-cols-5 grid-cols-4 items-center">
              <div className="bg-[#FAF3EA] p-2 lg:w-[108px] w-[90px] lg:h-[105px] h-[90px]  rounded-lg">
                <Image
                  src="/product-comp-img/pro-2.png"
                  alt="post-img"
                  width={500}
                  height={500}
                  className="w-full h-full  object-cover rounded-lg cursor-pointer"
                />
              </div>
              <div className="details col-span-5">
                <ul className="grid xs:grid-cols-5 xss:grid-cols-4 grid-cols-3  items-center py-3 ">
                  <li className="text-gray lg:text-16 sm:text-14 text-12">
                    Asgaard sofa
                  </li>
                  <li className="xss:block hidden text-gray lg:text-16 sm:text-14 text-12">
                    Rs. 250,000.00
                  </li>
                  <li className="pl-5">
                    <Button
                      variant={"secondary"}
                      className="bg-transparent border border-black lg:text-16 text-14"
                    >
                      1
                    </Button>
                  </li>
                  <li className="lg:text-16 sm:text-14 text-12 xs:block hidden">
                    Rs. 250,000.00
                  </li>
                  <li className="justify-self-center">
                    <Image
                      src="/cart-icon/ant-design_delete-filled.png"
                      alt="cart-icon"
                      width={30}
                      height={30}
                      className="cursor-pointer lg:w-[2rem] w-[1.5rem] lg:h-[2rem] h-[1.5rem] object-cover"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="part2 bg-[#F9F1E7] pt-5 lg:px-16 px-10 lg:pb-14 pb-10 text-center">
          <h1 className="lg:text-30 text-24 font-semibold lg:mb-10 mb-6">
            Cart Totals
          </h1>
          <div className="space-y-6">
            <div className=" flex-between">
              <p className="lg:text-16 text-14 font-medium">Subtotal</p>
              <p className="lg:text-16 text-14 text-gray">Rs. 250,000.00</p>
            </div>
            <div className=" flex-between">
              <p className="lg:text-16 text-14 font-medium">Total</p>
              <p className="lg:text-20 text-18 font-medium text-[#B88E2F]">
                Rs. 250,000.00
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Button
              variant={"secondary"}
              className="bg-transparent text-black border border-black rounded-[10px] px-10 py-[1.25rem]"
              onClick={() => route.push("/checkout")}
            >
              Check Out
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

export default Cart;