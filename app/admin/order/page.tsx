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

  // 🗑️ Handle Delete Order & Customer


  const handleDeleteOrder = async (orderId: string, customerId?: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (!result.isConfirmed) return;
  
    try {
      // 🛒 Delete order first
      await client.delete(orderId);
      console.log("Order deleted:", orderId);
  
      // 👤 Delete customer if they exist
      if (customerId) {
        await client.delete(customerId);
        console.log("Customer deleted:", customerId);
      }
  
      // 🔄 Update UI: Remove the deleted order from state
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
  
      // ✅ Success Alert
      Swal.fire({
        title: "Deleted!",
        text: "The order and customer have been deleted.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error deleting order and customer:", error);
  
      // ❌ Error Alert
      Swal.fire({
        title: "Error!",
        text: "Failed to delete order.",
        icon: "error",
      });
    }
  };
  

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
            <div key={item._id} className="border p-4 my-2 rounded-md flex gap-4">
              <Image src={item.productImage} alt={item.productTitle} className="w-32 h-32 object-cover" />
              <div>
                <h4 className="font-medium">{item.productTitle}</h4>
                <p>Price: ${item.productPrice}</p>
                <p>Quantity: {item.productQuantity}</p>
                <p>{item.productPrice * item.productQuantity}</p>
              </div>
            </div>
          ))}

          <button
            className="mt-4 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            onClick={() => handleDeleteOrder(order._id, order.customer?._id)}
          >
            <IoMdTrash className="text-lg" />
            Delete Order
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrderPage;
