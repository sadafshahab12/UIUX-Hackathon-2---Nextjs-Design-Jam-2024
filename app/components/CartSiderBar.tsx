"use client";
import Image from "next/image";
import { poppins } from "../fonts/font";
import CartItem from "./ui/CartItem";
import { Button } from "@/components/ui/button";
import { cartSideBarProps } from "../fonts/interface";
import { useRouter } from "next/navigation";

const CartSiderBar = ({ isOpen, onClose }: cartSideBarProps) => {
  const route = useRouter();
  if (!isOpen) return null;

  return (
    <>
      <div
        className={`${poppins.className} grid grid-rows-8 grid-cols-1 bg-white h-[800px] sm:w-[500px] xs:w-[450px] xss:2-[390px] w-[300px]`}
      >
        <div className="row-span-5">
          <div className=" flex-between sm:py-5 py-3 md:px-10 px-7">
            <h1 className="sm:text-22 text-18 font-bold">Shopping Cart</h1>
            <Image
              src="/images/shopping cart bag.png"
              alt="shopping-bag-icon"
              width={20}
              height={20}
              onClick={onClose}
              className="cursor-pointer sm:w-[1.5rem] w-[1rem] sm:h-[1.5rem] h-[1rem] object-contain"
            />
          </div>
          <div className="border-b border-gray-300 mt-3 md:mb-14 sm:mb-9 mb-5  md:px-20 sm:px-10 px-5"></div>

          <div className="sm:space-y-5 space-y-3 sm:px-10 px-5">
            <CartItem
              cartImg="/shopping-cart-img/cart1.png"
              cartQty={1}
              cartTitle="Asgaard sofa"
              cartPrice="Rs. 250,000.00"
            />
            <CartItem
              cartImg="/shopping-cart-img/cart2.jpg"
              cartQty={1}
              cartTitle="Casaliving Wood"
              cartPrice="Rs. 270,000.00"
            />
          </div>
        </div>
        <div>
          <div className="total flex-no-center sm:space-x-20 space-x-5 sm:px-10 px-5">
            <p className="sm:text-16 text-14">Subtotal</p>
            <p className="text-[#B88E2F] sm:text-16 text-14">Rs. 520,000.00</p>
          </div>

          <div className="border-b border-gray-300 mt-3 mb-5 "></div>
          <div className="button sm:space-x-5 space-x-2 sm:px-10 xss:px-5 px-2">
            <Button
              variant={"outline"}
              className="rounded-full border border-black  sm:text-12 text-10 sm:px-8 px-3"
              onClick={() => route.push("/cart")}
            >
              Cart
            </Button>
            <Button
              variant={"outline"}
              className="rounded-full border border-black  sm:text-12 text-10 sm:px-8 px-3"
              onClick={() => route.push("/checkout")}
            >
              Checkout
            </Button>
            <Button
              variant={"outline"}
              className="rounded-full border border-black  sm:text-12 text-10 sm:px-8 px-3"
              onClick={() => route.push("/productcomparison")}
            >
              Comparison
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSiderBar;
