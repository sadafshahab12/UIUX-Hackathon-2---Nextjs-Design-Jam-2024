import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <aside>
      <h1></h1>
      <nav className="flex flex-col">

        <Link href="/user">Dashboard</Link>
        <Link href="/user/settings">Settings</Link>
        <Link href="/user/orders">Orders</Link>
        <Link href="/user/wishlist">WishList</Link>

      </nav>
    </aside>
  );
};

export default Dashboard;
