import { TCartItem } from "@/app/fonts/interface";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

const CartItem = ({ cartImg, cartPrice, cartQty, cartTitle }: TCartItem) => {
  return (
    <>
      <div className="cart-item sm:flex-no-center sm:flex-row flex flex-col sm:gap-10 xss:gap-5 gap-2 relative">
        <div className="cross-icon text-gray text-20 cursor-pointer ml-10 sm:hidden block absolute right-5 top-10">
          <FontAwesomeIcon icon={faXmarkCircle} width={20} height={20} />
        </div>
        <div className="img sm:w-[100px] w-[80px] sm:h-[100px] h-[80px] bg-[#F9F1E7] rounded-[10px] cursor-pointer">
          <Image
            src={cartImg}
            alt="cart-item"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="content sm:space-y-4 space-y-2 ">
          <h1 className="sm:text-16 text-14">{cartTitle}</h1>
          <div className="flex-no-center gap-5 text-12">
            <p>{cartQty}</p>
            <p>X</p>
            <p className="text-[#B88E2F] ">{cartPrice}</p>
          </div>
        </div>
        <div className="cross-icon text-gray text-20 cursor-pointer ml-10 sm:block hidden">
          <FontAwesomeIcon icon={faXmarkCircle} width={20} height={20} />
        </div>
      </div>
    </>
  );
};

export default CartItem;
