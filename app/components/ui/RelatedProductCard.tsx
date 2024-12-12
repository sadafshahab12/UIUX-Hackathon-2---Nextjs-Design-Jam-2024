"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TRPCard } from "@/app/fonts/interface";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const RelatedProductCard = ({
  RPImg,
  productTitle,
  productType,
  priceWithDiscount,
  originalPrice,
  discount,
}: TRPCard) => {
  const [color, setColor] = useState<string>("");
  useEffect(() => {
    if (discount === "New") {
      setColor("#2EC1AC");
    } else if (discount?.includes("%")) {
      setColor("#E97171");
    } else {
      setColor("transparent");
    }
  }, [discount]);

  const route = useRouter();
  return (
    <>
      <div className=" lg:w-[285px] md:w-[350px] sm:w-[300px] w:[250px] relative group  transition duration-300 ease-in-out">
        <div className="relative">
          <div className="w-full lg:h-[301px] md:h-[350px] h-[250px] cursor-pointer">
            <Image
              src={RPImg}
              alt="RP-img"
              width={500}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            style={{ backgroundColor: color }}
            className="discount sm:h-[3rem] h-[2.5rem] sm:w-[3rem] w-[2.5rem]  rounded-full flex-center text-white absolute top-3 right-5"
          >
            <p className="sm:text-14 text-12">{discount}</p>
          </div>
        </div>
        <div className="content bg-[#F4F5F7] py-3 px-5 space-y-3">
          <h1 className="md:text-22 text-18 font-semibold">{productTitle}</h1>
          <p className="sm:text-16 text-14 text-gray">{productType}</p>
          <div className="flex-between">
            <p className="sm:text-18 text-14 font-medium">
              {priceWithDiscount}
            </p>
            <p className="sm:text-16 text-14 text-gray line-through">
              {originalPrice}
            </p>
          </div>
        </div>
        <div className="hover-content absolute top-0 left-0  h-full  hover:bg-[#3A3A3A]  w-full flex-center flex-col opacity-0 hover:opacity-70 transition duration-300 ease-in-out z-10 px-7">
          <div className="button mb-10">
            <Button
              className="text-[#B88E2F] bg-white rounded-none px-10"
              variant={"outline"}
              onClick={() => route.push("/single-product")}
            >
              Add to cart
            </Button>
          </div>
          <div className="icons flex-center sm:flex-row flex-col gap-4">
            <div className="flex-center gap-1 text-white cursor-pointer">
              <FontAwesomeIcon icon={faShareNodes} width={20} height={20} />
              <p className="text-[14px]">Share</p>
            </div>
            <div
              className="flex-center gap-1 text-white cursor-pointer"
              onClick={() => route.push("/productcomparison")}
            >
              <FontAwesomeIcon
                icon={faArrowRightArrowLeft}
                width={20}
                height={20}
              />
              <p className="text-[14px]">Compare</p>
            </div>
            <div className="flex-center gap-1 text-white cursor-pointer">
              <Image
                src="/images/hovericon.png"
                width={20}
                height={20}
                alt="heart"
              />
              <p className="text-[14px]">Like</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedProductCard;
