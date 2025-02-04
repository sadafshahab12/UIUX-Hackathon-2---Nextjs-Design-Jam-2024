"use client";
import { ProductContext } from "@/app/components/context/ProductContext";
import { CountContext } from "@/app/type/dataType";
import React, { useContext } from "react";
import Image from "next/image";

const WishlistPage = () => {
  const { wishlist } = useContext(ProductContext) as CountContext;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left border-b">Image</th>
                <th className="py-3 px-6 text-left border-b">Title</th>
                <th className="py-3 px-6 text-left border-b">Price</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition text-sm"
                >
                  <td className="py-3 px-6">
                    <Image
                      src={item.imageUrls[0]}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  </td>
                  <td className="py-3 px-6">{item.title}</td>
                  <td className="py-3 px-6 ">${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
