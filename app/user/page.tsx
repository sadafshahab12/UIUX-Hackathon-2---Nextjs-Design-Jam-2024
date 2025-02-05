"use client";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { CountContext, OrderPageType } from "../type/dataType";
import { useUser } from "@clerk/clerk-react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import DashboardCard from "../components/ui/DashboardCard";
import { ProductContext } from "../components/context/ProductContext";

const DashboardPage = () => {
  const [orders, setOrders] = useState<OrderPageType[]>([]);
  const { wishlist } = useContext(ProductContext) as CountContext;
  const { user } = useUser();

  // Fetch orders only for the logged-in user
  const fetchOrders = useCallback(async () => {
    if (!user) return;

    const orderQuery = groq`*[_type == "order" && customer->userId == $userId]{
      _id,
      status,
      customer->{
        _id,
        firstName,
        lastName,
        email
      },
      cartItems[]->{
        _id,
        title,
        price,
        discountPercentage,
        quantity,
        "imageUrls": productImage[].asset->url
      },
      _createdAt,
      totalPrice
    }`;
    try {
      const data = await client.fetch(orderQuery, { userId: user.id });
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]);

  return (
    <div className="p-5">
      {/* Welcome Banner */}
      <div className="mb-5">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <p>Here you can view your recent activity and manage your account.</p>
      </div>

      {/* Dashboard Overview Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <DashboardCard items="Orders" qty={orders.length} />
        <DashboardCard
          items="Last Visit"
          qty={
            user?.lastSignInAt
              ? new Date(user.lastSignInAt).toLocaleString()
              : "Never"
          }
        />
        <DashboardCard items="Wishlist" qty={wishlist.length} />
      </div>
    </div>
  );
};

export default DashboardPage;
