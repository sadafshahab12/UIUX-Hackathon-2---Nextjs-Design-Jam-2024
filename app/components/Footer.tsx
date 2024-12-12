import React from "react";
import { poppins } from "../fonts/font";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <>
      <footer
        className={`${poppins.className} border-t border-gray-300 lg:p-14 sm:p-10 p-8`}
      >
        <div className="grid lg:grid-cols-5 md:grid-cols-4 xs:grid-cols-2 grid-cols-1 md:gap-4 xs:gap-2 gap-10  pb-10">
          <div className="sec1 md:space-y-8 space-y-6">
            <h1 className="font-bold text-24">Funiro.</h1>
            <p className="text-[#9F9F9F] md:text-16 text-14">
              400 University Drive Suite 200 Coral Gables, FL 33134 USA
            </p>
          </div>
          <div className="sec2 md:justify-self-center">
            <h3 className="text-[#9F9F9F] text-16 md:pb-8 pb-4">Links</h3>
            <ul className="md:space-y-6 md:space-x-0 sm:space-x-6 xs:space-x-3 space-x-5 flex md:flex-col flex-row">
              <li className="md:text-16 text-14">
                <Link href="/">Home</Link>
              </li>
              <li className="md:text-16 text-14">
                <Link href="/shop">Shop</Link>
              </li>
              <li className="md:text-16 text-14">
                <Link href="/blog">About</Link>
              </li>
              <li className="md:text-16 text-14">
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="sec3 md:justify-self-center">
            <h3 className="text-[#9F9F9F] text-16 md:pb-8 pb-4">Help</h3>
            <ul className="md:text-16 text-14 md:space-y-6 md:space-x-0 sm:space-x-3 space-x-0  sm:space-y-0 space-y-3  flex md:flex-col sm:flex-row flex-col">
              <li>
                <Link href="/">Payment Options</Link>
              </li>
              <li>
                <Link href="/">Returns</Link>
              </li>
              <li>
                <Link href="/">Privacy Policies</Link>
              </li>
            </ul>
          </div>
          <div className="sec4 lg:col-span-2 col-span-1">
            <h3 className="text-[#9F9F9F] text-16 md:pb-5 pb-3">Newsletter</h3>
            <form className="flex lg:flex-row flex-col gap-4">
              <Input
                placeholder="Enter Your Email Address"
                className="rounded-none border-l-0 border-t-0 border-r-0 border-b border-black  p-0"
              />
              <Button
                variant={"outline"}
                className="rounded-none border-b border-l-0 border-t-0 border-r-0 border-black "
              >
                {" "}
                SUBSCRIBE
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t xs:text-16 text-14  border-gray-300  pt-8">
          2024 funiro. All rights reverved
        </div>
      </footer>
    </>
  );
};

export default Footer;
