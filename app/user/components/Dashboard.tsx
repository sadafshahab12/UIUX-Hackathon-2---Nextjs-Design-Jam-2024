import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <aside>
      <h1></h1>
      <nav className="flex flex-col gap-2 ">

        <Link href="/user" className="py-3 px-4 bg-gray-200">Dashboard</Link>
        <Link href="/user/settings" className="py-3 px-4 bg-gray-200">Settings</Link>
        <Link href="/user/orders" className="py-3 px-4 bg-gray-200">Orders</Link>
        <Link href="/user/wishlist" className="py-3 px-4 bg-gray-200">WishList</Link>

      </nav>
    </aside>
  );
};

export default Dashboard;
