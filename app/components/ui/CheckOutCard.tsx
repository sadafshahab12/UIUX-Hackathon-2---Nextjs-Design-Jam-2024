import { poppins } from "@/app/fonts/font";
import Image from "next/image";
import React from "react";
import { TCheckOutCard } from "@/app/fonts/interface";
const CheckOutCard = ({ title, tag, src }: TCheckOutCard) => {
  return (
    <div className={`${poppins.className} flex-center lg:gap-3 md:gap-5 gap-2`}>
      <div>
        <Image
          src={src}
          alt="checkout-icon"
          width={500}
          height={500}
          className="lg:w-[50px] sm:w-[40px] w-[30px] lg:h-[50px] sm:h-[40px] h-[30px] object-cover"
        />
      </div>
      <div>
        <h1 className="lg:text-20 sm:text-18 text-16 font-semibold">{title}</h1>
        <p className="md:text-16 sm:text-14 text-12 text-[#898989]">{tag}</p>
      </div>
    </div>
  );
};

export default CheckOutCard;
