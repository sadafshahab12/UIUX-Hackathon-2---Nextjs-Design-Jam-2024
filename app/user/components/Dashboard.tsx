"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  const { user } = useUser();
  console.log(user);

  return (
    <aside className="">
      <h1></h1>
      <nav className="flex flex-col gap-2 bg-[#facc15] h-screen w-[25rem] ">
        <div className="text-center flex flex-col justify-center items-center p-5 gap-3">
          <p className="text-sm">
            Hi! <span className="font-bold">{user?.fullName}</span>
          </p>
          <h1 className="text-xl font-bold capitalize">
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
        <div className="flex flex-col gap-2 p-5">
          <Link
            href="/user"
            className="py-3 px-4 bg-yellow-100 hover:bg-yellow-200   "
          >
            Dashboard
          </Link>
          <Link
            href="/user/settings"
            className="py-3 px-4 bg-yellow-100 hover:bg-yellow-200  "
          >
            Settings
          </Link>
          <Link href="/user/orders" className="py-3 px-4 bg-gray-200">
            Orders
          </Link>
          <Link href="/user/payment" className="py-3 px-4 bg-gray-200">
            Payment
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Dashboard;
