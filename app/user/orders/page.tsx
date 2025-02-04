"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Loading from "./loading";
import { Input } from "@/components/ui/input";
import { OrderPageType } from "@/app/type/dataType";
import Image from "next/image";

const OrderPage = () => {
  const [orders, setOrders] = useState<OrderPageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrders = async () => {
    const orderQuery = groq`*[_type == "order"]{
      _id,
      status,
      cartItems[]->{_id, title, price, discountPercentage, "imageUrls": productImage[].asset->url}, 
      _createdAt,
    }`;

    try {
      const data = await client.fetch(orderQuery);
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
              {filteredOrders.map((order) => {
                // Calculate total price for the order
                const totalPrice = order.cartItems.reduce((total, item) => {
                  const discount = item.dicountPercentage
                    ? (item.price * item.dicountPercentage) / 100
                    : 0;
                  const discountedPrice = item.price - discount;
                  return total + discountedPrice;
                }, 0);

                return (
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
                          <span>{item.title}</span>
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-2 border">
                      {new Date(order._createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border">
                      {order.cartItems.map((item) => {
                        const discount = item.dicountPercentage
                          ? (item.price * item.dicountPercentage) / 100
                          : 0;
                        const discountedPrice = item.price - discount;
                        return (
                          <div key={item._id}>
                            <p className="font-semibold">
                              ${discountedPrice.toFixed(2)}
                            </p>
                          </div>
                        );
                      })}
                    </td>
                    <td className="px-4 py-2 border font-bold text-green-600">
                      ${totalPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border">{order.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
