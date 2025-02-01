"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { IoMdTrash } from "react-icons/io";
import { OrderPageType } from "@/app/type/dataType";
import Swal from "sweetalert2";
import Image from "next/image";

const OrderPage = () => {
  const [orders, setOrders] = useState<OrderPageType[]>([]);

  const fetchOrders = async () => {
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
      const data = await client.fetch(orderQuery);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">Order Page</h1>
      {orders.length === 0 ? <p>No orders found.</p> : null}

      {orders.map((order) => (
        <div key={order._id} className="border p-4 my-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Order Details</h3>
          <p>Order Date: {new Date(order.order_date).toLocaleString()}</p>
          <h3 className="mt-3 font-semibold">Items:</h3>
          {order.items.map((item) => (
            <div
              key={item._id}
              className="border p-4 my-2 rounded-md flex gap-4"
            >
              <Image
                src={item.productImage}
                alt={item.productTitle}
                width={500}
                height={500}
                className="w-32 h-32 object-cover"
              />
              <div>
                <h4 className="font-medium">{item.productTitle}</h4>
                <p>Price: ${item.productPrice}</p>
                <p>Quantity: {item.productQuantity}</p>
                <p>{item.productPrice * item.productQuantity}</p>
              </div>
            </div>
          ))}{" "}
        </div>
      ))}
    </div>
  );
};

export default OrderPage;
