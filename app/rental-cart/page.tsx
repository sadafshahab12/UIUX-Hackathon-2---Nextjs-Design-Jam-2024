"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const RentalCart = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const product = searchParams.get("product");

  const rentalProduct = product ? JSON.parse(product) : null;

  // State for quantity
  const [quantity, setQuantity] = useState(
    rentalProduct ? rentalProduct.quantity : 1
  );

  // Calculate the total price based on quantity
  const totalPrice = rentalProduct?.rentalPricePerDay
    ? rentalProduct.rentalPricePerDay *
      quantity *
      rentalProduct.rental.totalDays
    : 0;

  // Debugging the rentalProduct object
  console.log(rentalProduct);

  if (!rentalProduct) {
    return (
      <div className="text-center text-xl font-semibold h-screen mt-20">
        No rental product found.
      </div>
    );
  }

  const handleProceedCheckout = () => {
    const queryString = new URLSearchParams({
      product: JSON.stringify({
        ...rentalProduct,
        quantity, // Add quantity
        totalPrice, // Add totalPrice
      }),
    }).toString();
    router.push(`/rental-checkout?${queryString}`);
  };
  return (
    <div className="max-w-4xl mx-auto p-6 md:h-screen h-auto rounded-lg">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Rental Cart
      </h1>

      <div className="p-8 rounded-xl">
        <div className="flex flex-col md:flex-row mb-6">
          {/* Image Section */}
          {rentalProduct.imageUrls && rentalProduct.imageUrls.length > 0 && (
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <Image
              
                src={rentalProduct.imageUrls[0]}
                alt={rentalProduct.title}
                width={500}
                height={500}
                className="w-full md:w-48 h-48 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Table Section */}
          <div className="w-full md:w-2/3 md:pl-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {rentalProduct.title}
            </h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 text-gray-700">Details</th>
                  <th className="px-4 py-2 text-gray-700">Information</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="px-4 py-2 text-gray-600">
                    Rental Price Per Day
                  </td>
                  <td className="px-4 py-2 font-semibold text-gray-900">
                    {rentalProduct.rentalPricePerDay
                      ? `$${rentalProduct.rentalPricePerDay}`
                      : "Not available"}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-600">Rental Start Date</td>
                  <td className="px-4 py-2 font-semibold text-gray-900">
                    {rentalProduct.rental.startDate}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-600">Rental End Date</td>
                  <td className="px-4 py-2 font-semibold text-gray-900">
                    {rentalProduct.rental.endDate}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-600">Rental Total Days</td>
                  <td className="px-4 py-2 font-semibold text-gray-900">
                    {rentalProduct.rental.totalDays}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-600">Quantity</td>
                  <td className="px-4 py-2 font-semibold text-gray-900">
                    <input
                      type="number"
                      value={quantity}
                      min="1"
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="border rounded p-2 w-20"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-gray-600">
                    Total Rental Price
                  </td>
                  <td className="px-4 py-2 font-semibold text-gray-900">
                    ${totalPrice.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleProceedCheckout}
            className="w-full sm:w-auto bg-slate-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-300"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentalCart;
