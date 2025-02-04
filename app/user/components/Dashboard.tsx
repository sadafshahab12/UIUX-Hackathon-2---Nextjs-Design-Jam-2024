"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import clsx from "clsx";
import { RiDashboardFill } from "react-icons/ri";
import { BsBorderWidth } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
const Dashboard = () => {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <aside className="">
      <nav className="flex flex-col gap-2 bg-yellow-800 h-full w-[20rem] ">
        <div className="text-center flex flex-col justify-center items-center p-5 gap-3">
          <p className="text-sm ">
            Hi! <span className="font-bold ">{user?.fullName}</span>
          </p>
          <h1 className="text-xl font-bold capitalize  ">
            Welcome to your dashboard
          </h1>

          {user && (
            <Image
              src={user?.imageUrl || "/default-profile.png"}
              alt="user-profile"
              width={500}
              height={500}
              className="w-12 h-12 rounded-full"
            />
          )}
        </div>
        <div className="flex flex-col gap-3 p-5">
          <Link
            href="/user"
            className={clsx("py-3 px-4 bg-slate-800 text-white hover:bg-slate-600 rounded-md transition-all ease-in duration-200 flex items-center gap-3", {"border-2 p-1 border-white text-white": pathname === "/user"})}
          >
            <RiDashboardFill /> Dashboard
          </Link>
          <Link
            href="/user/orders"
            className={clsx("py-3 px-4 bg-slate-800 text-white hover:bg-slate-600 rounded-md transition-all ease-in duration-200 flex items-center gap-3", {"border-2 p-1 border-white text-white": pathname === "/user/orders"})}
          >
          <BsBorderWidth />  Orders
          </Link>
          <Link
            href="/user/user-wishlist"
            className={clsx("py-3 px-4 bg-slate-800 text-white hover:bg-slate-600 rounded-md transition-all ease-in duration-200 flex items-center gap-3", {"border-2 p-1 border-white text-white": pathname === "/user/user-wishlist"})}
          >
          <FaRegHeart />  Wishlist
          </Link>
        
      
          <Link
            href="/user/payment"
            className={clsx("py-3 px-4 bg-slate-800 text-white hover:bg-slate-600 rounded-md transition-all ease-in duration-200 flex items-center gap-3", {"border-2 p-1 border-white text-white": pathname === "/user/payment"})}
          >
            Payment
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Dashboard;
