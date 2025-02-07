"use client";
import { useEffect, useState, useCallback } from "react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Loading from "./loading";
import { Input } from "@/components/ui/input";
import { OrderPageType } from "@/app/type/dataType";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

const OrderPage = () => {
  const { user } = useUser(); // Get authenticated user from Clerk
  const [orders, setOrders] = useState<OrderPageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = orders.filter((order) =>
    order.cartItems.some((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="p-5 min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          placeholder="Search by product title..."
          className="px-5 py-2 border rounded-md w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Orders Table */}
      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-md shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Products</th>
                <th className="px-4 py-2 border">Created At</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="text-center border-t">
                  <td className="px-4 py-2 border">
                    {order.cartItems.map((item) => (
                      <div key={item._id} className="flex items-center gap-2">
                        <Image
                          src={item.imageUrls[0]}
                          alt={item.title}
                          className="w-10 h-10 rounded-md"
                          width={500}
                          height={500}
                        />
                        <span className="text-12">{item.title}</span>
                      </div>
                    ))}
                  </td>

                  <td className="px-4 py-2 border text-12">
                    {new Date(order._createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border text-12">
                    {order.cartItems.map((item) => {
                      const discount = item.dicountPercentage
                        ? (item.price * item.dicountPercentage) / 100
                        : 0;
                      return (
                        <div key={item._id}>
                          <p>${(item.price - discount).toFixed(2)}</p>
                        </div>
                      );
                    })}
                  </td>
                  <td className="px-4 py-2 border font-bold text-12">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td
                    className={`px-4 py-2 border text-12 ${
                      order.status === "pending"
                        ? "text-[#333] font-bold"
                        : order.status === "completed"
                          ? "text-[#22C55E] font-bold"
                          : order.status === "dispatch"
                            ? "text-[#3B82F6] font-bold"
                            : order.status === "delivered"
                              ? "text-[#14B8A6] font-bold"
                              : "text-[#EF4444] font-bold"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1).toLowerCase()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
