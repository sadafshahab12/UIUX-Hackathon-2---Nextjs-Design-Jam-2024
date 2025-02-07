"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "next-sanity";
import Swal from "sweetalert2";
import Hero from "../components/ui/Hero";

interface Country {
  cca2: string;
  name: {
    common: string;
  };
}

interface RentalCustomerFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
}

const RentalCheckout = () => {
  const searchParams = useSearchParams();
  const product = searchParams.get("product");
  const rentalProduct = product ? JSON.parse(product) : null;

  // Fetch Countries
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [manualCity, setManualCity] = useState<string>("");
  const [manualState, setManualState] = useState<string>("");
  const [state, setState] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [isManualCity, setIsManualCity] = useState(false);
  const [isManualState, setIsManualState] = useState(false);

  console.log(setState);
  const quantity = rentalProduct.quantity;
  const totalPrice = rentalProduct.totalPrice;

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // Fetch Cities Based on Selected Country
  useEffect(() => {
    if (!selectedCountry) return;

    fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: selectedCountry }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data || data.error || !data.data || !data.data.length) {
          setCities([]);
          return;
        }

        setCities(data.data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
        setCities([]);
      });
  }, [selectedCountry]);

  // Fetch States Based on Selected Country
  const zodSchema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    email: z
      .string()
      .email("Invalid Email Address")
      .min(1, "Email is required"),
    address: z.string().min(1, "Address is required"),
    phone: z.string().min(1, "Phone Number is required"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "Zip Code is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RentalCustomerFormData>({
    resolver: zodResolver(zodSchema), // Use the Zod schema resolver for validation
  });

  const handleFormSubmit: SubmitHandler<RentalCustomerFormData> = async (
    data
  ) => {
    const clientCreate = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: "2025-01-18",
      useCdn: true,
      token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    });

    const uploadImageToSanity = async (imageUrl: string) => {
      try {
        // Fetch the image as a blob from the image URL
        const response = await fetch(imageUrl);
        const imageBlob = await response.blob();

        // Upload image to Sanity
        const imageAsset = await clientCreate.assets.upload(
          "image",
          imageBlob,
          {
            filename: "uploaded-image.jpg", // Optional: provide a filename
          }
        );

        return imageAsset; // Return the uploaded image reference
      } catch (error) {
        console.error("Error uploading image to Sanity:", error);
      }
    };

    try {
      // Create customer document in Sanity

      const customerDoc = {
        _type: "rentalCustomer",
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        country: data.country,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
      };

      // Create the customer document and get its _id
      const customer = await clientCreate.create(customerDoc);

      // Create rental order document in Sanity
      const uploadedImage = await uploadImageToSanity(
        rentalProduct.imageUrls[0]
      );
      if (!uploadedImage) {
        console.error("Image upload failed!");
        return;
      }
      const rentalOrderDoc = {
        _type: "rentalOrder",
        product: rentalProduct.title,
        rentalPricePerDay: rentalProduct.rentalPricePerDay,
        rentalStartDate: rentalProduct.rental.startDate,
        rentalEndDate: rentalProduct.rental.endDate,
        totalDays: rentalProduct.rental.totalDays,
        quantity: rentalProduct.quantity,
        totalPrice: rentalProduct.totalPrice,
        status: "Pending", // Adding status field
        productImage: {
          _type: "image",
          asset: { _ref: uploadedImage._id },
        }, // Include uploaded image
        customerId: {
          _type: "reference",
          _ref: customer._id,
        },
      };

      // Create the rental order document
      await clientCreate.create(rentalOrderDoc);

      Swal.fire({
        title: "Success!",
        text: "Checkout completed successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
      reset();
    } catch (error) {
      console.error("Error creating documents in Sanity:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error with the checkout process.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  if (!rentalProduct) {
    return (
      <div className="text-center text-red-500 font-semibold">
        <p>CheckOut is Empty</p>
      </div>
    );
  }
  return (
    <div className="sm:-mt-0 -mt-4">
      <Hero
        navName="Rental CheckOut"
        title="Rental CheckOut"
        navLink="/rental-checkout"
      />
      <div className=" mx-auto lg:p-8 xss:p-4 p-2 bg-gray-50 min-h-screen ">
        <div className="grid lg:grid-cols-2 grid-cols-1 md:gap-6 gap-3">
          {/* Product Summary */}
          <div className=" lg:p-6 p-3 rounded-lg  gap-4">
            <div className="p-2 bg-yellow-600 mb-5 rounded-lg">
              <Image
                src={rentalProduct.imageUrls[0]}
                alt="checkout-img"
                width={500}
                height={500}
                className="w-full md:h-[25rem] xs:h-[20rem] h-[15rem] object-cover rounded-lg shadow-md "
              />
            </div>
            <div className="lg:space-y-6 space-y-3">
              <h1 className="md:text-2xl text-xl font-bold">
                {rentalProduct.title}
              </h1>
              <div className="flex justify-between xss:px-4 px-2">
                <p className="xss:text-sm text-12 text-gray-800 ">
                  Rental Price Per Day:
                </p>
                <p className="xss:text-sm text-12 text-gray-800 ">
                  ${rentalProduct.rentalPricePerDay}
                </p>
              </div>
              <div className="flex justify-between xss:px-4 px-2">
                <p className="xss:text-sm text-12 text-gray-800 ">
                  Rental Start Date:
                </p>
                <p className="xss:text-sm text-12 text-gray-800 ">
                  {rentalProduct.rental.startDate}
                </p>
              </div>
              <div className="flex justify-between xss:px-4 px-2">
                <p className="xss:text-sm text-12 text-gray-800 ">
                  Rental End Date:
                </p>
                <p className="xss:text-sm text-12 text-gray-800 ">
                  {rentalProduct.rental.endDate}
                </p>
              </div>
              <div className="flex justify-between xss:px-4 px-2">
                <p className="xss:text-sm text-12 text-gray-800 ">
                  Total Rental Days:
                </p>
                <p className="xss:text-sm text-12 text-gray-800 ">
                  {rentalProduct.rental.totalDays}
                </p>
              </div>
              <div className="flex justify-between xss:px-4 px-2">
                <p className="xss:text-sm text-12 text-gray-800 ">Quantity:</p>{" "}
                <p className="xss:text-sm text-12 text-gray-800 ">
                  {" "}
                  {quantity}
                </p>
              </div>
              <div className="flex justify-between xss:px-4 px-2 bg-slate-300 py-3 font-bold border-t border-b border-t-slate-800 border-b-slate-800 ">
                <p className="xss:text-sm text-12 text-gray-800 ">
                  Total Rental Price:{" "}
                </p>{" "}
                <p className="xss:text-sm text-12 text-gray-800 ">
                  {" "}
                  ${totalPrice}
                </p>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-3 p-4"
          >
            <h1 className="text-2xl font-bold py-4 lg:text-left text-center">
              Place For Rent
            </h1>

            {/* Form Fields */}
            <div className="space-y-2">
              <label className="block text-slate-800 text-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                className="w-full py-3 px-4 border border-slate-800 rounded-md text-sm"
                placeholder="Enter Full Name"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-slate-800 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                className="w-full py-3 px-4 border border-slate-800 rounded-md text-sm"
                placeholder="Enter Email Address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-slate-800 text-sm font-medium">
                Address
              </label>
              <input
                type="text"
                className="w-full py-3 px-4 border border-slate-800 rounded-md"
                placeholder="Enter Residential Address"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">
                  {errors.address.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-slate-800 text-sm font-medium">
                Phone Number
              </label>
              <input
                type="text"
                className="w-full py-3 px-4 border border-slate-800 rounded-md"
                placeholder="Enter Phone Number"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">
                  {errors.phone.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-slate-800 text-sm font-medium">
                Country
              </label>
              <select
                id="country"
                className="border border-slate-800 w-full py-3 px-4 rounded-md"
                value={selectedCountry}
                {...register("country")}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.cca2} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-500 text-sm">
                  {errors.country.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-slate-800 text-sm font-medium">
                City
              </label>
              {cities.length > 0 ? (
                <>
                  <select
                    id="city"
                    className="border border-gray-300 rounded p-2 w-full"
                    {...register("city")}
                  >
                    <option value="">Select a city</option>
                    {cities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message as string}
                    </p>
                  )}
                  <button
                    type="button"
                    className="mt-2 text-blue-500"
                    onClick={() => setIsManualCity(!isManualCity)}
                  >
                    {`Can't`} find your city? Add it manually
                  </button>
                  {isManualCity && (
                    <>
                      <input
                        type="text"
                        className="w-full py-3 px-4 border border-slate-800 rounded-md text-sm mt-2"
                        value={manualCity}
                        placeholder="Enter city manually"
                        {...register("city")}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm">
                          {errors.city.message as string}
                        </p>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  <input
                    type="text"
                    className="w-full py-3 px-4 border border-slate-800 rounded-md text-sm"
                    value={manualCity}
                    placeholder="Enter city manually"
                    {...register("city", {
                      onChange: (e) => setManualCity(e.target.value),
                    })}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message as string}
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-slate-800 text-sm font-medium">
                State
              </label>
              {state.length > 0 ? (
                <>
                  <select
                    id="state"
                    className="border border-gray-300 rounded p-2 w-full"
                    value={selectedState}
                    {...register("state", {
                      onChange: (e) => {
                        setSelectedState(e.target.value); // Handle dropdown selection
                        setManualState(""); // Clear manual input when a state is selected
                      },
                    })}
                  >
                    {state.map((states, index) => (
                      <option key={index} value={states}>
                        {states}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-sm">
                      {errors.state.message as string}
                    </p>
                  )}
                  <button
                    type="button"
                    className="mt-2 text-blue-500"
                    onClick={() => setIsManualState(!isManualState)}
                  >
                    {`Can't`} find your state? Add it manually
                  </button>
                  {isManualState && (
                    <>
                      <input
                        type="text"
                        className="w-full py-3 px-4 border border-slate-800 rounded-md text-sm mt-2"
                        value={manualState}
                        placeholder="Enter state manually"
                        {...register("state", {
                          onChange: (e) => setManualState(e.target.value),
                        })} // Register the manual input with react-hook-form
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm">
                          {errors.state.message as string}
                        </p>
                      )}
                    </>
                  )}
                </>
              ) : (
                <input
                  type="text"
                  className="w-full py-3 px-4 border border-slate-800 rounded-md text-sm"
                  value={manualState}
                  {...register("state", {
                    onChange: (e) => {
                      setManualState(e.target.value); // Update local state
                    },
                  })}
                />
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-slate-800 text-sm font-medium">
                Zip Code
              </label>
              <input
                type="text"
                className="w-full py-3 px-4 border border-slate-800 rounded-md text-sm"
                placeholder="Enter Zip Code"
                {...register("zipCode")}
              />
              {errors.zipCode && (
                <p className="text-red-500 text-sm">
                  {errors.zipCode.message as string}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-slate-800 text-sm text-white font-medium rounded-md"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RentalCheckout />
    </Suspense>
  );
}
