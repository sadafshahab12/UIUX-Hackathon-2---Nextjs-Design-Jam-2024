"use client";
import { ProductContext } from "@/app/components/context/ProductContext";
import { CountContext } from "@/app/type/dataType";
import React, { useContext } from "react";
import Image from "next/image";
import { IoMdTrash } from "react-icons/io";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useContext(ProductContext) as CountContext;

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
                <th className="py-3 px-6 text-left border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50 transition text-sm">
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
                  <td className="py-3 px-6">
                    <button
                      onClick={() => removeFromWishlist(item._id)}
                      className="text-red-500 border border-red-500 px-2 py-2 rounded-md hover:bg-red-500 hover:text-white transition text-lg"
                    >
                      <IoMdTrash/>
                    </button>
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

export default WishlistPage;
