"use client";
import Image from "next/image";
import { BiSolidDashboard } from "react-icons/bi";
import React, { useContext, useState } from "react";
import { montserrat, poppins } from "../fonts/font";
import Link from "next/link";
import Logo from "./ui/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ProductContext } from "./context/ProductContext";
import { CountContext } from "../type/dataType";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { cartItems, wishlist } = useContext(ProductContext) as CountContext;
  const [left, setLeft] = useState("-100%");
  const router = useRouter();
  const toggleMenu = () => {
    setLeft((prevLeft) => (prevLeft === "-100%" ? "0%" : "-100%"));
  };
  const closeMenu = () => {
    setLeft("-100%");
  };
  const { isSignedIn, isLoaded } = useUser();
  return (
    <>
      <header className="fixed top-0 z-50 bg-white w-full">
        <nav className="flex justify-between md:px-10 px-8 py-3">
          <div className="menu-bar cursor-pointer flex items-center gap-4">
            <FontAwesomeIcon
              icon={faBars}
              width={25}
              height={25}
              className="md:hidden block"
              onClick={toggleMenu}
            />
            <div className="logo flex items-center md:gap-3 gap-1">
              <Logo />
              <h1
                className={`${montserrat.className} md:text-[34px] xs:text-[30px] text-[25px] font-bold`}
              >
                Furniro
              </h1>
            </div>
          </div>

          <ul
            className={`${poppins.className} md:flex items-center hidden lg:gap-20 gap-10`}
          >
            <li>
              <Link href="/" className="text-16 font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="text-16 font-medium">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-16 font-medium">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-16 font-medium">
                Contact
              </Link>
            </li>
          </ul>
          {/* mobile nav  */}
          <ul
            style={{ left }}
            className={`${poppins.className} md:hidden block w-full text-center h-screen space-y-8 py-5 px-10 absolute top-14 left-0 bg-white transition-all duration-300 ease-in z-50`}
          >
            <li onClick={closeMenu}>
              <Link href="/" className="text-16 font-medium">
                Home
              </Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="/shop" className="text-16 font-medium">
                Shop
              </Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="/blog" className="text-16 font-medium">
                Blog
              </Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="/contact" className="text-16 font-medium">
                Contact
              </Link>
            </li>
          </ul>
          <div className="icons flex items-center lg:gap-5 gap-3">
            {isLoaded &&
              (isSignedIn ? (
                <>
                  <div className="xs:block hidden lg:w-[28px] w-[20px] lg:h-[28px] h-[20px] cursor-pointer">
                    <Link href="/user">
                      <UserButton>
                        <UserButton.MenuItems>
                          <UserButton.Action
                            label="Dashboard"
                            labelIcon={<BiSolidDashboard />}
                            onClick={() => router.push("/user")}
                          />
                        </UserButton.MenuItems>
                      </UserButton>
                    </Link>
                  </div>

                  <div className="xs:block hidden md:w-[28px] w-[20px] md:h-[28px] h-[20px] cursor-pointer relative">
                    <Link href="/wishlist">
                      <Image
                        src="/nav-icon/akar-icons_heart.png"
                        width={500}
                        height={500}
                        alt="nav-icon"
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <p className="absolute -top-2 -right-2 bg-yellow-400 w-5 h- text-sm flex justify-center items-center rounded-full">
                      {wishlist.length}
                    </p>
                  </div>
                  <div className="md:w-[28px] w-[20px] md:h-[28px] h-[20px] cursor-pointer relative">
                    <Link href={"/cart"}>
                      <Image
                        src="/nav-icon/ant-design_shopping-cart-outlined.png"
                        width={500}
                        height={500}
                        alt="nav-icon"
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <p className="absolute -top-2 -right-2 bg-yellow-400 w-5 h- text-sm flex justify-center items-center rounded-full">
                      {cartItems.length}
                    </p>
                  </div>
                </>
              ) : (
                <Link href="/sign-in">
                  <button className="text-[0.75rem] bg-slate-800 text-white cursor-pointer py-2 px-3">
                    Signin
                  </button>
                </Link>
              ))}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
