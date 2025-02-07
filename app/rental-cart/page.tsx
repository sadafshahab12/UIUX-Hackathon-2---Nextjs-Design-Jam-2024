"use client";
import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Hero from "../components/ui/Hero";

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
      <div className="mt-20">
        <Hero
          navName="Rental Cart"
          title="Rental Cart"
          navLink="/rental-cart"
        />
        <div className="text-center text-xl font-semibold  h-screen flex flex-col justify-center items-center gap-5">
          <p>Rental Cart is Empty.</p>
          <Image
            src="/shopping_rental_cart_is_empty.jpeg"
            alt="rental-cart-empty"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
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
    <div className="sm:-mt-0 -mt-4">
      <Hero navName="Rental Cart" title="Rental Cart" navLink="/rental-cart" />
      <div className="max-w-6xl mx-auto xs:p-6 p-3 lg:h-screen h-auto rounded-lg ">
        <div className="sm:p-8 p-4 rounded-xl">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
            {/* Image Section */}
            {rentalProduct.imageUrls && rentalProduct.imageUrls.length > 0 && (
              <div className="w-full mb-4 md:mb-0 p-2 bg-yellow-600 rounded-lg">
                <Image
                  src={rentalProduct.imageUrls[0]}
                  alt={rentalProduct.title}
                  width={500}
                  height={500}
                  className="w-full  xs:h-[25rem] xss:h-[20rem] h-[15rem] object-cover rounded-lg"
                />
              </div>
            )}

            {/* Table Section */}
            <div className="w-full md:pl-8">
              <h2 className="sm:text-2xl text-xl font-semibold text-gray-800 mb-4">
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
                    <td className="px-4 py-2  text-gray-900">
                      {rentalProduct.rentalPricePerDay
                        ? `$${rentalProduct.rentalPricePerDay}`
                        : "Not available"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-gray-600">
                      Rental Start Date
                    </td>
                    <td className="px-4 py-2  text-gray-900">
                      {rentalProduct.rental.startDate}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-gray-600">Rental End Date</td>
                    <td className="px-4 py-2  text-gray-900">
                      {rentalProduct.rental.endDate}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-gray-600">
                      Rental Total Days
                    </td>
                    <td className="px-4 py-2  text-gray-900">
                      {rentalProduct.rental.totalDays}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-gray-600">Quantity</td>
                    <td className="px-4 py-2  text-gray-900">
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
              <div className=" mt-4">
                <button
                  onClick={handleProceedCheckout}
                  className="w-full  text-sm bg-slate-800 text-white  py-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-300"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RentalCart />
    </Suspense>
  );
}
