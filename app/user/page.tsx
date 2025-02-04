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

  // Wrap fetchOrders with useCallback
  const fetchOrders = useCallback(async () => {
    if (!user) return;
    const orderQuery = groq`
      *[_type == "order"] | order(_createdAt desc) {
        _id,
        order_date,
        _createdAt,
        _updatedAt,
        items[] {
          _type,
          _id,
          productTitle,
          productPrice,
          productQuantity,
          productImage
        },
        customer-> {
          _id,
          firstname,
          lastname,
          email,
          phone,
          streetAddress,
          city,
          zipCode,
          country,
          province,
          additionalInfo
        }
      }
    `;
    try {
      const data = await client.fetch(orderQuery, { userId: user.id });
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, [user]); // `useCallback` ensures fetchOrders is memoized and does not change on every render

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]); // Dependencies remain stable

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
