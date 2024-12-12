import { poppins } from "@/app/fonts/font";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { THeroSec } from "@/app/fonts/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Hero = ({ title, navName, navLink }: THeroSec) => {
  return (
    <div className={` ${poppins.className} relative md:mt-[5rem] mt-[3.8rem]`}>
      <div
        className={` bg-[url("/images/hero-bg.webp")] bg-center bg-cover h-[316px] absolute top-0 left-0 right-0 bottom-0`}
      ></div>

      <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-50 z-0"></div>

      <div className="relative z-10 flex-center flex-col h-[316px]">
        <Logo />
        <h1 className="sm:text-48 xs:text-40 text-34 text-center font-semibold">
          {title}
        </h1>
        <ul className="flex-center gap-3">
          <li>
            <Link href="/" className="font-medium">
              Home
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faChevronRight} width={12} height={12} />
          </li>
          <li>
            <Link href={navLink} className="font-light">
              {navName}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Hero;
